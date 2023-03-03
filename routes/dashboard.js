const express = require('express');
const router = express.Router();

// @desc    Dashboard
// @route   GET /dashboard
router.get('/', (req, res) => {
    res.render('Dashboard', {
        name: req.user.firstName,
    });

});

module.exports = router;