const router = require('express').Router()
const controller = require('./controller')
const Post = require('../../../models/post')
const jwt_decode = require('jwt-decode');
const authMiddleware = require('../../../middlewares/auth');

router.post('/uploadPost',authMiddleware,controller.uploadPost)
router.post('/delete',authMiddleware,controller.delete)
router.get('/getPost',controller.getPost)
router.post('/getPostDetail',authMiddleware,controller.getPostDetail)
router.post('/getProfile',authMiddleware,controller.getProfile)
router.post('/likeup',authMiddleware,controller.likeUp)
router.post('/likedown',authMiddleware,controller.likeDown)

router.delete('/:postId',authMiddleware,(req,res,next)=>{
    Post.findOne(req.params._id)
    .then((resp)=>{
        res.json({
            success:true,
            resp
        })
    },(err)=>next(err))
})

router.put('/:postId',authMiddleware,(req,res,next)=>{
    Post.findByIdAndUpdate(req.params.postId,{
        $set: req.body
    },{new:true})
    .then((posts)=>{
        res.json({
            success: true,
            posts
        })
    })
})

module.exports=router