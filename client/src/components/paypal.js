import React, { useState } from "react";
import ReactDOM from "react-dom"
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
  ButtonGroup,
  label,
  Modal,
  Container,
  ButtonToolbar,
} from "react-bootstrap";

let style = {
  label: 'paypal',
  tagline: false,
  shape: 'rect',
  color: 'blue',
  height: 45,
};

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PayPal(props) {
  const [price, setprice] = useState(100)

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: props.profile.PaymentReason,
          amount: {
            value: props.profile.Amount,
          },

        },
      ],
    });
  };


  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    alert("Thank you for your payment");
    //props.handleSubmit();
  };

  const fields = (data, actions) => {
    return actions.order.capture();
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      style={style}
    />
  );
}

export default PayPal;
