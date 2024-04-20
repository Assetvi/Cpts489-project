const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', function(req, res, next) {
    if (req.session.user) {
        res.redirect("/home"); // Redirect to home if user is already logged in
    } else {
        res.render('login', { message: req.flash('message') });
    }
});

router.post('/', async function(req, res, next) {
    const { username, password } = req.body;
    const user = await User.findUser(username, password);
    if (user) {
        req.session.user = user;
        req.flash('message', 'Login successful!'); // Set success message
        res.redirect("/"); // Redirect to home after successful login
    } else {
        req.flash('message', 'Invalid username or password.'); // Set failure message
        res.redirect("/login"); // Redirect to login with error message
    }
});

module.exports = router;
