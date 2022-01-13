const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);

const VolunteerSchema = new mongoose.Schema(
    {

        memberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
            required: true,
        },

        fullName: {
            type: String,
            trim: true,
            required: true,
        },

        Email: {
            type: String,
            trim: true,
            required: true,

        },

        Event: {
            type: String,
            trim: true,
            required: true,
        },


        EventDate: {
            type: String,
            trim: true,
            required: true,
        },
        HoursAvailable: {
            type: Number,
            trim: true,
            required: true,

        },


        Date: {
            type: Date,
            default: Date.now
        }

    },

    { timestamps: true }
);

module.exports = mongoose.model("Volunteer", VolunteerSchema);
