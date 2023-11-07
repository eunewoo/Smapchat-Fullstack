const User = require('../database/model/User.js');
const express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200);
  res.send();
});

module.exports = router;
