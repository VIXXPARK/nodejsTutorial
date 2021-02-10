var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto')
const config = require('../config');
var User = new Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    nickname:{
        type:String,
        default:'',
        required:true
    },
    profile:{
        type:String,
        required: true
    },
    job:{
        type:Number,
        dfault:1
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
}
);

User.statics.create= function(email,password,nickname,profile){
    const encrypted = crypto.createHmac('sha1', config.secretKey)
                      .update(password)
                      .digest('base64')

    const user = new this({
        email,
        password: encrypted,
        nickname,
        profile
    })

    return user.save()
};

User.statics.findOneByUsername = function(email){
    return this.findOne({
        email
    }).exec()
}

User.methods.verify = function(password){
    const encrypted = crypto.createHmac('sha1', config.secretKey)
                      .update(password)
                      .digest('base64')
    return this.password === encrypted
}

User.methods.assignAdmin = function(){
    this.admin=true
    return this.save()
}

module.exports = mongoose.model('User',User);