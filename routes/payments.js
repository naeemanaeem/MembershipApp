const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Payment = require("../models/Payment");

const ObjectID = mongodb.ObjectID;

// Get all payments
router.get("/", ensureAuth, async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate("user")
      .sort("Firstname")
      .lean();

    return res.send(payments);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

// Get a single payment
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let payment = await Payment.findById(req.params.id).populate("user").lean();

    if (!payment) {
      return res.status(404).send("Not found.");
    }

    return res.send(payment);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

// Create a new payment
router.post("/", ensureAuth, async (req, res) => {
  console.log("m: ", req.body);
  try {
    const m = req.body; // payment
    if (
      (!m.Firstname && m.Firstname.length < 1) ||
      (!m.Lastname && m.Lastname.length < 1) ||
      (!m.Email && m.Email.length < 1) ||
      (!m.PaymentReason && m.PaymentReason.length < 1) ||
      (!m.Type && m.Type.length < 1) ||
      (!m.Amount && m.Amount.length < 1) ||
      (!m.Status && m.Status.length < 1) ||
      (!m.PaymentMethod && m.PaymentMethod.length < 1)
    ) {
      return res.status(400).send("Member not valid");
    }
    //req.body.req.user.id;
    const payment = await Payment.create(m);
    console.log(m);
    if (payment) {
      return res.status(200).send(payment);
    } else {
      return res.status(500);
    }
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

// Update an existing payment
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    const p = req.body;

    const payment = await Payment.findOneAndUpdate({ _id: req.params.id }, p, {
      new: true,
      runValidators: true,
    })
      .populate("user")
      .lean();

    if (!payment) {
      res.status(404).send("Member not found");
    }

    return res.send(payment);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

// Delete a Payment
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id)
      .populate("user")
      .lean();

    if (!payment) {
      return res.status(404).send("Member not found");
    }

    return res.send(payment);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

// Payment stats
router.get("/stats", ensureAuth, async (req, res) => {
  try {
    const payments = await Payment.find({}).populate("user").lean();

    const stats = {
      numberOfPayments: payments.length,
      numberOfFirstname: 2,
      mostPopularPaymentMethod: "dfdsfd",
      newestPayments: "",
      newestPaymentAddTime: Date.now,
      lastTimeListChanged: Date.now,
    };

    res.status(200).send(stats);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

module.exports = router;
