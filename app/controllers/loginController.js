var express = require('express');
const User = require('../models/User');
var router = express.Router();

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
  
  router.get('/logout', function(req,res, next){
    if(req.session.user){
      req.session.destroy()
      res.redirect("/?msg=logout")
    }else {
      res.redirect("/")
    }
    
  })

module.exports = router;