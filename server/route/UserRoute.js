const express = require('express')
const UserController = require('../controller/UserController')
const router = express.Router()
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.post('/logout',UserController.logout)
router.get('/me',AuthMiddleware,UserController.me) 
router.get('/userlist',AuthMiddleware,UserController.userlist)
router.get('/adminlist',AuthMiddleware,UserController.adminlist)
router.post('/addadmin',AuthMiddleware,UserController.addAdmin)
router.delete('/delete/:id',AuthMiddleware,UserController.delete)


module.exports = router 