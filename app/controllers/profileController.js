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

router.get("/", async (req, res,) => {
    try {
        const username = req.session.user.username;
        const user = await User.findByPk(username)
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
