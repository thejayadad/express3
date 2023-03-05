import "./navbar.css"
import {Link} from "react-router-dom"
import { useEffect, useState } from "react";


const Navbar = () => {
    const [Mobile, setMobile] = useState(false)

  return (
    <header className="header">
         <nav className='navbar'>
        <h3 className='logo'>Vent Board</h3>
           <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
          <Link to='/' className='home'>
            <li>Home</li>
          </Link>
          <Link to='/about' className='about'>
            <li>About</li>
          </Link>
          <Link to='/services' className='services'>
            <li>Services</li>
          </Link>
          <Link to='/skills' className='skills'>
            <li>Skills</li>
          </Link>
          <Link to='/contact' className='home'>
            <li>contact</li>
          </Link>
          <div className="navbar-bottom">
            <div className="profile-card">
                <div className="top">
                  <p>Hi user</p>
                  <h3>Welcome Back</h3>
                </div>
                <div className="bottom">
                  <span>New Post</span>
                  <span>Log Out</span>
                </div>
            </div>
            <ul className="link-list">
                <li><Link to="/create">New Post</Link></li>
                <li><Link to="/create">Log out</Link></li>

            </ul>
          </div>
          <p className="copyright-text">
          Copyright 2023 © Jayadad
        </p>
        </ul>
        <ul className="link-list">
                <li><Link to="/create">New Post</Link></li>
                <li><Link to="/create">Log out</Link></li>

            </ul>

        <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
          {Mobile ? <i class="fas fa-times"></i> : <i class="fas fa-bars"></i>}
        </button>
      </nav>

    </header>
  )
}

export default Navbar