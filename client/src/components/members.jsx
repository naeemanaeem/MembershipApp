import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

import Street from './street';
import MemberEdit from './memberedit';
import { SearchTextContext } from './searchtextprovider';
import { getStreets } from '../utils/memberutils';

class Members extends Component {

  state = {
    modalShow: false,
    tempmember:  {Firstname: "FIRSTNAME", Lastname: "LASTNAME", HouseNo: "1", Street: "STREET 1", Town: "LUTON"},
    isAddNewMember: false,
    members: [],
    error: ""
  };

  async componentDidMount() {
    try {
      const res = await axios.get('/members');
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

        const res = await axios.post('/members', m);  

        const newmembers = [...this.state.members, res.data];
        this.setState({members: newmembers});
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
      } else {
        // find the member to update
        const member = this.state.members.find(m => m._id === this.state.tempmember._id);
        if(member) {
          member.Firstname = m.Firstname;
          member.Lastname = m.Lastname;
          member.HouseNo = m.HouseNo;
          member.Street = m.Street;
          member.Town = m.Town;
          console.log("Save update member - ", member);
          this.saveUpdatedMember(member);
          this.setState({members: this.state.members}); // fetch from server instead
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
        tempmember:  {Firstname: "", Lastname: "", HouseNo: "", Street: street.name,  Town: "LUTON"},
        isAddNewMember: true
      }, this.showMemberEditDialog);
  }

  updateMember = (m) => {
    console.log("Update member - ", m);
    this.setState({ 
        tempmember: m,
        isAddNewMember: false
      }, this.showMemberEditDialog);
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
      const streets = getStreets(this.state.members, 
        this.context.state.searchText.toLocaleUpperCase()
      );
      const { tempmember } = this.state;

      let component;  
      if( this.state.members.length > 0 ) {
        component = 
          <React.Fragment>
          <MemberEdit
            member={tempmember}
            show={this.state.modalShow}
            onCancel={this.handleMemberEditCancel}
            onSave={this.handleMemberEditSave}
          />

          <Table borderless hover>
          {/*
          <SearchTextContext.Consumer>
            {(context) => ( context.setStreets(streets))}
          </SearchTextContext.Consumer>
          */}
          <tbody>
            {streets.map((street) => {
              return (
                <Street 
                  key={i++} 
                  street={street} 
                  addMember={this.addNewMember} 
                  removeMember={this.removeMember} 
                  updateMember={this.updateMember} 
                />
              );
            })}
          </tbody>
        </Table>
        </React.Fragment>;
      } else {
        component = 
          <React.Fragment>
          <MemberEdit
            member={tempmember}
            show={this.state.modalShow}
            onCancel={this.handleMemberEditCancel}
            onSave={this.handleMemberEditSave}
          />
        <div>
          <Button onClick={this.handleAddNewMemberButtonClick}>Add Member</Button>
        </div>
        </React.Fragment>
      }

      return component;
    }

    static contextType = SearchTextContext;
}

  
export default Members;