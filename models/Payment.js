const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
    trim: true,
  },
  Lastname: {
    type: String,
    required: true,
    trim: true,
  },
  PaymentReason: {
    type: String,
    trim: true,
  },
  PaymentMethod: {
    type: String,
    required: true,
    trim: true,
  },
  Type: {
    type: String,
    required: true,
    trim: true,
  },
  Comments: {
    type: String,
    // required: true,
    trim: true,
  },
  Amount: {
    type: String,
    required: true,
    trim: true,
  },
  Status: {
    type: String,
    required: true,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
