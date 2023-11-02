import User from '../database/model/User.js';
import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/User', function (req, res, next) {
  console.log(req.body);
  res.json(User.findByID(req.body.ID));
});

export default router;
