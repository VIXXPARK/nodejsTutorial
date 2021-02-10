const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
exports.register = (req, res) => {
    const {email,password,nickname,profile} = req.body
    let newUser = null

    const create = (user)=>{
        if(user){
            throw new Error('email exists');
        }else{
            return User.create(email,password,nickname,profile)
        }
    }
    //count the number of the user
    const count = (user)=>{
        newUser = user
        return User.count({}).exec()
    }

    // assign admin if count is 1
    const assign = (count) =>{
        if(count===1){
            return newUser.assignAdmin()
        }else{
            //if not, return a promise that returns false
            return Promise.resolve(false)
        }
    }

    // respond to the client
    const respond = (isAdmin)=>{
        res.json({
            message: 'registered successfully',
            admin: isAdmin? true: false
        })
    }

    // run when there is an error(email exists)
    const onError = (error)=>{
        res.status(409).json({
            // message: error.message()
        })
    }

    //check email duplication
    User.findOneByUsername(email)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .then(onError)
}
exports.login = (req, res) => {
    const {email,password} = req.body;
    const secret = config.secretKey

    //check the user info & generate the jwt
    
    const check= (user)=>{
        if(!user){
            //user does not exist
            throw new Error('login failed')
        }else{
            //user exists,check the password
            if(user.verify(password)){
                //create a promise that generate jwt asychronously
                const p = new Promise((resolve,reject)=>{
                    jwt.sign(
                        {
                            _id:user._id,
                            email: user.email,
                            admin: user.admin
                        },secret,
                        {
                            expiresIn:'7d',
                            issuer:'vixx.com',
                            subject:'userinfo'
                        },(err,token)=>{
                            if (err) reject(err)
                            resolve(token)
                        })
                })
                return p
            }else{
                throw new Error('login failed')
            }
        }
    }

    //respond the token
    const respond = (token)=>{
        res.json({
            message:'logged in successfully',
            token
        })
    }

    // const onError = (error)=>{
    //     error = new Error('fail')
    //     res.status(403).json({
    //         message:error.message
    //     })
    // }

    User.findOneByUsername(email)
    .then(check)
    .then(respond)
    // .then(onError)
}

exports.check = (req,res) => {
    res.json({
        success:true,
        info:req.decoded
    })
}

