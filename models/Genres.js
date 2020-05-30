const mongoose = require('mongoose');

const GenresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = Genres = mongoose.model('genres', GenresSchema);