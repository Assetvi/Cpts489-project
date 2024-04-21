const express = require('express');
const router = express.Router();

// Route to handle friends
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

        // Render the friends page with the user data
        res.render('friends', { user: user, message: req.flash('message') });
    } catch (error) {
        console.error('Error fetching user:', error);
        req.flash('message', 'Error fetching user data');
        res.redirect('/'); // Redirect to home or handle error
    }
});

module.exports = router;
