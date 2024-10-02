const express = require('express')
const ContactController = require('../controller/ContactController')
const router = express.Router()

router.get('',ContactController.index)
router.post('/create',ContactController.create)
router.get('/detail/:id',ContactController.detail)
router.delete('/delete/:id',ContactController.delete)

module.exports = router