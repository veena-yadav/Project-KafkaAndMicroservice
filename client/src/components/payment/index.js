import React, { useState ,useEffect,useContext } from 'react'
import './payment.css'
import {useNavigate} from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { UserContext } from '../../contextapi/usercontext'
import validator from 'validator'
const Payment = () => {

  // const [cardNumber,setCardNumber]=useState('')
  const [expDate,setExpDate]=useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorColor,setErrorColor]=useState('red')
  const [val, setVal] = useState('');
  const [totalPrice , setTotalPrice]=useState(0)
  const [CardHolderName,setCardHolderName]=useState('')
  const [medicineArray,setMedicineArray]=useState([])

  const [userAddress,setUserAddress]=useState('')
  const [paymentArray,setPaymentArray]=useState([])

const d = new Date();
const month = d.getMonth()+1;
const year=d.getFullYear();

const minDate=month<10?`${year}-0${month}`:`${year}-${month}`;
const maxYear=year+5;
const maxMonth=month;
const maxDate=maxMonth<10?`${maxYear}-0${maxMonth}`:`${maxYear}-${maxMonth}`;

//   const notify = ()=>{
 
//     // Calling toast method by passing string
//     toast('Hello Geeks')
// }
const navigate=useNavigate()
useEffect(()=>{
  getMedicines()
},[])
useEffect(()=>{
  getAddress()
},[])
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
const {auth, admin , user}=useContext(UserContext);  
// validate card number
const getMedicines=async()=>{
  try{
    const data= await axios.post('http://localhost:5000/user/getOrdersByEmail',{
        email: user.email
      })
      setMedicineArray(data.data[1])
      setTotalPrice(data.data[0])
  }
  catch(err)
  {
    console.log(err)
  }
}
  const validateCreditCard = (value) => {
    
    if (validator.isCreditCard(value)) {
      setErrorMessage('Valid CreditCard Number')
      setErrorColor('green')
      // toast(errorMessage);
    } else {
      setErrorMessage('Enter valid CreditCard Number!')
      setErrorColor('red')
    }
  }
  const paymentsubmit=async()=>{
    // console.log(val)
    console.log(month)
    console.log(year)
    
    if(errorMessage==='Enter valid CreditCard Number!')
    {
      setErrorColor('red')
      console.log(errorMessage)
      toast.error(errorMessage,{ theme: "colored" })
      return 
    }
    else
    {
      setErrorColor('green')
    }
    if(val==='')
    {
      toast.error("Please enter CVV",{ theme: "colored" })
      return
   
    }

    // const newPayment={
    //   CardHolderName,
    //   price:'66'
    // }
    
    // console.log(newPayment)
    if(medicineArray.length>0)
    {
     const updatedArray=[...medicineArray]
     for(let i=0;i<updatedArray.length;i++)
     {
      updatedArray[i].address=userAddress
     }
     setPaymentArray(updatedArray)
      try{
     
        const paymentDone=  await axios.post('http://localhost:5050/move',{
          email: user.email,
          order_bucket:updatedArray
        })
        
      }
     catch(err)
     {
      console.log(err)
      return
     }
     toast.success("Payment successful")

     navigate('/invoice')
    }
  
  

  }
  // const getMedicinePrice=()=>{
  //   return medicineArray.reduce((a,v)=>a+v.price)
  // }
  // useEffect(() => {
   
  // }, [input])
  return (
    <div id='paymentDiv'>
    <div className="containerPay d-flex justify-content-center mt-5 mb-5">

            <div className="row g-3">

              <div className="col-md-6">  
                
                <span>Payment Method</span>
                <div className="card">

                  <div className="accordion" id="accordionExample">
                    
                    <div className="card">
                      <div className="card-header p-0" id="headingTwo">
                        <h2 className="mb-0">
                          <button className="btn btn-light btn-block text-left collapsed p-3 rounded-0 border-bottom-custom" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <div className="d-flex align-items-center justify-content-between">

                              <span onClick={(e)=>{
                                toast("You have to pay 70")
                              }}>Cash on Delivery</span>
                              {/* <img src="cash-on-delivery.png" alt="xyz" width="30"/> */}
                              
                            </div>
                          </button>
                        </h2>
                      </div>
                      <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div className="card-body">
                          <input type="text" className="form-control" placeholder="Paypal email"/>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header p-0">
                        <h2 className="mb-0">
                          <button className="btn btn-light btn-block text-left p-3 rounded-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <div className="d-flex align-items-center justify-content-between">

                              <span>Credit card</span>
                              <div className="icons">
                                <img id="card" src="https://i.imgur.com/2ISgYja.png" width="30" alt="xyz"/>
                                <img id="card" src="https://i.imgur.com/W1vtnOV.png" width="30" alt="xyz"/>
                                <img id="card" src="https://i.imgur.com/35tC99g.png" width="30" alt="xyz"/>
                                <img id="card" src="https://i.imgur.com/2ISgYja.png" width="30" alt="xyz"/>
                              </div>
                              
                            </div>
                          </button>
                        </h2>
                      </div>

                      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body payment-card-body">
                        <span className="font-weight-normal card-text">Card Holder Name</span>
                          <div className="input">

                            <i className="fa fa-credit-card"></i>
                            <input type="text"
                             className="form-control" 
                            value={CardHolderName}
                            onChange={(e)=>setCardHolderName(e.target.value)}
                           
                             required
                             />
                   
                            
                          </div>   
                          <span className="font-weight-normal card-text">Card Number</span>
                          <div className="input">

                            <i className="fa fa-credit-card"></i>
                            <input type="text"
                             className="form-control" 
                             placeholder="0000 0000 0000 0000"
                             onChange={(e) => validateCreditCard(e.target.value)}
                             required
                             />
                             <span style={{
          fontWeight: 'bold',
          color: errorColor,
        }}>{errorMessage}</span>
                            
                          </div> 

                          <div className="row mt-3 mb-3">

                            <div className="col-md-6">

                              <span className="font-weight-normal card-text">Expiry Date</span>
                              <div className="input">

                                <i className="fa fa-calendar"></i>
                                <input type="month"  min={minDate} max={maxDate} className="form-control" placeholder="MM/YY"/>
                                
                              </div> 
                              
                            </div>


                            <div className="col-md-6">

                              <span className="font-weight-normal card-text">CVC/CVV</span>
                              <div className="input">

                                <i className="fa fa-lock"></i>
                                <input type="text"
        pattern="[0-9]*" maxLength={3} minLength={0}
        value={val}
        onChange={(e) =>
          setVal((v) => (e.target.validity.valid ? e.target.value : v))
        } className="form-control" placeholder="000"/>
                                
                              </div> 
                              
                            </div>
                            

                          </div>

                          <span className="text-muted certificate-text"><i className="fa fa-lock"></i> Your transaction is secured with ssl certificate</span>
                         
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  
                </div>

              </div>

              <div className="col-md-6">
                  <span>Summary</span>

                  <div className="card">

                    <div className="d-flex justify-content-between p-3">

                      <div className="d-flex flex-column">

                        <span>Total Amount </span>
                        {/* <a href="#" className="billing">Save 20% with annual billing</a> */}
                        
                      </div>

                      <div className="mt-1">
                        <sup className="super-price">₹{totalPrice}</sup>
                        {/* <span className="super-month">/Month</span> */}
                      </div>
                      
                    </div>

                    <hr className="mt-0 line"/>

                    <div className="p-3">
  
                    
                     {medicineArray.map(medicine=>{
                      
                      
                      return (
                        <div key={medicine._id} className="d-flex justify-content-between">

                        <span>{medicine.itemName} X {medicine.quantity}</span>
                        <span>{medicine.price}</span>
                        
                      </div>
                      )
                     })} 
                   
                      

                    </div>

                    <hr className="mt-0 line"/>



                    <div className="p-3">

                    <button onClick={paymentsubmit} className="btn btn-primary btn-block free-button w-100 btnStyle">Pay Amount</button> 
                   {/* <div className="text-center">
                    
                     <a href="#">Recheck Details </a>
                   </div> */}
                      
                    </div>



                    
                  </div>
              </div>
              
            </div>
            
            </div>
            <ToastContainer />
          </div>
  )
}

export default Payment
