const { check, validationResult, checkSchema } = require('express-validator');

const validateUser = [
    check('firstName', 'Firstname is required!')
        .exists()
        .notEmpty()
        .isString().withMessage('Firstname must be of type string!'),
    check('lastName', 'Lastname is required!')
        .exists()
        .notEmpty()
        .isString().withMessage('Lastname must be of type string!'),
    check('email', 'Email is required!')
        .exists()
        .notEmpty()
        .isEmail().withMessage('Email must be an email!')
        .normalizeEmail()
        .toLowerCase(),
    check('birthYear', 'Birth year is required!')
        .exists()
        .notEmpty()
        .isString().withMessage('Birth year must be of type string!'),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next();
        } catch (err) {
            res.status(400);
            res.send({ errors: err.array()});
        }
    }
]

const validateMovie = [
    check('title', 'Title is required!')
        .exists()
        .notEmpty()
        .isString().withMessage('Title must be a string!'),
    check('releaseYear', 'Release year is required!')
        .exists()
        .notEmpty()
        .isString().withMessage('Release year must be of type string!'),
    check('mpaaRating', 'MPAA rating is required!')
        .exists()
        .notEmpty()
        .isString().withMessage('MPAA rating must be of type string!'),
    check('language', 'Language is required!')
        .exists()
        .notEmpty()
        .isString()
        .withMessage('Language must be of type string!'),
    check('runtime', 'Runtime is required!')
        .exists()
        .notEmpty()
        .isString().withMessage('Runtime must be of type string!'),
    check('genre', 'Genre is required!')
        .exists()
        .notEmpty()
        .isArray().withMessage('Genre must be of type array!'),
    check('overview', 'Overview is required!')
        .exists()
        .notEmpty()
        .isString().withMessage('Overview must be of type string!'),
    check('imdbCode', 'IMDB Code is required!')
        .isString().withMessage('IMDB Code must be of type string!'),
    check('tmdbCode', 'TMDB Code is required!')
        .exists()
        .notEmpty()
        .isString().withMessage('TMDB Code must be of type string!'),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next();
        } catch (err) {
            res.status(400);
            res.send({ errors: err.array()});
        }
    },
]

module.exports = { validateUser, validateMovie }