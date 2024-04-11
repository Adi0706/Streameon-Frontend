import React from "react";
import Background from "../Media/LandingImage.png";
import icon from "../Media/video-camera-icon.png";
import gicon from '../Media/gicon.png';
import {Link} from 'react-router-dom' ;

function Signup() {
  return (
    <>
      <div className="Signup-Container w-screen h-screen">
        <img
          src={Background}
          alt="background-image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="Signup-form w-96 h-auto shadow-2xl flex flex-col items-center">
          {/* Heading */}
          <div className="flex flex-col items-center m-7">
            <img src={icon} alt="streameon-icon" className="w-7 h-7" />
            <p className="p-2 font-bold">Welcome to Streameon!</p>
          </div>
          
          {/* Form */}
          <form className="w-full max-w-sm flex flex-col p-7">
            {/* Email input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password input */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
                placeholder="Create a password"
                required
              />
            </div>
            
         <div className="m-7 flex flex-col items-center">
            <img src={gicon} alt="googleauth" className="w-7 h-7 m-5"></img>
            <p>Already have an account ? <Link to='/Login'><span className="font-bold">Login</span></Link></p>
         </div>
            {/* Submit button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
