var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    thumbnail:{
        type:String
    },
    view:{
        type:Number,
        default:0
    },
    scope:{
        type:Number,
        default:0
    },
    category:{
        type:Number,
        default:0
    },
    score:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Post',postSchema);