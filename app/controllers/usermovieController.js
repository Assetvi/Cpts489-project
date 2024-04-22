const express = require('express');
//const TMDbAPI = require("../utils/TMDbCommunication"); // Import the TMDbCommunication module
const router = express.Router();
const Movie = require("../models/Movie");
const Friendship = require("../models/Friendship");
const Recommend = require("../models/Recommend");
const User = require("../models/User");

// GET /movie route handler
router.get('/', async (req, res) => {
    try {

        const movieTitle = req.query.title;
        console.log(movieTitle);
        const movie = await Movie.findMovie(movieTitle);
        if (!movie) {
            req.flash('message', 'Movie not found');
            res.redirect('/'); // Redirect to home page with error message
            return;
        }

        res.render('usermovie', {
            movie: movie,
            message: req.flash('message'),
            friends: null
        });

    } catch (error) {
        console.error('Error:', error);
        req.flash('message', 'An error occurred while fetching the user-defined movie');
        res.redirect('/'); // Redirect to home page with error message
    }
});

router.get('/recommend', async(req,res)=>{
    try{
        const movieTitle = req.query.title;
        const movie = await Movie.findMovie(movieTitle);
        if (!movie) {
            req.flash('message', 'Movie not found');
            res.redirect('/'); // Redirect to home page with error message
            return;
        }

        const friends = await Friendship.findFriends(req.session.user.username);
        res.render('usermovie',{
            movie: movie,
            message: req.flash('message'),
            friends: friends
        })

    }catch (error){
        console.error('Error:', error);
        req.flash('message', 'An error occurred while fetching the friends list');
    }
})

router.get('/recommend/:friend', async(req,res)=>{
    try{
        const movie = req.query.title;
        const friend = req.params.friend;
        const user = req.session.user;
        const username = user.username;
        console.log(movie+", "+friend+", "+username);
        if (!movie || !friend || !username){
            req.flash('message', 'error in recommendation process');
            res.redirect('/'); // Redirect to home page with error message
            return;
        }
        await Recommend.create({
            friend,
            movie,
            username,
        });
        console.log("recommendation successful!")
        res.render('usermovie',{
            movie: movie,
            message: req.flash('message'),
            friends: null
        })
    }catch(error){
        console.error('Error:', error);
        req.flash('message', 'An error occurred while making a recommendation');
    }
})


module.exports = router;

