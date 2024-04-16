var express = require('express');
const User = require('../models/User');
var router = express.Router();

const sessionChecker = (req, res, next)=>{
    if(!req.session.user){
    //   res.locals.username = req.session.user.username
      next()
    }else{
      res.redirect("../?msg=raf")
    }
  }
  
  router.use(sessionChecker)

// Route to render login
router.get('/', function(req, res,next) {
    // Render login
    if(req.query.msg){
      res.locals.msg = req.query.msg
    }
    res.render('login');
});

router.post('/login', async function(req, res, next) {
    //console.log(req.body.username+" - "+req.body.password);
    const user = await User.findUser(req.body.username, req.body.password)
    if(user!== null){
      req.session.user = user
      res.redirect("/?msg=success")
    }else{
      res.redirect("/?msg=fail")
    }
  });
  
  

module.exports = router;