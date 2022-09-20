import React, { useState,useEffect,useContext } from 'react'
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
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import { UserContext } from '../../contextapi/usercontext';
import { ToastContainer, toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import 'react-toastify/dist/ReactToastify.css';
import { TextField } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
  const { user } = useContext(UserContext);
  const [medicines,setMedicines]=useState([]);
  const [medicinesCart,setMedicineCart]=useState(new Map());
  const [loading , setLoading]=useState(false);
  const [open, setOpen] = React.useState(false);
  const [searchModalOpen,setSearchModalOpen]=useState(false)
  const [selectedMedicine,setSelectedMedicine]=useState('')
  const [selectedMedicineQuantity,setSelectedMedicineQuantity]=useState(0)
  const [selectedMedicinePrice,setSelectedMedicinePrice]=useState(0);
  const [selectedMedicineMinimumThreshold, setSelectedMedicineMinimumThreshold]=useState(0);
  const [searchMedicine, setSearchmedicine]= useState("")
  const [criticalMedicines,setCriticalMedicines]=useState([])
  const [medicineQuantity,setMedicineQuantity]=useState(0)
  const navigate=useNavigate()
  const  setCart=(sm,smq,smp,smt,mq)=>{
    


    // console.log(`${selectedMedicineQuantity} in save button `)
    const newItem={
      itemName:sm,
      quantity:selectedMedicineQuantity,
      price:smp
    }
    if(newItem.quantity>mq){
      toast.error(`only ${mq} quantity are in stock!`,{ theme: "colored" })
    }
    const newArr=medicinesCart.set(selectedMedicine,newItem)
    setMedicineCart(newArr)
   setOpen(false)
  setSelectedMedicineQuantity(0)
  }
  const handleOpen = () => {setOpen(true)

  };
  const handleSearchModalOpen = () => {setSearchModalOpen(true)

  };
  const handleSearchModalClose = () => {setSearchModalOpen(false)

  };
  const handleClose = () => setOpen(false);
  useEffect(()=>{
    getMedicine()
    getCriticalMedicine()
  },[criticalMedicines,searchMedicine])
  
  

  const isMatch=(medn)=>
  {
    if(criticalMedicines.length>0)
    {
      for(let i=0;i<criticalMedicines.length;i++)
      {
        if(criticalMedicines[i]===medn)
        return true
      }
    }
    return false
  }
  const getMedicine=async()=>{
    setLoading(true)
    try {
      const data= await axios.get(`http://localhost:5000/api/medicine/filter/${searchMedicine}`)
      setMedicines(data.data)
    } catch (error) {
      console.log("error is "+error)
    }
    setLoading(false)
  }
const getCriticalMedicine=async()=>{
  try
  {
  const data = await axios.get(`http://localhost:5000/user/getCriticalMedicines/${user.email}`)
  console.log("critical are")
  console.log(data.data)
  setCriticalMedicines(data.data)
  }
  catch(err){

  }
}
  const findMedicine=async(val)=>{
    const  searchboxmed= await axios.get(`http://localhost:5000/api/medicine/filter/${val}`)
   
    console.log(searchboxmed.data)
    const newAr=searchboxmed.data
    setMedicines(medicines=>[...newAr])
     }
const RemoveCritical=async(medni)=>{
  try {
    const removecrit= await axios.delete(`http://localhost:5000/user/removeCriticalMedicine/${user.email}/${medni}`)
  } catch (error) {
    
  }
}
     const AddToCritical=async(med)=>{
          try {
            const addCriticalMed= await axios.post(`http://localhost:5000/user/addCriticalMedicine`,{
              email:user.email,
              criticalMedicines:med.itemName

            })
          } catch (err) {
            toast.error("Failed to add to critical medicine",{ theme: "colored" })
            console.log(err)
          }
          toast.success("Medicine Added to critical medicines",{ theme: "colored" })    
     }
    
  return (
    <>
    <div>
      <h1 style={{
        paddingTop:"80px",
        textAlign:"center"
       
      }}>Available Medicine</h1>
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
              
              setCart(selectedMedicine,selectedMedicineQuantity,selectedMedicinePrice,selectedMedicineMinimumThreshold,medicineQuantity)
            
              // console.log(medicinesCart)
            }}
            
            variant="contained"
            
            >Save</Button>
            </center>
        
        </Box>
      </Modal>
      <Modal
        open={searchModalOpen}
        onClose={handleSearchModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Search Medicine
          </Typography>
          <center style={{ marginTop: "10px" }}>
           <TextField
           variant='outlined'
           label= 'search'
           value={searchMedicine}
           onChange={(e)=>{
            setSearchmedicine(e.target.value)
            
           }}
           />
            
          </center>
        </Box>
       
      </Modal>
    <div className='medicineTableDiv' style={{
        marginTop:"-60px"
      }}>
    <table className='medicineTable'>
    <thead>
      <tr>
        <th>  Name </th>
        <th>Price</th>
        <th> Action</th>
        <th> Mark Critical</th>
      </tr>
    </thead>
    <tbody>
      {medicines.map((med)=>{
        return(
          <tr key={Math.random()}>
          <th> {med.itemName} </th>
          <td>{med.price} </td>
          <td> <IconButton color="primary" onMouseDown={()=>{
            handleOpen()
            setSelectedMedicineMinimumThreshold(med.minimumThresholdValue)
            setSelectedMedicinePrice(med.price)
            setSelectedMedicine(med.itemName)
            setMedicineQuantity(med.quantity)
          }} aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton></td>
        <td>{!isMatch(med.itemName) ?<IconButton onMouseDown={()=>AddToCritical(med)}><CheckCircleOutlineIcon color="success"/></IconButton>:<IconButton onClick={()=>RemoveCritical(med.itemName)}><CheckCircleIcon color="success"/></IconButton>}</td>         
        </tr>
        )
      })}
     
    </tbody>
  </table>
  </div>
  <Tooltip title="Place Order" >
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
          // const usr=localStorage.getItem('user')
          // console.log(usr)
          const cartObj={email:user.email,orders:narr}
          await axios.post(`http://localhost:5050/order`,cartObj)
          navigate('/orders') 
          }}
        >
          <AddShoppingCartIcon />
        </Fab>
        </Tooltip>
        <Tooltip title="Search Medicine">
<Fab color="primary" aria-label="search"
onClick={()=>{
  handleSearchModalOpen()
}}
 style={{
  position: 'fixed',
  top: '160px',
  right: '100px'

}}
>
  <SearchIcon/>
</Fab>

        </Tooltip>
  </div>
  <ToastContainer/>
  </>
  )
}

export default MedicineList