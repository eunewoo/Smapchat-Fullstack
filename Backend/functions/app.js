const cors = require("cors");

const express = require('express');
const cookieParser = require('cookie-parser');
const startDB = require('./database/database.js');

const indexRouter = require('./routes/index.js');
const userRoutes = require('./routes/userRoutes.js');
const mapRoutes = require('./routes/mapRoutes.js')
const logMiddleware = require('./middleware/logger.js');

const dotenv = require('dotenv');

// read .env file to generate environment variables,
// this will need to be disabled for production deployment
// where env vars are set to appropriate values elsewhere
dotenv.config();

startDB();

var app = express();

app.use(cors({origin: ['https://smapchat-bc4cd.web.app', "http://10.1.181.129:3002"]}));

app.use(logMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", mapRoutes);
app.use('/', indexRouter);
app.use('/', userRoutes);


// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  next();
});
// const PORT = 3004;

// // Your routes and middleware setup here

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;