import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import Classes from "./paymentFormActivities.module.css";
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
  // access activityTitle, cost and handlePostOfPaymentStatus as props

  const [paymentInProcess, setPaymentInProcess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const uuidCustomer = UUID();
  const uuidPayment = UUID();
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
          // email: localStorage.user_email,
          email: "taniafali@yahoo.com",
          payment_method: paymentMethod.paymentMethod.id,
          idempotencyKey: uuidCustomer,
        }
      );
      console.log("customer: ", customer);
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
              // email: localStorage.user_email,
              email: "taniafali@yahoo.com",
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
            // window.alert(response.data.message);
            // setPaymentInProcess(false);
            throw Error(response.data.message);
          }
        } catch (error) {
          console.log("Error: ", error.message);
          window.alert(error.message);
          // setPaymentInProcess(false);
        }
        // } else {
        //   console.log("Error: ", error.message);
        //   window.alert(error.message);
        //   setPaymentInProcess(false);
      }
    } catch (error) {
      window.alert(error.message);
      // setPaymentInProcess(false);
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
