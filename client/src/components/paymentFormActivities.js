import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import classes from "./paymentFormActivities.module.css";
import UUID from "react-uuid";

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
  console.log(localStorage);
  // access activityTitle, cost and handlePostOfPaymentStatus as props
  const stripe = useStripe();
  const elements = useElements();
  const uuidPayment = UUID();
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Stripe.js has not yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) {
      return;
    }
    // disable the payment processing button to prevent subsequest requests.
    // setPaymentInProcess(true);

    try {
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        // grap the card number cvv and zip from the form
        card: elements.getElement(CardElement),
      });
      if (paymentMethod.error) {
        throw Error(paymentMethod.error.message);
      }
      const customer = await axios.post(
        "http://localhost:3000/activity/create-customer",
        {
          email: email,
          payment_method: paymentMethod.paymentMethod.id,
        }
      );
      if (!customer.data.success) {
        throw Error(customer.data.message);
      }

      if (paymentMethod.paymentMethod.id && customer.data.customerId) {
        try {
          const { id } = paymentMethod.paymentMethod;

          const response = await axios.post(
            "http://localhost:3000/activity/create-payment",
            {
              amount: Number(props.cost) * 100,
              paymentMethodId: id,
              description: "Registration for " + props.eventTitle,
              email: email,
              customer: customer.data.customerId,
              idempotencyKey: uuidPayment,
            }
          );
          if (response.data.success) {
            props.handlePostOfPaymentStatus(
              response.data.paymentId,
              response.data.paymentMethodId
            );
          } else {
            throw Error(response.data.message);
          }
        } catch (error) {
          console.log("Error: ", error.message);
          window.alert(error.message);
        }
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <React.Fragment>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className={classes.formContainer}
      >
        <h1 className={classes.heading}>Enter Payment Details</h1>
        <fieldset>
          <div className={classes.emailContainer}>
            <input
              type="email"
              className={classes.email}
              placeHolder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset className={classes.FormGroup}>
          <div className={classes.FormRow}>
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <div className={classes.btnContainer}>
          <button
            id="payment-request-button"
            className={classes.button + " " + classes.payBtn}
            disabled={!stripe}
          >
            Pay
          </button>
          <button
            disabled
            className={classes.button}
            id="payment-cancel-button"
          >
            <a href="activities" className={classes.link}>
              Cancel
            </a>
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};
export default PaymentForm;
