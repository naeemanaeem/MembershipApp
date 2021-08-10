import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import 'react-dropdown/style.css';
import CountrySelector from './helper/countryselector.jsx'
import StateSelector from './helper/stateselector.jsx'


class MemberEdit extends Component {

  handleSave = (e) => {
    this.props.onSave(this.props.member);
  }
  
  handleCancel = () => {
    this.props.onCancel(this.props.member);
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Member details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="Firstname">Firstname(s)</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="First name"
              aria-label="Firstname"
              aria-describedby="firstname"
              onChange={e => this.props.member.Firstname = e.target.value.toLocaleUpperCase() }
              defaultValue={this.props.member.Firstname}
              className="mr-2"
            />

            <InputGroup.Prepend>
              <InputGroup.Text id="Lastname">Lastname</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Last name"
              aria-label="Lastname"
              aria-describedby="lastname"
              onChange={e => this.props.member.Lastname = e.target.value.toLocaleUpperCase() }
              defaultValue={this.props.member.Lastname}
            />
          </InputGroup>
        <br/>
        <br/>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="HouseNo">House</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="House number or name"
            aria-label="House #"
            aria-describedby="house"
            onChange={e => this.props.member.HouseNo = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.HouseNo}
            className="mr-2"
          />
          <InputGroup.Prepend>
            <InputGroup.Text id="Village">Village</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Village name"
            aria-label="Village"
            aria-describedby="village"
            onChange={e => this.props.member.Village = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.Village}
            className="mr-2"
          />
        </InputGroup>
        {/*begin edits*/}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="Street">Street</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Street name"
            aria-label="Street"
            aria-describedby="street"
            onChange={e => this.props.member.Street = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.Street}
            className="w-25"
          />
        </InputGroup>

        <InputGroup className="mb-3">
        <InputGroup.Prepend>
            <InputGroup.Text id="City">City</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="City Name"
            aria-label="City"
            aria-describedby="city"
            onChange={e => this.props.member.City = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.City}
            className="w-25 mr-2"
          />
          <InputGroup.Prepend>
            <InputGroup.Text id="State">State</InputGroup.Text>
          </InputGroup.Prepend>
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
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="Country">Country</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Select Country"
            aria-label="Country"
            aria-describedby="country"
            as="select"
            onChange={e => this.props.member.Country = e.target.value.toLocaleUpperCase() }
            className="mr-2 w-50"
            defaultValue={this.props.member.Country}
          >
            <CountrySelector/>
          </FormControl>
          
          <InputGroup.Prepend>
            <InputGroup.Text id="Zipcode">Zipcode</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Zipcode"
            aria-label="Zipcode"
            aria-describedby="zipcode"
            onChange={e => this.props.member.Postcode = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.Postcode}
          />
        </InputGroup>

        <br/>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="DoB">Date of Birth</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="mm/dd/yyyy"
            aria-label="DoB"
            aria-describedby="DoB"
            onChange={e => this.props.member.DateOfBirth = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.DateOfBirth}
            className="mr-2"
           />
          <InputGroup.Prepend>
            <InputGroup.Text id="Gender">Gender</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Gender"
            aria-label="Gender"
            aria-describedby="gender"
            as="select"
            onChange={e => this.props.member.Gender = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.Gender}
            className="mr-2"
          >
            <option>n/a</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
          </FormControl>
        </InputGroup>

        <InputGroup className="mb-3 w-100">  
          <InputGroup.Prepend>
            <InputGroup.Text id="Voter">Voter</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Voter"
            aria-label="Voter"
            aria-describedby="voter" 
            as="select" 
            onChange={e => this.props.member.Voter = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.Voter}
            className="mr-3"
          >
            <option>n/a</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </FormControl>

          <InputGroup.Prepend>
            <InputGroup.Text id="Spouse">Spouse</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Spouse Name"
            aria-label="Spouse"
            aria-describedby="spouse"
            as="select"
            onChange={e => this.props.member.Spouse = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.Spouse}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </FormControl>
        </InputGroup>
        <br/>
        <InputGroup className="mr-3 w-100">
          <InputGroup.Prepend>
            <InputGroup.Text id="PhoneNum">Phone Number</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Phone Number"
            aria-label="PhoneNum"
            aria-describedby="phonenum"
            onChange={e => this.props.member.PhoneNum = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.PhoneNum}
            className="mr-3"
          />
          <InputGroup.Prepend>
            <InputGroup.Text id="Email">Email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="email"
            aria-label="Email"
            aria-describedby="email"
            onChange={e => this.props.member.Email = e.target.value }
            defaultValue={this.props.member.Email}
          />
        </InputGroup>


        {/*end edits*/}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={this.handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );}
}

export default MemberEdit;