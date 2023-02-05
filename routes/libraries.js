const express = require('express');
const router = express.Router();

const librariesController = require('../controllers/libraries');

router.get('/', librariesController.getAll);

router.get('/:id', librariesController.getSingle);

router.post('/', librariesController.createLibrary);

router.put('/:id', librariesController.updateLibrary);

router.delete('/:id', librariesController.deleteLibrary);

module.exports = router;