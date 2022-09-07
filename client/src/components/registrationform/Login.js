import React, { useState , useContext  } from "react";
import axios from "axios";
import "./registration.css";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../../contextapi/usercontext";

const LoginForm = () => {
  const {setUser, setAuth, setAdmin, auth}=useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate=useNavigate()
  const LoginNow = async (e) => {
    e.preventDefault();
    let newUser = {
      email,
      password
    }
    
    try {
      const newData = await axios.post(
        "http://localhost:5000/api/users/login",
        newUser
      );
      setUser(newUser);
      setAuth(true);
      setAdmin(false);
    } catch (error) {
      toast.error(error.response.data.message)
      return;
    }
    toast("login success")
    localStorage.setItem('user',newUser.email)
    
    Navigate("/viewmedicine")
  }
  return (
    <>
      <div className="mainDivLogin">
        <div class="container">
          <div class="contentlogin">
            <h1 class="form-title">LOGIN</h1>
            <form>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <button
                  className="registerButton"
                  type="button"
                  onClick={LoginNow}
                >Login</button>
                <Link to="/" className="reg">
                  register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
