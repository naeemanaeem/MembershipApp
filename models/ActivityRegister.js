const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);

const ActivityRegisterSchema = new mongoose.Schema(
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

    registeredMembersIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
      },
    ],

    paymentIntentId: {
      type: String,
      required: true,
      trim: true,
    },
    paymentMethodId: {
      type: String,
      required: true,
      trim: true,
    },
    paymentAmount: {
      type: mongoose.Types.Currency,
      required: true,
      trim: true,
      default: 0,
      min: 0,
    },
    paymentType: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityRegister", ActivityRegisterSchema);
