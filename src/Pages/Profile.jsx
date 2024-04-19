import React, { useState, useEffect } from "react";
import Background from "../Media/LandingImage.png";
import VideoIcon from "../Media/video-camera-icon.png";
import axios from 'axios';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [userName, setUserName] = useState('');

  const [error, setError] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpload = () => {
    if (!file) {
      setError("No File Uploaded!");
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios.post("http://localhost:8000/api/Upload", formData)
      .then(res => {
        console.log(res.data);
        const imageUrl = `http://localhost:8000/Images/${res.data.image}`;
        setImage(imageUrl); // Update the image state with the new URL
        localStorage.setItem('profileImage', imageUrl); // Save new image URL to local storage
        setIsEditing(false); // Exit edit mode after successful upload
      })
      .catch(err => {
        console.error("Error uploading file:", err);
        setError("Failed to upload profile picture!");
      });
  };

  const handleDataUpload = () => {
    axios.post("http://localhost:8000/api/Upload", { userName })
      .then(res => {
        console.log(res.data);
        // Handle success response if needed
      })
      .catch(err => {
        console.error("Error uploading profile data:", err);
        setError("Failed to upload profile data!");
      });
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
              src={image}
              className="border border-solid border-black rounded-full w-36 h-36 m-5"
              alt="profile-preview"
            />
            <div className="flex items-center gap-2">
              <input
                id="file-upload"
                type="file"
                className="hidden"
                style={{ display: "none" }} 
                onChange={e => setFile(e.target.files[0])}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer mt-3 bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Upload Profile Picture
              </label>
              <button
                className="mt-3 bg-green-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={handleUpload}
              >
                Save Picture
              </button>
              <button
                className="mt-3 bg-green-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <form className="mt-5 w-full">
          <div className="mb-3">
            <label htmlFor="name" className="block text-sm font-bold text-gray-700">
             Create an Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Enter your Username"
              className="w-full rounded-xl p-2"
            />
          </div>
         
          <button
            type="button"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleDataUpload}
          >
            Save Data
          </button>
        </form>
        {error && (
          <p className="text-red-500 font-bold rounded-xl p-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
