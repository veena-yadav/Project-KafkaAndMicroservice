import React, { useState,useEffect ,useContext } from 'react'
import '../medicinelist/medicinelist.css'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import IconButton from '@mui/material/IconButton';
// import Modal from '@mui/material/Modal';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios'
import { UserContext } from '../../contextapi/usercontext'
import MedicineCard from './MedicineCard'
import { Grid, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
const UserReorder = () => {
  const [medicines,setMedicines]=useState([]);
 
  const {auth, admin , user}=useContext(UserContext);  


  
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
  }, [medicines])
  const getMedicine=async()=>{
    // setLoading(true)
    try {
      const data= await axios.post('http://localhost:5000/user/getReodersByEmail',{
        email: user.email
      })
      setMedicines(data.data)
    } catch (error) {
      console.log("error is "+error)
    }
    // setLoading(false)
  }
  const deleteMedicine=async(medName)=>{
    // setLoading(true)
    console.log(`${medName} deleted`)
    console.log(typeof(user.email))
    console.log(medName)
    try {
      const data= await axios.delete(`http://localhost:5000/user/cancelAnReorder/${user.email}/${medName}`)
      console.log(data)
     
    } catch (error) {
      console.log("error is "+error)
      toast.error(`Server disconnected.Try Again`,{ theme: "colored" })
      return
    }
    toast.success(`Medicine Deleted Successfully`,{ theme: "colored" })
    getMedicine()
    // setLoading(false)
  }
  return (
    <>
    <div style={{
      width:"100%",
      height:"100%",
      paddingTop:"70px",
      paddingLeft:"10px",
      paddingRight:"10px"

    }}>
      <center><Typography variant="h4" >View My Reorders</Typography></center>
      
   <Grid container  spacing={{ xs: 2, md: 3 }}>
   {medicines.map((med)=>{
    return(
      <Grid item xs={12} sm={6} md={4} >
      <MedicineCard med={med} deleteMedicine={deleteMedicine}/>  
      </Grid>
    )
   })}
    
   </Grid>
 
  </div>
  <ToastContainer/>
  </>
  )
}

export default UserReorder