import React, { useEffect, useState } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  Col,
  Row,
  Card,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import PayPal from "./paypal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./paymentStyling.css";
import PropTypes from "prop-types";
import Stripe from "./stripe";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SuccessPage from "./SuccessPage";

import { Container } from "react-bootstrap";
const buttonlist1 = ["Membership Fee", "Donation", "Sadaqah", "Zakat"];
function Payment({ addTextLog }) {
  const [profile, setProfile] = useState({
    PaymentReason: null,
    PaymentMethod: null,
    Firstname: null,
    Lastname: null,
    Email: null,
    Amount: null,
    Status: "Processing",
    Type: "Outgoing",
    Comments: "",
  });
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState(false);
  const [paypal, setPayPal] = useState(false);
  const [payments, setPayments] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [stripeTestPromise, setStripeTestPromise] = useState(null);
  const errors = {
    PaymentReason: "",
    PaymentMethod: "",
    Firstname: "",
    Lastname: "",
    Email: "",
    Amount: "",
  };
  const [formErrors, setErrors] = useState(errors);
  const validEmail = (val) =>
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(val);
  const findFormErrors = () => {
    const { PaymentReason, PaymentMethod, Firstname, Lastname, Email, Amount } =
      profile;
    const newErrors = {};

    if (!PaymentReason || PaymentReason === "")
      newErrors.PaymentReason = "Please select payment reason!";

    if (!PaymentMethod || PaymentMethod === "")
      newErrors.PaymentMethod = "Please choose method of payment!";

    if (!Firstname || Firstname === "")
      newErrors.Firstname = "Firstname is required!";

    if (!Lastname || Lastname === "")
      newErrors.Lastname = "Lastname is required!";
    if (!Email || Email === "") newErrors.Email = "Email cannot be blank!";
    else if (validEmail(Email) === false)
      newErrors.Email = "Invalid Email address!";

    if (!Amount || Amount === "")
      newErrors.Amount = "Please enter amount to pay!";
    else if (isNaN(Number(Amount)))
      newErrors.Amount = "Payment amount must be in numbers!";

    return newErrors;
  };
  const handleClearProfile = () => {
    setProfile({
      PaymentReason: null,
      PaymentMethod: null,
      Firstname: null,
      Lastname: null,
      Email: null,
      Amount: null,
      Status: "Processing",
      Type: "Outgoing",
      Comments: "",
    });
  };
  useEffect(() => {
    (async () => {
      const { publishableKey } = await fetch(
        "http://localhost:3000/activity/config"
      ).then((res) => res.json());
      const stripePromise = loadStripe(publishableKey);
      setStripeTestPromise(stripePromise);
    })();
    const getAllPayments = async () => {
      try {
        const res = await axios.get("/payments");
        setPayments(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllPayments();
  }, []);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };
  const saveNewPayment = async (p) => {
    p.Status = "Success";

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
  if (paymentSuccess) {
    return (
      <Container fluid>
        <SuccessPage
          message="Your Payment has been processed Successfully"
          route="Payment"
        />
      </Container>
    );
  } else {
    return (
      <Container className="pr-5 pl-5">
        <div className="bg-image">
          <center>
            <h1 className="ml-5 mt-5">Payment</h1>
          </center>
          <Form>
            <div className="ml-3 mt-3 mb-5 ">
              <Card>
                <h5 className="ml-3 mt-4">Reason for Payment</h5>
                <Row>
                  <Col>
                    <ToggleButtonGroup
                      className="d-flex ml-5 mr-5"
                      type="radio"
                      name="PaymentReason"
                      // style={{ height: "100%", width: "100%" }}
                      // className="ml-5 mr-5"
                    >
                      {buttonlist1.map((buttonLabel, i) => (
                        <ToggleButton
                          id={"radio" + i}
                          value={buttonLabel}
                          variant="outline-primary"
                          className="mb-3"
                          onChange={handleChange}
                        >
                          {buttonLabel}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Col>
                </Row>
                <h5 className="ml-3 mt-5">Payment Method</h5>
                <Row>
                  <Col>
                    <ToggleButtonGroup
                      type="radio"
                      name="PaymentMethod"
                      // style={{ height: "100%", width: "100%" }}
                      // className="ml-5 mr-5"
                      className="d-flex ml-5 mr-5"
                    >
                      <ToggleButton
                        id="radio1"
                        value="PayPal"
                        variant="outline-primary"
                        onClick={() =>
                          setPayPal(true) & setSelectedMethod(true)
                        }
                        onChange={handleChange}
                      >
                        PayPal
                      </ToggleButton>
                      <ToggleButton
                        id="radio2"
                        value="Stripe"
                        variant="outline-primary"
                        onClick={() =>
                          setPayPal(false) & setSelectedMethod(true)
                        }
                        onChange={handleChange}
                      >
                        Card (Stripe)
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Col>

                </Row>
                <h5 className="ml-3 mt-5">User Information</h5>
                <Row className="ml-1 mr-1">
                  <Col>
                    <div className="ml-4 mr-1">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        placeholder="First Name"
                        value={profile.Firstname}
                        name="Firstname"
                        aria-label="firstname"
                        aria-describedby="firstname"
                        onChange={(e) => {
                          handleChange(e);
                          if (!!formErrors.Firstname)
                            setErrors({
                              ...formErrors,
                              Firstname: null,
                            });
                        }}
                        isInvalid={!!formErrors.Firstname}
                      />

                      <Form.Control.Feedback type="invalid">
                        {formErrors.Firstname}
                      </Form.Control.Feedback>
                    </div>
                  </Col>
                  <Col>
                    <div className="mr-4 ml-1">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        placeholder="Last Name"
                        value={profile.Lastname}
                        name="Lastname"
                        aria-label="lastname"
                        type="text"
                        aria-describedby="lastname"
                        onChange={(e) => {
                          handleChange(e);
                          if (!!formErrors.Lastname)
                            setErrors({
                              ...formErrors,
                              Lastname: null,
                            });
                        }}
                        isInvalid={!!formErrors.Lastname}
                      />

                      <Form.Control.Feedback type="invalid">
                        {formErrors.Lastname}
                      </Form.Control.Feedback>
                    </div>
                  </Col>
                </Row>
                <Row className="ml-2 mr-2">
                  <Col className="mt-3 ml-3 mr-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      placeholder="Email"
                      value={profile.Email}
                      name="Email"
                      type="text"
                      aria-label="email"
                      aria-describedby="email"
                      onChange={(e) => {
                        handleChange(e);
                        if (!!formErrors.Email)
                          setErrors({
                            ...formErrors,
                            Email: null,
                          });
                      }}
                      isInvalid={!!formErrors.Email}
                    />

                    <Form.Control.Feedback type="invalid">
                      {formErrors.Email}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="ml-2 mr-2">
                  <Col className="mt-3 ml-3 mr-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      placeholder="$"
                      value={profile.Amount}
                      name="Amount"
                      aria-label="Amount"
                      aria-describedby="Amount"
                      type="decimal"
                      onChange={(e) => {
                        handleChange(e);
                        if (!!formErrors.Amount)
                          setErrors({
                            ...formErrors,
                            Amount: null,
                          });
                      }}
                      isInvalid={!!formErrors.Amount}
                    />

                    <Form.Control.Feedback type="invalid">
                      {formErrors.Amount}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="ml-2 mr-2">
                  <Col className="mt-3 ml-3 mr-3 mb-3">
                    <Form.Label className="mt-3">Comments</Form.Label>
                    <InputGroup>
                      <FormControl
                        as="textarea"
                        name="Comments"
                        aria-label="With textarea"
                        required={true}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="ml-2">
                  <Col className="mt-3 ml-3 mr-2 mb-3">
                    <Button
                      variant="danger"
                      size="lg"

                      id="clear3"
                      type="reset"
                      value="Reset"
                      onClick={handleClearProfile}
                    >
                      Clear
                    </Button>
                  </Col>
                </Row>
                <Row className="center mb-3">
                  <div className="mt-3">
                    {proceedToPayment && selectedMethod ? (
                      paypal ? (
                        <PayPal
                          handlePaymentSuccess={handlePaymentSuccess}
                          handleSubmit={handleSubmit}
                          profile={profile}
                        />
                      ) : (
                        <Elements
                          stripe={stripeTestPromise ? stripeTestPromise : null}
                        >
                          <Stripe
                            profile={profile}
                            handleSubmitData={handleSubmit}
                            handlePaymentSuccess={handlePaymentSuccess}
                          />
                        </Elements>
                      )
                    ) : (
                      () => setSelectedMethod(false)
                    )}
                  </div>
                </Row>

                <Row className="center mb-3">
                  {profile.PaymentMethod &&
                  profile.PaymentReason &&
                  showButton ? (
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      onClick={(e) => {
                        e.preventDefault();
                        const newErrors = findFormErrors();
                        if (Object.keys(newErrors).length > 0) {
                          setErrors(newErrors);
                          alert("Please correct erros in your form entries!");
                        } else {
                          setProceedToPayment(true);
                          setShowButton(false);
                        }
                      }}
                    >
                      Proceed To Payment
                    </Button>
                  ) : (
                    () => setPayPal(false)
                  )}
                </Row>
              </Card>
            </div>
          </Form>
        </div>
      </Container>
    );
  }
}

export default Payment;
