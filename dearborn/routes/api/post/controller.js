const Post = require('../../../models/post');
const User = require('../../../models/user');
const Like = require('../../../models/like');
const disLike = require('../../../models/dislike');
const jwt_decode = require('jwt-decode');

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


// exports.getPost = (req,res)=>{
//     Post.find({})
//     .then((posts)=>{
//         const pageCount=Math.ceil(posts.length/10)
//         let page = parseInt(req.query.p);
//         if(!page){page=1}
//         if (page>pageCount){
//             page=pageCount
//         }
//         res.json({
//             success:true,
//             "post" : posts.slice(page*10-10,page*10),
//             "pageCount": pageCount,
//             "page":page
//         })
//     })
// }

exports.getPost = (req,res)=>{
    Post.find({})
    .then((posts)=>{
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        if(limit>posts.length-offset){
            limit=posts.length-offset
        }
        let jsonPost= new Array();
        for(step=offset;step<offset+limit;step++){
            var postItem= new Object();
            var nickname='';
            var profile='';
            let user_id = posts[step]["user"];
            postItem.view=posts[step]["view"];
            postItem.scope=posts[step]["scope"];
            postItem.category=posts[step]["category"];
            postItem.score=posts[step]["score"];
            postItem._id=posts[step]["_id"];
            postItem.title=posts[step]["title"];
            postItem.content=posts[step]["content"];
            postItem.thumbnail=posts[step]["thumbnail"];
            postItem.images = posts[step]["images"];
            var info = [];
            User.findById(user_id).exec(function(err,results){
                info.push(results);
                console.log(results.nickname)
            });
            console.log(info)
            // postItem.profile=info.profile;
            // postItem.nickname=info.nickname;
            jsonPost.push(postItem);
        }
        res.json({
            success:true,
            "post": jsonPost,
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