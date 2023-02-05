const express = require('express');
const router = express.Router();

const musicController = require('../controllers/music');

router.get('/', musicController.getAll);

router.get('/:id', musicController.getSingle);

router.post('/', musicController.createMusic);

router.put('/:id', musicController.updateMusic);

router.delete('/:id', musicController.deleteMusic);

module.exports = router;