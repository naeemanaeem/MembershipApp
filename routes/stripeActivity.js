const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
require("dotenv").config({ path: "./config/config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

router.post("/create-payment-intent", ensureAuth, async (req, res) => {
  let { amount, paymentMethodId, description } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: description,
      payment_method: paymentMethodId,
      confirm: true,
    });

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
