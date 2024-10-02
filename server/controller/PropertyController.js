const removeFile = require('../helper/removeFile')
const Property = require('../model/PropertyModel')
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');

const PropertyController = {

    index : async(req,res) => {
        try {
            let property = await Property.find().populate('rentsell').populate('type').sort({createdAt : -1})
            return res.status(200).json(property)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },
 
    create : async(req,res) => {
        try {
            let currentUser = req.user
            if(currentUser.role.role !== 'superadmin' && currentUser.role.role !=='admin'){
                return res.status(400).json({msg:'Only superadmin and admin can access this route'})
            }
            let {name,type,rentsell,price,desc,moreinfo,bedroom,location,bathroom,sqft} = req.body
            let newProperty = await Property.create({name,type,rentsell,price,desc,moreinfo,bedroom,location,bathroom,sqft})
            return res.status(200).json(newProperty)
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
            let property = await Property.findById(id).populate('rentsell').populate('type')
            if(!property){
                return res.status(400).json('property not found')
            }
            
            return res.status(200).json(property)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    update: async (req, res) => {
        try {
            let currentUser = req.user;
            if (currentUser.role.role !== 'superadmin' && currentUser.role.role !== 'admin') {
                return res.status(400).json({ msg: 'Only superadmin and admin can access this route' });
            }
    
            let id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json('Invalid ID');
            }
    
            let property = await Property.findById(id);
            if (!property) {
                return res.status(400).json('Property not found');
            }
            // Update other fields
            const updateData = { ...req.body}; // Ensure to include the updated image array
            let propertyUpdate = await Property.findByIdAndUpdate(id, updateData, { new: true });
    
            return res.status(200).json({ msg: 'Update success', propertyUpdate });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    },
    

    delete : async(req,res) => {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json('invalid id')
            }
            let property = await Property.findById(id)
            if(!property){
                return res.status(400).json('property not found')
            }
            if(property.image){
                property.image.map(async(img)=>{
                    await removeFile(__dirname + '/../public' + img)
                })
            }
            let propertyDelete = await Property.findByIdAndDelete(id)
            
            return res.status(200).json({msg:'delete success'})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    upload : async(req,res) => {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json('invalid id')
            }
            let property = await Property.findById(id)
            if(!property){
                return res.status(400).json('property not found')
            }
            let uploadImg = {image : req.files.map(file => '/' + file.filename)}            
            if(property.image && property.image !== uploadImg){
                property.image.map(async(img)=>{
                    await removeFile(__dirname + '/../public' + img)
                })
            } 
            let propertyUpdate = await Property.findByIdAndUpdate(id,uploadImg,{new:true})
            return res.status(200).json({msg:'update success',propertyUpdate})
        } catch (error) {
            return res.status(500).json(error.message)
        } 
    },


}

module.exports = PropertyController