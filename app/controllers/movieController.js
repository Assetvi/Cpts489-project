const express = require('express');
const TMDbAPI = require("../utils/TMDbCommunication"); // Import the TMDbCommunication module
const router = express.Router();

// GET /movie route handler
router.get('/', async (req, res) => {
    try {
        const movieId = req.query.id;
        const movie = await TMDbAPI.getMovieDetailsById(movieId);

        res.render('movie', { 
            movie: movie,
            TMDbAPI : TMDbAPI
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching movie details');
    }
});


module.exports = router;


