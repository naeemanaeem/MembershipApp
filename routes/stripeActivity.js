const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
require("dotenv").config({ path: "./config/config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
router.post("/create-customer", ensureAuth, async (req, res) => {
  let { email, payment_method } = req.body;
  try {
    const response = await stripe.customers.create({
      email: email,
      payment_method: payment_method,
    });
    if (response) {
      res.json({
        message: "Customer created!",
        success: true,
        customerId: response.id,
      });
    } else {
      res.json({
        message: "Attempt to create a customer failed, please try again!",
        success: false,
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({
      message:
        "Attempt to create a customer failed, please try again!\n" +
        error.message,
      success: false,
    });
  }
});

router.post("/create-payment", ensureAuth, async (req, res) => {
  let {
    amount,
    paymentMethodId,
    description,
    email,
    customer,
    idempotencyKey,
  } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: amount,
        currency: "usd",
        description: description,
        payment_method: paymentMethodId,
        receipt_email: email,
        customer: customer,
        confirm: true,
      },
      { idempotencyKey: idempotencyKey }
    );

    if (paymentIntent) {
      res.json({
        message: "Payment successful",
        success: true,
        paymentId: paymentIntent.id,
        paymentMethodId: paymentIntent.payment_method,
      });
    } else {
      res.json({
        message: "Payment failed, please try again!",
        success: false,
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed, please try again!\n" + error.message,
      success: false,
    });
  }
});
router.get("/config", async (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLEKEY_TEST });
});
module.exports = router;
