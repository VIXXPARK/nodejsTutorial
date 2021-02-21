const router = require('express').Router()
const controller = require('./controller');
const authMiddleware = require('../../../middlewares/auth');

router.post('/uploadPost',authMiddleware,controller.uploadPost)
router.get('/getPost',controller.getPost)
router.post('/likeup',authMiddleware,controller.likeup)
router.get('/getLikePost',authMiddleware,controller.getLikePost)
router.post('/detailPost',controller.detailPost)
router.post('/sendmsg',authMiddleware,controller.sendMsg)
module.exports = router