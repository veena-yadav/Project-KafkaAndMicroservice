import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
const Navbar = () => {
  return (
    

<div className="html">
    <nav className="navbar">
        <div className="navbar-container container">
            <input type="checkbox" name="" id=""/>
            <div className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
            <ul className="menu-items">
            <li><Link to="/">Register</Link></li>
                <li><Link to="/viewmedicine">View Medicine</Link></li>
                <li><a href="#">Admin Login</a></li>
                {/* <li><a href="#">Menu</a></li>
                <li><a href="#">Testimonial</a></li>
                <li><a href="#">Contact</a></li> */}
            </ul>
            <h1 className="logo">Navbar</h1>
        </div>
    </nav>
</div>

  )
}

export default Navbar