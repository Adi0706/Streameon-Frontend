import React, { useState, useEffect } from "react";
import Background from "../Media/LandingImage.png";
import Preview from "../Media/preview.png";
import VideoIcon from "../Media/video-camera-icon.png";
import axios from 'axios';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/Users");
        const { data } = response; // Destructure the data object from the response
        console.log(data);
        setName(data.name); // Set name from the response data
        setEmail(data.email); // Set email from the response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Logic to save form data can be added here
    setIsEditing(false);
  };

  return (
    <div className="Profile-Container w-full h-full flex justify-center items-center">
      <img
        src={Background}
        alt="background-image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="Profile-Form rounded-lg shadow-xl p-7 flex flex-col items-center gap-5 bg-white bg-opacity-20 shadow-slate-500">
        <div className="text-3xl text-white font-bold mb-4 flex flex-col items-center">
          Streameon{" "}
          <img src={VideoIcon} alt="video-icon" className="w-7 h-7" />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center">
            <img
              src={Preview}
              className="border border-solid border-black rounded-full w-36 h-36"
              alt="profile-preview"
            />
            {isEditing ? (
              <>
                <button className="mt-3 bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Upload New Picture
                </button>
                <button
                  className="mt-3 bg-green-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                className="mt-3 bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleEditClick}
              >
                Edit Profile 
              </button>
            )}
          </div>
          <div className="w-36 h-36 flex flex-col items-start p-3 font-bold">
            <p className="text-sm ">{name}</p>
            <p className="text-sm">{email}</p>
          </div>
        </div>
        {isEditing && (
          <form className="mt-5 w-full">
            <div className="mb-3">
              <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="w-full   rounded-xl p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full   rounded-xl p-2"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
