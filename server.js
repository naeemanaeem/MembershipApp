const path = require("path");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dotevn = require("dotenv");
const morgan = require("morgan");
const morganBody = require("morgan-body");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
// a middleware that allows us to parse files from request on the server
const multiparty = require("connect-multiparty");
const MultipartyMiddleware = multiparty();
// To upload image from CKEditor to google drive using google drive API
const configs = require("./config/google-dr-config");
const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
  configs.CLIENT_ID,
  configs.CLIENT_SECRET,
  configs.REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: configs.REFRESH_TOKEN });
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
    console.log("e.message");
  }
};
// Load config
dotevn.config({ path: "./config/config.env" });
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  connectDB();
} else {
  connectDB("DEV");
}

// Create a new express application named 'app'
const app = express();

app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

const logsDir = "logs";
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Configure the CORs middleware
app.use(cors());

// Configure the bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body.method;
      return method;
    }
  })
);

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user | null;
  next();
});

// Static
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("uploads"));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/members", require("./routes/members"));
app.use("/activities", require("./routes/activities"));

// This middleware informs the express application to serve our compiled React files
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Catch any bad requests
app.get("*", (req, res) => {
  res.status(200).json({
    msg: "Catch All. Not running in production or staging?",
  });
});

app.post("/upload", MultipartyMiddleware, (req, res) => {
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
      // res.status(400).json({
      //   message: "Error uploading image",
      // });
    });
});

// delete the images of the event from /upload folder when the event is deleted

app.delete("/upload/:imageIds", (req, res) => {
  let imageIds = req.params.imageIds.split(",");
  imageIds.forEach((Ids) => {
    deleteFile(Ids);
  });
});
// Set our backend port to be either an environment variable or port 5000
const PORT = process.env.PORT || 5000;

// Configure our server to listen on the port defined by our port variable
app.listen(PORT, () => console.log(`BACK_END_SERVICE_PORT: ${PORT}`));
