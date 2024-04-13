const express = require('express');
const session = require("express-session");
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); // Import SQLite module

const app = express();

// Serve public files from the public directory within the views directory
app.use(express.static("public"));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SQLite database initialization
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Use home controller
const homeController = require('./controllers/homeController');
app.use('/', homeController);

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

module.exports = server;