const express = require('express')
const ApointmentController = require('../controller/ApointmentController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const router = express.Router()

router.get('',AuthMiddleware,ApointmentController.index)
router.post('/create',AuthMiddleware,ApointmentController.create)
router.get('/detail/:id',AuthMiddleware,ApointmentController.detail)
router.delete('/delete/:id',AuthMiddleware,ApointmentController.delete)

module.exports = router