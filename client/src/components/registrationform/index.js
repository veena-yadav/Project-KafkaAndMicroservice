import React,{useState} from 'react'
import axios from 'axios'
import './registration.css'
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegistrationForm = () => {
  
    const [name,setName]=useState('')
    const [age,setAge]=useState('')
    const [gender,setGender]=useState('')
    const [email,setEmail]=useState('')
    const [address,setAddress]=useState('')
    const [password,setPassword]=useState('')
    const [dob,setDob]=useState('')
    const [bloodGroup,setBloodGroup]=useState('')
    const [healthCond
,sethealthCond
]=useState('')
const [disabled , setDisabled]=useState(false)
const Navigate=useNavigate()
const RegisterNow=async(e)=>{
  e.preventDefault()
  console.log("button clicked")
  const newUser={name,age,gender,dob,email,password,bloodGroup,healthCond
,address} 
try {
const newData= await axios.post('http://localhost:5000/api/users/',newUser)
} catch (error) {
console.log(error.response.data.message)
toast.error(error.response.data.message)
return
}
Navigate("/viewmedicine")
}
  return (<>
    <div className='mainDiv'>
    <div class="container">
    <div class="content">
       
            <h1 class="form-title">Register Here</h1>
            <form>
               <input type="text" value={name} placeholder="NAME"
               onChange={(e)=>setName(e.target.value)}
               />
            <div class="beside">
                <input type="number" value={age} placeholder="AGE" onChange={(e)=>setAge(e.target.value)}/>
                <select value={gender} onChange={(e)=>{setGender(e.target.value)
                
                }}>
                    <option>GENDER</option>
                    <option>MALE</option>
                    <option>FEMALE</option>
                    <option>NON-BINARY</option>
                </select>
            </div>
                <input type="email"value={email}  placeholder="EMAIL ADDRESS"
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="text" value={address} placeholder="ADDRESS"
                onChange={(e)=>setAddress(e.target.value)}
                />
                
                <input type="password" value={password} placeholder="PASSWORD"
                onChange={(e)=>setPassword(e.target.value)}
                />
                <div className="beside">
                <input type="date" value={dob} placeholder="DOB"
                onChange={(e)=>setDob(e.target.value)}
                />
                <select value={bloodGroup} onChange={(e)=>setBloodGroup(e.target.value)}>
                    <option>BLOOD GROUP</option>
                    <option>A+</option>
                    <option>AB+</option>
                    <option>B+</option>
                    <option>O</option>
                   
                </select>
           
                </div>
                <input type="text" value={healthCond
} placeholder="HEALTH CONDITION"
                onChange={(e)=>sethealthCond
(e.target.value)}
                />
              <br/>
                <button className='registerButton' type="button"
                disabled={disabled}
                onClick={RegisterNow}
                >Submit</button>
                
                <Link to="/login" className="reg">
            login
              </Link>
            </form>
        </div>
 </div>
 </div>
 <ToastContainer/>
 </>
  )
}

export default RegistrationForm
