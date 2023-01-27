const express = require('express');
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');
const user = require('../controllers/userControllers')
const router = express.Router();

router.get('/anonymous',isLoggedIn, user.anonymous)

router.route('/profile')
    .get(catchAsync(user.viewProfile))
    .put(isLoggedIn, catchAsync(user.editProfile))

router.route('/signup')
    .get(user.renderSignUp)
    .post( catchAsync(user.createUser))

router.route('/login')
    .get(user.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.loginUser)

router.get("/logout", user.logoutUser);

router.get('/about', user.aboutUs);

router.get('/profile/edit', isLoggedIn, catchAsync(user.renderEditProfile))

module.exports = router;