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
    DateOfBirth: {
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
    Email: {
        type: String,
        required: true,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('NewMember', NewMemberSchema);
