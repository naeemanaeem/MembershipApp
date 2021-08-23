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
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
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
         <Form>
           <div style = {{position: 'initial', left: '5%'}}>
           <Card className = "ml-3 mt-3">
             Hello there
           </Card>
           </div>
             <Row>
             <Col>
              <div style={{
                position: 'absolute', left: '10%', top: '5%'
           }}>
            <h4>Payment</h4>
            <ToggleButtonGroup value = {this.state.value} type="radio" name="options" vertical>
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
            </Col>

            <Col>
            <div style={{
                position: 'absolute', top: '5%', left: '-31.5%'
           }}>
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
                </div>
            {/* <Button variant= "danger" id = "clear2" type="reset"
            style={{position: 'absolute'}}>
              Clear
            </Button> */}
            </Col>
            </Row>
            <Row>
            <div style={{position: 'absolute', top: '45%', left: '4%'
           }}>
            <h4>Payment Information</h4>
            <Row>
              <Col>
              <text>First Name</text>
              <Form.Control
              ref = "firstname"
              placeholder="First Name"
              aria-label="firstname"
              aria-describedby="firstname"
              style={{width : '400px'}}
              />
              </Col>
              <Col>
              <text>Last Name</text>
              <Form.Control
              ref = "lastname"
              placeholder="Last Name"
              aria-label="lastname"
              aria-describedby="lastname"
              style={{width : '400px'}}
              />
              </Col>
              </Row>
              <br/>
              <Row>
                <Col>
              <text>Email</text>
              <Form.Control
              ref = "email"
              placeholder="Email"
              aria-label="email"
              aria-describedby="email"
              />
              </Col>
              <Col>
              <text>Amount</text>
              <Form.Control
              ref = "amount"
              placeholder="$"
              aria-label="Amount"
              aria-describedby="Amount"
              />
              </Col>
              </Row>
             <br/>
            <Button variant = "danger" id = "clear3" type = "reset" onClick = {this.clearForm}
            style={{position: 'absolute'}}>
              Clear
            </Button>
              <br/>
              <br/>
              <div style = {{position: 'absolute', right: '-3.5%'}}>
              <Button variant="primary" type="submit" onClick={this.handleButtonClick}>
            		 	Make Payment
            	</Button>
              </div>
              </div>
              </Row>
            </Form>
       </React.Fragment>
       );
  }
}
 
export default payment;

