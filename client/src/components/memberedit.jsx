import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


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
              //onChange={e => this.setState({ memberFirstname: e.target.value.toLocaleUpperCase() })}
              onChange={e => this.props.member.Firstname = e.target.value.toLocaleUpperCase() }
              defaultValue={this.props.member.Firstname}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="Lastname">Lastname</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Last name"
              aria-label="Lastname"
              aria-describedby="lastname"
              //onChange={e => this.setState({ memberLastname: e.target.value.toLocaleUpperCase() })}
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
            //onChange={e => this.setState({ memberHouseNo: e.target.value.toLocaleUpperCase() })}
            onChange={e => this.props.member.HouseNo = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.HouseNo}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="Street">Street</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Street name"
            aria-label="Street"
            aria-describedby="street"
            //onChange={e => this.setState({ memberStreet: e.target.value.toLocaleUpperCase() })}
            onChange={e => this.props.member.Street = e.target.value.toLocaleUpperCase() }
            defaultValue={this.props.member.Street}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={this.handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );}
}

export default MemberEdit;