import React, { useState, useEffect } from "react";
import "../medicinelist/medicinelist.css";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import IconButton from "@mui/material/IconButton";
// import Modal from '@mui/material/Modal';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
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
const AdminReorders = () => {
  const [medicines, setMedicines] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const [modalMedicine,setModalMedicine]=useState('')
const [modalMedicineQuantity,setModalMedicineQuantity]=useState(0)
const [medicineObjModal,setMedicineObjModal]=useState({})
  useEffect(() => {
    getMedicine();
  }, []);
  const getMedicine = async () => {
    // setLoading(true)
    try {
      const data = await axios.get("http://localhost:5050/belowthreshold");
      console.log(data);
      setMedicines(data.data);
    } catch (error) {
      console.log("error in reorder " + error);
    }
    // setLoading(false)
  };
  const RejectMedicine = async (medicineName) => {
    console.log(medicineName);
    try {
      const delMedi = await axios.delete(
        `http://localhost:5000/api/medicine/delete/${medicineName}`
      );
    } catch (err) {
      console.log(err);
    }
    toast("Reorder Rejected!")
    getMedicine();
  };
  // accept reorders admin side
  const AcceptMedicine = async (medicineObject,newQuantity) => {
    const { price, itemName ,minimumThresholdValue } = medicineObject;
    console.log("accepted med");
    if(newQuantity<minimumThresholdValue)
    {
      handleClose()
      toast("plaease enter quantiy above threshold! ")
      return
    }
    try {
      const acceptedMedicine = await axios.patch(
        `http://localhost:5050/accept/${medicineObject.itemName}`,
        { price, quantity:newQuantity, itemName ,minimumThresholdValue}
      );
    } catch (err) {
      console.log(err);
    }
    toast("reorder successfull!")
    handleClose()
    getMedicine();
  };

  return (
    <>
    <div>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Accept Medicine {modalMedicine}
          </Typography>
          <TextField label="Medicine Quantity" value={modalMedicineQuantity} onChange={(e)=>{
            setModalMedicineQuantity(e.target.value)
          }}/><br/>
          <center>
          <Button  variant="contained" style={{
            marginTop:"20px"
          }} color="primary" onClick={()=>{
            
            AcceptMedicine(medicineObjModal,modalMedicineQuantity)
          }}>Accept Now</Button>
          </center>
          </center>
        </Box>
      </Modal>
      <div className="medicineTableDiv">
        <table className="medicineTable">
          <thead>
            <tr>
              <th> Name </th>
              <th>Price</th>
              <th> Quantity</th>
              <th>Total Price</th>
              <th>Threshhold</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => {
              return (
                <tr key={Math.random()}>
                  <th> {med.itemName} </th>
                  <td>{med.price} </td>
                  <td> {med.quantity} </td>
                  <td>{med.price * med.quantity}</td>
                  <td>{med.minimumThresholdValue}</td>
                  <td>
                    <IconButton
                      onClick={() => {
                        setModalMedicine(med.itemName)
                        setMedicineObjModal(med)
                        handleOpen()
                       
                        
                      }}
                    >
                      <CheckCircleIcon color="success" />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton
                      onClick={() => {
                        RejectMedicine(med.itemName);
                      }}
                    >
                      <CancelIcon color="secondary" />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
};

export default AdminReorders;
