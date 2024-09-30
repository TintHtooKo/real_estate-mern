const express = require('express')
const PropertyController = require('../controller/PropertyController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const upload = require('../helper/upload')
const router = express.Router()

router.get('',PropertyController.index)
router.post('/create',AuthMiddleware,PropertyController.create)
router.get('/detail/:id',PropertyController.detail)
router.patch('/update/:id',AuthMiddleware,PropertyController.update)
router.delete('/delete/:id',AuthMiddleware,PropertyController.delete)
router.post('/upload/:id',upload.array('image',12),AuthMiddleware,PropertyController.upload)


module.exports = router
