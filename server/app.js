require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.set('view engine', 'ejs');

const origin = ["http://localhost:3000"];
const port = process.env.PORT || 8000;

const corsOptions = {
  origin,
};

// database
const db = require("./models");

db.sequelize.sync();

app.use(cors(corsOptions));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.use((req, res, next) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home :)",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
