const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Friendship = require('../models/Friendship');
const {Op} = require('sequelize');

router.get("/", async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['username'],
            where: {
                [Op.not]: [{ username: req.session.user.username }]
            }
        })
        const friends = await Friendship.findFriends(req.session.user.username)
        res.render('users', { users, message: req.flash('message'),friends })
    } catch (error) {
        console.error('Error fetching user:', error);
        req.flash('message', 'Error fetching user data');
        res.redirect('/'); // Redirect to home or handle error
    }
})

router.get("/addfriend/:username", async(req,res,)=>{
  const newFriend = await Friendship.create({username1:req.session.user.username, username2:req.params.username})
  res.redirect('/users')
})

router.get("/removefriend/:username", async(req,res)=>{
    await Friendship.deleteFriend(req.session.user.username, req.params.username)
    res.redirect('/users')
})

module.exports = router;
