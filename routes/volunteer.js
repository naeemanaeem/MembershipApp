const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const { ensureAuth } = require("../middleware/auth");
/***************Added lines here*/
const Member = require("../models/Member");
const ObjectID = mongodb.ObjectID;
/********************** */
// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req, res) => {
  let userid = req.query.myuser;
  if (typeof userid === "string") {
    Volunteer.find({ memberId: userid })
      .then((volunteer) => res.json(volunteer))
      .catch((err) =>
        res.status(404).json({ novolunteerfound: "No Volunteer found" })
      );
  } else {
    Volunteer.find()
      .then((volunteers) => res.json(volunteers))
      .catch((err) =>
        res.status(404).json({ novolunteersfound: "No Volunteers found" })
      );
  }
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", (req, res) => {
  Volunteer.findById(req.params.id)
    .then((volunteer) => res.json(volunteer))
    .catch((err) =>
      res.status(404).json({ novolunteerfound: "No Volunteer found" })
    );
});

// get a volunteer by email address and fetch all volunteered activites
router.get("/volunteerByEmail/:email", ensureAuth, async (req, res) => {
  try {
    let volunteer = await Volunteer.find({ email: req.params.email })
      //use this function call to get dependents
      .populate("eventId")
      .lean(); //try removing this and look at data
    console.log("volunteer:", volunteer);
    if (!volunteer) {
      return res.status(404).send("Not found.");
    }

    // if (volunteer.Dependents.length > 0) {
    //   let dependents = [];
    //   for (let index = 0; index < volunteer.Dependents.length; index++) {
    //     let temp = await Member.findById(volunteer.Dependents[index]);
    //     dependents.push(temp);
    //   }
    //   volunteer.Dependents = dependents;
    // }

    return res.send(volunteer);
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});
router.post("/", async (req, res) => {
  try {
    const response = await Volunteer.find({ event: req.body.event });

    if (response) {
      console.log("response:", response);

      let foundActivity = response.filter(
        (doc) => doc.fullName === req.body.fullName
      );

      if (foundActivity.length === 0) {
        const volunteer = await Volunteer.create(req.body);
        if (volunteer) {
          return res.status(200).send(volunteer);
        } else {
          return res.status(500);
        }
      } else if (foundActivity.length > 0) {
        const volunteer = await Volunteer.findOneAndUpdate(
          { _id: foundActivity[0]._id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        if (volunteer) {
          return res.status(200).send(volunteer);
        } else {
          return res.status(500);
        }
      }
    } else {
      return res.status(500);
    }
  } catch (error) {
    // return server error
    return res.status(500);
  }
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put("/:id", (req, res) => {
  Volunteer.findByIdAndUpdate(req.params.id, req.body)
    .then((volunteer) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", (req, res) => {
  Volunteer.findByIdAndRemove(req.params.id, req.body)
    .then((volunteer) =>
      res.json({ mgs: "Volunteer entry deleted successfully" })
    )
    .catch((err) => res.status(404).json({ error: "No such a Volunteer" }));
});
// delete all Volunteer records
router.delete("/delete/all", (req, res) => {
  Volunteer.deleteMany()
    .then((response) =>
      res.json({ mgs: "Volunteer entry deleted successfully" })
    )
    .catch((err) => res.status(404).json({ error: "No such a Volunteer" }));
});
module.exports = router;
