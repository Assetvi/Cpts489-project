const express = require('express');
const router = express.Router();

// Route to handle logout
router.get('/', (req, res) => {
    // Clear the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.redirect('/'); // Redirect to home
        } else {
            // Redirect to login page after successful logout
            res.redirect('/login');
        }
    });
});

module.exports = router;
