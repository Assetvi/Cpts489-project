const express = require('express');
const router = express.Router();

// Route to render register
router.get('/', (req, res) => {
    // Render register
    res.render('register');
});

module.exports = router;