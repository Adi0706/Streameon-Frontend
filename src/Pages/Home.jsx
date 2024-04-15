import React from 'react'
import Background from "../Media/LandingImage.png";
import HomeNavBar from '../Components/HomeNavbar';
import icon from "../Media/video-camera-icon.png";

function Home() {


  const handleSubmit=(e)=>{
e.preventDefault();
  }
  return (
<>
<div className='Home-Container w-screen h-screen' >
  <HomeNavBar/>
<img
          src={Background}
          alt="background-image"
          className="absolute inset-0 w-full h-full object-cover"
        />
       <div className='Room-form  h-auto w-96 shadow-xl shadow-slate-700 '>
     
  <form onSubmit={handleSubmit} className='flex flex-col p-7 gap-5  items-center'>
  <img src={icon} alt="streameon-icon" className="w-7 h-7" />
  <p className='font-bold'>Start a Video Call !</p>
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Enter your email"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
      <input
        type="text"
        id="roomNumber"
        name="roomNumber"
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Enter room number"
        required
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
    >
       Send Call
    </button>
  </form>
</div>

</div>
</>
  )
}

export default Home ;