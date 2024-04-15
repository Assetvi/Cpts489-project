const express = require('express');
const session = require("express-session");
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); // Import SQLite module
const sequelize = require('./db');
const User = require('./models/User')
const app = express();

// Serve public files from the public directory within the views directory
app.use(express.static("public"));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function setup(){
    const sawyer = await User.create ({username:"sawyer", password:"1234", email:"sb@sb.com"})
    console.log("sawyer instance created...")
  }

  sequelize.sync({ force:true}).then(()=>{
    console.log("Sequelize sync completed...")
    setup().then(()=>console.log("User setup complete"))
  })

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
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
app.use('/', homeController);
app.use('/login', loginController);
app.use('/register', registerController);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
