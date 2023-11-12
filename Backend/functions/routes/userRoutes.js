const UserModel = require('../database/model/UserModel.js');
const express = require('express');

var router = express.Router();

router.get('/User/:Id', function (req, res, next) {
  UserModel.findByID(req.params.Id).then((val) => res.json(val));
});

router.get('/Users', function(req, res, next) {
  UserModel.findAll().then((val) => res.json(val));
});

router.get("/User/:Email", function (req, res, next) {
  UserModel.findByEmail(req.params.Id).then((val) => res.json(val));
});


module.exports = router;
