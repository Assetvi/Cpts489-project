const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to handle already watched
router.get('/', async (req, res) => {
    try {
        const username = req.session.user.username;
        const user = await User.findByPk(username);

        if (!user) {
            req.flash('message', 'User not found');
            return res.redirect('/'); // Redirect to home or handle error
        }

        // Split the already watched string into an array of movies
        const alreadyWatchedMovies = user.alreadywatched;

        res.render('already-watched', { user: user, alreadyWatchedMovies: alreadyWatchedMovies.split('+'), message: req.flash('message') });
    } catch (error) {
        console.error('Error fetching user:', error);
        req.flash('message', 'Error fetching user data');
        res.redirect('/'); // Redirect to home or handle error
    }
});

// Route to handle adding a movie to the already watched list
router.post('/add-to-alreadywatched', async (req, res) => {
    try {
        const { movieTitle } = req.body;
        const username = req.session.user.username;
        const user = await User.findByPk(username);

        if (!user) {
            req.flash('message', 'User not found');
            return res.redirect('/');
        }

        const alreadyWatchedMovies = user.alreadywatched || '';
        
        if (alreadyWatchedMovies.includes(movieTitle)) {
            req.flash('message', `Movie "${movieTitle}" already in already watched list`);
        } else {
            try {
                const updatedMovies = alreadyWatchedMovies ? `${alreadyWatchedMovies}+${movieTitle}` : movieTitle;
                user.alreadywatched = updatedMovies;
                await user.save();
                req.flash('message', `Added "${movieTitle}" to already watched list`);
            } catch (error) {
                console.error('Failed to save user:', error);
                req.flash('message', 'Failed to update your already watched list.');
                res.redirect('back');
                return;
            }
        }

        res.redirect('back'); // Redirect back to the same page
    } catch (error) {
        console.error('Error adding movie to already watched:', error);
        req.flash('message', 'Error adding movie to already watched');
        res.redirect('back');
    }
});

module.exports = router;
