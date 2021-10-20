const mongoose = require('mongoose'),
Schema=mongoose.Schema;

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
        required: false,
        trim: true
    },
    Email: {
        type: String,
        required: false,
        trim: true
    },
    Relationship: {
        type: String,
        required: false,
        trim: true
    },
    Guardians: {
        type: [],
        required: false,
        trim: true
    },
    Dependents: {
        type: [],
        required: false,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Member', MemberSchema);