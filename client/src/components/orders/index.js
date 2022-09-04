import React, { useState,useEffect } from 'react'
import '../medicinelist/medicinelist.css'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import IconButton from '@mui/material/IconButton';
// import Modal from '@mui/material/Modal';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios'
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
const Orders = () => {
  const [medicines,setMedicines]=useState([]);
 
  


  
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
  }, [])
  const getMedicine=async()=>{
    // setLoading(true)
    try {
      const data= await axios.post('http://localhost:5000/user/getOrdersByEmail',{
        email: localStorage.getItem('user')
      })
      setMedicines(data.data)
    } catch (error) {
      console.log("error is "+error)
    }
    // setLoading(false)
  }
  return (
    <div>
     
    <div className='medicineTableDiv'>
    <table className='medicineTable'>
    <thead>
      <tr>
        <th>  Name </th>
        <th>Price</th>
        <th> Quantity</th>
       
      </tr>
    </thead>
    <tbody>
      {medicines.map((med)=>{
        return(
          <tr key={Math.random()}>
          <th> {med.itemName} </th>
          <td>{med.price} </td>
          <td> {med.quantity} </td>
        
                 
        </tr>
        )
      })}
     
    </tbody>
  </table>
  </div>
 
  </div>
  )
}

export default Orders