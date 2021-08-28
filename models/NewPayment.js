const mongoose = require('mongoose');

const NewPaymentSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    paymentId: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    paymentmethod: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('NewPayment', NewPaymentSchema);
