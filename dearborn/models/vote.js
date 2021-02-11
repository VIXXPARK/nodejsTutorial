var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vote = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Vote',Vote);