const router = require('express').Router()
const controller = require('./controller');
const authMiddleware = require('../../../middlewares/auth');

router.post('/uploadPost',authMiddleware,controller.uploadPost)
router.get('/getPost',controller.getPost)

module.exports = router