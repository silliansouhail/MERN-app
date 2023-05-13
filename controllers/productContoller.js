
const Product = require('../models/productSchema')


const productController = {

    getProducts:async(req,res) => {
        const productList = await Product.find()
        res.send(productList)
    },

    addProduct:async(req,res)=>{
        const {name,imageURL,amount,price} = req.body

        const product = await  Product.create({
            name,
            imageURL,
            amount,
            price,
            active: true,
            CreatedAt: Date.now(),
            UpdatedAt: Date.now(),
        })

        if(product){
            res.status(201).json({
                message:'Product added successfully',
            })
        }
    } ,

    updateProduct:async(req,res)=>{
        const {_id,name,imageURL,amount,price} = req.body;
        const productToUpdate = await Product.findOne({_id})
        await Product.updateOne({_id:productToUpdate._id},{
            name:name,
            imageURL:imageURL,
            amount:amount,
            price:price,
            active:true,
            updatedAt:Date.now(),
        })
    } ,

    deleteProduct:async(req,res)=>{
        const {_id} = req.body;
        const productToDelete = await Product.findOne({_id})
        await Product.updateOne({_id:productToDelete._id},{active:false})
    } ,
}

module.exports = productController