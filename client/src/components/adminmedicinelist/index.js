import React, { useState,useEffect } from 'react'
import './adminmedicinelist.css'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

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
const AdminMedicineList = () => {
  const [medicines,setMedicines]=useState([])
  const [loading , setLoading]=useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedMedicine,setSelectedMedicine]=useState('')
  const [selectedMedicineQuantity,setSelectedMedicineQuantity]=useState(1)
  const handleOpen = () => {setOpen(true)
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getMedicine()
  }, [medicines])
  const getMedicine=async()=>{
    setLoading(true)
    try {
      const data= await axios.get('http://localhost:5000/api/medicine/view')
      setMedicines(data.data)
    } catch (error) {
      console.log("error is "+error)
    }
    setLoading(false)
  }
  const DeleteMedicine=async(medicineid)=>{
  try {
    const deletedMed= await axios.delete(`http://localhost:5000/api/medicine/deleteMedicine/${medicineid}`)
    getMedicine()
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <div >
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Medicine {selectedMedicine}
          </Typography>
          <span className="input-number-decrement"
          onClick={()=>{
            if(selectedMedicineQuantity==0) return
            setSelectedMedicineQuantity(selectedMedicineQuantity-1)
          }}
          >–</span><input className="input-number"
            type="text"
            value={selectedMedicineQuantity} min="0" max="12"/>
          <span className="input-number-increment"
           onClick={()=>{
            setSelectedMedicineQuantity(selectedMedicineQuantity+1)
          }}
          
          >+</span>
        </Box>
      </Modal>
      
    <div className='medicineTableDiv'>
    <table className='medicineTable'>
      
    <thead>
      <tr>
        <th>  Name </th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Minimum Threshhold</th>
        <th> Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {medicines.map((med)=>{
        return(
          <tr key={Math.random()}>
          <th> {med.itemName} </th>
          <td>{med.price} </td>
      <td>{med.quantity}</td>
      <td>{med.minimumThresholdValue}</td>
               <td><IconButton color="secondary" 
               style={{
                color:"#0064D2"
               }}
               
               aria-label="edit item"> <EditIcon/></IconButton></td>  
               <td><IconButton style={{
                color:"#0064D2"
               }} aria-label="delete item"
               onMouseDown={(e)=>{
                DeleteMedicine(med._id)
               }}
               
               > <DeleteIcon /></IconButton></td>  
              
        </tr>
        )
      })}
     
    </tbody>
  </table>
  </div>
  <Tooltip title="Add Medicine" style={{backgroundColor:"red"}} placement="right">
  <Fab color="primary"  aria-label="add" style={{
    position:'fixed',
    top:'80px',
    right:'100px'

  }}>
        <AddIcon  />
      </Fab>
      </Tooltip>
  </div>
  )
}

export default AdminMedicineList