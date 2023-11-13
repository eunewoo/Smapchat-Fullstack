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

router.delete("/User/delete/:Id", function (req, res, next) {
  UserModel.deleteUserByIdl(req.params.Id).then((val) => res.json(val));
});

router.post("/User/create", function (req, res, next) {
  UserModel.createUser(
    req.params.email,
    req.params.username,
    req.params.password,
    req.params.avatar
  ).then((val) => res.json(val));
});

router.put("/User/update/:Id", function (req, res, next) {
  UserModel.updateProfile(
    req.params.Id,
    req.params.updatedData)
    .then((val) =>res.json(val)
  );
});

router.put("/User/update/activate/:Id", function (req, res, next) {
  UserModel.updateActivationStatus(
    req.params.Id,
    req.params.isActive
  ).then((val) =>
    res.json(val)
  );
});



module.exports = router;
