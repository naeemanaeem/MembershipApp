import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import styled from "styled-components";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./paymentStyling.css";

const CardElementContainer = styled.div`
  height: 50px;
  display: flex;
  margin-left:0px;
  align-items: left;
  justify-content left:
  margin-top: 20px;
  margin-bottom: 15px;
  background-color: #E8F0FE;
  border-radius: 5px;
  width: 400px;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "black",
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      color: "#FFC7EE",
      iconColor: "#FFC7EE",
    },
  },
  hidePostalCode: true,
};

function Stripe(props) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setDisabled(true);

    const cardElement = elements.getElement(CardElement);

    const { data: cS } = await axios.post("/stripe", {
      amount: props.profile.Amount * 100,
      currency: "usd",
      description: props.profile.PaymentReason,
      email: props.profile.Email,
    });

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    const payload = await stripe.confirmCardPayment(cS.clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });

    if (payload.error) {
      setError(`payment failed ${payload.error.message}`);
      setDisabled(false);
    } else {
      setError(null);
      setDisabled(true);
      setSuccess(true);
      props.handlePaymentSuccess();
      props.handleSubmitData();
    }
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <form id="payment-form">
      <CardElementContainer>
        <CardElement
          id="card-element"
          options={cardElementOptions}
          onChange={handleChange}
        />
      </CardElementContainer>
      <div className="stripepaybuttonContainer">
        <Button
          className="stripepaybutton"
          disabled={disabled || success}
          type="submit"
          id="submit"
          onClick={handleSubmit}
        >
          Pay Now
        </Button>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </div>
    </form>
  );
}
export default Stripe;
