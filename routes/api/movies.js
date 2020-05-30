const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Genres = require('../../models/Genres');
const Movies = require('../../models/Movies');

// @route    POST api/movies/add
// @desc     Add movies
// @access   Public
router.post('/add',  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('release_date', 'Release Date is required').not().isEmpty(),
    check('genres', 'Genres is required').not().isEmpty(),
    check('duration', 'Duration is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        const genres = await Genres.findById(req.body.genres).select('name');

        if(!genres) {
            return res.status(404).json({ msg: 'Genres not found'});
        }

        const newmovies = new Movies ({
            name: req.body.name,
            description: req.body.description,
            release_date: req.body.release_date,
            genres: genres,
            duration: req.body.duration
        });

        const movies = await newmovies.save();
        res.json(movies);
        
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Genres not found'});
        }
        res.status(500).send('Server Error')
    }

});

//@route    GET api/movies
//@desc     GET all movies
//@access   Public

router.get('/', async (req, res) => {
    try {
        const movies = await Movies.find().sort({name: 1})
        res.json(movies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route    GET api/movies/:id
// @desc     GET movies by Id
// @access   PUBLIC

router.get('/get/:id', async (req, res) => {
    try {
        const movies = await Movies.findById(req.params.id);

        if(!movies) {
            return res.status(404).json({ msg: 'Movies not found'});
        }
        res.json(movies);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Movies not found'});
        }
        res.status(500).send('Server Error')
    }
});

// @route    DELETE api/movies/:id
// @desc     DELETE movies BY ID
// @access   PUBLIC

router.delete('/:id', async (req, res) => {
    try {
        const movies = await Movies.findById(req.params.id);

        if(!movies) {
            return res.status(404).json({ msg: 'Movies not found'});
        }

        await movies.remove();
        res.json({
            msg: 'Removed Successfully'
        });
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Movies not found'});
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;