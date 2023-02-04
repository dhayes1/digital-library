const express = require('express');
const router = express.Router();

//router.use('/games', require('./games'));

router.use('/movies', require('./movies'));

//router.use('/shows', require('./shows'));

//router.use('/music', require('./music'));

router.use('/users', require('./users'));

//router.use('/libraries', require('./libraries'));

module.exports = router;