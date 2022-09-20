import React, { useState ,useEffect,useContext } from 'react'
import './invoice.css';
import axios from 'axios'
import { UserContext } from '../../contextapi/usercontext'



function Invoice() {
    const [medicineArray,setMedicineArray]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)
    const [userAddress,setUserAddress]=useState('')
useEffect(()=>{
    getMedicines()
    getAddress()
  },[])

    const {auth, admin , user}=useContext(UserContext);  
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
const getMedicines=async()=>{
  try{
    // console.log(user.email)
    const data= await axios.post('http://localhost:5000/user/showHistory',{
        email: user.email
      })
    //   console.log(data.data);
      setTotalPrice(data.data[0])
      setMedicineArray(data.data[1])
      
      
  }
  catch(err)
  {
    console.log(err)
  }
}

    const printpart = () => {
        window.print()
    }
  return (
    <>
    <div className='invoicePrint' style={{position: 'absolute',
  borderColor:'#0064D2',
  borderRadius:'5px',
  backgroundColor:"#0064D2",
  color:'white',
  top: '90px',
  right: '100px'}}><button onClick={printpart} className='invoicePrint' >Print</button></div>
        <div className='printthis'>
            <main style={{padding:'80px'}}>
                <div>
                    <h1><center>Invoice</center></h1>
                </div>

                {/* admin details */}
                <section className='adminDetails'>
                    <h2>Medico</h2>
                    <p>Baker Street, 19 June Road, New Delhi <br/> Pin Code: 110001 </p>
                </section>
                {/* details ends */}

                {/* user details */}
                <section className='userDetails'>
                    <h2>{user.email}</h2>
                    <p>{userAddress}</p>
                </section>
                {/* user details ends */}
                

                {/* dates */}
                <article className='adminDetails'>
                    <ul className='ul_123'>
                        <li><span className='font-bold'>Invoicer Number:</span>3872847</li>
                        <li><span className='font-bold'>Invoice Date:</span>09-09-2022</li>
                        <li><span className='total-price'>Total Price:</span> ₹{totalPrice}</li>
                        {/* <li><span className='font-bold'>Due Date:</span></li> */}
                    </ul>
                </article>
                {/* dates ends */}

                {/* Table */}
                <table className='center_321'>
                    <thead className='font-bold'>
                        <tr>
                            <td>Description</td>
                            <td>Quantity</td>
                            <td>Price</td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                    {medicineArray.map(medicine=>{
                      
                      return (
                
                        <tr className="h-10" key={medicine._id}>
                            <td>{medicine.itemName}</td>
                            <td>{medicine.quantity}</td>
                            <td>{medicine.price}</td>
                            <td>{medicine.price *medicine.quantity}</td>
                        </tr>
                      )
                    }
                    )}
                    </tbody>
                </table>

                {/* End of table */}

                {/* Notes */}
                <section className='mb-5'>
                    {/* textarea */}
                    <p>Notes to the user....</p>
                </section>
                {/* End of notes */}

                {/* Footer */}
                <footer className='center_321'>
                    <ul className='ul_123'>
                        <li><span className='font-bold'>Name:</span>Medico</li>
                        <li><span className='font-bold'>Email:</span> medicoservice2022@gmail.com</li>
                        <li><span className='font-bold'>Phone number:</span> 97657795xx</li> 
                        <li><span className='font-bold'>Website:</span> https://www.medico.com</li>
                    </ul>
                </footer>
                {/* End of Footer */}

            </main>
        </div>

    </>
  )
}

export default Invoice
