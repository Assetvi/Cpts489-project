const express = require('express');
const session = require("express-session");
var createError = require('http-errors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); // Import SQLite module
const sequelize = require('./utils/db');
const User = require('./models/User')
const app = express();
const homeController = require('./controllers/homeController');
const movieController = require("./controllers/movieController")
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
var logger = require('morgan');

// Serve public files from the public directory within the views directory
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'wsu489',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//   });
  
//   // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });


app.use(function(req,res,next){
    res.locals.activeUser = false
    if(req.session.user){
        res.locals.user = req.session.user
        res.locals.activeUser = true
    }
    next();
})


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
app.use('/', homeController);
// User login and register controller
app.use('/login', loginController);
app.use('/register', registerController);
// Use movie controller
app.use('/movie', movieController);

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

app.get('/logout', function(req,res, next){
    if(req.session.user){
      req.session.destroy()
      res.redirect("/?msg=logout")
    }else {
      res.redirect("/")
    }
    
  })

module.exports = app;
