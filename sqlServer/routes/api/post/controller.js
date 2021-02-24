const { sequelize, Sequelize } = require('../../../models');
const models = require('../../../models');
const post = require('../../../models/post');

exports.uploadPost = (req,res,next)=>{
    imagePath=[];
    for(idx in req.files['images']){
        var x={image:req.files['images'][idx].path}
        imagePath.push(x)
    }
    models.Post.create({
        title:req.body.title,
        content:req.body.content,
        thumbnail:req.files['thumbnail'][0].path,
        userId:req.decoded.id,
        images:Object.values(imagePath),
        createdAt:new Date().getTime(),
        updatedAt:new Date().getTime()

    },{
        include:[models.Image]
    })
    .then(result=>{
        res.json({
            success:true,
            result
        })
    }).catch(err=>{
        res.status(400).send({success:false})
    })
}

exports.getPost = (req,res,next)=>{
    models.Post.findAll({
        offset:parseInt(req.query.offset),
        limit:parseInt(req.query.limit),
        order:[["createdAt" ,"DESC"]],
        include:[
            {model: models.Image},
            {model:models.User,attributes:['nickname','profile','job']},
        ]
    })
    .then((data)=>{
        res.json({
            success:true,
            posts:data
        })
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

exports.likeup = (req,res,next)=>{
    models.Post.findOne({where:{id:req.body.postId}})
    .then((postData)=>{
        if(postData.userId==req.decoded.id||postData.userId==req.body.userId){
            res.status(400).send({message:"not allowed!"})
        }
        else{
            
            models.Like.count({
                where:{
                    userId:req.decoded.id||req.body.userId,
                    postId:req.body.postId
                }
            })
            .then((isThere)=>{
                if(!isThere){
                    postData.like_count+=1
                    postData.save();
                    models.Like.create({
                        userId:req.decoded.id||req.body.userId,
                        postId:req.body.postId
                    },{
                        include:[{model: models.Post},{model: models.User}]
                    })
                    .then((data)=>{
                        res.json({
                            success:true,
                            data:data
                        })
                    })
                    .catch((err)=>{
                        res.json(err)
                    })
                }
                else{
                    if(postData.like_count>0){
                        postData.like_count-=1
                        postData.save();
                    }
                    models.Like.destroy({where:{
                            userId:req.decoded.id||req.body.userId,
                            postId:req.body.postId
                        }
                    })
                    .then((data)=>{
                        
                        res.json({
                            message:"decrease the like",
                            data
                        })
                    })
                }
            })
            
        }
    })
}

exports.getLikePost = (req,res,next)=>{
    models.Like.findAll(    
        {
            limit:parseInt(req.query.limit),
            offset:parseInt(req.query.offset),
            where:{
                userId:req.decoded.id
            }
        }
        )
    .then((datas)=>{
        res.json({
            success:true,
            posts:datas
        })
    })
    .catch(err=>{
        res.status(400).send({
            message:"error"
        })
    })
}

exports.detailPost = (req,res,next)=>{
    models.Post.findOne({
        where:{id:req.body.postId},
        include:[
            {model: models.Image},
            {model:models.User,attributes:['nickname','profile','job']}
        ]
    })
    .then((data)=>{
        data.view+=1
        data.save()
        res.json({
            success:true,
            detail:data
        })
    })
    .catch(err=>{
        res.status(400).send({
            message:err
        })
    })
}

exports.sendMsg = (req,res,next)=>{
    models.Comment.create({
        comment_content:req.body.comment_content,
        userId:req.decoded.id,
        postId:req.body.postId,
        createdAt:new Date().getTime(),
        updatedAt:new Date().getTime()
    })
    .then((data)=>{
        res.json({
            success:true,
            comment:data
        })
    })
    .catch(err=>{
        res.status(400).send({
            message:err
        })
    })
}

exports.getMsg = (req,res,next)=>{
    models.Comment.findAll({
        where:{postId:req.body.postId},
        order:[["createdAt" ,"DESC"]],
    })
    .then((data)=>{
        res.json({
            success:true,
            msg:data
        })
    })
}

exports.updateMsg = (req,res,next)=>{
    models.Comment.findOne({
        where:{
            id:req.body.commentId,
            userId:req.decoded.id
        }
    })
    .then((data)=>{
        data.comment_content=req.body.comment_content
        data.updatedAt=new Date().getTime()
        data.save()
        res.status(200).json({
            success:true,
            msg:data
        })
    })
}