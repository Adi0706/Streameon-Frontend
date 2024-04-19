import React, { useState, useEffect, useRef } from "react";
import VideoIcon from "../Media/video-camera-icon.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import user from '../Media/usericon.png'

function HomeNavBar() {
  const [accountDropDown, setAccountDropDown] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null); // State to hold the profile picture URL
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    setAccountDropDown(!accountDropDown); // Toggle dropdown visibility
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Clicked outside of the dropdown, close it
      setAccountDropDown(false);
    }
  };

  useEffect(() => {
    // Add event listener on component mount to detect clicks outside of dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  useEffect(() => {
    // Fetch the profile picture URL from the backend
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/GetProfilepicture");
        if (response.status === 200) {
          const lastProfileImage = response.data;
          if (lastProfileImage && lastProfileImage.image) {
            setProfilePicture(`http://localhost:8000/Images/${lastProfileImage.image}`);
          } else {
            console.error("No profile picture found in response:", response.data);
          }
        } else {
          console.error("Failed to fetch profile picture. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture(); // Call the function to fetch the profile picture
  }, []); // Empty dependency array ensures this effect runs only on mount

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="navbar w-screen shadow-xl m-5 p-5 ml-0">
      <ul className="flex items-center justify-between">
        <li className="text-3xl font-bold flex items-center">
          Streameon{" "}
          <img
            src={VideoIcon}
            alt="video-icon"
            className="w-7 h-7 ml-2 mt-2"
          />
        </li>
        <li
          className="text-2xl mr-36 flex items-center cursor-pointer relative transform "
          onClick={handleClick}
          ref={dropdownRef}
        >
          {profilePicture ? ( // Conditionally render profile picture if available
            <img src={profilePicture} alt="profile-picture" className="w-10 h-10 rounded-full" />
          ) : (
            <img src={user} alt="user-icon" className="w-7 h-7" />
          )}
          
          {accountDropDown && (
            <div className="Dropdown mt-36 w-36 rounded-lg shadow-xl z-10">
              <ul className="py-2 flex flex-col text-black">
                <li className="px-4 py-2 text-lg cursor-pointer hover:text-white">
                  <NavLink to="/Profile">Profile</NavLink>
                </li>
                <li className="px-4 py-2 text-lg cursor-pointer hover:text-white">
                  <p onClick={handleLogout}>Log Out</p>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default HomeNavBar;
