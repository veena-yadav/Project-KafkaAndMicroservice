import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navbar.css'
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Badge } from '@mui/material';
const Navbar = ({ usr }) => {
  const [user, setUser] = useState('')
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    console.log(location.pathname)
    window.addEventListener('storage', () => {
      setUser(localStorage.getItem('user'))

    })

  }, [])
  return (


    <div className="html">
      <nav className="navbar">
        <div className="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">
            <li><Link to="/">Register</Link></li>

            <li><Link to="/adminlogin">Admin Login</Link></li>

          </ul>
          <h1 className="logo">MEDICO</h1>
        </div>
      </nav>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><a href="https://mail.google.com/mail" target="_sayush">Check Mail</a> </MenuItem>

      </Menu>
    </div>

  )
}

export default Navbar