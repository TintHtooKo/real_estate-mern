const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type :Schema.Types.ObjectId,
        ref : 'Role',
    },
    profile : {
        type : String,
        default : null
    }
},{timestamps : true})


module.exports = mongoose.model('User',UserSchema)