import React, { useState,useEffect } from 'react'
import './medicinelist.css'
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
import {useNavigate} from 'react-router-dom'
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
const MedicineList = () => {

  const [medicines,setMedicines]=useState([]);
  const [medicinesCart,setMedicineCart]=useState(new Map());
  const [loading , setLoading]=useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedMedicine,setSelectedMedicine]=useState('')
  const [selectedMedicineQuantity,setSelectedMedicineQuantity]=useState(0)
  const [selectedMedicinePrice,setSelectedMedicinePrice]=useState(0);
  const navigate=useNavigate()
  const  setCart=(sm,smq,smp)=>{
    
    

    // console.log(`${selectedMedicineQuantity} in save button `)
    const newItem={
      itemName:sm,
      quantity:selectedMedicineQuantity,
      price:smp
    }
    const newArr=medicinesCart.set(selectedMedicine,newItem)
    setMedicineCart(newArr)
   setOpen(false)

  }
  const handleOpen = () => {setOpen(true)
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getMedicine()
  }, [])
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
  return (
    <div>
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
            value={selectedMedicineQuantity} min="0" onChange={(e)=>{
              // console.log(e.target.value)
            }}/>
          <span className="input-number-increment"
           onClick={()=>{
            setSelectedMedicineQuantity(selectedMedicineQuantity+1)
            // console.log(`${selectedMedicineQuantity} in onclick of +`)
          }}
          
          >+</span>
         
            <center>
            <Button color="primary"
            onMouseDown={(e)=>{
              
              setCart(selectedMedicine,selectedMedicineQuantity,selectedMedicinePrice)
            
              // console.log(medicinesCart)
            }}
            
            variant="contained">Save</Button>
            </center>
        
        </Box>
      </Modal>
    <div className='medicineTableDiv'>
    <table className='medicineTable'>
    <thead>
      <tr>
        <th>  Name </th>
        <th>Price</th>
        <th> Quantity</th>
        <th> Action</th>
      </tr>
    </thead>
    <tbody>
      {medicines.map((med)=>{
        return(
          <tr key={Math.random()}>
          <th> {med.itemName} </th>
          <td>{med.price} </td>
          <td> {med.quantity} </td>
          <td> <IconButton color="primary" onClick={()=>{
            handleOpen()
            setSelectedMedicinePrice(med.price)
            setSelectedMedicine(med.itemName)
          }} aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton></td>
                 
        </tr>
        )
      })}
     
    </tbody>
  </table>
  </div>
  <Fab color="primary" aria-label="add" style={{
          position: 'fixed',
          top: '80px',
          right: '100px'

        }}
          onClick={async(e) => {
          //   console.log("Add btn click")
          //  console.log(medicinesCart)
          var arrx = Array.from(medicinesCart, ([name, value]) => ({ name, value }));
          var narr=[]
          arrx.map((i)=>narr.push(i.value))
          console.log(narr)
          const usr=localStorage.getItem('user')
          console.log(usr)
          const cartObj={email:usr,orders:narr}
          await axios.post(`http://localhost:5000/user/placeOrder`,cartObj)
          navigate('/orders')
          }}
        >
          <AddShoppingCartIcon />
        </Fab>
  </div>
  )
}

export default MedicineList