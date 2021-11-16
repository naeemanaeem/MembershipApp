const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const ExternalActivity = require("../models/ExternalActivity");

// External Activities

// Get all external activities
router.get("/", async (req, res) => {
  try {
    const activities = await ExternalActivity.find({});
    return res.send(activities);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

// Get an activity by id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let activity = await ExternalActivity.findById(req.params.id);

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
    const activity = await ExternalActivity.create(a);
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

// Update an existing activity by replacing it entirely
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    const a = req.body;
    const activity = await ExternalActivity.findOneAndReplace(
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

// patch an existing activity
router.patch("/:id", ensureAuth, async (req, res) => {
  try {
    const a = req.body;
    const activity = await ExternalActivity.findOneAndUpdate(
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

// Delete an activity by id

// Delete an activity
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const activity = await ExternalActivity.findByIdAndDelete(req.params.id)
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
