import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState, useEffect } from "react";
import PaymentForm from "./paymentFormActivities";

const StripeContainer = (props) => {
  const [stripeTestPromise, setStripeTestPromise] = useState();

  useEffect(() => {
    (async () => {
      const { publishableKey } = await fetch(
        "http://localhost:3000/activity/config"
      ).then((res) => res.json());
      const stripePromise = loadStripe(publishableKey);
      setStripeTestPromise(stripePromise);
    })();
  }, []);

  if (stripeTestPromise) {
    return (
      <Elements stripe={stripeTestPromise}>
        <PaymentForm {...props} />
      </Elements>
    );
  } else {
    return null;
  }
};
export default StripeContainer;
