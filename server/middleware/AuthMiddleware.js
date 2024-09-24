const jwtToken = require('jsonwebtoken')
const User = require('../model/UserModel')
const AuthMiddleware = (req,res,next) =>{
    let token = req.cookies.jwt
    if(token){
        jwtToken.verify(token,process.env.JWT_SECRET,(err,decodedValue)=>{
            if(err){
                return res.status(401).json({msg:'Unauthenticate'})
            }else{
                User.findById(decodedValue._id).then(user =>{
                    req.user = user;
                    next()
                });              
            }
        })
        
    }else{
        return res.status(400).json({msg:'token need to provide'})
    }
    
}

module.exports = AuthMiddleware