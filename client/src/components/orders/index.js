import React, { useState,useEffect ,useContext } from 'react'
import '../medicinelist/medicinelist.css'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import IconButton from '@mui/material/IconButton';
// import Modal from '@mui/material/Modal';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios'
import { UserContext } from '../../contextapi/usercontext'
import {useNavigate} from 'react-router-dom'
import MedicineCard from './MedicineCard'
import { Button, Grid, Paper, Typography } from '@mui/material'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import './sui.css'

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Orders = () => {
  const [medicines,setMedicines]=useState([]);
 const [totalPrice,setTotalPrice]=useState(0)
  const {auth, admin , user}=useContext(UserContext);  
const [userAddress,setUserAddress]=useState('')
const [open, setOpen] = React.useState(false);
const [searchText,setSearchText]=useState('')
const navigate=useNavigate()
  
//   const  setCart=(sm,smq,smp)=>{
    
    

//     // console.log(`${selectedMedicineQuantity} in save button `)
//     const newItem={
//       itemName:sm,
//       quantity:selectedMedicineQuantity,
//       price:smp
//     }
//     const newArr=medicinesCart.set(selectedMedicine,newItem)
//     setMedicineCart(newArr)
//    setOpen(false)

//   }

  useEffect(() => {
    getMedicine()
    getAddress()
  }, [medicines])
  const getAddress=async()=>
  {
    try{
    const addr=await axios.get(`http://localhost:5000/api/users/getaddress/${user.email}`)
    console.log(addr.data)
    setUserAddress(addr.data)
    }
    catch(err)
    {
     console.log(err) 
    }
  }
  const updateAddress=async(changedAddress)=>{
    try
    {
    const newAddress= await axios.patch(`http://localhost:5000/api/users/changeaddress/${user.email}/${changedAddress}`)
       
  }
  catch(err){
 console.log(err)
  }
  getAddress()
  handleClose()
  }
  const getMedicine=async()=>{
    // setLoading(true)
    try {
      const data= await axios.post('http://localhost:5000/user/getOrdersByEmail',{
        email: user.email
      })
      // const amount = data.data[0];
      console.log("undefinedTest")
      console.log(data.data[1])
      setTotalPrice(data.data[0])
      setMedicines(data.data[1])
    } catch (error) {
      console.log("error is "+error)
    }
    // setLoading(false)
  }
  const handleOpen = () => {setOpen(true)

  };
  const handleClose = () => setOpen(false);
  const deleteMedicine=async(medName)=>{
    // setLoading(true)
    console.log(`${medName} deleted`)
    console.log(typeof(user.email))
    console.log(medName)
    try {
      const data= await axios.delete(`http://localhost:5000/user/cancelAnOrder/${user.email}/${medName}`)
      console.log(data)
     
    } catch (error) {
      console.log("error is "+error)
    }
    getMedicine()
    // setLoading(false)
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center'}}>
            Edit Address
          </Typography>
          <center style={{ marginTop: "30px" }}>
           <TextField
           variant="outlined"
           label="Edit Address"
           value={searchText}
          onChange={(e)=>{
            setSearchText(e.target.value)
          }}
           />
           <br/>
            <Button variant="contained" style={{
              marginTop:"20px"
            }} color="primary" onClick={()=>{updateAddress(searchText)}}> Update Address</Button>
          </center>
        </Box>
       
      </Modal>
    <div style={{
      width:"100%",
      height:"100%",
      paddingTop:"70px",
      paddingLeft:"10px",
      paddingRight:"10px"

    }}>
      <center><Typography variant="h4" >View Cart</Typography></center>
    <div className="custom_Grid_124">
   <Grid container  spacing={{ xs: 2, md: 3 }} className="custom_Grid_124_item_1">
   {medicines.length>0 ? medicines.map((med)=>{
    return(
      <Grid item xs={12} sm={6} md={4} >
      <MedicineCard med={med} deleteMedicine={deleteMedicine}/>  
      </Grid>
    )
   }):(
    <h1 style={{marginLeft:"70px", textAlign:'center'}}>No items in cart</h1>
   )}
    
   </Grid>
   <div className='custom_Grid_124_item_2'>
   <Paper style={{width:"80%" , margin:"0px auto", backgroundColor:'#acdcee',height:"130px",
  display:'grid',
  placeItems:'center',
  textAlign:'center'
  }}>
  
  <Typography variant="h4">Price :₹{totalPrice}</Typography>
  {totalPrice>0 && <Button variant="contained"
  style={{marginTop:"-10px"}}
  onClick={(e)=>{
    navigate('/payment')
  }}
 >Pay Now</Button>}
  
 </Paper>
 <Paper style={{width:"80%" , margin:"0px auto" , marginTop:"40px" , backgroundColor:'#acdcee'}}>
  <center>
  <Typography variant="h4">Address</Typography>
  <p>{userAddress}</p>
  <Button 
  onClick={()=>{
    setSearchText(userAddress)
    handleOpen()
  }}
  variant="contained" style={{
    marginBottom:"10px"
  }}>Edit Address</Button>
  </center>
 </Paper>
 </div>
 </div>
  </div>
  </>
  )
}

export default Orders