const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Activity = require("../models/Activity");
const ActivityRegister = require("../models/ActivityRegister");
const Member = require("../models/Member");

// Get all internal activities that are current
router.get("/", async (req, res) => {
  try {
    const date = new Date().toISOString();
    const activities = await Activity.find({ startDateTime: { $gte: date } });

    return res.send(activities);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});
// Get all internal activities ( old and current ones)
router.get("/all", async (req, res) => {
  try {
    const activities = await Activity.find({});

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

// Update an existing activity by replacing it entirely
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    const a = req.body;
    const activity = await Activity.findOneAndReplace(
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

// Delete an activity by id
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

//Get registered members info for all the activities available.

router.get("/registration/all", ensureAuth, async (req, res) => {
  try {
    const registrationInfo = await ActivityRegister.find({});
    return res.send(registrationInfo);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

//Get info of the members registered for a given activity.
//The info returns the activity details
// as well as the biodata of the members registered for that activity

router.get("/registration/:id", ensureAuth, async (req, res) => {
  try {
    let response = await ActivityRegister.findById(req.params.id)
      .populate("memberId")
      .populate("activityId")
      .lean();

    if (!response) {
      return res.status(404).send("Not found.");
    }
    let newResponse = response.registeredMembersIds.map(
      async (id) => await Member.findById(id)
    );
    // if the dependents are found in the database:
    if (newResponse) {
      Promise.all(newResponse)
        .then((result) => {
          response.registeredMembersIds = result;
          return res
            .status(200)
            .send({ ...response, registeredMembersIds: result });
        })
        .catch((error) => console.error(error));
    }
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

//Register a member for an activity
router.post("/registration", ensureAuth, async (req, res) => {
  try {
    const info = req.body;
    const response = await ActivityRegister.create(info);
    if (response) {
      console.log("response from server:", response._message);
      return res.status(200).send(response);
    } else {
      return res
        .status(500)
        .send("Error saving registration info into database!");
    }
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500).send(error);
  }
});

// Update an activity's registration info by replacing the old document with the new one

router.put("/registration/:id", ensureAuth, async (req, res) => {
  try {
    const info = req.body;
    const response = await ActivityRegister.findOneAndReplace(
      { _id: req.params.id },
      info,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user")
      .lean();

    if (!response) {
      res
        .status(404)
        .send("Registration info was not found for this activity!");
    }

    return res.send(response);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

// Patches/ updates an activity's registration info
router.patch("/registration/:id", ensureAuth, async (req, res) => {
  try {
    const info = req.body;
    const response = await ActivityRegister.findOneAndUpdate(
      { _id: req.params.id },
      info,
      {
        // returns the updated document
        new: true,
        runValidators: true,
      }
    )
      .populate("user")
      .lean();

    if (!response) {
      res
        .status(404)
        .send("Registration info was not found for this activity!");
    }

    return res.send(response);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});
// Delete the activity's registration info
router.delete("/registration/:id", ensureAuth, async (req, res) => {
  try {
    const response = await ActivityRegister.findByIdAndDelete(req.params.id);

    if (!response) {
      return res
        .status(404)
        .send("The registration info was not found for this activity!");
    }

    return res.send(response);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});
// api to use for development mode only (for self use only)
router.delete("/registration/many/bymemberid", ensureAuth, async (req, res) => {
  try {
    const response = await ActivityRegister.deleteMany({
      memberId: "618095549e08676d7364d7b0",
    });

    if (!response) {
      return res
        .status(404)
        .send("The registration info was not found for this activity!");
    }

    return res.send(response);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});

module.exports = router;
