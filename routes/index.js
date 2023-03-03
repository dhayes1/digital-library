const express = require('express');
const router = express.Router();
const { ensureGuest, ensureAuth } = require('../middleware/auth');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('Login', {
        layout: 'login',
    });
});

// @desc    Dashboard
// @route   GET /dashboard
// router.get('/dashboard', ensureAuth, (req, res) => {
//     res.render('Dashboard', {
//         name: req.user.firstName,
//     });

// });
router.use('/dashboard', ensureAuth, require('./dashboard'));

// @desc    Movies (protected route)
// @route   Get /movies
router.use('/movies', require('./movies'));

// @desc    Users (protected route)
// @route   Get /users
router.use('/users', require('./users'));

// @desc    Google OAuth 2.0
// @route   Get /auth
router.use('/auth', require('./auth'));

//router.use('/games', require('./games'));

//router.use('/shows', require('./shows'));

//router.use('/music', require('./music'));

//router.use('/libraries', require('./libraries'));

module.exports = router;