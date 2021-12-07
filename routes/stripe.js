const express = require('express');
const stripe = require("stripe")("sk_test_51JR4m9CMdg35S26EYNlxdkT716hbWP7Gx3ontR8wGf4TExAQR8MMuIzrgUNV8WSRWoRGSCgz2FiwVUsFxyFbOOG200L33v5O8v")
const router = express.Router();


// Create a new payment
router.post('/', async (req, res) => {
    try {
        const { amount, description } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            description: description,
        });

        if (paymentIntent) {
            res.send({
                clientSecret: paymentIntent.client_secret
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