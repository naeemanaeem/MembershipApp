const path = require("path");
const fs = require("fs");
const cors = require("cors");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multiparty = require("connect-multiparty");
const MultipartyMiddleware = multiparty();

// To upload image from CKEditor to google drive using google drive API
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});
const uploadFile = async (file) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
      },
      media: {
        mimeType: file.type,
        body: fs.createReadStream(file.path),
      },
    });
    return response.data.id;
  } catch (e) {
    console.log(e.message);
  }
};
const deleteFile = async (fileId) => {
  try {
    const response = await drive.files.delete({
      fileId: fileId,
    });
  } catch (e) {
    console.log(e.message);
  }
};
const generatePublicUrl = async (fileId) => {
  try {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    return result.data;
  } catch (e) {
    console.log(e.message);
  }
};

// endpoint that gets image from ckeditor
router.post("/", MultipartyMiddleware, async (req, res) => {
  const imageFile = req.files.upload;

  uploadFile(imageFile)
    .then((id) => {
      generatePublicUrl(id).then((url) => {
        res.status(200).json({
          uploaded: true,
          url: `https://drive.google.com/uc?export=view&id=${id}`,
        });
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
});

// end-point to delete the images from google drive when the event is deleted
router.delete("/:imageIds", (req, res) => {
  let imageIds = req.params.imageIds.split(",");
  imageIds.forEach((Ids) => {
    deleteFile(Ids);
  });
});
module.exports = router;
