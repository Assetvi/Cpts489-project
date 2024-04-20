const express = require('express');
const router = express.Router();
const User = require('../models/User')

const sessionChecker = (req, res, next)=>{
    if(!req.session.user){
    //   res.locals.username = req.session.user.username
      next()
    }else{
      res.redirect("../?msg=raf")
    }
  }
  
  router.use(sessionChecker)

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
                email: req.body.email,
                // friends: ""
            }
        )
        res.redirect('/?msg=success')
    }catch (error){
        res.redirect('/?msg=fail')
    }
})

module.exports = router;