const RentOrSell = require('../model/RentOrSellModel')
const mongoose = require('mongoose')

const RentOrSellController = {
    index : async(req,res)=>{
        try {
            let rentsell = await RentOrSell.find()
            return res.status(200).json(rentsell)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    create : async(req,res)=>{
        try {
            let {name} = req.body
            let rentsell = await RentOrSell.create({name})
            return res.status(200).json(rentsell)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    delete : async(req,res)=>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json('invalid id')
            }
            let rentsell = await RentOrSell.findByIdAndDelete(id)
            if(!rentsell){
                return res.status(400).json('rentsell not found')
            }
            let rentsellDelete = await RentOrSell.findByIdAndDelete(id)
            return res.status(200).json({msg:'delete success'})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = RentOrSellController