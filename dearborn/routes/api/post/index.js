const router = require('express').Router()
const controller = require('./controller')

router.post('/uploadPost',controller.uploadPost)
router.post('/delete',controller.delete)
module.exports=router