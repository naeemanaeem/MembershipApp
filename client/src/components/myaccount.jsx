import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Member from './member';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import {Row, Col } from 'reactstrap';
import Form from 'react-bootstrap/Form'
import DependentEdit from './dependentedit';
import MemberEdit from './memberedit';

import './css_stuff/myaccount.css'

class MyAccount extends Component {

  state = {
    modalShow: false,
    memberShow: false,
    myaccount: {Dependents: []},
    tempdependent: {},
    dependents: [],
    depArrSize: 0,
    changeDepArr: false,
    error: ""
  };

  //LOADS DATA INTO MYACCOUNT
  async componentDidMount() {
    try {
      const id = localStorage.getItem("googleId"); //TRY TO USE THIS TO GET MEMBER
      const res = await axios.get('members/613fd51ee12a4d7b84e56881');{/*members/id syntax for id*/}
      this.setState({myaccount: res.data, error: ""});
    } catch (e) {
      this.setState({error: e.message});
      console.error(e);
    } 
  }

  //SAVES NEW DEPENDENTS
  async saveNewDependent(m) {
    if (m.Firstname && m.Firstname.length > 0 &&
        m.Lastname && m.Lastname.length > 0 &&
        m.HouseNo && m.HouseNo.length > 0 &&
        m.Street && m.Street.length > 0) {

        const res = await axios.post('/members', m);  
        const newmembers = [...this.state.dependents, res.data];

        let account = this.state.myaccount;
        account.Dependents.push(res.data._id);
        console.log("RES", res, this)
        this.setState({dependents: newmembers}, this.handleEditSave(account, true));
    }
  }

  //GETS DEPENDENTS BY ID AND ADDS THEM TO dependents ARRAY
  async getDependent(id) {
    try {
      const res = await axios.get('members/' + id);
      const newdependents = [...this.state.dependents, res.data];
      this.setState({dependents: newdependents});
    } catch (e) {
      this.setState({error: e.message});
      console.error(e);
    } 
  }

  //SAVED UPDATED MEMBERS/DEPENDENTS
  async saveUpdatedMember(m) {
    try {
      await axios.put('members/' + m._id, m);
      // TODO: update with the member details returned from server? 
    } catch (error) {
      console.error(error);
    }
  }

