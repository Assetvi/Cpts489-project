const express = require('express');
const router = express.Router();
const User = require('../models/User');

const sessionChecker = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.redirect("/home");
    }
};

router.use(sessionChecker);

// Route to render register page
router.get('/', (req, res) => {
    res.render('register', { message: req.flash('info') }); // Show flash messages stored under 'info'
});

// Route to handle registration
router.post('/', async function(req, res, next) {
    const { username, password, email } = req.body;
    try {
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            req.flash('info', 'User already exists'); // Set flash message
            res.redirect('/register');
            return;
        }
        await User.create({ username, password, email });
        req.flash('info', 'Registration successful, please log in'); // Set flash message
        res.redirect('/login');
    } catch (error) {
        console.error('Registration failed:', error);
        req.flash('info', 'Registration failed'); // Set flash message
        res.redirect('/register');
    }
});

module.exports = router;
