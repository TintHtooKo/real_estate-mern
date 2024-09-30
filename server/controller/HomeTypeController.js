const Type = require('../model/HomeTypeModel')
const mongoose = require('mongoose')
const HomeTypeController = {
    index : async(req,res) => {
        try {
            let currentUser = req.user
            if(currentUser.role.role !== 'superadmin' && currentUser.role.role !=='admin'){
                return res.status(400).json({msg:'Only superadmin and admin can access this route'})
            }           
            let type = await Type.find().sort({createdAt : -1})
            return res.status(200).json(type)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    create : async(req,res) =>{
        try {
            let currentUser = req.user
            if(currentUser.role.role !== 'superadmin' && currentUser.role.role !=='admin'){
                return res.status(400).json({msg:'Only superadmin and admin can access this route'})
            }    
            let {name} = req.body
            let type = await Type.create({name})
            return res.status(200).json(type)
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
            let type = await Type.findById(id)
            if(!type){
                return res.status(400).json('type not found')
            }
            return res.status(200).json(type)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    update : async(req,res) =>{
        let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json('invalid id')
        }
        let type = await Type.findById(id)
        if(!type){
            return res.status(400).json('type not found')
        }
        let typeUpdate = await Type.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json({msg:'update success',typeUpdate})
    },

    delete : async(req,res)=>{
        try {
            let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json('invalid id')
        }
        let type = await Type.findById(id)
        if(!type){
            return res.status(400).json('type not found')
        }
        let typeDelete = await Type.findByIdAndDelete(id)
        return res.status(200).json({msg:'delete success'})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = HomeTypeController