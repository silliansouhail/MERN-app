import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Product.css'
import { addToBasket, deleteProduct } from '../redux/productSlice'

const Product = ({_id,active,name,amount,price,imageURL}) => {
    const{user}= useSelector(state=>state.auth)

    const coffee =
    {
        _id,
        id:Date.now(),
        name,
        price,
        imageURL
    }

    const dispatch = useDispatch()

    const removeProduct =()=>{
        dispatch(deleteProduct({_id}))
    }

    const add_toBasket =()=>{
        dispatch(addToBasket(coffee))
    }

  return (
    <div>
        {amount===0?null:
            active&&<div className="card">
                        <h2> {name} </h2>
                        <div className="image">
                            <img src={imageURL} alt={name} />
                        </div>
                        <span> Amount in Stock: {amount} </span>
                        <span> Price: {price} DT</span>
                        <button className="btn"onClick={add_toBasket}>Get Now</button>
                        {user.type?<div className="admin">
                            <button className="btn" onClick={removeProduct} >Delete</button>
                            <button className="btn">Edit</button>
                        </div>:null}
            </div>}
    </div>
  )
}

export default Product