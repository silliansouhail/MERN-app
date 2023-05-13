const { async } = require('rxjs')
const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
    register: async (req,res)=>{
        const {name,email,password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({message:'Please fill all required fields'})
        }

        if(await User.findOne({email})){
            return res.status(400).json({message:'User already exists'})
        }

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await  User.create({
            name,
            email,
            password:hashedPassword,
            userType:'Client',
            isAdmin:false,
            active: false,
            CreatedAt: Date.now(),
        })

        if(user){
            res.status(201).json({
                message:'User created successfully',
                _id: user._id,
                name: user.name,
                email: user.email,
                token: genToken(user._id)
            })
        }
    },

    login: async (req,res)=>{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({message:'Please fill all your information'})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'Opse you have an invalid email or invalid password'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:'Opse you have an invalid email or invalid password'})
        }
        
        const userToActivate = await User.findOne({email})
        
        if (userToActivate.active) {
            return res.status(400).json({message:"The account already active and you are not allowed to use this account"})
        }

        await User.updateOne({_id:userToActivate._id},{active:true})

        if (userToActivate.isAdmin && userToActivate.userType==='administrator') {
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                type:'admin',
                token: genToken(user._id)
            })
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: genToken(user._id)
        })
    },
    logout:async (req,res)=>{
        const {_id} = req.body
        await User.updateOne({_id:_id},{active:false})
        res.status(200).json({message:'user logged out'})
    },

    me: async (req,res)=>{
        return res.status(200).json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        })
    },

    getUsers:async (req, res,) =>{
        const userList = await User.find()
        res.send(userList)
    },

    updateStatus: async (req, res) => {
        const {_id} = req.body
        const userToUpdate = await User.findOne({_id})

        await User.updateOne({_id:userToUpdate._id},{isAdmin:true,userType:'administrator'})
        res.status(200).json({message:"updated to admin is success"})
    },

    updateUser_product : async(req,res) => {
        console.log(req.body);
        const {order_date,user_id,basket} = req.body;
        await User.updateOne({_id:user_id},{$push: {product_required:req.body}})
    }
}

const genToken = (id)=>{
    return  jwt.sign({id},process.env.CRYPT_KEY,{expiresIn:'30h'})
}

module.exports = userController