import React from 'react'

import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authSlice'

import './Navbar.css'

const Navbar = () => {

  const{user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()


  const userLogout = ()=>{
    dispatch(logout(user))
  }

  return (
    <nav>

      <div className="logo">
        <h1>Logo</h1>
      </div>

      <ul className="links">
        <li><NavLink to='/home'>Home</NavLink></li>
        {user.type&&<li><NavLink to='/dashboard'>Dashboard</NavLink></li>}
        <li><NavLink to='/profile'>Profile</NavLink></li>
        <li><NavLink to='/'onClick={userLogout}>Disconnect</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar