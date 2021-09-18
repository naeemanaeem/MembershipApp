import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

import Street from './street';
import MemberEdit from './memberedit';
import { SearchTextContext } from './searchtextprovider';
import { getStreets } from '../utils/memberutils';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import './css_stuff/member.css';
import PaginationTable from "./PaginationTable.jsx";

class Members extends Component {

  state = {
    modalShow: false,
    tempmember:  {Firstname: "FIRSTNAME", Lastname: "LASTNAME", HouseNo: "1", Street: "STREET 1", Town: "LUTON"},
    savedmember:  {Dependents: [], Guardians: [], Relationship: ""},
    isAddNewMember: false,
    isAddDependentMember: false,
    members: [],
    error: ""
  };

  async componentDidMount() {
    try {
      const res = await axios.get('/members');{/*/members?_id=124124 syntax for id*/}
      this.setState({members: res.data, error: ""});
    } catch (e) {
      this.setState({error: e.message});
      console.error(e);
    } 
  }

  setModalShow = (e) => {
    this.setState({modalShow: e});
  }

  showMemberEditDialog = () => {
    this.setModalShow(true);
  }

  hideMemberEditDialog = () => {
    this.setModalShow(false);
  }

  handleMemberEditCancel = (m) => {
    this.hideMemberEditDialog();
  }

  async saveNewMember(m) {
    if (m.Firstname && m.Firstname.length > 0 &&
        m.Lastname && m.Lastname.length > 0 &&
        m.HouseNo && m.HouseNo.length > 0 &&
        m.Street && m.Street.length > 0) {

        m.GoogleId = localStorage.getItem("googleId");
        const res = await axios.post('/members', m);  

        const newmembers = [...this.state.members, res.data];
        this.setState({members: newmembers, savedmember: res.data});
    }
  }

  async saveDependentMember(m) {
    if (m.Firstname && m.Firstname.length > 0 &&
        m.Lastname && m.Lastname.length > 0 &&
        m.HouseNo && m.HouseNo.length > 0 &&
        m.Street && m.Street.length > 0) {

        const res = await axios.post('/members', m);  
        const newmembers = [...this.state.members, res.data];
        this.setState({members: newmembers});
        this.updateDependentArr(res.data);
    }
  }

  async saveUpdatedMember(m) {
    try {
      await axios.put('members/' + m._id, m);
      // TODO: update with the member details returned from server? 
    } catch (error) {
      console.error(error);
    }
  }

  async saveDelete(m) {
    try {
      const res = await axios.delete('members/' + m._id, m);

      const index = this.state.members.findIndex(function(o) {
        return o._id === res.data._id;
      });

      if (index !== -1) {
        this.state.members.splice(index, 1);
        this.setState({members: this.state.members});
      } 
    } catch (error) {
      console.error(error);
    }
  }

  handleMemberEditSave = (m) => {
    try {
      if (this.state.isAddNewMember) {
        console.log("Save new member - ", m);
        this.saveNewMember(m);
        this.setState({isAddNewMember: false})
      } else {
        // find the member to update
        const member = this.state.members.find(el => el._id === m._id);
        if(member) {
          member.Firstname = m.Firstname;
          member.Lastname = m.Lastname;
          member.HouseNo = m.HouseNo;
          member.Street = m.Street;
          member.Village = m.Village;
          member.City =  m.City; 
          member.Postcode = m.Postcode; 
          member.Country =  m.Country;
          member.Gender = m.Gender;
          member.Spouse = m.Spouse;
          member.State = m.State;
          member.Voter = m.Voter;
          member.PhoneNum = m.PhoneNum;
          member.Email = m.Email;
          member.DateOfBirth = m.DateOfBirth;
          member.Relationship = m.Relationship;
          member.Guardians = m.Guardians;
          member.Dependents = m.Dependents;
          console.log("Save update member - ", member);
          this.saveUpdatedMember(member);
          this.setState({members: this.state.members, tempmember: member}); // fetch from server instead
        }
      }

      this.hideMemberEditDialog();
    } catch (error) {
      console.error(error);
    }
  }

  removeMember = (m) => {
    const response = window.confirm(`Are you sure you want to delete ${m.Firstname} ${m.Lastname}`);
    if(response) {
      this.saveDelete(m);
    }
  }
  
  handleAddNewMemberButtonClick = (e) => {
    const street = {name: ""};
    this.addNewMember(street);
  }

  addNewMember = (street) => {
    this.setState({ 
        tempmember:  {Firstname: "", Lastname: "", HouseNo: "", Street: street.name,  Town: "LUTON", Guardians: [], Dependents: []},
        isAddNewMember: true,
        isAddDependentMember: false
      }, this.showMemberEditDialog);
  }

  updateMember = (m) => {
    console.log("Update member - ", m);
    this.setState({ 
        tempmember: m,
        isAddNewMember: false,
        isAddDependentMember: false
      }, this.showMemberEditDialog);
  }

  addDependentMember = (mem, dep) => {
    this.setState({ 
        isAddDependentMember: true
      });
    console.log("Save Dependent member - ", dep, " to ", mem);
    if(!this.state.isAddNewMember){dep.Guardians.push(this.state.tempmember._id); this.setState({savedmember: mem});}
    this.saveDependentMember(dep);
  }

