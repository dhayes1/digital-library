const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('User', UserSchema);