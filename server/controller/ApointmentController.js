const mongoose = require('mongoose')
const Apointment = require('../model/Apointment')

const ApointmentController = {
    index : async(req,res) =>{
        try {
            let apoint = await Apointment.find()
                                         .populate({path :'agent',select : 'fullname'})
                                         .populate({path : 'property', select : 'name price image location rentsell'})
                                         .sort({createdAt : -1})
            return res.status(200).json(apoint)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    create : async(req,res) =>{
        try {
            let {name,email,phone,agent,property} = req.body
            let apoint = await Apointment.create({name,email,phone,agent,property})
            return res.status(200).json(apoint)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    detail : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json('invalid id')
            }
            let apoint = await Apointment.findById(id)
                                        .populate({path :'agent',select : 'fullname'})
                                        .populate({path : 'property', select : 'name price image location rentsell'})
            if(!apoint){
                return res.status(400).json('apoint not found')
            }
            return res.status(200).json(apoint)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    delete : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json('invalid id')
            }
            let apoint = await Apointment.findById(id)
            if(!apoint){
                return res.status(400).json('apoint not found')
            }
            let apointDelete = await Apointment.findByIdAndDelete(id)
            return res.status(200).json({msg:'delete success'})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = ApointmentController