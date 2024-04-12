import React from 'react'
import {Routes,Route} from 'react-router-dom' ; 
import LandingPage from '../Pages/LandingPage';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import ForgotPassword from '../Pages/ForgotPassword';

function AllRoutes() {
  return (
   <>
   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Forgotpassword' element={<ForgotPassword/>}/>
   </Routes>
   </>
  )
}

export default AllRoutes