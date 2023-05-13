/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import './Home.css'
import Navbar from '../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/productSlice'
import Product from '../Components/Product'

const Home = () => {
  const{products}= useSelector(state=>state.product)

  const dispatch = useDispatch()
  useEffect(() => {
    let active = true 
    if (active) {
      dispatch(getProducts())
    }
    return () => {
      active = false
    }
  }, [])


  return (
    <div className='home_section'>
        <Navbar/>
        <div className="list">
            {products? products&&products.map(({...products})=>{
                return(
                    <Product
                      key={products._id}
                      _id={products._id}
                      active={products.active}
                      name={products.name}
                      imageURL={products.imageURL}
                      amount={products.amount}
                      price={products.price}
                    />
                )
            }):null}
        </div>
    </div>
  )
}

export default Home