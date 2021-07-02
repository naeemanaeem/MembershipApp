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
    Town: {
        type: String,
        required: false,
        trim: true
    },
    Postcode: {
        type: String,
        required: false,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Member', MemberSchema);
