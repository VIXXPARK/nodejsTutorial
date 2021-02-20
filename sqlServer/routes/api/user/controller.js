const model = require('../../../models')
const config = require('../../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = (req,res)=>{
    model.User.findOne({where: {email:req.body.email}})
    .then((data)=>{
        if((data==null || data==undefined)==false){
            res.json({
                message:"already exists"
            })
        }
        encryptedPassword = bcrypt.hashSync(req.body.password,10)
        model.User.create({
            email:req.body.email,
            password:encryptedPassword,
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
}

exports.login = (req,res,next)=>{
    const {email,password} = req.body;
    

    model.User.findOne({where: {email:email}})
    .then(user=>{
        if(!user){
            return res.status(404).send({message:"User not found"});
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken:null,
                message:"Invalid Password!"
            });
        }

        var token = jwt.sign(
            {
                id:user.id,
                email: user.email,
                admin: user.admin
            },config.secretKey,
            {
                expiresIn:'7d',
                issuer:'vixx.com',
                subject:'userinfo'
            }
        );
        res.status(200).send({
            success:true,
            accessToken:token
        })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
      });
}