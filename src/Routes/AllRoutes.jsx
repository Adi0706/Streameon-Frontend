import React from 'react'
import {Routes,Route} from 'react-router-dom' ; 
import LandingPage from '../Pages/LandingPage';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import ForgotPassword from '../Pages/ForgotPassword';
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import ResetPassword from '../Pages/ResetPassword';

function AllRoutes() {
  return (
   <>
   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Forgotpassword' element={<ForgotPassword/>}/>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/Profile' element={<Profile/>}/>
    <Route path='/ResetPassword' element={<ResetPassword/>}/>
   </Routes>
   </>
  )
}

export default AllRoutes ; 