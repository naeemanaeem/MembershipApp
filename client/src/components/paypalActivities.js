import React, { useRef, useEffect } from "react";

const PayPal = (props) => {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        style: {
          color: "white",
          shape: "rect",
          label: "paypal",
          height: 45,
        },
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: `Registration for ${props.eventTitle}.`,
                amount: {
                  currency_code: "USD",
                  value: Number(props.eventCost),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          props.handlePostOfPaymentStatus(
            order.purchase_units[0].payments.captures[0].id, // payment id used for refund
            "n/a"
          );
          props.setSuccessPageShow(true);
        },
        onError: (err) => {
          window.alert(err.message);
          console.log("Error: ", err);
        },
      })
      .render(paypal.current);
  });

  return <div ref={paypal}> </div>;
};
export default PayPal;
