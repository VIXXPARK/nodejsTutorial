var mongoose = require('mongoose');
const { post } = require('../app');
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
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User'
    // },
    image:{
        type:String,
        required: true
    }
},{
    timestamps:true
});

postSchema.statics.create = function(title,content,thumbnail,image){
    const post = new this({
        title,
        content,
        thumbnail,
        image
    })
    return post.save()
}



module.exports = mongoose.model('Post',postSchema);