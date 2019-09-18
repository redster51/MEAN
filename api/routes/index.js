let express = require('express');
let router = express.Router();
let jwt = require('express-jwt');
let auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

let ctrlProfile = require('../controllers/profile');
let ctrlAuth = require('../controllers/authentication');
let ctrlVerification = require('../controllers/verification');
let ctrlCompany = require('../controllers/company');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/users', auth, ctrlProfile.getUsers);
router.get('/messages', auth, ctrlProfile.getChatMessages);

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

//work with companies
router.post('/createCompany', auth, ctrlCompany.createCompany);
router.post('/userCompanies/:id', auth, ctrlCompany.findCompaniesByUser);
router.get('/companies', ctrlCompany.findAllCompanies);
router.get('/company/:id', ctrlCompany.findCompany);
router.post('/addRating', ctrlCompany.addRating);
router.get('/getRating/:id', ctrlCompany.getRating);
router.post('/donate', ctrlCompany.addDonate);
router.get('/search/:text', ctrlCompany.search);
router.post('/addComment', ctrlCompany.addComment);
router.post('/addNews', ctrlCompany.addNews);
module.exports = router;
