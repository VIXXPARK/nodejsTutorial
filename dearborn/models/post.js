var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


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
    },
    images:[imageSchema]
},{
    timestamps:true
});

postSchema.statics.create = function(title,content,thumbnail,images,user){
    const post = new this({
        title,
        content,
        thumbnail,
        images,
        user
    })
    return post.save()
}

module.exports = mongoose.model('Post',postSchema);