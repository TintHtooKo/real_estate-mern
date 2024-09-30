const express = require('express')
const RentOrSellController = require('../controller/RentOrSellController')
const router = express.Router()

router.get('',RentOrSellController.index)
router.post('/create',RentOrSellController.create)
router.delete('/delete/:id',RentOrSellController.delete)

module.exports = router