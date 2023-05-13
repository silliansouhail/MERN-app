import React from 'react'

import './Profile.css'
import Navbar from '../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBasket, resetBasket } from '../redux/productSlice'
import { user__payload } from '../redux/authSlice'

const Profile = () => {
  const dispatch=useDispatch()
  const{user}= useSelector(state=>state.auth)
  const{basket}= useSelector(state=>state.product)

  const price = ()=>{
    let p= 0
    for (let i = 0; i < basket.length; i++) {
        p = p+ basket[i].price;
    }return p
}
const p = price()? price():0

const remove_fromBasket =(id)=>{
dispatch(removeFromBasket({id:id}))
}

const order = () =>{
  console.log('click order');
  dispatch(user__payload({
    order_date:Date.now(),
    user_id:user._id,
    basket:basket
  }))
  dispatch(resetBasket())
}

  return (
    <div>
        <Navbar/>
        <div className="basket">
          <div className="basket__price">
            <h2> You'r Total Price is {p} DT</h2>
          </div>
          <div className="product__list">
            <ul>
              {basket.map(({...basket})=>{
                return (
                <li>
                  <div className="card">
                  <h2> {basket.name} </h2>
                        <div className="image">
                            <img src={basket.imageURL} alt={basket.name} />
                        </div>
                        <span> Price: {basket.price} DT</span>
                        <button className="btn" onClick={()=>remove_fromBasket(basket.id)} >Remove</button>
                  </div>
                </li>
                )
              })}
            </ul>
            {p?<button className="btn" onClick={order} >Conform The Order</button>:null}
          </div>
        </div>
    </div>
  )
}

export default Profile