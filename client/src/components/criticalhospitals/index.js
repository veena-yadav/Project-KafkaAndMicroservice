import React, { useState,useEffect } from 'react'
import './criticalhospitals.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

const CriticalHospitals = () => {
  const [hospitals,sethospitals]=useState([])
  const [loading , setLoading]=useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState('')
  const [selectedHospitalName, setSelectedHospitalName] = useState('')
  const [selectedQuantity, setSelectedQuantity] = useState('')
  const [operation, setOperation] = useState('order')

  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getHospitals()
  }, [])

  const getHospitals=async()=>{
    setLoading(true)
    try {
      const data= await axios.get('http://localhost:5000/gethospitals')
      sethospitals(data.data)
    } catch (error) {
      console.log("error is "+error)
    }
    setLoading(false)
  }

  const AddHospital = async () => {
    const newHospitalObj = {
      medicineName:selectedMedicine,
      quantity:selectedQuantity,
      hospitalName:selectedHospitalName
    }

    try {

      const addedHospital = await axios.post('http://localhost:5000/postreorder', newHospitalObj)
      console.log(addedHospital)
    } catch (error) {
      console.log(error)
    }
    getHospitals()
    setOpen(false)
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
            Reorder
          </Typography>
          <center style={{ marginTop: "10px" }}>
            <TextField value={selectedHospitalName}
              label="Hospital Name"
              variant="outlined"
              onChange={(e) => {
                setSelectedHospitalName(e.target.value)
              }}
            /><br /><br />
            <TextField
              label="Medicine Name"
              variant="outlined"
              value={selectedMedicine}
              onChange={(e) => {
                setSelectedMedicine(e.target.value)
              }}
            /><br /><br />
            <TextField
              label="Medicine Quantity"
              variant="outlined"
              value={selectedQuantity}
              onChange={(e) => {
                setSelectedQuantity(e.target.value)
              }}
            /><br /><br />
            <Button variant="contained" color="primary"
              onClick={(e) => {
                AddHospital()
              }}
            >{operation}</Button>
          </center>
        </Box>
       
      </Modal>

    <div>
        <div className='wrapper'>
            <Link to="/criticalhospitals/criticalreorder"><button className='buttonc'>Reorder summary</button></Link>
        </div>
    <div className='medicineTableDiv'>
    <table className='medicineTable'>
    <thead>
      <tr>
        <th> Hospital Name </th>
        <th> Phone</th>
        <th> Email</th>
        <th> Address</th>
        <th> Admin</th>
        <th>Distance(km)</th>
        <th>Click to order</th>
      </tr>
    </thead>
    <tbody>
      {hospitals.map((med)=>{
        return(
          <tr key={Math.random()}>
          <th> {med.hospitalName} </th>
          <td>{med.hospitalPhone} </td>
          <td> {med.hospitalEmail} </td>
          <td> {med.hospitalAddress} </td>
          <td> {med.hospitalAdmin} </td>
          <td> {med.distance}</td>
          {/* <td><button style={{width:100}}>Order</button></td> */}
          <td>
            <IconButton color="secondary"
                    style={{
                      color: "#0064D2"
                    }}

                    aria-label="edit item"
                    onClick={(e) => {
                      setOpen(true)
                      setSelectedHospitalName(med.hospitalName)
                      setOperation("order")
                    }}>
              <DeliveryDiningIcon/>
            </IconButton>
          </td>
        </tr>
        )
      })}
     
    </tbody>
  </table>
  </div>
  </div>

  </div>
  )
}

export default CriticalHospitals