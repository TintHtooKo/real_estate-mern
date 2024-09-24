const Role = require('../model/RoleModel')
const mongoose = require('mongoose')

const RoleController = {
    index : async(req,res) => {
        let role = await Role.find()
        return res.json(role)
    },

    create : async(req,res) => {
        try {
            let {role} = req.body
            let roleExist = await Role.findOne({role})
            if(roleExist){
                return res.status(400).json('role already exist')
            }
            
            let newRole = await Role.create({role})
            return res.status(200).json(newRole)
            
        } catch (e) {
            return res.status(500).json(e.message)
        }
    },

    detail : async(req,res) => {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json('invalid id')
            }
            let role = await Role.findById(id)
            if(!role){
                return res.status(400).json('role not found')
            }
            return res.status(200).json(role)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    },

    update : async(req,res) => {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json('invalid id')
            }
            let role = await Role.findById(id)
            if(!role){
                return res.status(400).json('role not found')
            }
            let roleUpdate = await Role.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json({msg:'update success',roleUpdate})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    },

    delete : async(req,res) => {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json('invalid id')
            }
            let role = await Role.findById(id)
            if(!role){
                return res.status(400).json('role not found')
            }
            let roleDelete = await Role.findByIdAndDelete(id)
            return res.status(200).json({msg:'delete success'})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

module.exports = RoleController