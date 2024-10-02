const createToken = require('../token/createToken')
const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const Role = require('../model/RoleModel')
const mongoose = require('mongoose')
const removeFile = require('../helper/removeFile')

const UserController = {
    register : async(req,res) => { 
       try {
            let {fullname,email,phone,password,role} = req.body
            let emailExist = await User.findOne({email})
            if(emailExist){
                return res.status(400).json({msg:'Email already Register!!!'})
            }
            let phoneExist = await User.findOne({phone})
            if(phoneExist){
                return res.status(400).json({msg:'This Phone number is already used!!!'})
            }

            if(!role){
                try {
                    let defaultRole = await Role.findOne({role : 'user'})
                    if(defaultRole){
                        role = defaultRole._id;
                    }else{
                        throw new Error('user role not found')
                    }
                } catch (error) {
                    console.log('Error fetching default role:', error.message);
                    throw new Error("Role assignment failed.");
                }
            }

            let salt = await bcrypt.genSalt()
            let hashPassword = await bcrypt.hash(password,salt)

            let user = await User.create({fullname,email,phone,password:hashPassword,role})
            let token = createToken(user._id)
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000})

            return res.status(200).json({user,token})

       } catch (error) {
            return res.status(500).json(error.message)
       }
    },

    login : async(req,res) => {
       try {
        let {email,password} = req.body
        let user = await User.findOne({email}).populate('role')
        if(!user){
            return res.status(400).json({msg:"Email does not register"})
        }

        let checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            return res.status(400).json({msg:"Password does not match"})
        }

        let token = createToken(user._id)
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000})
        return res.status(200).json({user,token})
       } catch (error) {
        return res.status(500).json(error.message)
       }
    },

    logout : async(req,res) => {
       res.cookie('jwt','',{maxAge:1})
       return res.status(200).json({msg:"Logout"})
    },

    me : async(req,res) =>{
        return res.json(req.user)
    },

    userlist : async(req,res) =>{
        try {
            // user role nae find yin user role ma hote tr ka role mhr null nae htwt nay mal
            // eg . userlist htoke kyi yin role admin mhr role null phit nay mal
            // therefore null phit tae user ko ma u chin loh filter lote mal
            // ae dr so user list ya mal

            //skip method ka page 3 yout yin (3-1)*5 =10 so tot page 3 mhr 11 ka nay sa pya ag
            let userlist = await User.find()
            .populate({
                path:'role',
                match : {role : 'user'}
            }).sort({createdAt : -1})


            userlist = userlist.filter(user => user.role !== null)

            return res.status(200).json(userlist)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    adminlist : async(req,res)=>{
        try {
            // let adminlist = await User.find().populate({
            //     path : 'role',
            //     match : {role : {$in : ['superadmin','admin']}}
            // })

            //find ya mhr two or more so yin $in nae shar
            //The $in operator in MongoDB is used to match documents where a field's value is any one of the values specified in an array.

            //admin pal shar chin loh
            let adminlist = await User.find().populate({
                path : 'role',
                match : {role : 'admin'}
            }).sort({createdAt : -1})

            adminlist = adminlist.filter(admin => admin.role !== null)

            return res.status(200).json(adminlist)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    },

    addAdmin : async(req,res) =>{
        try {
            let {fullname,email,phone,password,role} = req.body
            let emailExist = await User.findOne({email})
            if(emailExist){
                return res.status(400).json({msg:'Email already Register!!!'})
            }
            let phoneExist = await User.findOne({phone})
            if(phoneExist){
                return res.status(400).json({msg:'This Phone number is already used!!!'})
            }

            if(!role){
                try {
                    let defaultRole = await Role.findOne({role : 'admin'})
                    if(defaultRole){
                        role = defaultRole._id;
                    }else{
                        throw new Error('admin role not found')
                    }
                } catch (error) {
                    console.log('Error fetching default role:', error.message);
                    throw new Error("Role assignment failed.");
                }
            }

            let salt = await bcrypt.genSalt()
            let hashPassword = await bcrypt.hash(password,salt)

            let admin = await User.create({fullname,email,phone,password:hashPassword,role})

            return res.status(200).json(admin)
        } catch (error) {
            return res.status(500).json(error.message)
        } 
    },

    delete : async(req,res) =>{
        try {
            let currentUser = req.user
            // return res.json(currentUser.role.role)
            if(currentUser.role.role !== 'superadmin'){
                return res.status(400).json({msg:'Only superadmin can delete user'})
            }else{
                let id = req.params.id
                if(!mongoose.Types.ObjectId.isValid(id)){
                    return res.status(400).json('invalid id')
                }
                let user = await User.findById(id)
                if(!user){
                    return res.status(400).json('user not found')
                }
                let userDelete = await User.findByIdAndDelete(id)
                return res.status(200).json({msg:'delete success'})
            }
            
        } catch (error) {
            return res.status(500).json(error.message)
        }  
    },

    changePassword : async(req,res) =>{
        let currentUser = req.user
        let {oldpassword,newpassword} = req.body
        let user = await User.findById(currentUser._id)
        let checkPassword = await bcrypt.compare(oldpassword,user.password)
        if(!checkPassword){
            return res.status(400).json({msg:'Old Password does not match'})
        }
        let salt = await bcrypt.genSalt()
        let hashPassword = await bcrypt.hash(newpassword,salt)
        user.password = hashPassword
        await user.save()
        return res.status(200).json({msg:'password changed'})
    },

    editProfile : async(req,res) => {
        let currentUser = req.user
        let {fullname,phone} = req.body
        let user = await User.findById(currentUser._id)
        user.fullname = fullname
        user.phone = phone
        await user.save()
        return res.status(200).json({msg:'profile updated'})
    },

    uploadProfile : async(req,res) =>{
        try {
            let currentUser = req.user
            let user = await User.findById(currentUser._id)
            let profile = {profile : '/' + req.file.filename}
            if(user.profile && user.profile !== profile){
                await removeFile(__dirname + '/../public' + user.profile)
            }
            let data = await User.findByIdAndUpdate(currentUser._id,profile,{new : true})
            return res.status(200).json({data,msg:'profile updated'})
        } catch (error) { 
            console.log(error);
              
        }
    }

    
}

module.exports = UserController