import React, { useState, useEffect } from 'react'
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
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';

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
  const [medicines, setMedicines] = useState([])
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState('')
  const [selectedItemName, setSelectedItemName] = useState('')
  const [selectedItemPrice, setSelectedItemPrice] = useState('')
  const [selectedItemQuantity, setSelectedItemQuantity] = useState('')
  const [selectedItemThreshold, setSelectedItemThreshold] = useState('')
  const [selectedMedicineQuantity, setSelectedMedicineQuantity] = useState(1)
  const [query,setQuery]=useState('')
  const [SelectedItemId, setSelectedItemId] = useState(0)
  const [operation, setOperation] = useState('Edit')
  const [searchSelected,setSearchSelected]=useState(false)
  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getMedicine()
  }, [])
  const getMedicine = async () => {
    setLoading(true)
    try {
      const data = await axios.get('http://localhost:5000/api/medicine/view')
      setMedicines(data.data)
    } catch (error) {
      console.log("error is " + error)
    }
    setLoading(false)
  }
  const DeleteMedicine = async (medicineid) => {
    try {
      const deletedMed = await axios.delete(`http://localhost:5000/api/medicine/deleteMedicine/${medicineid}`)

    } catch (error) {
      console.log(error)
    }
    getMedicine()
  }
  const findMedicine=async(val)=>{
 const  searchboxmed= await axios.get(`http://localhost:5000/api/medicine/filter/${val}`)
 

 console.log(searchboxmed.data)
 const newAr=searchboxmed.data
 setMedicines(medicines=>[...newAr])
  }
  const EditMed = async (id) => {
    try {
      console.log(`ID TO BE UPDATED ${id}`)
      const updatedMed = {
        _id: id,
        itemName: selectedItemName,
        price: selectedItemPrice,
        quantity: selectedItemQuantity,
        minimumThresholdValue: selectedItemThreshold
      }
      console.log(updatedMed)
      const med = await axios.patch(`http://localhost:5000/api/medicine/updateMedicine/${id}`, updatedMed)
    }
    catch (err) {
      console.log(err)
    }
    getMedicine()
    setOpen(false)
  }
  const AddMed = async () => {
    const newMedicineObj = {

      itemName: selectedItemName,
      price: selectedItemPrice,
      quantity: +selectedItemQuantity,
      minimumThresholdValue: selectedItemThreshold
    }

    try {

      const addedMed = await axios.post(`http://localhost:5000/api/medicine/addMedicine`, newMedicineObj)
    } catch (error) {
      console.log(error)
    }
    getMedicine()
    setOpen(false)
  }
  return (
    <div >

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!searchSelected ?  <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {operation} Medicine {selectedMedicine}
          </Typography>
          <center style={{ marginTop: "10px" }}>
            <TextField value={selectedItemName}
              label="Medicine Name"
              variant="outlined"
              onChange={(e) => {
                setSelectedItemName(e.target.value)

              }}
            /><br /><br />
            <TextField
              label="Medicine Price"
              variant="outlined"
              value={selectedItemPrice}
              onChange={(e) => {
                setSelectedItemPrice(e.target.value)

              }}
            /><br /><br />
            <TextField
              label="Medicine Quantity"
              variant="outlined"
              value={selectedItemQuantity}
              onChange={(e) => {
                setSelectedItemQuantity(e.target.value)

              }}
            /><br /><br />
            <TextField
              label="Medicine Threshold"
              variant="outlined"
              value={selectedItemThreshold}
              onChange={(e) => {
                setSelectedItemThreshold(e.target.value)

              }}
            /><br /><br />
            <Button variant="contained" color="primary"
              onClick={(e) => {

                if (operation === 'Edit') {
                  EditMed(SelectedItemId)
                }
                else {
                  AddMed()
                }

              }}
            >{operation}</Button>
          </center>
        </Box> :<Box sx={style}><center>
        <TextField value={query}
              label="Medicine Name"
              variant="outlined"
              onChange={(e) => {
                setQuery(e.target.value)
                findMedicine(e.target.value)

              }}
            />
           <div style={{marginTop:"30px"}}></div>
          </center></Box>}
       
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
            {medicines.map((med) => {
              return (
                <tr key={Math.random()}>
                  <th> {med.itemName} </th>
                  <td>{med.price} </td>
                  <td>{med.quantity}</td>
                  <td>{med.minimumThresholdValue}</td>
                  <td><IconButton color="secondary"
                    style={{
                      color: "#0064D2"
                    }}

                    aria-label="edit item"
                    onMouseDown={(e) => {
                      setSelectedMedicine(med.itemName)
                      setSelectedItemName(med.ItemName)
                      setSelectedItemId(med._id)
                      setOperation("Edit")
                      setSearchSelected(false)
                      setOpen(true)
                      console.log("edit")
                    }}
                  > <EditIcon /></IconButton></td>
                  <td><IconButton style={{
                    color: "#0064D2"
                  }} aria-label="delete item"
                    onMouseDown={(e) => {
                      DeleteMedicine(med._id)
                    }}

                  > <DeleteIcon /></IconButton></td>

                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
      <Tooltip title="Add Medicine" style={{ backgroundColor: "red" }} placement="left">
        <Fab color="primary" aria-label="add" style={{
          position: 'fixed',
          top: '80px',
          right: '100px'

        }}
          onClick={(e) => {
            console.log("Add btn click")
            setOperation("Add")
            setSearchSelected(false)
            setSelectedMedicine('')
            setOpen(true)
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Search Medicine" style={{ backgroundColor: "red" }} placement="left">
        <Fab color="primary" aria-label="Search Medicine" style={{
          position: 'fixed',
          top: '160px',
          right: '100px'

        }}
          onClick={(e) => {
            console.log("Search btn click")
           setSearchSelected(true)
           setOpen(true)
          }}
        >
          <SearchIcon/>
        </Fab>
      </Tooltip>
    </div>
  )
}

export default AdminMedicineList