const mongoose = require("mongoose");
require("mongoose-type-url");

const ExternalActivitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title can't be empty"],
      trim: true,
    },
    url: {
      type: mongoose.SchemaTypes.Url,
      trim: true,
    },
  },
  { timestamps: true }
);

ExternalActivitySchema.path("url").validate((val) => {
  urlRegex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, "Invalid URL.");

module.exports = mongoose.model("ExternalActivity", ExternalActivitySchema);
