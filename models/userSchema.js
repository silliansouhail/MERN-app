const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    userType:{type:String,required:true},
    product_required:[Object],
    isAdmin:Boolean,
    active:Boolean,
    CreatedAt:Date,
})

const User = mongoose.model('users',userSchema)

module.exports = User