  updateDependentArr = (dependent) => {
    let member = this.state.savedmember;
    member.Dependents.push(dependent._id);
    this.handleMemberEditSave(member);
    if(dependent.Guardians.length < 1){dependent.Guardians.push(member._id); this.handleMemberEditSave(dependent);}
    else if (!dependent.Guardians.find(id => id === member._id)){dependent.Guardians.push(member._id); this.handleMemberEditSave(dependent);}
  }

  hiddenUpdate = (m) => {
    this.updateMember(m);
  }

  isAddNewMemberChange = (e) => {
    this.setState({isAddNewMember: e})
  }

  render () {
    if(this.state.error.length > 0) {
      const variant = 'danger'
      return (
        <Alert variant={variant}>
          {this.state.error}
        </Alert>
      );
    }

      let i = this.state.members.length + 1000;
      // const streets = getStreets(this.state.members, 
      //   this.context.state.searchText.toLocaleUpperCase()
      // );
      const streets = [];
      const { tempmember } = this.state;

      let component; 
      var rows = [];
      let memData = this.state.members;

      {streets.map((street) => {
        rows.push(
          <Street 
            key={i++} 
            street={street} 
            addMember={this.addNewMember} 
            removeMember={this.removeMember} 
            updateMember={this.updateMember} 
          />
        );
      })}
      
      // if(1){
        component =
            <React.Fragment>
            <MemberEdit
              member={tempmember}
              show={this.state.modalShow}
              onDependentShow={this.hideMemberEditDialog}
              onDependentHide={this.showMemberEditDialog}
              onCancel={this.handleMemberEditCancel}
              onSave={this.handleMemberEditSave}
              addDependentMember={this.addDependentMember}
              myAccount={false}
            />
  
            <div >
              <h1 className="ml-5 mt-3">
                Member 
              </h1>
              <Button className="addbutton" onClick={this.handleAddNewMemberButtonClick}>Add Member</Button>
              <PaginationTable id="AdminDataTable" data={memData} updateMember={this.updateMember}/>
            </div>
            </React.Fragment>
      // }

      // else if( 0 ) {
      //   component = 
      //     <React.Fragment>
      //     <MemberEdit
      //       member={tempmember}
      //       show={this.state.modalShow}
      //       onCancel={this.handleMemberEditCancel}
      //       onSave={this.handleMemberEditSave}
      //     />
      //     <div id="inline">
      //       <h1 className="ml-5 mt-3 mb-3">
      //         Member 
      //         </h1>
      //         <Button  onClick={this.handleAddNewMemberButtonClick} className="addbutton mb-2">Add Member</Button>
      //       {/* <Button className="mb-3" onClick={this.handleAddNewMemberButtonClick}>Add Member</Button> */}
      //     </div>
      //     <div id="inline">
      //       <div class="FilterTable ml-4">
      //         <h4 class="center mt-3">Filter</h4>
      //           <Form className="fsearch">
      //             <FormControl
      //               id="myInput" 
      //               type="search"
      //               placeholder="Search"
      //               className="mr-2"
      //               aria-label="Search"
      //             />
      //             <div class="mt-3">
      //               <Form.Check 
      //                   type='checkbox'
      //                   id='IdCheck'
      //                   label="Id"
      //                   defaultChecked={true}
      //               />
      //               <Form.Check 
      //                     type='checkbox'
      //                     id='NameCheck'
      //                     label="Name"
      //               />
      //               <Form.Check 
      //                     type='checkbox'
      //                     id='PhoneCheck'
      //                     label="Phone Number"
      //               />
      //               <Form.Check 
      //                   type='checkbox'
      //                   id='AddressCheck'
      //                   label="Address"
      //               />
      //               <Form.Check 
      //                   type='checkbox'
      //                   id='VillageCheck'
      //                   label="Village"
      //               />
      //               <Form.Check 
      //                   type='checkbox'
      //                   id='StatusCheck'
      //                   label="Member Status"
      //               />
      //             </div>
      //           </Form>
      //       </div>

      //       <div class="AdminTable">
      //         <Table className="backwhite" id="ATable">
              
      //         <thead class="center tableheader">
      //           <tr>
      //             <th>Id</th>
      //             <th>Name</th>
      //             <th>Phone Number</th>
      //             <th>Address</th>
      //             <th>Village</th>
      //             <th>Membership Status</th>
      //             <th>View Full Info</th>
      //           </tr>
      //         </thead>
      //         <tbody>
      //               {rows}
      //         </tbody>
      //       </Table>
      //     </div>
      //   </div>
      //   </React.Fragment>;
      // } 
      
      // else {
      //   component = 
      //     <React.Fragment>
      //     <MemberEdit
      //       member={tempmember}
      //       show={this.state.modalShow}
      //       onCancel={this.handleMemberEditCancel}
      //       onSave={this.handleMemberEditSave}
      //     />
      //   <div>
      //     <Button onClick={this.handleAddNewMemberButtonClick}>Add Member</Button>
      //   </div>
      //   </React.Fragment>
      // }

      return component;
    }
    static contextType = SearchTextContext;
}
  
export default Members;