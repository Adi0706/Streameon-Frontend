import React, { useState } from "react";
import Background from "../Media/LandingImage.png";
import VideoIcon from "../Media/video-camera-icon.png";
import axios from 'axios';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpload = () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios.post("http://localhost:8000/api/Upload", formData)
      .then(res => {
        console.log(res.data);
        setImage(res.data.image); // Update the image state with the new URL
        // setIsEditing(false); // Exit edit mode after successful upload
      })
      .catch(err => console.error(err));
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
              src={`http://localhost:8000/Images/${image}`}
              className="border border-solid border-black rounded-full w-36 h-36 m-5"
              alt="profile-preview"
            />
            {isEditing ? (
              <div className="flex flex-col items-center">
                {/* Styled file input */}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  style={{ display: "none" }} 
                  onChange={e => setFile(e.target.files[0])}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Upload Profile Picture
                </label>
                <button
                  className="mt-3 bg-green-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={handleUpload}
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                className="mt-3 bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            )}
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
                value={name}
                onChange={e => setName(e.target.value)}
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
                value={email}
                onChange={e => setEmail(e.target.value)}
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
