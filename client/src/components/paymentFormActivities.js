import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import Classes from "./paymentFormActivities.module.css";
import uuid from "react-uuid";
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "white",
      color: "#fff",

      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "grey" },
      "::placeholder": { color: "grey" },
    },
    invalid: {
      iconColor: "tomato",
      color: "tomato",
    },
  },
};
const PaymentForm = (props) => {
  // access activityTitle, cost and handlePostOfPaymentStatus as props

  const [paymentInProcess, setPaymentInProcess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const idempotencyKey = uuid();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Stripe.js has not yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) {
      return;
    }
    // disable the payment processing button to prevent subsequest requests.
    setPaymentInProcess(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      // grap the card number cvv and zip from the form
      card: elements.getElement(CardElement),
    });
    if (paymentMethod) {
      try {
        const { id } = paymentMethod;

        const response = await axios.post(
          "http://localhost:3000/activity/create-payment-intent",
          {
            amount: Number(props.cost) * 100,
            paymentMethodId: id,
            description: "Registration for " + props.eventTitle,
          }
        );
        if (response.data.success) {
          props.handlePostOfPaymentStatus(
            response.data.paymentId,
            response.data.paymentMethodId
          );
        } else {
          window.alert(response.data.message);
          setPaymentInProcess(false);
        }
      } catch (error) {
        console.log("Error: ", error.message);
        window.alert(error.message);
        setPaymentInProcess(false);
      }
    } else {
      console.log("Error: ", error.message);
      window.alert(error.message);
      setPaymentInProcess(false);
    }
  };

  return (
    <React.Fragment>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className={Classes.formContainer}
      >
        <h1 className={Classes.heading}>Enter Card Details</h1>
        <fieldset className={Classes.FormGroup}>
          <div className={Classes.FormRow}>
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <div className={Classes.btnContainer}>
          <button
            id="payment-request-button"
            className={Classes.button + " " + Classes.payBtn}
            disabled={paymentInProcess || !stripe}
          >
            Pay
          </button>
          <button
            disabled
            className={Classes.button}
            id="payment-cancel-button"
          >
            <a href="activities" className={Classes.link}>
              Cancel
            </a>
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};
export default PaymentForm;
