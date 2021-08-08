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

import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

 
class payment extends Component {
 
   render() {
       return (
       <React.Fragment>
         <br/>
         <Form>
           <Form.Row>
             <Col>
             <text>Payment</text>
            <Form.Control as="select">
              <option> </option>
              <option>Subscription Fee</option>
              <option>Donation</option> 
              <option>Sadaqa</option>
              <option>Zakat</option>
            </Form.Control>
            </Col>
            <Col>
            <text>Payment Method</text>
            <Form.Control as="select">
              <option> </option>
              <option>PayPal</option>
              <option>Bank Deposit</option> 
              <option>Zelle</option>
              <option>Venmo</option>
            </Form.Control>
            </Col>
            <Col>
            <text>Payment Information</text>
            <Form.Control
              placeholder="Full Name"
              aria-label="fullname"
              aria-describedby="fullname"
              />
              <text>Email</text>
              <Form.Control
              placeholder="Email"
              aria-label="email"
              aria-describedby="email"
              />
              <text>Amount</text>
              <Form.Control
              placeholder="$"
              aria-label="Amount"
              aria-describedby="Amount"
              />
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

