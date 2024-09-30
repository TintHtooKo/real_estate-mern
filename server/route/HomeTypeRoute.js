const express = require('express')
const HomeTypeController = require('../controller/HomeTypeController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const router = express.Router()

router.get('',AuthMiddleware,HomeTypeController.index)
router.post('/create',AuthMiddleware,HomeTypeController.create)
router.get('/detail/:id',AuthMiddleware,HomeTypeController.detail)
router.patch('/update/:id',AuthMiddleware,HomeTypeController.update)
router.delete('/delete/:id',AuthMiddleware,HomeTypeController.delete)

module.exports = router