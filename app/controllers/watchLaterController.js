const express = require('express');
const router = express.Router();
const User = require('../models/User');
const TMDbAPI = require("../utils/TMDbCommunication"); // Import the TMDbCommunication module

// Route to handle watch later
router.get('/', async (req, res) => {
    try {
        const username = req.session.user.username;
        const user = await User.findByPk(username);

        if (!user) {
            req.flash('message', 'User not found');
            return res.redirect('/'); // Redirect to home or handle error
        }

        // Split the watchlater string into an array of movies
        const watchLaterMovies = user.watchlater || ''; // Check if it's null or undefined
        console.log(watchLaterMovies);
        res.render('watch-later', {
            user: user,
            TMDbAPI: TMDbAPI,
            watchLaterMovies: watchLaterMovies ? watchLaterMovies.split('+') : [], // Split if not null, otherwise empty array
            message: req.flash('message')
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        req.flash('message', 'Error fetching user data');
        res.redirect('/'); // Redirect to home or handle error
    }
});

// Route to handle adding a movie to the watch later list
router.post('/add-to-watchlater', async (req, res) => {
    try {
        const { movieTitle } = req.body;
        const username = req.session.user.username;
        const user = await User.findByPk(username);

        if (!user) {
            req.flash('message', 'User not found');
            return res.redirect('/');
        }

        const watchLaterMovies = user.watchlater || '';

        if (watchLaterMovies.includes(movieTitle)) {
            req.flash('message', `Movie "${movieTitle}" already in watch later list`);
        } else {
            try {
                const updatedMovies = watchLaterMovies ? `${watchLaterMovies}+${movieTitle}` : movieTitle;
                user.watchlater = updatedMovies;
                await user.save();
                req.flash('message', `Added "${movieTitle}" to watch later list`);
            } catch (error) {
                console.error('Failed to save user:', error);
                req.flash('message', 'Failed to update your watch later list.');
                res.redirect('back');
                return;
            }
        }

        res.redirect('back'); // Redirect back to the same page
    } catch (error) {
        console.error('Error adding movie to watch later:', error);
        req.flash('message', 'Error adding movie to watch later');
        res.redirect('back');
    }
});

module.exports = router;
