const cors = require("cors");

const express = require('express');
const cookieParser = require('cookie-parser');
const startDB = require('./database/database.js');

const indexRouter = require('./routes/index.js');
const userRoutes = require('./routes/userRoutes.js');
const logMiddleware = require('./middleware/logger.js');

const dotenv = require('dotenv');

// read .env file to generate environment variables,
// this will need to be disabled for production deployment
// where env vars are set to appropriate values elsewhere
dotenv.config();

startDB();

var app = express();

app.use(cors());
app.use(logMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/', userRoutes);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;