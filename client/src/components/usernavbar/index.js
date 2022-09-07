import React, { useState,useEffect ,useContext} from 'react'
import {Link , useLocation} from 'react-router-dom'
import './navbar.css'
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from '../../contextapi/usercontext';
import { useNavigate } from 'react-router-dom';
// import { Badge } from '@mui/material';
const Navbar = () => {
  
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
useEffect(()=>{
  console.log(location.pathname)

},[])
const { setAuth ,user } = useContext(UserContext);
const navigate = useNavigate();

const logout = async () => {
  // const res = await axios.get(
  //   "http://localhost:5000/api/logout/",
  // );
  // console.log(res.data);
  setAuth(false);
  navigate('/login');
}
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
          
           
                <li><Link to="/viewmedicine">View Medicine</Link></li>
                <li><Link to="/orders">View My Orders</Link></li>
                
                
                <li><IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      
      </IconButton></li>
      <li><IconButton color="primary" aria-label="Logout">
        <LogoutIcon onClick={logout}/>
      </IconButton></li>
      <li>
        <Tooltip title={user.email}><IconButton color="primary" aria-label="add to shopping cart">
        <AccountCircleIcon />

      </IconButton></Tooltip></li>
  
              
            </ul>
            {/* <img className="img-r" src="assets/images/medico_logo.png" height="20px" width="20px"/> */}
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