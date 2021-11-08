import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import Classes from "./paymentFormActivities.module.css";
import SuccessPage from "./SuccessPage";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
const PaymentForm = (props) => {
  // pass activityTitle and cost as props
  const [success, setSuccess] = useState(false);
  const [paymentInProcess, setPaymentInProcess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    /********  added new code ******/
    if (!stripe || !elements) {
      return;
    }
    /*******************************/
    setPaymentInProcess(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log("paymentMethod: ", paymentMethod);
        const response = await axios.post(
          "http://localhost:3000/activity/create-payment-intent",
          {
            amount: Number(props.cost) * 100,
            // id: id,
            paymentMethodId: id,
            description: "Registration for " + props.eventTitle,
          }
        );
        if (response.data.success) {
          setSuccess(true);
          props.handlePostOfPaymentStatus(
            response.data.paymentId,
            response.data.paymentMethodId
          );
        } else {
          window.alert(response.data.message);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <React.Fragment>
      {!success ? (
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
              disabled={paymentInProcess}
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
      ) : (
        <SuccessPage eventTitle={props.eventTitle} />
      )}
    </React.Fragment>
  );
  // }
};
export default PaymentForm;
