import Payment from './components/payment';
import Registration from './components/registrationform';
import LoginForm from './components/registrationform/Login';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Navbar from './components/navbar';
import MedicineList from './components/medicinelist';
import Errorpage from './components/Errorpage';
import AdminForm from './components/adminlogin';
import AdminMedicineList from './components/adminmedicinelist';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/'  element={<Registration/>}/>
        <Route path='/login'  element={<LoginForm/>}/>
        <Route path='/viewmedicine'  element={<MedicineList/>}/>
        <Route path='/adminlogin'  element={<AdminForm/>}/>
         <Route path="/adminviewmedicine" element={<AdminMedicineList/>}/>
        <Route path='*' element={<Errorpage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;