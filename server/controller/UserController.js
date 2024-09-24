const createToken = require('../token/createToken')
const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const Role = require('../model/RoleModel')

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
    }
}

module.exports = UserController