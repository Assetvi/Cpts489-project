const express = require('express');
const router = express.Router();

// Route to render home
router.get('/', (req, res) => {
    // Render home
    res.render('home');
});

module.exports = router;
