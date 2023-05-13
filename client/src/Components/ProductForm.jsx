import React, { useRef, useState } from 'react'

import './ProductForm.css'
import sample from '../assets/image/coffee.avif'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/productSlice'


const ProductForm = () => {

    const [product, setProduct] = useState({
        imageURL:'',
    })

    const dispatch = useDispatch()

    const cloudRef = useRef()
    const widgetRef = useRef()




    cloudRef.current = window.cloudinary
    widgetRef.current = cloudRef.current.createUploadWidget({
        cloudName:'dypnsc2l3',
        uploadPreset:'j99dll4k'
    },function(error,result){
        return result.info.url?setProduct({...product,imageURL:result.info.url}):null;
    })


const openUpload = (e)=>{
    e.preventDefault()
    widgetRef.current.open()
    }

const add = (e)=>{
    e.preventDefault()
    console.log(product)
    dispatch(addProduct(product))
}

return (
    <div className='section'>
        <div className="form_container">
            <form >
                <div className="input_container">
                    <input type="text" name='name'
                    onChange={(e)=>setProduct({...product,name:e.target.value})} />
                    <label> Product Name </label>
                </div>
                <div className="input_container">
                    <input type="number" name='amount'
                    onChange={(e)=>setProduct({...product,amount:e.target.value})}/>
                    <label> Product Amount </label>
                </div>
                <div className="input_container">
                    <input type="number" name='price'
                    onChange={(e)=>setProduct({...product,price:e.target.value})} />
                    <label> Product Price </label>
                </div>
                <div className="image_container">
                    <img src={product.imageURL?product.imageURL:sample} alt="sample_image" />
                </div>
                <button className='btn' onClick={(e)=>openUpload(e)} > Upload </button>
                <button type='submit' className="btn" onClick={add} >Add</button>
            </form>
        </div>
    </div>
  )
}

export default ProductForm