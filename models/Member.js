const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true,
        trim: true
    },
    Lastname: {
        type: String,
        trim: true
    },
    HouseNo: {
        type: String,
        required: true,
        trim: true
    },
    Street: {
        type: String,
        required: true,
        trim: true
    },
    City: {
        type: String,
        required: false,
        trim: true
    },
    Village: {
        type: String,
        required: false,
        trim: true
    },
    State:{
        type: String,
        required: false,
        trim: true
    },
    Country:{
        type: String,
        required: false,
        trim: true
    },
    Gender:{
        type: String,
        required: false,
        trim: true
    },
    Spouse:{
        type: String,
        required: false,
        trim: true
    },
    Postcode: {
        type: String,
        required: false,
        trim: true
    },
    CardNumber: {
        type: String,
        required: false,
        trim: true
    },
    CVV: {
        type: String,
        required: false,
        trim: true
    },
    NameOnCard: {
        type: String,
        required: false,
        trim: true
    },
    CardExp: {
        type: String,
        required: false,
        trim: true
    },
    Voter: {
        type: String,
        required: false,
        trim: true
    },
    PhoneNum: {
        type: String,
        required: true,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Member', MemberSchema);