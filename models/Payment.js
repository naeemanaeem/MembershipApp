const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    GoogleId: {
        type: String,
        required: false,
        trim: true
    },
    Firstname: {
        type: String,
        required: false,
        trim: true
    },
    Lastname: {
        type: String,
        required: false,
        trim: true
    },
    Description: {
        type: String,
        trim: true
    },
    Type: {
        type: String,
        required: false,
        trim: true
    },
    PaymentMethod: {
        type: String,
        required: false,
        trim: true
    },
    Amount: {
        type: String,
        required: false,
        trim: true
    },
    Status: {
        type: String,
        required: false,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);
