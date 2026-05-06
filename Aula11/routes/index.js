var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var indexController = require('../controllers/indexController');
const  { authenticateTokenFromSession } = require('../midddleware/auth');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res) {
  res.render('login.ejs', { message: req.flash('loginMessage') }); 
});

router.get('/signup', function (req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') }); // load the index.ejs file
});

router.get('/profile', authenticateTokenFromSession, function (req, res) {
  res.render('profile.ejs', { user: req.session.user, token: req.session.token }); // get the user out of session and pass to template
});

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});

router.post('/signup', indexController.signup);
router.post('/login', indexController.login);

module.exports = router;
