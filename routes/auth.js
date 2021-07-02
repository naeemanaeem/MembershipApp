const express = require('express');
const User = require('../models/User');
const AuthorisedUser = require('../models/AuthorisedUser');
const passport = require('passport');
const router = express.Router();

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

router.post('/google', async (req, res) => {

    try {
        const token = req.body.token;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();    

        const {googleId, displayName, firstName, lastName, email, image} = req.body;

        const user = await User.findOneAndUpdate(
            { googleId: googleId },
            { $set: { googleId: googleId, displayName: displayName, firstName: firstName, lastName: lastName, email: email, image: image }},
            { upsert: true, new: true }
        ).lean();

        console.log(`Looking if user ${user.email} is authorised`)
        const authoriseduser = await AuthorisedUser.findOne(
            { email: user.email }
        ).lean();

        if(!authoriseduser) {
            return res.status(401).send("Unauthorized");
        } 

        req.session.user = user;

        return res.status(201).send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }

});

router.delete('/logout', async (req, res) => {
    try {
        if (req.session.user) {
            const user = await User.findOneAndDelete({googleId: req.session.user.googleId }).lean();
        }

        req.session.destroy();
        res.status(200).send("Logged out successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

router.get("/me", async (req, res) => {
    res.status(200).send(req.user);
});

module.exports = router;
