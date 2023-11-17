const cors = require("cors");

const express = require("express");
const cookieParser = require("cookie-parser");
const startDB = require("./database/database.js");

const indexRouter = require("./routes/index.js");
const userRoutes = require("./routes/userRoutes.js");
const logMiddleware = require("./middleware/logger.js");

const dotenv = require("dotenv");
const admin = require("firebase-admin");
const credentials = require("./smapchat-back-firebase-adminsdk-mqj8a-926a2ec96b.json");

// read .env file to generate environment variables,
// this will need to be disabled for production deployment
// where env vars are set to appropriate values elsewhere
dotenv.config();

startDB();

var app = express();

var corsOptions = {
  origin: ["https://smapchat-bc4cd.web.app", "http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logMiddleware);

admin.initializeApp({ credential: admin.credential.cert(credentials) });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/", userRoutes);

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  next();
});

module.exports = app;
