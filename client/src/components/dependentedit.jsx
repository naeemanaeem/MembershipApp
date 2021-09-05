import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import 'react-dropdown/style.css';
import CountrySelector from './helper/countryselector.jsx'
import StateSelector from './helper/stateselector.jsx'
import Form from 'react-bootstrap/Form'
import {Col} from 'reactstrap';
import './css_stuff/memberedit.css';


class DependentEdit extends Component {
  handleSave = (e) => {
    this.props.addDependent(this.props.member);
    this.props.onCancel();
  }
  
  handleCancel = () => {
    this.props.onCancel();
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Dependent details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup>
              <Form.Group as={Col} md="6">
                <Form.Label id="Firstname">First Name</Form.Label>
                <FormControl
                  placeholder="First name"
                  aria-label="Firstname"
                  aria-describedby="firstname"
                  onChange={e => this.props.member.Firstname = e.target.value.toLocaleUpperCase() }
                  defaultValue=""
                  className="mr-2"
                />
              </Form.Group>            

              <Form.Group as={Col} md="6">
                <Form.Label id="Lastname">Last Name</Form.Label>
                <FormControl
                  placeholder="Last name"
                  aria-label="Lastname"
                  aria-describedby="lastname"
                  onChange={e => this.props.member.Lastname = e.target.value.toLocaleUpperCase() }
                  defaultValue=""
                />
              </Form.Group>
            </InputGroup>

            <InputGroup>
              <Form.Group as={Col} md="6">
                <Form.Label id="PhoneNum" >Phone Number</Form.Label>
                <FormControl
                  placeholder="Phone Number"
                  aria-label="PhoneNum"
                  aria-describedby="phonenum"
                  onChange={e => this.props.member.PhoneNum = e.target.value.toLocaleUpperCase() }
                  defaultValue=""
                  className="mr-3"
                />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label id="Email" >Email</Form.Label>
                <FormControl
                  placeholder="email"
                  aria-label="Email"
                  aria-describedby="email"
                  onChange={e => this.props.member.Email = e.target.value }
                  defaultValue=""
                />
              </Form.Group>
            </InputGroup>
          <br/>
            <InputGroup>
              <Form.Group as={Col} md="6">
                <Form.Label id="HouseNo">House Number</Form.Label>
                <FormControl
                  placeholder="House number or name"
                  aria-label="House #"
                  aria-describedby="house"
                  onChange={e => this.props.member.HouseNo = e.target.value.toLocaleUpperCase() }
                  defaultValue={this.props.member.HouseNo}
                  className="mr-2"
                />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label id="Village">Village</Form.Label>
                <FormControl
                  placeholder="Village name"
                  aria-label="Village"
                  aria-describedby="village"
                  onChange={e => this.props.member.Village = e.target.value.toLocaleUpperCase() }
                  defaultValue={this.props.member.Village}
                  className="mr-2"
                />
              </Form.Group>
            </InputGroup>

            <InputGroup>
              <Form.Group as={Col} md="6">
                <Form.Label id="Street" >Street</Form.Label>
                <FormControl
                  placeholder="Street name"
                  aria-label="Street"
                  aria-describedby="street"
                  onChange={e => this.props.member.Street = e.target.value.toLocaleUpperCase() }
                  defaultValue={this.props.member.Street}
                  className="w-125"
                />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label id="City" >City</Form.Label>
                <FormControl
                  placeholder="City Name"
                  aria-label="City"
                  aria-describedby="city"
                  onChange={e => this.props.member.City = e.target.value.toLocaleUpperCase() }
                  defaultValue={this.props.member.City}
                  className="w-100"
                />
              </Form.Group>
            </InputGroup>

            <InputGroup>
              <Form.Group as={Col} md="5">
                <Form.Label id="State" >State</Form.Label>
                <FormControl
                  placeholder="State Name"
                  aria-label="State"
                  aria-describedby="state"
                  as="select"
                  onChange={e => this.props.member.State = e.target.value.toLocaleUpperCase() }
                  defaultValue={this.props.member.State}
                >
                  <StateSelector />
                </FormControl>   
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label id="Country" >Country</Form.Label>
                <FormControl
                  placeholder="Select Country"
                  aria-label="Country"
                  aria-describedby="country"
                  as="select"
                  onChange={e => this.props.member.Country = e.target.value.toLocaleUpperCase() }
                  className=""
                  defaultValue={this.props.member.Country}
                >
                  <CountrySelector/>
                </FormControl>
              </Form.Group>
          
              <Form.Group as={Col} md="2">
                <Form.Label id="Zipcode" >Zipcode</Form.Label>
                <FormControl
                  placeholder="Zipcode"
                  aria-label="Zipcode"
                  aria-describedby="zipcode"
                  onChange={e => this.props.member.Postcode = e.target.value.toLocaleUpperCase() }
                  defaultValue={this.props.member.Postcode}
                />
              </Form.Group>
            </InputGroup>
          <br/>
            <InputGroup>
              <Form.Group as={Col} md="6">
                <Form.Label id="DoB" >Date of Birth</Form.Label>
                <FormControl
                  placeholder="mm/dd/yyyy"
                  aria-label="DoB"
                  aria-describedby="DoB"
                  onChange={e => this.props.member.DateOfBirth = e.target.value.toLocaleUpperCase() }
                  defaultValue=""
                  className="mr-2"
                />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label id="Gender" >Gender</Form.Label>
                <FormControl
                  placeholder="Gender"
                  aria-label="Gender"
                  aria-describedby="gender"
                  as="select"
                  onChange={e => this.props.member.Gender = e.target.value.toLocaleUpperCase() }
                  className="mr-2"
                >
                  <option>n/a</option>
                  <option value="FEMALE">Female</option>
                  <option value="MALE">Male</option>
                </FormControl>
              </Form.Group>
            </InputGroup>

            <InputGroup>
              <Form.Group as={Col} md="6">
                <Form.Label id="Voter" >Voter</Form.Label>
                <FormControl
                  placeholder="Voter"
                  aria-label="Voter"
                  aria-describedby="voter" 
                  as="select" 
                  onChange={e => this.props.member.Voter = e.target.value.toLocaleUpperCase() }
                  defaultValue="No"
                  className="mr-3"
                >
                  <option>n/a</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </FormControl>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label id="Spouse" >Spouse</Form.Label>
                <FormControl
                  placeholder="Spouse Name"
                  aria-label="Spouse"
                  aria-describedby="spouse"
                  as="select"
                  onChange={e => this.props.member.Spouse = e.target.value.toLocaleUpperCase() }
                  defaultValue="No"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </FormControl>
              </Form.Group>
            </InputGroup>
          </Form>

      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="link" className="depButton">Add Dependent</Button> */}
        <Button variant="secondary" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={this.handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );}
}

export default DependentEdit;