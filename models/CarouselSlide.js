const mongoose = require("mongoose");

const CarouselSlide = new mongoose.Schema(
  {
    imageSrc: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Slide", CarouselSlide);
