import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'


class payment extends Component {
    render (){
        return (
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Payment
          </Modal.Title>
        </Modal.Header>
            <React.Fragment>
            <Form> 
            <Form.Group controlId = "paymentoptions">
            <Form.Control as="select">
                <option>Subscription Fee</option>
                <option>Donation</option>
                <option>Sadaqa</option>
                <option>Zakat</option>
            </Form.Control>
            </Form.Group>
            </Form>
            </React.Fragment>
            </Modal>
        );}
}


export default payment;

