var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const  { authenticateTokenFromHeaders } = require('../midddleware/auth');

router.use(authenticateTokenFromHeaders);

var usersController = require('../controllers/usersController');
/* GET users listing. */
router.get('/', usersController.getAll);

router.get('/:id', function(req, res, next) {
  res.send(req.user);
});

module.exports = router;