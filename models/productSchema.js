const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{type:String,required:true},
    imageURL:{type:String,required:true},
    amount:{type:Number,required:true},
    price:{type:Number,required:true},
    active:Boolean,
    CreatedAt:Date,
    UpdatedAt:Date,
})

const Product = mongoose.model('products',productSchema)

module.exports = Product