const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    genres: {
        type: Schema.Types.ObjectId,
        ref: 'genres'
    },
    duration: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
});

module.exports = Movies = mongoose.model('movies', MoviesSchema);