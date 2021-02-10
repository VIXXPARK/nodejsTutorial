const Post = require('../../../models/post');
const User = require('../../../models/user');
const jwt_decode = require('jwt-decode');
exports.uploadPost = (req,res)=>{
    var decoded=jwt_decode(req.headers['x-access-token']) 
    console.log(jwt_decode(req.headers['x-access-token']))
    if(!decoded.email){
        return res.status(403).json({
            success:false
        })
    }
    console.log(req.body)
    const {title,content,thumbnail,image} = req.body
    const userId = decoded._id
    console.log(userId)
    Post.create(title,content,thumbnail,image,userId)
        .then(res.json({
            success:true
        }))
    
}

exports.delete = (req,res)=>{
    var decoded=jwt_decode(req.headers['x-access-token']) 
    if(req.body.userId === decoded._id){
        Post.findById(req.body.postId)
        .then((posts)=>{
            if(posts!=null){
                posts.remove()
            }
            
            res.json({
                success:true,
                posts
            })
           
        })
    }else{
        res.json({
            success:false
        })
    }
}