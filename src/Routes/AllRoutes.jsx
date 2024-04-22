import React from 'react'
import {Routes,Route} from 'react-router-dom' ; 
import LandingPage from '../Pages/LandingPage';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import ForgotPassword from '../Pages/ForgotPassword';
import Home from '../Pages/Home';
import ResetPassword from '../Pages/ResetPassword';
import Room from '../Pages/Room';

function AllRoutes() {
  return (
   <>
   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Forgotpassword' element={<ForgotPassword/>}/>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/ResetPassword' element={<ResetPassword/>}/>
    <Route path='/Room/:RoomId' element={<Room/>}/>
   </Routes>
   </>
  )
}

export default AllRoutes ; 