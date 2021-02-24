const router = require('express').Router()
const express =require('express')
const controller = require('./controller');
const multer = require('multer');
var path = require('path');
const authMiddleware = require('../../../middlewares/auth');
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/images');
      },
      // filename: function (req, file, cb) {
      //   cb(null, new Date().valueOf() + path.extname(file.originalname));
      // }
    }),
    dest:'public/images'
  });


router.post('/uploadPost',upload.fields([{name:'images',maxCount:20},{name:'thumbnail',maxCount:1}]),authMiddleware,controller.uploadPost)
router.get('/getPost',express.static('public/images'),controller.getPost)
router.post('/likeup',authMiddleware,controller.likeup)
router.get('/getLikePost',authMiddleware,express.static('public/images'),controller.getLikePost)
router.post('/detailPost',express.static('public/images'),controller.detailPost)
router.post('/sendmsg',authMiddleware,controller.sendMsg)
router.post('/getmsg',controller.getMsg)
router.post('/updatemsg',authMiddleware,controller.updateMsg)
module.exports = router