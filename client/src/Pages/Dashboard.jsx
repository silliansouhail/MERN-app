/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,} from 'react'

import './Dashboard.css'
import Navbar from '../Components/Navbar'
import ProductForm from '../Components/ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, statusUpdate } from '../redux/authSlice'

const Dashboard = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    let active = true 
    if (active) {
      dispatch(getUsers())
    }
    return () => {
      active = false
    }
  }, [])

  const{usersList}= useSelector(state=>state.auth)

  const toAdmin =(_id)=>{
    console.log(_id);
    dispatch(statusUpdate({_id}))
  }

  return (
    <div>
        <Navbar/>
        <div className="dashContainer">
          <div className="product_form">
            <ProductForm/>
          </div>
          <div className="users_list">
            <ul>
              {usersList&&usersList.map(({...usersList})=>{
                return(
                  <li key={usersList._id}>
                    <div>
                      <h3>{usersList.name}</h3>
                      <samp>{usersList.email}</samp>
                      <button className="btn" onClick={()=>toAdmin(usersList._id)} >Transform {usersList.name} To Admin</button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
    </div>
  )
}

export default Dashboard