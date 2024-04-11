const express = require('express');
const router = express.Router();

// Route to render login
router.get('/', (req, res) => {
    // Render login
    res.render('login');
});

module.exports = router;