const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const readline = require("readline");
const multiparty = require("connect-multiparty");
const MultipartyMiddleware = multiparty();
/*************** START HERE  **********************/
const { google } = require("googleapis");
// Service account key file from google cloud console
const KEYFILEPATH = path.join(__dirname, "serviceAccountCred.json");

// Adding drive scope will give us full access to Google drive account
const SCOPES = ["https://www.googleapis.com/auth/drive"];

// init the auth with the needed keyfile and scopes
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

// init drive service, it will handle all authorization and add authorization header.
const driveService = google.drive({
  version: "v3",
  auth: auth,
});

const createAndUploadFile = async (file) => {
  // metadata for the new file on Google drive
  const fileMetaData = {
    name: file.name,
    parents: ["1rcraDl3fBlKocWLXzVFyBvqkdl4glWl1"], // ID of the folder which you have granted access to your app
  };

  const media = {
    mimeType: file.type,
    body: fs.createReadStream(file.path),
  };

  try {
    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      fields: "id",
    });
    return response.data.id;
  } catch (e) {
    console.log(e.message);
  }
};

const deleteFile = async (fileId) => {
  try {
    const response = await driveService.files.delete({
      fileId: fileId,
    });
    console.log(`Image deleted successfully!`, response.status);
    return response.status;
  } catch (e) {
    console.log("Error deleting file: ", e.message);
  }
};

// endpoint that gets image from ckeditor
router.post("/", MultipartyMiddleware, (req, res) => {
  const imageFile = req.files.upload;
  createAndUploadFile(imageFile)
    .then((id) => {
      res.status(200).json({
        uploaded: true,
        url: `https://drive.google.com/uc?export=view&id=${id}`,
      });
    })
    .catch((e) => {
      console.error(e);
      res.status(400).json({
        message: "Error uploading image",
      });
    });
});

// end-point to delete the images from drive when the event is deleted

router.delete("/:imageIds", (req, res) => {
  let imageIds = req.params.imageIds.split(",");
  imageIds.forEach((imageId) => {
    deleteFile(imageId);
  });
});

module.exports = router;
