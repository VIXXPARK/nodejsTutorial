const router = require('express').Router();
const controller = require('./controller');
const authMiddleware = require('../../../middlewares/auth');
router.post('/register',controller.register)
router.post('/login',controller.login)
router.get('/assign',authMiddleware,controller.assignAdmin)
module.exports = router