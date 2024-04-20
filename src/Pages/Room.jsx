import React from 'react'
import Background from "../Media/LandingImage.png";
import HomeNavbar from '../Components/HomeNavbar' ; 
function Room() {
  return (
    <>
    <div className='Room-Container w-screen h-screen'>
    <img
          src={Background}
          alt="background-image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <HomeNavbar/>
    </div>
    
    </>
  )
}

export default Room