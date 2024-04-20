const express = require('express');
const router = express.Router();
const User = require('../models/User');

const sessionChecker = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.redirect("/");
    }
};

router.use(sessionChecker);

// Route to render register page
router.get('/', (req, res) => {
    res.render('register', { message: req.flash('info') });
});

// Validate email format
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern check
    return re.test(email);
};

// Route to handle registration
router.post('/', async function(req, res, next) {
    const { username, password, email } = req.body;
    // Basic validation
    if (!username || !password || !email) {
        req.flash('info', 'Please fill in all fields');
        res.redirect('/register');
        return;
    }
    if (!validateEmail(email)) {
        req.flash('info', 'Please enter a valid email address');
        res.redirect('/register');
        return;
    }

    try {
        const existingUser = await User.findOne({ where: { username: username } });
        if (existingUser) {
            req.flash('info', 'User already exists');
            console.log('User already exists:', username);
            res.redirect('/register');
            return;
        }
        await User.create({ username, password, email });
        req.flash('info', 'Registration successful, please log in');
        res.redirect('/login');
    } catch (error) {
        console.error('Registration failed:', error);
        req.flash('info', 'Registration failed');
        res.redirect('/register');
    }
});

module.exports = router;
