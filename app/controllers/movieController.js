const express = require('express');
const TMDbAPI = require("../utils/TMDbCommunication"); // Import the TMDbCommunication module
const router = express.Router();

// GET /movie route handler
router.get('/', async (req, res) => {
    try {
        const movieId = req.query.id;
        const movie = await TMDbAPI.getMovieDetailsById(movieId);

        if (!movie) {
            req.flash('message', 'Movie not found');
            res.redirect('/'); // Redirect to home page with error message
            return;
        }

        res.render('movie', { 
            movie: movie,
            TMDbAPI : TMDbAPI,
            message: req.flash('message')
        });
    } catch (error) {
        console.error('Error:', error);
        req.flash('message', 'An error occurred while fetching the movie');
        res.redirect('/'); // Redirect to home page with error message
    }
});


module.exports = router;

