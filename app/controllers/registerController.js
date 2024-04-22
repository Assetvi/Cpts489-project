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
    res.render('register', { message: req.flash('message') });
});

// Validate email format
const validateEmail = (email) => {
    // A more lenient email validation regex
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
};

router.post('/', async function (req, res, next) {
    const { username, password, email } = req.body;
    // Basic validation
    if (!username || !password || !email) {
        req.flash('message', 'Please fill in all fields');
        res.redirect('/register');
        return;
    }
    if (!validateEmail(email)) {
        req.flash('message', 'Please enter a valid email address');
        res.redirect('/register');
        return;
    }

    try {
        const existingUser = await User.findOne({ where: { username: username } });
        if (existingUser) {
            req.flash('message', 'User already exists');
            console.log('User already exists:', username);
            res.redirect('/register');
            return;
        }

        // Create user with watchlater and alreadywatched as empty arrays
        await User.create({
            username,
            password,
            email,
            watchlater: '',
            alreadywatched: '',
            friends: []
        });

        req.flash('message', 'Registration successful, please log in');
        res.redirect('/login');
    } catch (error) {
        console.error('Registration failed:', error);
        req.flash('message', 'Registration failed');
        res.redirect('/register');
    }
});


module.exports = router;
