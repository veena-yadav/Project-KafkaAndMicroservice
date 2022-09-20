import React, { useState, useEffect } from "react";
import "../medicinelist/medicinelist.css";
import './reorderedmedicine.css';
import axios from "axios";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Label } from "recharts";

const AdminReorderedHistory = () => {
  var ar = [];
  var arr2 = [];
  let sz=0;

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    getMedicine();
  });

  const getMedicine = async () => {
    // setLoading(true)
    try {
      const data = await axios.get(
        "http://localhost:5000/api/admin/getreorderedmedicine"
      );



      // for(let i=0;i<sz;i++)
      // {

      //   ar.push({name:data.data[i].itemName,count:data.data[i].count1})
      // }

      // console.log(ar)
      setMedicines(data.data);
    } catch (error) {
      console.log("error in reorder " + error);
    }
    // setLoading(false)
  };
  const printpart = () => {
    window.print()
}

  return (
    <>
    <div><button onClick={printpart} style={{
  position: 'absolute',
  borderColor:'#0064D2',
  borderRadius:'5px',
  backgroundColor:"#0064D2",
  color:'white',
  top: '120px',
  right: '100px'

}}>Download Report</button></div>
    <div className="printthis">


  <center style={{paddingTop:"80px"}}>
<h1 style={{color:"#0064D2"}}>Reordered Medicines</h1>
<BarChart width={700} height={500}  data={ar} style={{top:"50%"}}>
  <Bar dataKey="count" fill="#0064D2" name='count' />
  <CartesianGrid stroke="#ccc" />
<XAxis  dataKey="name" /> 
  <YAxis label={{ value: 'count of medicines ', angle: -90, position: 'insideLeft' }}/>
</BarChart><p>Medicine Name</p></center>
    <div className='medicineTableDiv'>
    <table className='medicineTable'>
    <thead>
      <tr>
        <th>  Name </th>
        <th>Price</th>
        <th> Quantity</th>
        <th>Total Price</th>
        <th>Order time</th>
        
      </tr>
    </thead>
    <tbody>
      
            {medicines.map((med) => {
              if(sz!==7){
              ar.push({ name: med.itemName, count: med.count1 });
            sz++;}
              var dateObject = new Date(med.createdAt);
              var utcYearFromTS = dateObject.getUTCFullYear();
              var utcMonthFromTS = dateObject.getUTCMonth() + 1;
              var utcDateFromTS = dateObject.getUTCDate();
              var utcTimeFromTS = dateObject.getUTCHours();
              var utcMinutesFromTS = dateObject.getUTCMinutes();


              return (
                <tr key={Math.random()}>
                  <th> {med.itemName} </th>
                  <td>{med.price} </td>
                  <td> {med.quantity} </td>
                  <td>{med.price * med.quantity}</td>
                  <td> {utcDateFromTS + "/"+ utcMonthFromTS + "/" + utcYearFromTS + " " + utcTimeFromTS + "H :" + utcMinutesFromTS + "M"} </td>
                </tr>
              );
            })}
          </tbody>
  </table>
  </div>
 
  </div>
  </>
  )
}

export default AdminReorderedHistory;
