const mongoose = require('mongoose')
const Contact = require('../model/ContactModel')

const ContactController = {
    index : async(req,res) =>{
        try {
            let contact = await Contact.find()
            return res.status(200).json(contact)            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    create : async(req,res) => {
        try {
            let {name,email,subject,message} = req.body
            let contact = await Contact.create({name,email,subject,message})
            return res.status(200).json(contact)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    detail : async(req,res) => {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json('invalid id')
            }
            let contact = await Contact.findById(id)
            if(!contact){
                return res.status(400).json('contact not found')
            }
            return res.status(200).json(contact)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    update : async(req,res)=>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json('invalid id')
            }
            let contact = await Contact.findById(id)
            if(!contact){
                return res.status(400).json('contact not found')
            }
            let updateContact = await Contact.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json({msg:'update success',updateContact})
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
            let contact = await Contact.findByIdAndDelete(id)
            if(!contact){
                return res.status(400).json('contact not found')
            }
            return res.status(200).json({msg:'delete success'})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = ContactController