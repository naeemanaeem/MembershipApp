const mongoose = require('mongoose');

const NewPaymentSchema = new mongoose.Schema({
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
    paymentreason: {
        type: String,
        trim: true
    },
    paymentmethod: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    comments: {
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
    createat: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('NewPayment', NewPaymentSchema);
