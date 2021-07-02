
const splitStringOnLastWord = function (str) {
    const i = str.trim().lastIndexOf(" "); 
    if(i === -1) {
      return {
        minusLastWord:  "",
        lastWord: str.trim()
      }
    } else {
      const minusLastWord = str.slice(0, i);
      const lastWord = str.slice(i, str.length);

      return {
        minusLastWord: minusLastWord.trim(),
        lastWord: lastWord.trim()
      }
    }
}

// Precendence...
// street alphabetical
// lower house number
// lastname alphabetical
// firstname alphabetical
export const compareMembers = function (a, b) {
    let result = 0;
    result = a.Street.localeCompare(b.Street);

    if(result === 0) {
      result = compareHouseNumbers(a.HouseNo, b.HouseNo);
    }

    if(result === 0) {
      result = a.Lastname.localeCompare(b.Lastname);
    }

    if(result === 0) {
      result = a.Firstname.localeCompare(b.Firstname);
    }

    return result;
}

export const compareHouseNumbers = function (a, b) {
    // 1. 1 STREET
    // 2. 1A STREET 
    // 3. FLAT A 7 STREET
    //
    const aSplit = splitStringOnLastWord(a.toString()); 
    const bSplit = splitStringOnLastWord(b.toString()); 

    const aBuilding = aSplit.lastWord;
    const bBuilding = bSplit.lastWord;
    const aUnit = aSplit.minusLastWord;
    const bUnit = bSplit.minusLastWord;

    const reA = /[^a-zA-Z]/g;
    const reN = /[^0-9]/g;

    const astr = aBuilding.toString();
    const bstr = bBuilding.toString();

    const aA = astr.replace(reA, "");
    const bA = bstr.replace(reA, "");
    const aN = parseInt(astr.replace(reN, ""), 10);
    const bN = parseInt(bstr.replace(reN, ""), 10);

    let retval = 0
    if (aN === bN) {
      if (aA.length === 0) {
        if (bA.length === 0) { 
          retval = 0;
        } else {
          retval = -1;
        }
      } else {
        retval = aA.localeCompare(bA);
      }
    } else {
      retval = aN === bN ? 0 : aN > bN ? 1 : -1;
    }

    // compare the unit address of building is the same
    if(retval === 0 ) {
      if(aUnit.length === 0) {
        if (bUnit.length === 0) {
          retval = 0;
        } else {
          retval = -1;
        }
      } else {
        retval = aUnit.localeCompare(bUnit);
      }
    }

    return retval;
}  

//////////////////////
  // Get an array of all the streets with the members in the street contained in the object
  // Order the streets alphabetically
  // Order the members in the street with increamenting address
  // Order the members of a same houehold alphatically
  // Remove any streets which wont be displayed becaue of filter
  export const getStreets = function (members, searchText) {
    // sort all the members (can be done once after load if order is maintained when new member is added)
    const sortedmembers = members.sort((a,b) => {
      //return a.Street.localeCompare(b.Street);
      return compareMembers(a, b);
    });

    // group members into the streets
    const streets = [];
    sortedmembers.forEach((m) => {
      m.Street = m.Street.toUpperCase();
      // find the street object with the same name as the member street name
      let street = streets.find((s) => { 
        if (s.name === m.Street) {
          return true;  
        } else {
          return false;
        }
      });

      // create the street entry if required
 	    if(!street) {
        street = {
          name: m.Street, members: [], count: 0
        };
        streets.push(street);
      }

      street.members.push(m); 
      street.count = street.count + 1; // increament the count
    });

    // apply member ID and any filter
    let id = 1;
    streets.forEach((street) => {
      let filteredmembers = [];
      street.members.forEach((m) => {
        
        let clone = Object.assign({},m);
        clone.MemberId = id++; // each member has an number ID in sequence (this is what the masjid need)

        // apply the filter
        if (searchText && searchText.length > 0) {
          if(m.Firstname.includes(searchText) || m.Lastname.includes(searchText) || m.Street.includes(searchText)) {
            filteredmembers.push(clone);
          }
        } else { // no filter
           filteredmembers.push(clone);
        }
      });
      street.members = filteredmembers;
    });

    // remove any empty streets
    return streets.filter((s) => {
      return s.members.length > 0;
    })
}
