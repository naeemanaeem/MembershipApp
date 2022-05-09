//////////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VolunteerRegisterSchema = new mongoose.Schema(
  {
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    googleId: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    events: {
      type: String,
      required: true,
      trim: true,
    },
    volunteerDates: [
      [
        {
          type: Date,
          required: true,
          trim: true,
        },
        {
          type: Date,
          required: true,
          trim: true,
        },
      ],
    ],
    hours: {
      type: Number,
      required: true,
      trim: true,
    },
    comments: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VolunteerRegister", VolunteerRegisterSchema);
