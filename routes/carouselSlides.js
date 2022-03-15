const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Slide = require("../models/CarouselSlide");

// Get slides for carousel display
router.get("/", async (req, res) => {
  try {
    const slides = await Slide.find({});
    return res.send(slides);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});
// add a slide to the carousel for display
router.post("/", ensureAuth, async (req, res) => {
  try {
    const s = req.body;
    const slides = await Slide.create(s);
    if (slides) {
      // console.log(slides);
      return res.status(200).send(slides);
    } else {
      return res.status(500);
    }
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});
// edit or change  a slide
router.patch("/:id", ensureAuth, async (req, res) => {
  try {
    const data = req.body;
    const response = await Slide.findOneAndUpdate(
      { _id: req.params.id },
      data,
      {
        // returns the updated document
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!response) {
      res
        .status(404)
        .send(`The slide with id [${req.params.id}] was not found!`);
    }

    return res.send(response);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});
// delete a slide from carousel
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const response = await Slide.findByIdAndDelete(req.params.id);

    if (!response) {
      return res
        .status(404)
        .send(`The slide with the id [${req.params.id}] is not found!`);
    }

    return res.send(response);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});
module.exports = router;
