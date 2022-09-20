import React, { useState,useEffect } from 'react'
import './criticalreorder.css'
import axios from 'axios'

const Criticalreorder = () => {
  const [medicines,setMedicines]=useState([])
  const [loading , setLoading]=useState(false);
  useEffect(() => {
    getMedicine()
  }, [])
  const getMedicine=async()=>{
    setLoading(true)
    try {
      const data= await axios.get('http://localhost:5000/getreorders')
      setMedicines(data.data)
    } catch (error) {
      console.log("error is "+error)
    }
    setLoading(false)
  }
  return (
    <div className='medicineTablever'>
      {/* <div className='wrapper'>
        <h1>Hello</h1>
        <div className='medicineTableDiv'>
        <select name="" id="" className='select'>
          <option value="">Hospital</option>
        </select>
        <select name="" id="" className='select2'>
          <option value="">Medicine</option>
        </select>
        <select name="" id="" className='select3'>
          <option value="">Quantity</option>
        </select>
        <button className='button'>Confirm Reorder</button>
        </div>
      </div> */}
    <div className='medicineTableDiv'>
    <table className='medicineTable'>
    <thead>
      <tr>
        <th> Medicine Name </th>
        <th> Hospital</th>
        <th> Quantity</th>
        <th> Ordered at</th>
      </tr>
    </thead>
    <tbody>
      {medicines.map((med)=>{
        var dateObject = new Date(med.createdAt);
        var utcYearFromTS = dateObject.getUTCFullYear();
        var utcMonthFromTS = dateObject.getUTCMonth() + 1;
        var utcDateFromTS = dateObject.getUTCDate();
        var utcTimeFromTS = dateObject.getUTCHours();
        var utcMinutesFromTS = dateObject.getUTCMinutes();
        return(
          <tr key={Math.random()}>
          <th> {med.medicineName} </th>
          <td> {med.hospitalName} </td>
          <td>{med.quantity} </td>
          <td> {utcDateFromTS + "/"+ utcMonthFromTS + "/" + utcYearFromTS + " " + utcTimeFromTS + "H :" + utcMinutesFromTS + "M"} </td>
        </tr>
        )
      })}
     
    </tbody>
  </table>
  </div>
  </div>
  )
}

export default Criticalreorder