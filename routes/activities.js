const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Activity = require("../models/Activity");

const ObjectID = mongodb.ObjectID;

// Get all activities
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find({});

    return res.send(activities);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

// Get an activity

router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).send("Not found.");
    }

    return res.send(activity);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

// Create a new activity

router.post("/", ensureAuth, async (req, res) => {
  try {
    const a = req.body;
    const activity = await Activity.create(a);
    if (activity) {
      return res.status(200).send(activity);
    } else {
      return res.status(500);
    }
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

// Update existing activity
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    const a = req.body;
    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id },
      a,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user")
      .lean();

    if (!activity) {
      res.status(404).send("Activity not found");
    }

    return res.send(activity);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

// Delete an activity
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id)
      .populate("user")
      .lean();

    if (!activity) {
      return res.status(404).send("Activity not found");
    }

    return res.send(activity);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

module.exports = router;
