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
const Friendship = require('./models/Friendship');

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


app.use(function (req, res, next) {
  res.locals.activeUser = false
  if (req.session.user) {
    res.locals.user = req.session.user
    res.locals.activeUser = true
  }
  next();
})

// async function addFriend(username2) {
//   const friends = await Friendship.create({ username1: res.locals.user.username, username2: username2 })
// }

async function setup() {
  const sawyer = await User.create({ username: "sawyer", password: "1234", email: "sb@sb.com" })
  const trevor = await User.create({ username: "trevor", password: "1234", email: "tb@tb.com" })
  const johnny = await User.create({ username: "johnny", password: "1234", email: "jg@jg.com" })
  // await sawyer.addFriend(johnny.username)
  // console.log(Boolean(sawyer.friends.includes(johnny.username)))
  // console.log(sawyer.friends)
  const friends = await Friendship.create({ username1: "sawyer", username2: "trevor" })
  const alsofriends = await Friendship.create({username1:"sawyer",username2:"johnny"})
  const friendList = await Friendship.findFriends("sawyer")
  console.log(Boolean(friendList.length == 2))
  console.log("user instances created...")
}

sequelize.sync({ force: true }).then(() => {
  console.log("Sequelize sync completed...")
  setup().then(() => console.log("User setup complete"))
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

app.get('/logout', function (req, res, next) {
  if (req.session.user) {
    req.session.destroy()
    res.redirect("/?msg=logout")
  } else {
    res.redirect("/")
  }

})

app.get("/:username", async function (req, res, next) {
  const user = req.session.user
  if (user) {
    const friends = await Friendship.findFriends(req.session.user.username)
    for (let friend in friends){
      console.log(friend)
    }
  
  //return friendList
    res.render('profile', { user, friends })
  } else {
    res.redirect('/?msg=user+not+found&?username=' + req.params.username)
  }
})

app.get("/:username", async function (req, res, next) {
  const user = req.session.user
  if (user) {
    const friends = await Friendship.findFriends(req.session.user.username)
    for (let friend in friends){
      console.log(friend)
    }
  
  //return friendList
    res.render('friends', { user, friends })
  } else {
    res.redirect('/?msg=user+not+found&?username=' + req.params.username)
  }
})

module.exports = app;
