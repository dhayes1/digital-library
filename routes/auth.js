const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
// #swagger.tags = ['googl auth']
// #swagger.summary = 'Google authentication 2.0'
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
    res.redirect('/dashboard');
});

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {return nextTick(err);}
        res.redirect('/');
    });
});

module.exports = router;