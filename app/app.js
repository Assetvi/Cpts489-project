// Set up node, express, content-flash, and sqlite
const express = require('express');
const session = require("express-session");
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); 
const flash = require('connect-flash');
const app = express();

// Controllers
const homeController = require('./controllers/homeController');
const movieController = require("./controllers/movieController");
const friendsController = require("./controllers/friendsController");
const watchLaterController = require("./controllers/watchLaterController");
const alreadyWatchedController = require("./controllers/alreadyWatchedController");
const profileController = require("./controllers/profileController");
const addMovieController = require("./controllers/addMovieController");
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');
const registerController = require('./controllers/registerController');

// Serve public files from the public directory within the views directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Trust first proxy
app.set('trust proxy', 1) 

// Session set up
app.use(session({
  secret: 'wsu489',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(flash());


app.use(function (req, res, next) {
  res.locals.activeUser = false
  if (req.session.user) {
    res.locals.user = req.session.user
    res.locals.activeUser = true
  }
  next();
})

// SQLite database initialization
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Use controllers
app.use('/', homeController);
app.use('/movie', movieController);
app.use('/friends', friendsController);
app.use('/watch-later', watchLaterController);
app.use('/already-watched', alreadyWatchedController);
app.use('/profile', profileController);
app.use('/add-movie', addMovieController);
app.use('/login', loginController);
app.use('/logout', logoutController);
app.use('/register', registerController);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

app.get('/logout', function (req, res, next) {
  if (req.session.user) {
    req.session.destroy()
    res.redirect("/?msg=logout")
  } else {
    res.redirect("/")
  }

})

app.get("/profile", async function (req, res, next) {
  const user = req.session.user
  if (user) {
    res.render('profile', { user })
  } else {
    res.redirect('/?msg=user+not+found&?username=' + req.params.username)
  }
})

app.get("/profile/:username", async function (req,res,next){
  const user = await User.findByPk(req.params.username)
  if(user){
    res.render('profile',{user})
  }else{
    res.redirect('/?msg=user+not+found?username='+req.params.username)
  }
})

app.get("/friends", async function (req, res, next) {
  const user = req.session.user
  if (user) {
    const friends = await Friendship.findFriends(req.session.user.username)
    res.render('friends', { user, friends })
  } else {
    res.redirect('/?msg=user+not+found&?username=' + req.params.username)
  }
})

app.get("/users", async function (req,res,next){
  const users = await User.findAll({
    attributes:['username'],
    where: {
    [Op.not]: [{username:req.session.user.username}]
    }})
  const friends = await Friendship.findFriends(req.session.user.username)
  res.render('users',{users,friends})
})

app.get("/addfriend/:username", async function (req,res,next){
  const newFriend = await Friendship.create({username1:req.session.user.username, username2:req.params.username})
  res.redirect('/users')
})

module.exports = app;
