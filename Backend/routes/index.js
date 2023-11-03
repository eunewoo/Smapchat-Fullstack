import User from '../database/model/User.js';
import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
});

router.get('/User/:Id', function (req, res, next) {
  User.findByID(req.params.Id).then((val) => res.json(val));
});

router.get('/Users', function(req, res, next) {
  User.findAll().then((val) => res.json(val));
});

export default router;
