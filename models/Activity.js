const mongoose = require("mongoose");
require("mongoose-type-email");
mongoose.SchemaTypes.Email.defaults.message = "Email address is invalid";
require("mongoose-currency").loadType(mongoose);
require("mongoose-type-url");
const ActivitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title can't be empty"],
      trim: true,
      unique: [true, "Title has already been taken"],
    },
    tags: {
      type: String,
      trim: true,
    },
    startDateTime: {
      type: Date,
      required: [true, "Start date and Time can't be empty"],
      trim: true,
    },
    endDateTime: {
      type: Date,
      trim: true,
    },
    location: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      zip: {
        type: String,
        trim: true,
      },
    },
    online: {
      type: Boolean,
      trim: true,
    },
    registration: {
      type: String,
      trim: true,
      default: "Open",
    },
    isRecurring: {
      type: Boolean,
      trim: true,
    },
    meetingLink: {
      type: mongoose.SchemaTypes.Url,
      trim: true,
    },
    contactEmail: {
      type: mongoose.SchemaTypes.Email,
      required: true,
      trim: true,
    },
    cost: {
      type: mongoose.Types.Currency,
      trim: true,
      default: 0,
      min: 0,
    },
    imageUrl: {
      type: mongoose.SchemaTypes.Url,
      trim: true,
      default:
        "https://mhma.info/wp-content/uploads/2021/07/MHMA-logo-1-1024x410.png",
    },
    imageSrc: {
      type: Array,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event Details are required"],
      trim: true,
    },
  },
  { timestamps: true }
);

ActivitySchema.path("imageUrl").validate((val) => {
  urlRegex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, "Invalid URL.");

module.exports = mongoose.model("Activity", ActivitySchema);
