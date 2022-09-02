import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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
                <li><Link to="/adminlogin">Admin Login</Link></li>
                <li><Link to="/adminviewmedicine">Admin Medicines</Link></li>
                <li><IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton></li>
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