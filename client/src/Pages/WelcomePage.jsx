import React from 'react'

import './WelcomePage.css'
import Login from '../Components/Login'

const WelcomePage = () => {
  return (
    <div className="background">

      <div className='container' >

        <div className="item">
          <h2 className="logo">Logo</h2>
          <div className="text-item">
            <h2>Welcome! <br/> <samp>To Our Shop</samp> </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum cumque quis amet tenetur sapiente deleniti?</p>
          </div>
        </div>

        <div className="login_section">
          <Login/>
        </div>

      </div>

    </div>
  )
}

export default WelcomePage