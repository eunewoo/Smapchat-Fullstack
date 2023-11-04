const User = require('../database/model/User.js');
const express = require('express');

var router = express.Router();

router.get('/User/:Id', function (req, res, next) {
  User.findByID(req.params.Id).then((val) => res.json(val));
});

router.get('/Users', function(req, res, next) {
  User.findAll().then((val) => res.json(val));
});

module.exports = router;
