const express = require('express');
const moviesController = require('../controllers/movies');
const validation = require('../validation/validator');

const router = express.Router();

// @desc    Get all movies
// @route   GET /movies
router.get('/', moviesController.getAll);

// @desc    Get movies by title using url query
// @route   GET /movies/title?title
router.get('/title', moviesController.getMovieByTitle);

// @desc    Get movie by id
// @route   GET /movies
router.get('/:id', moviesController.getMovieById);

// @desc    Add movie
// @route   POST /movies
// , validation.validateMovie
router.post('/', moviesController.addMovie);

// @desc    Update movie by id
// @route   PUT /movies
router.put('/:id', moviesController.updateMovie);

// @desc    Delete movie by id
// @route   DELETE /movies
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;