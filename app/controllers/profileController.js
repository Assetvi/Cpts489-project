const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware function to check if user is logged in
function requireLogin(req, res, next) {
    if (req.session.user) {
        next(); // User is logged in, proceed to next middleware
    } else {
        res.redirect('/login'); // User is not logged in, redirect to login page
    }
}

router.use(requireLogin);

// Route to handle adding a movie to the watch later list
router.post('/add-to-watchlater', async (req, res) => {
    try {
        const { movieTitle } = req.body;
        const username = req.session.user.username;

        // Find the user by username
        const user = await User.findByPk(username);
        if (!user) {
            req.flash('message', 'User not found');
            return res.redirect('/profile');
        }

        // Check if movieTitle already exists in watchlater list
        if (user.watchlater.includes(movieTitle)) {
            req.flash('message', `Movie "${movieTitle}" already in watch later list`);
            return res.redirect('/profile');
        }

        // Add movie title to watchlater list
        user.watchlater.push(movieTitle);
        await user.save();

        req.flash('message', `Added "${movieTitle}" to watch later list`);
        res.redirect('/profile');
    } catch (error) {
        console.error('Error adding movie to watch later:', error);
        req.flash('message', 'Error adding movie to watch later');
        res.redirect('/profile');
    }
});

// Route to handle adding a movie to the already watched list
router.post('/add-to-alreadywatched', async (req, res) => {
    try {
        const { movieTitle } = req.body;
        const username = req.session.user.username;

        // Find the user by username
        const user = await User.findByPk(username);
        if (!user) {
            req.flash('message', 'User not found');
            return res.redirect('/profile');
        }

        // Check if movieTitle already exists in alreadywatched list
        if (user.alreadywatched.includes(movieTitle)) {
            req.flash('message', `Movie "${movieTitle}" already in already watched list`);
            return res.redirect('/profile');
        }

        // Add movie title to alreadywatched list
        user.alreadywatched.push(movieTitle);
        await user.save();

        req.flash('message', `Added "${movieTitle}" to already watched list`);
        res.redirect('/profile');
    } catch (error) {
        console.error('Error adding movie to already watched:', error);
        req.flash('message', 'Error adding movie to already watched');
        res.redirect('/profile');
    }
});

module.exports = router;
