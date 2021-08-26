import React, {Component, useEffect, useState} from 'react';
import {Button, Form, Col, Row, Card, ToggleButton, ToggleButtonGroup, Modal} from 'react-bootstrap';
import Table from './table.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "./mailto.jsx"
// import "./Box.css"

class payment extends Component {
  
constructor()
{
  super()
  this.state ={
    show:false
  }
}

  clearForm = () => {
    const fields = ['amount'];
    fields.map(field => {
      this.value = '';
    });
  }

  handleModal() {
    this.setState({show:!this.state.show})
  }

   render() {
       return (
       <React.Fragment>
         <div>
         <Row>

             <Col>
             <div className = "ml-3 mt-5">
             <Card style = {{width: '27rem', height: '20rem'}}>
              <div className = "ml-3 mt-3">
            <h4>Type of Payment</h4>
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
                </Card>
                </div>
            </Col>
            <Col>
            <div className = "ml-3 mt-5">
            <Card style = {{width: '27rem', height: '20rem'}}>
            <div className = "ml-3 mt-3"
            style = {{}} >
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
                </Card>
                </div>
            </Col>
            <Col>
            <div className = "ml-3 mt-5">
            <Card style = {{width: '27rem', height: '20rem'}}>
              <div className = "ml-3 mt-3 mr-3">
            <h4>Payment Information</h4>
            
              {/* <import('node:dns').AnyRecordWithTtl> */}
              <Form>
                <Row>

                  <Col>
                  <div className = "mt-3">
              <text>First Name</text>
              <Form.Control
              ref = "firstname"
              placeholder="First Name"
              aria-label="firstname"
              aria-describedby="firstname"
              />
              </div>
              </Col>
              <Col>
              <div className = "mt-3">
              <text>Last Name</text>
              <Form.Control
              ref = "lastname"
              placeholder="Last Name"
              aria-label="lastname"
              aria-describedby="lastname"
              />
              </div>
              </Col>
              </Row>
              <div className = "ml-3 mr-3">
              <Row>
              <text className = "mt-3">Email</text>
              <Form.Control
              ref = "email"
              placeholder="Email"
              aria-label="email"
              aria-describedby="email"
              />
              </Row>
              <Row>
              <text className = "mt-3">Amount</text>
              <Form.Control
              ref = "amount"
              placeholder="$"
              aria-label="Amount"
              aria-describedby="Amount"
              />
              </Row>
              </div>
              </Form>
             <br/>
             <div>
             </div>
          
            </div>
            </Card>
            </div>
            
            {/* <Col>
            <Card className = "mt-3 ml-3 mr-3 grid" style = {{width: '29rem'}}>
            <div className = "mt-3 ml-3">
              <Card.Title>
                <h4>Payment History</h4>
              </Card.Title>
              </div>
              <Card.Body>
                View your transaction history by clicking the button below. 
                <div>
                  <br/>
             <Button onClick ={()=>{this.handleModal()}} className = "ml-3 mr-3"
             style = {{transform: 'translate(-80%,0%)'}}
            >Payment History</Button>
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
          </Card.Body>
            </Card>
            <br/>
            <Card className = "mb-3 ml-3 mr-3 grid" style = {{width: '29rem'}}>
              <Card.Title>
              <div className = "mt-3 ml-3">
                <h4>Questions or Concerns?</h4>
              </div>
              </Card.Title>
              <Card.Body>
              <a href="mailto:no-reply@example.com?body=My custom mail body">Contact Us</a>

              </Card.Body>
            </Card>
            </Col> */}
            <div align = "right" className = "mt-3">
             <Button variant="primary" type="submit" onClick={this.handleButtonClick}>
            		 	Make Payment
            	</Button>
              <Button variant = "danger" id = "clear3"  type = "refresh">
              Clear
            </Button>
            
            </div>
            </Col>
            </Row>
            </div>
       </React.Fragment>
       );
  }
}
 
export default payment;

