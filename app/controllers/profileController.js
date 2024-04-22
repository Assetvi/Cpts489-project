const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to handle profile
router.get('/', async (req, res) => {
    try {
        // Assuming you have the username stored in the session
        const username = req.session.user.username;

        // Fetch the user from the database by primary key (username)
        const user = await User.findByPk(username);

        if (!user) {
            req.flash('message', 'User not found');
            return res.redirect('/'); // Redirect to home or handle error
        }

        // Render the profile page with the user data
        res.render('profile', { user: user, message: req.flash('message'), currentUser: true });
    } catch (error) {
        console.error('Error fetching user:', error);
        req.flash('message', 'Error fetching user data');
        res.redirect('/'); // Redirect to home or handle error
    }
});

router.get("/:username", async (req, res,) => {
    try {
        const user = await User.findByPk(req.params.username)
        if (!user) {
            req.flash('message', 'User not found');
            return res.redirect('/'); // Redirect to home or handle error
        }
        res.render('profile', { user: user, message: req.flash('message'), currentUser: false })
    } catch (error) {
        console.error('Error fetching user:', error);
        req.flash('message', 'Error fetching user data');
        res.redirect('/'); // Redirect to home or handle error
    }
})

module.exports = router;
