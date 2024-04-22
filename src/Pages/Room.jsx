import React, { useCallback, useEffect, useState } from 'react';
import Background from '../Media/LandingImage.png';
import HomeNavbar from '../Components/HomeNavbar';
import { useSocket } from '../Context/SocketProvider';

function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [currentUseruserName, setCurrentUseruserName] = useState(null);

  const handleUserJoined = useCallback(({userName, id}) => {
    console.log(`${userName} joined room`);
    setRemoteSocketId(id);
    setCurrentUseruserName(userName);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('user:joined', handleUserJoined);

      return () => {
        socket.off('user:joined', handleUserJoined);
      };
    }
  }, [socket, handleUserJoined]);

  const handleCallButtonClick = () => {
    if (currentUseruserName) {
      console.log(`Calling ${currentUseruserName}...`);
      // Implement your call functionality here
      // Example: Make API call to initiate a call
    }
  };

  return (
    <div className="Room-Container w-screen h-screen relative">
      <img src={Background} alt="background-image" className="absolute inset-0 w-full h-full object-cover" />
      <HomeNavbar />
      <div className="Room-body absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center  bg-opacity-80 shadow-xl font-bold p-8">
        {currentUseruserName ? (
          <>
            <p className="text-2xl mb-4">Hi, {currentUseruserName}!</p>
            <button
              onClick={handleCallButtonClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Call
            </button>
          </>
        ) : (
          <p className="text-3xl mt-12 text-black">No one is in the room</p>
        )}
      </div>
    </div>
  );
}

export default Room;
