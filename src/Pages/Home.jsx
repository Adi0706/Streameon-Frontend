import React from 'react'
import Background from "../Media/LandingImage.png";
import HomeNavBar from '../Components/HomeNavbar';

function Home() {
  return (
<>
<div className='Home-Container w-screen h-screen' >
  <HomeNavBar/>
<img
          src={Background}
          alt="background-image"
          className="absolute inset-0 w-full h-full object-cover"
        />
</div>
</>
  )
}

export default Home