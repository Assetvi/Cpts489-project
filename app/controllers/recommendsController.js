const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Recommend = require('../models/Recommend');

// Route to handle already watched
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

        const recommends = await Recommend.findRecommends(username)

        // Render the already-watched page with the user data
        res.render('recommends', { user: user, message: req.flash('message'), recommends:recommends});
        // res.render('recommends', { user: user, message: req.flash('message')});
    } catch (error) {
        console.error('Error fetching user:', error);
        req.flash('message', 'Error fetching user data');
        res.redirect('/'); // Redirect to home or handle error
    }
});

module.exports = router;
