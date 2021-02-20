var express = require('express');
var router = express.Router();
const models = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req,res,next)=>{
  models.User.create({
    email:req.body.email,
    password:req.body.password,
    nickname:req.body.nickname,
    profile:req.body.profile
  })
  .then(result=>{
    res.json({
      success:true,
      result
    })
  })
})


module.exports = router;
