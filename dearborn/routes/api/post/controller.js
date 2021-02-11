const Post = require('../../../models/post');
const User = require('../../../models/user');
const Like = require('../../../models/like');
const jwt_decode = require('jwt-decode');
const authMiddleware = require('../../../middlewares/auth');

exports.uploadPost = (req,res)=>{
    var decoded=jwt_decode(req.headers['x-access-token']) 
    const {title,content,thumbnail,images} = req.body
    const userId = decoded._id
    console.log(userId)
    Post.create(title,content,thumbnail,images,userId)
        .then(res.json({
            success:true
        }))
}
exports.delete = (req,res)=>{
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
}

exports.getPost = (req,res)=>{
    Post.find({})
    .then((posts)=>{
        res.json({
            success:true,
            posts
        })
    })
}

exports.getPostDetail = (req,res)=>{
    Post.findById(req.body.postId)
    .then((submission)=>{
        res.json({
            success:true,
            submission
        })
    })
}

exports.getProfile = (req,res,next)=>{
    Post.findById(req.body.postId)
    .then((submission)=>{
        const view=submission.view
        User.findById(submission.user)
        .then((profile)=>{
            Like.count({},function(err,num){
                if(err){
                    res.json({
                        success:false
                    })
                }
                else{
                    res.json({
                        success:true,
                        profile,
                        view,
                        num
                    })
                }
            })
            
        })
        .catch((err)=>next(err))
    },(err)=>next(err))
}

exports.likeUp =(req,res,next)=>{
    var decoded=jwt_decode(req.headers['x-access-token'])
    var like=new Like();
    like.userId=decoded._id
    like.postId=req.body.postId
    Like.count({userId:decoded._id,postId:req.body.postId},function(err,num){
        if (num==0){
            Post.findById(req.body.postId)
            .then((posts)=>{
                console.log(posts.user)
                console.log(decoded._id)
                if(posts.user==decoded._id){
                    res.json({message:"not authenticated!!"})
                }
                else{
                    like.save((err)=>{
                        if(err){
                            res.json({
                                success:false
                            })
                        }
                        res.json({
                            success:true,
                            like
                        })
                    })
                }
            })

        }
        else{
            res.json({
                message:"already exists!!"
            })
        }

    })

}
exports.likeDown =(req,res,next)=>{
    var decoded=jwt_decode(req.headers['x-access-token']) 
    Like.remove({userId:decoded._id})
    .then((like)=>{
        res.json({
            success:true,
            like
        })
    })
}
