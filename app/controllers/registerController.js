const express = require('express');
const router = express.Router();
const User = require('../models/User')

// Route to render register
router.get('/', (req, res) => {
    // Render register
    res.render('register');
});

router.post('/register', async function(req,res,next){
    try{
        await User.create(
            {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            }
        )
        res.redirect('/?msg=success')
    }catch (error){
        res.redirect('/?msg=fail')
    }
})

module.exports = router;