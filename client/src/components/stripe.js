import React, { Component, useEffect, useState } from "react";
import { CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import styled from "styled-components";
import axios from "axios";

import {
    Button,
    Form,
    Col,
    Row,
    Card,
    ToggleButton,
    ToggleButtonGroup,
    ButtonGroup,
    Modal,
    Container,
    ButtonToolbar,
  } from "react-bootstrap";
  


const CardElementContainer = styled.div`
  height: 50px;
  display: flex-inline;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: lightblue;
  border-radius: 5px;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#fff",
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

function Stripe() {

    // const handleSubmitStripe = async (e) => {
    //     e.preventDefault();
    //     const { data: clientSecret } = await axios.post("/payment_intents", {
    //       ammount: 50000,
    //     });
    
    //     console.log(clientSecret);
    // }
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/payment", {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
            <div>
                <CardElementContainer>
                    <CardElement options={cardElementOptions} />
                </CardElementContainer>
                <Button onClick={handleSubmit}>Stripe</Button>
        </div>
    )
}export default Stripe