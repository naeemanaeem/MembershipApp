const mongoose = require('mongoose');

const NewMemberSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    houseno: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    town: {
        type: String,
        required: false,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    postcode: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: false,
        trim: true
    },
    spouse: {
        type: String,
        required: false,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('NewMember', NewMemberSchema);
