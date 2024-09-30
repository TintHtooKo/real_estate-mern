const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PropertyModel = new Schema({
    name : {
        type : String,
        required : true
    },
    type : {
        type : Schema.Types.ObjectId,
        ref : 'HomeType',
        required : true
    },
    rentsell : {
        type : Schema.Types.ObjectId,
        ref : 'RentOrSell',
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    moreinfo : {
        type : String,
        required : true
    },
    bedroom : {
        type : Number,
        required : true
    },
    bathroom : {
        type : Number,
        required : true
    },
    sqft : {
        type : Number,
        required : true
    },
    location : {
        type : String,
        required : true
    },

    image : [{
        type : String,
    }],

},{timestamps : true})

module.exports = mongoose.model('Property',PropertyModel)