import React from 'react'
import "./login.css"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../utils/fetchApi'
import {useDispatch} from 'react-redux'
import { login } from '../../redux/authSlice'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async(e) => {
      e.preventDefault()

      if(email === '' || password === "") return

      try {
        const options = {
          'Content-Type': 'application/json'
        }


        const data = await request("/auth/login", 'POST', options, {email, password})
         console.log(data)
        dispatch(login(data))
        navigate('/')
      } catch (error) {
        console.error(error)
      }
    }
  return (
    <div>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </form>
    </div>
  )
}

export default Login