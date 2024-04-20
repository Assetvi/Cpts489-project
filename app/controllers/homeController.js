const express = require("express");
const router = express.Router();
const TMDbAPI = require("../utils/TMDbCommunication"); // Import the TMDbCommunication module

// Middleware function to check if user is logged in
function requireLogin(req, res, next) {
    if (req.session.user) {
        next(); // User is logged in, proceed to next middleware
    } else {
        res.redirect('/login'); // User is not logged in, redirect to login page
    }
}

// Route to fetch movies for a specific page and render the home page (GET request)
router.get('/', requireLogin, async (req, res) => {
    try {
        const maxMovies = 1000; // Maximum number of movies to fetch
        const page = parseInt(req.query.page) || 1;
        const pageSize = 60; // Number of movies per page
        const offset = (page - 1) * pageSize;

        const movies = await TMDbAPI.getAllMovies(maxMovies);
        const totalPages = Math.ceil(movies.length / pageSize);

        const paginatedMovies = movies.slice(offset, offset + pageSize);

        res.render('home', {
            movies: paginatedMovies,
            currentPage: page,
            totalPages: totalPages,
            TMDbAPI: TMDbAPI,
            user: req.session.user // Pass user data to the view
        });
    } catch (error) {
        console.error('Error:', error);
        res.render('home', { movies: [], currentPage: 1, totalPages: 1 });
    }
});

module.exports = router;
