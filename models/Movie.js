const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    yearReleased: {
        type: String,
        required: true,
    },
    mpaaRating: {
        type: String,
        required: true,
        enum: ['G', 'PG', 'PG-13', 'R', 'NC-17']
    },
    language: String,
    runtime: String,
    genre: Array,
    overview: String,
    tmdbCode: String,
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Movie', MovieSchema);