  //HANDLES SAVING EDITED MEMBERS/DEPENDENTS AND SAVING NEW DEPENDENTS
  handleEditSave = (m, isOwner) => {
    try {
      let member;
      if (isOwner) {
        member = this.state.myaccount; //SET MEMBER TO MYACCOUNT
        console.log("IN OWNER", member)
      } else {
        member = this.state.dependents.find(el => el._id === m._id); //SET MEMBER TO DEPENDENT
      }
      if(member) { //UPDATE MEMBER/DEPENDENT
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
        this.saveUpdatedMember(member);
        if(isOwner){
          console.log("Update member - ", member);
          this.setState({myaccount: member});
        } else{
          console.log("Update dependent - ", member);
          let newDep = [...this.state.dependents];
          newDep.splice(this.state.dependents.findIndex(el => el._id === member._id), 1);
          newDep.push(member);
          this.setState({dependents: newDep},
            this.fillDependentArray());
        }
      } else{ //ADD NEW DEPENDENT
        console.log("Save dependent - ", m);
        m.Guardians.push(this.state.myaccount._id);
        this.saveNewDependent(m);
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  
  //REMOVES COPIES FROM dependents ARRAY BUT NEEDS WORK
  removeCopies(){
    let newArr = [], retest = [], doOver = [];
    let i = 0;
    while(i < this.state.depArrSize){
      if(newArr.length === 0){newArr.push(this.state.dependents[i])}
      else if(!newArr.find(dep => dep === this.state.dependents[i])){newArr.push(this.state.dependents[i])}
      i++;
    }
    newArr.forEach(dep => retest.push(dep.Firstname));
    doOver = retest.filter((c, index) => {
        return retest.indexOf(c) !== index;
    });
    if(doOver.length > 0){
      console.log(doOver);
      this.fillDependentArray();
      // this.setState({dependents: newArr});
    } else{
      this.setState({dependents: newArr});
    }
  }
  
  //RESETS dependents ARRAY AND THEN CALLS getDependent FOR EACH DEPENDENT ID IN MYACCOUNT.DEPENDENTS
  fillDependentArray() {
    this.setState({dependents: []},
      this.state.myaccount.Dependents.forEach(dep => this.getDependent(dep))
    );
  }

  //SETS DEPENDENTEDIT MODAL
  setModalShow = (e) => { //true or false
    this.setState({modalShow: e});
  }

  //SHOWS DEPENDENT EDIT MODAL
  showDependentEditDialog = (member) => {
    this.setState({ 
      tempdependent: member},
    this.setModalShow(true));
  }
  
  //HIDES DEPENDENT EDIT MODAL
  hideDependentEditDialog = () => {
    this.setModalShow(false);
  }

  //PREPARES FOR NEW DEPENDENT AND OPENS DEPENDENT MODAL
  addNewDependent = () => {
    let m = {...this.state.myaccount};
      this.setState({
        tempdependent: {
          Firstname: "", Lastname: "", 
          HouseNo: m.HouseNo, Street: m.Street,  Village: m.Village,
          City: m.City, State: m.State, Country: m.Country,
          Postcode: m.Postcode, Guardians: []
          }
      }, this.setModalShow(true));
  }

  //SHOWS MEMBER EDIT MODAL
  showEditMember = () => {
    this.setState({memberShow: true});
  }

  //HIDES MEMBER EDIT MODAL
  hideEditMember = () => {
    this.setState({memberShow: false});
  }

  //SAVES EDITED MEMBER FROM MEMBER EDIT MODAL
  saveEditMember = (m) => {
    this.setState({memberShow: false, myaccount: m});
    console.log("Update member - ", m);
    this.saveUpdatedMember(m, true);
  }

  //CALULATES AGE OF DEPENDENT
  calulateAge(dob){
    let age, month, day, year;
    // dob = "09/16/2000";
    let date = new Date();
    if(dob){
      month = dob.slice(0,2); day = dob.slice(3, 5); year = dob.slice(6,11);
      age = date.getFullYear() - year;
      if(date.getMonth()+1 - month < 1){
        if(date.getMonth()+1 - month === 0){
          if(date.getDate() - day < 0){
            age--;
          }
        } else{
          age--;
        }
      }
    } else {
      age = "Need DOB";
    }
    return age;
  }

  render () {
    let detailPage, dependentPage;
    // console.log("LOCAL", localStorage.getItem("user_displayName"), localStorage.getItem("user_email"),localStorage.getItem("test") );
    const thisaccount = this.state.myaccount;
    const dependent = this.state.dependents;

    // console.log("LOCALstorage", localStorage);
    detailPage  = 
      <React.Fragment>
        
        {/* Personal Information Below */}
        <h4 className="ml-3">
          Personal Information 
          <Button onClick={this.showEditMember}>Edit Member</Button>
          </h4>
        <hr class="solid mr-2" />
        <Row className="ml-4 mt-4">
          <Col>
            <Form id="target" disabled>
            <Form.Group className="mb-4">
              <Form.Label>First Name</Form.Label>
              <Form.Control id="dp" value={thisaccount.Firstname} className="detailSelWid"/>  
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control value={thisaccount.DateOfBirth} className="detailSelWid"/>  
            </Form.Group>
            </Form>
          </Col>
          <Col>
              <Form.Group className="mb-4">
                <Form.Label>Last Name</Form.Label>
                <Form.Control value={thisaccount.Lastname} className="detailSelWid"/>  
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Gender</Form.Label>
                <Form.Control value={thisaccount.Gender} className="detailSelWid"/>  
              </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Spouse</Form.Label>
              <Form.Control value={(thisaccount.Spouse) ? thisaccount.Spouse : "No"} className="detailSelWid"/>   
            </Form.Group>
          </Col>
        </Row>

        {/* Address Information Below */}
        <h4 className="ml-3">Address Information</h4>
        <hr class="solid mr-2" />
        <Row className="ml-4 mt-4">
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Address</Form.Label>
              <Form.Control value={thisaccount.HouseNo + ' ' + thisaccount.Street} className="detailSelWid"/>  
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>State</Form.Label>
              <Form.Control value={thisaccount.State} className="detailSelWid"/>  
            </Form.Group>
          </Col>
          <Col>
              <Form.Group className="mb-4">
                <Form.Label>City</Form.Label>
                <Form.Control value={thisaccount.City} className="detailSelWid"/>   
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Country</Form.Label>
                <Form.Control value={thisaccount.Country} className="detailSelWid"/> 
              </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Village</Form.Label>
              <Form.Control value={thisaccount.Village} className="detailSelWid"/>    
            </Form.Group>
          </Col>
        </Row>

        {/* Contact Info Below */}
        <h4 className="ml-3">Contact Information</h4>
        <hr class="solid mr-2" />
        <Row className="rowSpace">
           <Form.Group className="detailSpace mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control value={thisaccount.Email} className="detailSelWid"/>    
               </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control value={thisaccount.PhoneNum} className="detailSelWid"/>    
               </Form.Group> 
        </Row>

         {/* Member Info Below UNCOMMENT ONCE THE MEMBER TYPE AND STATUS ARE IMPLEMENTED*/}

        {/*<h4 className="ml-3">Member Information</h4>
        <hr class="solid mr-2" />
        <Row className="rowSpace">
           <Form.Group className="detailSpace mb-4">
                <Form.Label>Member Type</Form.Label>
                <Form.Control value="Paying" className="detailSelWid"/>    
               </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Member Status</Form.Label>
                <Form.Control value="Active" className="detailSelWid"/>    
               </Form.Group> 
        </Row>*/}
      </React.Fragment>;

    if(thisaccount.Dependents.length > 0){
      if(this.state.depArrSize !== thisaccount.Dependents.length){
        this.setState({depArrSize: thisaccount.Dependents.length}, this.fillDependentArray());
      }
      if(this.state.dependents.length > this.state.depArrSize){
        this.removeCopies();
      }


      dependentPage =
        <React.Fragment>
          <h4 className="ml-3">
          Dependents 
          <Button variant="warning" className="mb-3" onClick={this.addNewDependent}>Add Dependent</Button>
          </h4>
          <hr class="solid mr-2" />
          <Table className="mr-4">
            <thead className="depTableHead">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Relationship</th>
                <th>Age</th>
                <th>View/Edit Info</th>
              </tr>
            </thead>
            <tbody>
            {dependent.map((dep) => {
                return (
                  <tr>
                    <td>{dep.Firstname}</td>
                    <td>{dep.Lastname}</td>
                    <td>{(dep.Relationship) ? dep.Relationship : "Relationship"}</td>
                    <td>{this.calulateAge(dep.DateOfBirth)}</td>
                    <Member 
                      isNewDep={false} 
                      isDep={true}
                      handleMemberEdit={this.showDependentEditDialog}
                      member={dep}
                    />
                  </tr>
                ); 
            })}
            </tbody>
          </Table>
        </React.Fragment>
    } else{ dependentPage = <h2>NO DEPENDENTS</h2>}

    return (
      <React.Fragment>
        <DependentEdit
          member={this.state.tempdependent}
          show={this.state.modalShow}
          onCancel={this.hideDependentEditDialog}
          onSave={this.handleEditSave}
          addDependent={this.addDependent}
          myAccount={true}
        />

        <MemberEdit
          member={this.state.myaccount}
          show={this.state.memberShow}
          onCancel={this.hideEditMember}
          onSave={this.saveEditMember}
          myAccount={true}
        />

        
        <div>
          <h1 class="header"> 
            My Account
          </h1>
        </div>
        <div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="details" className="w-50">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="details">My Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="dependents">My Dependents</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content className="outline">
                <Tab.Pane eventKey="details">
                  {detailPage}
                </Tab.Pane>
                <Tab.Pane eventKey="dependents">
                  {dependentPage}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </React.Fragment>
    );
  }
    
}

  
export default MyAccount;