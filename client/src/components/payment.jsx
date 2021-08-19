// import React, {Component} from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';
// import Form from 'react-bootstrap/Form'
// import Col from 'react-bootstrap/Col'


// class payment extends Component {
//     render (){
//         return (
//         <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter">
//         <Modal.Header>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Payment
//           </Modal.Title>
//         </Modal.Header>
//             <React.Fragment>
//             <Form> 
//             <Form.Group controlId = "paymentoptions">
//             <Form.Control as="select">
//                 <option>Subscription Fee</option>
//                 <option>Donation</option>
//                 <option>Sadaqa</option>
//                 <option>Zakat</option>
//             </Form.Control>
//             </Form.Group>
//             </Form>
//             </React.Fragment>
//             </Modal>
//         );}
// }


// export default payment;

import React, {Component, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Table from './table.jsx';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'; 
import Modal from 'react-bootstrap/Modal';

class payment extends Component {
  
constructor()
{
  super()
  this.state ={
    show:false
  }
}
  static lineHeight = 8;
  static leftMargin = 20;


  clearSelection = () => {
    this.setState({
      "radio1": null,
      "radio2": null,
      "radio3": null,
      "radio4": null
    });
  }

  cancelSelection = () => {
      const fields = ['radio1', 'radio2', 'radio3', 'radio4'];
      fields.map(field => {
        this.value = null;
      });
  }

  clearForm = () => {
    const fields = ['fullname', 'email', 'amount'];
    fields.map(field => {
      this.value = '';
    });
  }
  handleModal() {
    this.setState({show:!this.state.show})
  }
   render() {
      // const [show, setShow] = useState(false);

      // const handleClose = () => setShow(false);
      // const handleShow = () => setShow(true);
       return (
       <React.Fragment>
         <br/>
         <Form>
           <Form.Row>
             <Col>
             <h4>Payment</h4>
            <div>
            <ToggleButtonGroup  type="radio" name="options" vertical>
            <ToggleButton id="radio1" value={1}
            variant="outline-primary"
            style={{height : '60px', width : '400px'}}>
                  Subscription Fee
                </ToggleButton>
                <ToggleButton id="radio2" value={2}
                variant="outline-primary"
                style={{height : '60px', width : '400px'}}>
                  Donation
                </ToggleButton>
                <ToggleButton id="radio3" value={3}
                variant="outline-primary"
                style={{height : '60px', width : '400px'}}>
                  Sadaqah
                </ToggleButton>
                <ToggleButton id="radio4" value={4}
                variant="outline-primary"
                style={{height : '60px', width : '400px'}}>
                  Zakat
                </ToggleButton>
                </ToggleButtonGroup>
                </div>
            <br/>
            <br/>
            <Button id = "clear1" variant = "danger" onClick = {this.cancelSelection} type = "reset"
            style={{position: 'absolute'}}>
              Clear
            </Button>
            <br/>
            <br/>
            <br/>
            <br/>
            <div>
              <Button onClick ={()=>{this.handleModal()}}
              style = {{position: 'absolute'}}>Payment History</Button>
              <Modal show={this.state.show}>
                <Modal.Header>Payment History</Modal.Header>
                <Modal.Body>
                  <Table>

                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick ={()=>{this.handleModal()}}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
            <br/>
            <br/>
                    {/* <>
          <Button variant="primary" onClick={handleShow}>
            Launch static backdrop modal
          </Button>
    
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              I will not close if you click outside me. Don't even try to press
              escape key.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary">Understood</Button>
            </Modal.Footer>
          </Modal>
        </> */}
        {/* <Button style={{position:'absolute'}}>
          Payment History
        </Button> */}
            </Col>
            <Col>
            <h4>Payment Method</h4>
            <ToggleButtonGroup type="radio" name="options" vertical>
            <ToggleButton id="radio1" value={1}
            variant="outline-primary"
            style={{height : '60px', width : '400px'}}>
                  PayPal
                </ToggleButton>
                <ToggleButton id="radio2" value={2}
                variant="outline-primary"
                style={{height : '60px', width : '400px'}}>
                  Bank Deposit
                </ToggleButton>
                <ToggleButton id="radio3" value={3}
                variant="outline-primary"
                style={{height : '60px', width : '400px'}}>
                  Zelle
                </ToggleButton>
                <ToggleButton id="radio4" value={4}
                variant="outline-primary"
                style={{height : '60px', width : '400px'}}>
                  Venmo
                </ToggleButton>
                </ToggleButtonGroup>
                <br/>
                <br/>
            <Button variant= "danger" id = "clear2" type="reset"
            style={{position: 'absolute'}}>
              Clear
            </Button>
            </Col>
            <Col>
            <h4>Payment Information</h4>
            <text>Full Name</text>
            <Form.Control
              ref = "fullname"
              placeholder="Full Name"
              aria-label="fullname"
              aria-describedby="fullname"
              />
              <br/>
              <text>Email</text>
              <Form.Control
              ref = "email"
              placeholder="Email"
              aria-label="email"
              aria-describedby="email"
              />
              <br/>
              <text>Amount</text>
              <Form.Control
              ref = "amount"
              placeholder="$"
              aria-label="Amount"
              aria-describedby="Amount"
              />
             <br/>
            <Button variant = "danger" id = "clear3" type = "reset" onClick = {this.clearForm}
            style={{position: 'absolute'}}>
              Clear
            </Button>
              <br/>
              <br/>

              <Button variant="primary" type="submit" onClick={this.handleButtonClick}>
            		 	Make Payment
            	</Button>
            </Col>
            </Form.Row>
            </Form>
       </React.Fragment>
       );
  }
}
 
export default payment;

