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
//import Table from "./table.jsx";
import PayPal from "./paypal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import styled from "styled-components";
import Stripe from "./stripe";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY =
  "pk_test_51JR4m9CMdg35S26EAT3K6nPEVlxPHubEwzlQ4c2VetzslZmjts2FNQKWxkwZAiQdIgA1kWbCbvmQBGWBrbRONn7a00BSJqSyYd";
const stripePromise = loadStripe(PUBLIC_KEY);

const buttonlist1 = ["Membership Fee", "Donation", "Sadaqah", "Zakat"];
const buttonlist2 = ["PayPal", "Bank Deposit", "Zelle", "Venmo"];

function Payment({ addTextLog }) {
  const [profile, setProfile] = useState({
    Description: "",
    PaymentMethod: "",
    Firstname: "",
    Lastname: "",
    Email: "",
    Amount: "",
    Status: "Processing",
    Type: "Outgoing",
  });

  const [payments, setPayments] = useState([]);
  useEffect(() => {
    const getAllPayments = async () => {
      try {
        const res = await axios.get("/payments");
        setPayments(res.data);
        console.log("refreshed");
      } catch (e) {
        console.log(e);
      }
    };
    getAllPayments();
  }, []);

  const saveNewPayment = async (p) => {
    const res = await axios.post("/payments", p);
    const newpayments = [...payments, res.data];
    setPayments(newpayments);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    saveNewPayment(profile);
  };

  return (
    <React.Fragment>
      <div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs="auto">
              <div className="ml-3 mt-5">
                <Card style={{ width: "100%", height: "100%" }}>
                  <div className="ml-3 mt-3 mr-3">
                    <h4 className="mb-3">Type of Payment</h4>
                    <ToggleButtonGroup type="radio" name="Description" vertical>
                      {buttonlist1.map((buttonLabel, i) => (
                        <ToggleButton
                          id={"radio" + i}
                          value={buttonLabel}
                          variant="outline-primary"
                          style={{ height: "60px", width: "400px" }}
                          className="mb-5"
                          onChange={handleChange}
                        >
                          {buttonLabel}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </div>
                </Card>
              </div>
            </Col>
            <Col xs="auto">
              <div className="ml-3 mt-5">
                <Card style={{ width: "100%", height: "100%" }}>
                  <div className="ml-3 mt-3 mr-3" style={{}}>
                    <h4 className="mb-3">Payment Method</h4>
                    <ToggleButtonGroup
                      type="radio"
                      name="PaymentMethod"
                      vertical
                    >
                      {buttonlist2.map((buttonLabel, i) => (
                        <ToggleButton
                          id={"radio" + i}
                          value={buttonLabel}
                          variant="outline-primary"
                          style={{ height: "60px", width: "400px" }}
                          className="mb-5"
                          onChange={handleChange}
                        >
                          {buttonLabel}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </div>
                </Card>
              </div>
            </Col>
            <Col xs="3">
              <div className="ml-3 mt-5">
                <Card style={{ width: "27rem", height: "20rem" }}>
                  <div className="ml-3 mt-3 mr-3">
                    <h4>Payment Information</h4>
                    <Form>
                      <Row>
                        <Col>
                          <div className="mt-3">
                            <text>First Name</text>
                            <Form.Control
                              placeholder="First Name"
                              value={profile.Firstname}
                              name="Firstname"
                              aria-label="firstname"
                              aria-describedby="firstname"
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col>
                          <div className="mt-3">
                            <text>Last Name</text>
                            <Form.Control
                              placeholder="Last Name"
                              value={profile.Lastname}
                              name="Lastname"
                              aria-label="lastname"
                              type="text"
                              aria-describedby="lastname"
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                      </Row>
                      <div className="ml-3 mr-3">
                        <Row>
                          <text className="mt-3">Email</text>
                          <Form.Control
                            placeholder="Email"
                            value={profile.Email}
                            name="Email"
                            type="text"
                            aria-label="email"
                            aria-describedby="email"
                            onChange={handleChange}
                          />
                        </Row>
                        <Row>
                          <text className="mt-3">Amount</text>
                          <Form.Control
                            placeholder="$"
                            value={profile.Amount}
                            name="Amount"
                            aria-label="Amount"
                            aria-describedby="Amount"
                            onChange={handleChange}
                            type="decimal"
                          />
                        </Row>
                      </div>
                    </Form>
                    <br />
                    <div></div>
                  </div>
                </Card>
              </div>
              <div className="mt-3">
                <PayPal />
                <Elements stripe={stripePromise}>
                  <Stripe />
                </Elements>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => alert(JSON.stringify(profile, "", 2))}
                >
                  Make Payment
                </Button>
                <Button variant="danger" id="clear3" type="refresh">
                  Clear
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default Payment;
