//import modules
import React, { useState,useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { login, register } from '../redux/authSlice'

//import styles
import './Login.css'
import {MdEmail} from 'react-icons/md'
import {BsFillShieldLockFill}from 'react-icons/bs'
import {FaUserCircle} from 'react-icons/fa'


function Login() {

    const{user,loading,error,message}= useSelector(state=>state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
    if (user) {
        navigate('/home')
    }
    },[navigate, user])

    const [userData, setUserData] = useState()
    const [userRegistration, setUserRegistration] = useState()

    const [active, setActive] = useState(false)

    const switchClass = ()=>{
        setActive(!active)
    }

    const singIn = (e)=>{
        e.preventDefault()
        dispatch(login(userData))
    }

    const singUp = (e)=>{
        e.preventDefault()
        setActive(!active)
        dispatch(register(userRegistration))
    }

  return (
    <>

        {<div className={active?'form_box login active':'form_box login'}>

            <form >
                <h2>Sign In</h2>
                <div className="input_box">
                    <span className='icon'><MdEmail/></span>
                    <input type="email" name='email' required
                        onChange={(e)=>setUserData({...userData,email:e.target.value})} />
                    <label>Email</label>
                </div>

                <div className="input_box">
                    <span className='icon'><BsFillShieldLockFill/></span>
                    <input type="password" name='password'  required
                        onChange={(e)=>setUserData({...userData,password:e.target.value})} />
                    <label>Password</label>
                </div>

                <div className="input_checkbox">
                    <label ><input type="checkbox" />Remember Password?</label>
                    <Link to='/'> Forget Password ? </Link>
                </div>
                <button className='btn' type='submit' onClick={singIn} >Sing In</button>
                <div className="account_link">
                    <p>Create A New Account ? <Link onClick={switchClass} >Sign Up</Link></p>
                </div>
            </form>

        </div>}


        {<div className={active?'form_box register active':'form_box register'}>

            <form >
                <h2>Sign Up</h2>
                
                <div className="input_box">
                    <span className='icon'><FaUserCircle/></span>
                    <input type="text" name='name' required="required" 
                        onChange={(e)=>setUserRegistration({...userRegistration,name:e.target.value})} />
                    <label>Username</label>
                </div>

                <div className="input_box">
                    <span className='icon'><MdEmail/></span>
                    <input type="email" name='email' required="required" 
                        onChange={(e)=>setUserRegistration({...userRegistration,email:e.target.value})} />
                    <label>Email</label>
                </div>

                <div className="input_box">
                    <span className='icon'><BsFillShieldLockFill/></span>
                    <input type="password" name='password'  required="required"
                        onChange={(e)=>setUserRegistration({...userRegistration,password:e.target.value})} />
                    <label>Password</label>
                </div>

                <div className="input_checkbox">
                    <label ><input type="checkbox" required="required" /> I agree to the Terms, Privacy Policy and Cookies Policy </label>
                </div>
                <button className='btn' type='submit' onClick={singUp} >Sing Up</button>
                <div className="account_link">
                    <p>Already Have An  Account ? <Link onClick={switchClass} >Sing In</Link></p>
                </div>
            </form>

        </div>}

    </>
  )
}

export default Login