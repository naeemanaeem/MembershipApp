import React, { useState } from "react";
import ReactDOM from "react-dom"

let style = {
  'label':'pay', 
  'tagline': false, 
  'size':'medium', 
  'shape':'pill', 
  'color':'black'
};

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PayPal() {
  const [price, setprice] = useState(1)

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
          value: price,
          },

        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };
  
  const fields = (data, actions) => {
    return actions.order.capture();
  };

  return (
        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => this.onApprove(data, actions)}
          style={style}
        />
  );
}

export default PayPal;
