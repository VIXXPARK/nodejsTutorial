const router = require('express').Router()
const controller = require('./controller')

router.get('/list',controller.list)
router.post('/assign-admin/:email',controller.assignAdmin)

module.exports= router
