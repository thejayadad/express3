import React from 'react'
import "./home.css"
import Categories from '../../components/Categories/Categories'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/authSlice'



const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <div><Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <span onClick={handleLogout}>Logout</span>

        <Categories />

    </div>
  )
}

export default Home