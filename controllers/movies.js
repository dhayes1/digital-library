const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  // #swagger.tags = ['movies']
  // #swagger.summary = 'Finds all movies'
  try {
    const result = await mongodb
        .getDb()
        .db()
        .collection('Movies')
        .find()
        result.toArray().then((lists) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(lists);
        });
  } catch (err) {
        res.status(500).json({ message: err.message });
  }
};

// const getAll = async (req, res, next) => {
//   // #swagger.tags = ['movies']
//   // #swagger.summary = 'Finds all movies'
//   try {
//     const result = await mongodb
//         .getDb()
//         .db()
//         .collection('Movies')
//         .find()
//         .toArray((err, lists) => {
//           if (err) {
//             res.status(400).json({ message: err });
//           }
//           res.setHeader('Content-Type', 'application/json');
//           res.status(200).json(lists);
//         });
//   } catch (err) {
//         res.status(500).json({ message: err.message });
//   }
// };

const getMovie = async (req, res, next) => {
  // #swagger.tags = ['movies']
  // #swagger.summary = 'Finds a single movie by ID'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must be a valid movie id to find a movie.');
    }
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db()
        .collection('Movies')
        .find({ _id: movieId })
        result.toArray().then((lists) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(lists);
        });
  } catch (err) {
        res.status(500).json({ message: err.message });
  }
};

// const getMovie = async (req, res, next) => {
//   // #swagger.tags = ['movies']
//   // #swagger.summary = 'Finds a single movie by ID'
//   try {
//     if (!ObjectId.isValid(req.params.id)) {
//       res.status(400).json('Must be a valid movie id to find a movie.');
//     }
//     const movieId = new ObjectId(req.params.id);
//     const result = await mongodb
//         .getDb()
//         .db()
//         .collection('Movies')
//         .find({ _id: movieId })
//         .toArray((err, lists) => {
//           if (err) {
//             res.status(400).json({ message: err });
//           }
//           res.setHeader('Content-Type', 'application/json');
//           res.status(200).json(lists);
//         });
//   } catch (err) {
//         res.status(500).json({ message: err.message });
//   }
// };

const createMovie = async (req, res) => {
  // #swagger.tags = ['movies']
  // #swagger.summary = 'Adds a new movie'
  try {
    const movie = {
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        mpaaRating: req.body.mpaaRating,
        language: req.body.language,
        runtime: req.body.runtime,
        genre: req.body.genre,
        overview: req.body.overview,
        imdbCode: req.body.imdbCode,
        tmdbCode: req.body.tmdbCode,
        image: req.body.image
    };
    const response = await mongodb
        .getDb()
        .db()
        .collection('Movies')
        .insertOne(movie);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
         res.status(500).json(response.error || 'ERROR: Cannot create movie.');
    }
  } catch (err) {
        res.status(500).json({ message: err.message });
  }
};

const updateMovie = async (req, res, next) => {
  // #swagger.tags = ['movies']
  // #swagger.summary = 'Update details of movie by ID'
  try {
    const movieId = new ObjectId(req.params.id);
    const movie = {
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        mpaaRating: req.body.mpaaRating,
        language: req.body.language,
        runtime: req.body.runtime,
        genre: req.body.genre,
        overview: req.body.overview,
        imdbCode: req.body.imdbCode,
        tmdbCode: req.body.tmdbCode,
        image: req.body.image
      };
    const response = await mongodb
        .getDb()
        .db()
        .collection('Movies')
        .updateOne({ _id: movieId }, { $set: movie });
    if (response.modifiedCount > 0) {
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error || 'ERROR: Cannot update movie.');
    }
  } catch (err) {
        res.status(500).json({ message: err.message });
  }
};

const deleteMovie = async (req, res, next) => {
  // #swagger.tags = ['movies']
  // #swagger.summary = 'Delete a movie by ID'
  try {
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDb()
        .db()
        .collection('Movies')
        .deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response.error || `ERROR: Cannot delete movie. ${movieId}`);
    }
  } catch (err) {
        res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getMovie, createMovie, updateMovie, deleteMovie };