const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

const isAuth = (req,res,next)=>{
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
        return res.status(401).json({message:'Unauthorized access detected'})
    }else{
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token,process.env.CRYPT_KEY,async(error,decode)=>{
            if(error){
                return res.status(401).json({message:'Unauthorized access detected'})
            }else{
                const user = await User.findById(decode.id)
                req.user = user
                next()
            }
        })
    }
}

module.exports = isAuth;