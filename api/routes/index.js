var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

let ctrlProfile = require('../controllers/profile');
let ctrlAuth = require('../controllers/authentication');
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

//work with users
router.post('/block', auth, ctrlProfile.blockUsers);
router.post('/unblock', auth, ctrlProfile.unBlockUsers);
router.post('/delete', auth, ctrlProfile.deleteUsers);
module.exports = router;
