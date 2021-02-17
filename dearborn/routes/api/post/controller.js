const Post = require('../../../models/post');
const User = require('../../../models/user');
const Like = require('../../../models/like');
const disLike = require('../../../models/dislike');
const Vote = require('../../../models/vote');

exports.uploadPost = (req,res)=>{
    const {title,content,thumbnail,images} = req.body
    const userId = req.decoded._id
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
    .populate("user") //join과 비슷한 역할 
    .sort({"createdAt":-1})
    .exec((err,results)=>{
        if(err) return res.status(400).send(err);
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        if(limit>results.length-offset){
            limit=results.length-offset
        }
        res.json({
            success:true,
            "post": results.slice(offset,offset+limit),
            "Nextoffset":offset+limit
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
    var like=new Like();
    like.userId=req.decoded._id
    like.postId=req.body.postId
    Like.count({userId:req.decoded._id,postId:req.body.postId},function(err,num){
        if (num==0){
            Post.findById(req.body.postId)
            .then((posts)=>{
                console.log(posts.user)
                console.log(req.decoded._id)
                if(posts.user==req.decoded._id){
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
    Like.remove({userId:req.decoded._id,postId:req.body.postId})
    .then((like)=>{
        res.json({
            success:true,
            like
        })
    })
}


exports.dislikeUp = (req,res,next)=>{
    var result = new disLike();
    result.userId=req.decoded._id;
    result.postId=req.body.postId;
    Like.remove({userId:req.decoded._id,postId:req.body.postId})
    .then((data)=>{
        result.save()
        console.log(data)
        res.json({
            success:true,
            result
        })
    })
}

exports.dislikedown = (req,res,next)=>{
    disLike.remove({userId:req.decoded._id,postId:req.body.postId})
    .then((result)=>{
        res.json({
            success:true,
            result
        })
    })
}

exports.getlikePost = (req,res,next)=>{
    Like.find({userId:req.decoded._id})
    .then((datas)=>{
        var limit = parseInt(req.query.limit) 
        var offset = parseInt(req.query.offset)
        res.json({
            success:true,
            "posts":datas.slice(offset,offset+limit)
        })
    })
    
    
}

exports.upView = (req,res,next)=>{
    Post.findById(req.body.postId)
    .then((post)=>{
        post.view+=1;
        post.save();
        res.json({
            success:true,
            post:post
        })
    })
}