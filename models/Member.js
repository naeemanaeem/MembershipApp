const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
    trim: true,
  },
  Lastname: {
    type: String,
    trim: true,
  },
  Gender: {
    type: String,
    required: false,
    trim: true,
  },
  HouseNo: {
    type: String,
    required: true,
    trim: true,
  },
  Street: {
    type: String,
    required: true,
    trim: true,
  },
  Town: {
    type: String,
    required: false,
    trim: true,
  },
  City: {
    type: String,
    required: false,
    trim: true,
  },
  State: {
    type: String,
    required: false,
    trim: true,
  },
  Postcode: {
    type: String,
    required: false,
    trim: true,
  },
  Phone: {
    type: String,
    required: false,
    trim: true,
  },
  Email: {
    type: String,
    required: false,
    trim: true,
  },
  Spouse: {
    type: String,
    required: false,
    trim: true,
  },
  Voter: {
    type: String,
    required: false,
    trim: true,
  },
  Dependents: {
    type: Array,
    required: false,
    trim: true,
  },
  Guardians: {
    type: Array,
    required: false,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Member", MemberSchema);
