const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);

const VolunteerSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      ref: "Member",
      required: true,
    },

    fullName: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
    },

    event: {
      type: String,
      trim: true,
      required: true,
    },
    // volunteerHours: {
    //   type: Number,
    //   trim: true,
    //   required: true,
    // },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },

    selectedDateTime: [
      {
        startInterval: {
          type: Date,
          trim: true,
          required: true,
        },
        endInterval: {
          type: Date,
          trim: true,
          required: true,
        },
      },
    ],
    comments: {
      type: String,
      trim: true,
    },

    // EventDate: {
    //     type: String,
    //     trim: true,
    //     required: true,
    // },
    // HoursAvailable: {
    //   type: Number,
    //   trim: true,
    //   required: true,
    // },
    // Date: {
    //   type: Date,
    //   default: Date.now,
    // },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", VolunteerSchema);
