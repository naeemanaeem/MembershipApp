const express = require("express");
// const stripe = require("stripe")(
//   "sk_test_51JR4m9CMdg35S26EYNlxdkT716hbWP7Gx3ontR8wGf4TExAQR8MMuIzrgUNV8WSRWoRGSCgz2FiwVUsFxyFbOOG200L33v5O8v"
// );
// require("dotenv").config({ path: "./config/secrets/config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const router = express.Router();

// Create a new payment
router.post("/", async (req, res) => {
  try {
    const { amount, description, email } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      description: description,
      receipt_email: email,
    });

    if (paymentIntent) {
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      return res.status(500);
    }
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});
module.exports = router;
