
import React, { useState , useContext  } from "react";
import axios from "axios";
import "./registration.css";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../../contextapi/usercontext";
import { Button, ButtonBase } from "@mui/material";
const ResetPassword = () => {

    const {auth, admin , user}=useContext(UserContext);  
    const [password,setPassword]=useState("")
    const [cpassword,setCPassword]=useState("")
    const navigate=useNavigate();
    const ResetNow=async(e)=>{
      e.preventDefault()
     if(password!==cpassword)
     {
        toast.error("Confirm password doesn't match",{ theme: "colored" })
        return
     }
     try {
        const rp=await axios.post(`http://localhost:5000/api/users/resetpassword`,{
            email:user.email,
            password:password
        })
     } catch (err) {
        console.log(err)
        toast.error("Unable to process request",{ theme: "colored" })
        return
     }
     toast.success("Password Changed successfully",{ theme: "colored" })
     navigate("/login")
    }
  return (
    <>
    <div className="mainDivLogin">
      <div class="container">
        <div class="contentlogin">
          <h1 class="form-title">LOGIN</h1>
          <form>
           
            <input
              type="password"
              placeholder="PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
            />
             <input
              type="password"
              placeholder="CONFIRM PASSWORD"
              onChange={(e) => setCPassword(e.target.value)}
            />
            <div>
              <button
                className="registerButton"
                type="button"
                onClick={ResetNow}
              >Reset</button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
  </>
  )
}

export default ResetPassword