const User = require('../database/model/User.js');
const express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200);
});

module.exports = router;
