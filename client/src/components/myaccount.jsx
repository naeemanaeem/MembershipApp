import React, { Component } from 'react';
// import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

// import Street from './street';
import MemberEdit from './memberedit';
import Member from './member';
import Members from './members';
import TabContainer from 'react-bootstrap/TabContainer'
import Tab from 'react-bootstrap/Tab'
import TabContent from 'react-bootstrap/TabContent'
import TabPane from 'react-bootstrap/TabPane'
import Nav from 'react-bootstrap/Nav'
import {Row, Col } from 'reactstrap';
import Form from 'react-bootstrap/Form'
// import { SearchTextContext } from './searchtextprovider';
// import { getStreets } from '../utils/memberutils';

import './css_stuff/myaccount.css'

class MyAccount extends Component {

  state = {
    myaccount: {},
    error: ""
  };

  async componentDidMount() {
    try {
      const res = await axios.get('/members?_id=60dff2e453043f1ef5862528');{/*/members?_id=124124 syntax for id*/}
      this.setState({myaccount: res.data[4], error: ""});
    } catch (e) {
      this.setState({error: e.message});
      console.error(e);
    } 
  }
  
  // randFunc = () => {
  //   let el = document.getElementById("target");
  //   el.disabled = !el.disabled;
  // }
  
  render () {
    let detailPage;
    console.log("THIS------>", this.state.myaccount);
    const thisaccount = this.state.myaccount;
    detailPage  = 
      <React.Fragment>
        
        {/* Personal Information Below */}
        <h4 className="ml-3">Personal Information</h4>
        <hr class="solid mr-2" />
        <Row className="ml-4 mt-4">
          <Col>
            <Form id="target" disabled>
            <Form.Group className="mb-4">
              <Form.Label>First Name</Form.Label>
              <Form.Control id="dp" value={thisaccount.Firstname} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control value={thisaccount.DateOfBirth} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
            </Form.Group>
            </Form>
          </Col>
          <Col>
              <Form.Group className="mb-4">
                <Form.Label>Last Name</Form.Label>
                <Form.Control value={thisaccount.Lastname} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Gender</Form.Label>
                <Form.Control value={thisaccount.Gender} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
              </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Spouse</Form.Label>
              <Form.Control value={thisaccount.Spouse} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
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
              <Form.Control value={thisaccount.HouseNo + ' ' + thisaccount.Street} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>State</Form.Label>
              <Form.Control value={thisaccount.State} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
            </Form.Group>
          </Col>
          <Col>
              <Form.Group className="mb-4">
                <Form.Label>City</Form.Label>
                <Form.Control value={thisaccount.City} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Country</Form.Label>
                <Form.Control value={thisaccount.Country} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
              </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Village</Form.Label>
              <Form.Control value={thisaccount.Village} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
            </Form.Group>
          </Col>
        </Row>

        {/* Contact Info Below */}
        <h4 className="ml-3">Contact Information</h4>
        <hr class="solid mr-2" />
        <Row className="rowSpace">
           <Form.Group className="detailSpace mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control value={thisaccount.Email} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
               </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control value={thisaccount.PhoneNum} className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
               </Form.Group> 
        </Row>

        <h4 className="ml-3">Member Information</h4>
        <hr class="solid mr-2" />
        <Row className="rowSpace">
           <Form.Group className="detailSpace mb-4">
                <Form.Label>Member Type</Form.Label>
                <Form.Control value="Paying" className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
               </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Member Status</Form.Label>
                <Form.Control value="Active" className="detailSelWid"/>    {/*NEED  TO ADD ACTUAL VALUE HERE*/}
               </Form.Group> 
        </Row>

        {/* Member Info Below */}
      </React.Fragment>;

    return (
      <React.Fragment>
        <div>
        <h1 class="header">
              My Account 
              <Button>Edit Member</Button>
              </h1>
        </div>
        <div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="details">
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
                  <p>HI</p>
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