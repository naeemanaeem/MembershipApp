import React, { Component, useEffect, useState } from "react";
import {
  Button,
  Form,
  Col,
  Row,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  ButtonGroup,
  Modal,
  Container,
  ButtonToolbar,
} from "react-bootstrap";
import Table from "./table.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./mailto.jsx";
// import "./Box.css"

const buttonlist1 = ["Membership Fee", "Donation", "Sadaqah", "Zakat"];
const buttonlist2 = ["PayPal", "Bank Deposit", "Zelle", "Venmo"];

class payment extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  static lineHeight = 8;
  static leftMargin = 20;

  clearForm = () => {
    alert("clearing form");
  };
  handleModal() {
    this.setState({ show: !this.state.show });
  }
  render() {
    return (
      <React.Fragment>
        <Card className="mt-3 ml-3 grid" style={{ width: "80rem" }}>
          <div className="mt-3 ml-3">
            <Card.Title>
              <h2>Payment</h2>
            </Card.Title>
          </div>
          <Card.Body>
            Please fill out the form below to proceed with your payment.
          </Card.Body>
        </Card>
        <Card
          className="mt-3 ml-3 grid"
          style={{ width: "80rem", height: "35rem" }}
        >
          <Form>
            <Container>
              <Row>
                <Col>
                  <div className="ml-3 mt-3" class="container">
                    <h4>Type of Payment</h4>
                    <ButtonGroup type="radio" name="options1" vertical>
                      {buttonlist1.map((buttonLabel, i) => (
                        <p>
                          <Button
                            type="checkbox"
                            variant="outline-primary"
                            id={"radio" + i}
                            style={{ height: "60px", width: "400px" }}
                          >
                            {buttonLabel}
                          </Button>
                        </p>
                      ))}
                    </ButtonGroup>
                  </div>
                </Col>
                <Col>
                  <div className="mt-3" class="container">
                    <h4>Payment Method</h4>
                    <ToggleButtonGroup type="radio" name="options2" vertical>
                      {buttonlist2.map((buttonLabel, i) => (
                        //<p>
                        <ToggleButton
                          id={"radio" + i}
                          variant="outline-primary"
                          style={{ height: "60px", width: "400px" }}
                        >
                          {buttonLabel}
                        </ToggleButton>
                        //</p>
                      ))}
                    </ToggleButtonGroup>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="mt-3 ml-3 mr-3">
                    <h4>Payment Information</h4>
                    <Row>
                      <Col>
                        <text>First Name</text>
                        <Form.Control
                          ref="firstname"
                          placeholder="First Name"
                          aria-label="firstname"
                          aria-describedby="firstname"
                          style={{ width: "400px" }}
                        />
                      </Col>
                      <Col>
                        <text>Last Name</text>
                        <Form.Control
                          ref="lastname"
                          placeholder="Last Name"
                          aria-label="lastname"
                          aria-describedby="lastname"
                          style={{ width: "400px" }}
                        />
                      </Col>
                    </Row>
                  </div>
                  <br />
                  <div className="ml-3 mr-4">
                    <Row>
                      <Col>
                        <text>Email</text>
                        <Form.Control
                          ref="email"
                          placeholder="Email"
                          aria-label="email"
                          aria-describedby="email"
                        />
                      </Col>
                      <Col>
                        <text>Amount</text>
                        <Form.Control
                          ref="amount"
                          placeholder="$"
                          aria-label="Amount"
                          aria-describedby="Amount"
                        />
                      </Col>
                    </Row>
                  </div>
                  <br />
                  <div>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={this.handleButtonClick}
                    >
                      Make Payment
                    </Button>
                  </div>
                  <Button
                    variant="danger"
                    id="clear3"
                    type="reset"
                    onClick={() => alert("clearing form")}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

export default payment;
