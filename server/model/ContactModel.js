const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ContactSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    read : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

module.exports = mongoose.model('Contact',ContactSchema)