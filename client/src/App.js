import Payment from './components/payment';
import Registration from './components/registrationform';
import LoginForm from './components/registrationform/Login';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Navbar from './components/navbar';
import MedicineList from './components/medicinelist';
import Errorpage from './components/Errorpage';
import AdminForm from './components/adminlogin';
import AdminMedicineList from './components/adminmedicinelist';
import Orders from './components/orders/index';
import React,{useEffect, useState,useContext} from 'react'
import AdminReorders from './components/adminReorders';
import SampleComp from './components/samplecomp';
import { UserContext } from './contextapi/usercontext';
import PrivateRoute from './privateroutes/privateroutes';
import UserNavbar from './components/usernavbar';
import LoginNavbar from './components/loginnavbar';
import AdminReorderedHistory from './components/reorderedmedicine/index.js'
import CriticalHospitals from './components/criticalhospitals'
import Criticalreorder from './components/criticalreorder'
import UserReorder from './components/orders/UserReorder';
import UserCriticalMedicine from './components/userCriticalMedicine';
function App() {
  const [usr,setUsr]=useState('')
  const {auth, admin , user}=useContext(UserContext);
  useEffect(()=>{
    setUsr(localStorage.getItem('user'))
  },[])
  
  return (
    <>

    <Router>
    {auth? (admin?<Navbar/>:<UserNavbar/>):<LoginNavbar/>}
   
      <Routes>
        <Route path='/'  element={<Registration/>}/>
        <Route path='/login'  element={<LoginForm/>}/>
        <Route path='/viewmedicine'  element={<PrivateRoute><MedicineList/></PrivateRoute>}/>
        <Route path='/orders'  element={<PrivateRoute><Orders/></PrivateRoute>}/>
        <Route path='/adminlogin'  element={<AdminForm/>}/>
         <Route path="/adminviewmedicine" element={<PrivateRoute><AdminMedicineList/></PrivateRoute>}/>
         <Route path="/adminReorders" element={<PrivateRoute><AdminReorders/></PrivateRoute>}/>
         <Route path="/payment" element={<PrivateRoute><Payment/></PrivateRoute>}/>
         <Route path="/getreorderedmedicine" element={<AdminReorderedHistory/>}/>
         <Route path='/criticalhospitals' element={<PrivateRoute><CriticalHospitals/></PrivateRoute>}/>
         <Route path="/userReorders"  element={<PrivateRoute><UserReorder/></PrivateRoute>}/>
         <Route path="/usercriticalmedicine" element={<PrivateRoute><UserCriticalMedicine/></PrivateRoute>}/>
        <Route path='/criticalhospitals/criticalreorder' element={<PrivateRoute><Criticalreorder/></PrivateRoute>}/>
        <Route path='*' element={<Errorpage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;