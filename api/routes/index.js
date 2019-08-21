var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlVerification = require('../controllers/verification');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/users', auth, ctrlProfile.getUsers);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//email verification
router.post('/confirmation', ctrlVerification.confirmationPost);
router.post('/resend', ctrlVerification.resendTokenPost);

module.exports = router;
