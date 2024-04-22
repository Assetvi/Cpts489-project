const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Middleware function to check if user is logged in
function requireLogin(req, res, next) {
    if (req.session.user) {
        next(); // User is logged in, proceed to next middleware
    } else {
        req.flash('message', 'Please log in to access this page'); // Set flash message
        res.redirect('/login'); // Redirect to login page
    }
}

// Route to render the Add Movie page
router.get('/', requireLogin, async (req, res) => {
    res.render('add-movie', { message: req.flash('message') });
  });


// Route to create a new movie
router.post('/add', async (req, res) => {
    try {
        // Extract movie details from the request body
        const { title, director, year, genre } = req.body;

        // Check if all required fields are provided
        if (!title || !director || !year || !genre) {
            return res.status(400).json({ error: 'Please provide all required fields: title, director, year, genre' });
        }

        // Create the new movie in the database
        const newMovie = await Movie.create({
            title,
            director,
            year,
            genre,
        });

        // Respond with the newly created movie
        //res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
        req.flash('message', 'Movie added successfully');
        res.redirect("/")
    } catch (error) {
        console.error('Error adding movie:', error);
        //res.status(500).json({ error: 'Could not add the movie. Please try again later.' });
        req.flash('message', 'Could not add the movie. Please try again later.');
        res.redirect("/add-movie")
    }
});


module.exports = router;
