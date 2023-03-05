import React from 'react'
import "./home.css"
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div>Home
        <Link to="/create">Create</Link>

    </div>
  )
}

export default Home