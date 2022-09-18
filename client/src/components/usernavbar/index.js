import React, { useState,useEffect ,useContext} from 'react'
import {Link , useLocation} from 'react-router-dom'
import './navbar.css'
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
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
          
           
                <li><Link to="/viewmedicine">Place order</Link></li>
                
                <li><Link to="/userReorders">Pending Reorders</Link></li>
                <li><Link to="/usercriticalmedicine">Critical Medicines</Link></li>
                
                <li><IconButton color="primary" aria-label="add to shopping cart"
                onClick={()=>{
                  navigate('/orders')
                }}
                
                >
        <AddShoppingCartIcon />
      
      </IconButton></li>
      {/* <li><IconButton color="primary" aria-label="Logout">
        <LogoutIcon onClick={logout}/>
      </IconButton></li> */}
      <li><IconButton color="primary" aria-label="Logout">
        <AccountCircleIcon onClick={handleClick}/>
      </IconButton></li>
      <li></li>
      {/* <li>
        
        <Tooltip title={user.email}><IconButton color="primary" aria-label="add to shopping cart">
        <AccountCircleIcon />

      </IconButton></Tooltip></li> */}
  
              
            </ul>
            {/* <img className="img-r" src="assets/images/medico_logo.png" height="20px" width="20px"/> */}
            <h1 className="logo">MEDICO</h1>
          </div>
    </nav>
    <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          paddingTop: "40px",
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem>{user.email}</MenuItem>
        <MenuItem onClick={handleClose}>Reset Password</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
</div>

  )
}

export default Navbar