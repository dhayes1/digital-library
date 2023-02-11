const express = require('express');
const moviesController = require('../controllers/movies');
const validation = require('../validation/validator');

const router = express.Router();

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getMovie);

router.post('/', validation.validateMovie, moviesController.createMovie);

router.put('/:id', validation.validateMovie, moviesController.updateMovie);

router.delete('/:id', moviesController.deleteMovie);

module.exports = router;