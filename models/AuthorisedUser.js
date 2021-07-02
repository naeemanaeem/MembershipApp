const mongoose = require('mongoose');

const AuthorisedUserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AuthorisedUser', AuthorisedUserSchema, 'authorised-users');
