const models = require('../../../models');

exports.uploadPost = (req,res,next)=>{
    console.log(Object.values(req.decoded))
    models.Post.create({
        title:req.body.title,
        content:req.body.content,
        thumbnail:req.body.thumbnail,
        userId:req.decoded.id,
        images:Object.values(req.body.images),
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
        order:[["createdAt" ,"DESC"]],
        include:[
            {model: models.Image},
            {model:models.User}
        ],
        
    })
    .then((data)=>{
        res.json({
            success:true,
            posts:data
        })
    })
}