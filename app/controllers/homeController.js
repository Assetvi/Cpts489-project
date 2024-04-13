const express = require("express");
const router = express.Router();
const runQuery = require("../utils/sqlitedb"); // Adjust the path as needed
const createTable = require("../utils/sqliteTableCreator");

// Route to fetch all data from the database and render the home page (GET request)
router.get('/', (req, res) => {
    // Render the home view
    res.render('home');
});

module.exports = router;
