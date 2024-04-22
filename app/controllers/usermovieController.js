const express = require('express');
//const TMDbAPI = require("../utils/TMDbCommunication"); // Import the TMDbCommunication module
const router = express.Router();
const Movie = require("../models/Movie");

// GET /movie route handler
router.get('/', async (req, res) => {
    try {

        const movieTitle = req.query.title;
        console.log(movieTitle);
        const movie = await Movie.findMovie(movieTitle);
        if (!movie) {
            req.flash('message', 'Movie not found');
            res.redirect('/'); // Redirect to home page with error message
            return;
        }

        res.render('usermovie', {
            movie: movie,
            message: req.flash('message')
        });

    } catch (error) {
        console.error('Error:', error);
        req.flash('message', 'An error occurred while fetching the user-defined movie');
        res.redirect('/'); // Redirect to home page with error message
    }
});


module.exports = router;

