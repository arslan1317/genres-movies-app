const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');

const Genres = require('../../models/Genres');

// @route    POST api/genres/add
// @desc     Register user
// @access   Public
router.post('/add', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Please include a valid email').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const { name, description } = req.body;

    

        const genres = new Genres({
            name,
            description
        });

        await genres.save();

        
        res.json({genres});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET api/genres
// @desc     Register user
// @access   Public
router.get('/', async (req, res) => {
    try {
        const genres = await Genres.find();
        res.json(genres);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route    DELETE api/genres/:id
// @desc     DELETE genres
// @access   Public
router.delete('/:id', async (req, res) => {
    try {
        const genres = await Genres.findById(req.params.id);

        if(!genres) {
            return res.status(404).json({ msg: 'Genres not found'});
        }

        await genres.remove();
        res.json({
            msg: 'Removed Successfully'
        });
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Genres not found'});
        }
        res.status(500).send('Server Error');
    }
});


// @route    GET api/genres/:id
// @desc     GET genres by Id
// @access   PUBLIC

router.get('/get/:id', async (req, res) => {
    try {
        const genres = await Genres.findById(req.params.id);

        if(!genres) {
            return res.status(404).json({ msg: 'Genres not found'});
        }

        res.json(genres);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Genres not found'});
        }
        res.status(500).send('Server Error')
    }
});


module.exports = router;