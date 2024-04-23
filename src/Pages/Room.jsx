import React, { useCallback, useEffect, useState } from 'react';
import Background from '../Media/LandingImage.png';
import HomeNavbar from '../Components/HomeNavbar';
import { useSocket } from '../Context/SocketProvider';
import ReactPlayer from 'react-player';
import Peer from '../Services/Peer';

function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [currentUserUserName, setCurrentUserUserName] = useState(null);
  const [roomStatus, setRoomStatus] = useState("No one is here");
  const [myStream, setMyStream] = useState(null);

  useEffect(() => {
    const handleUserJoined = ({ userName, id }) => {
      console.log(`${userName} joined room`);
      if (!remoteSocketId) {
        // Set room number when the first user joins
        setRemoteSocketId(id);
      }
      setCurrentUserUserName(userName);
      setRoomStatus("Connected");
    };

    if (socket) {
      socket.on('user:joined', handleUserJoined);
      socket.on('incoming call',handleIncommingCall) ; 

      return () => {
        socket.off('user:joined', handleUserJoined);
        socket.off('incoming call',handleIncommingCall) ; 
      };
    }
  }, [socket, remoteSocketId]);

  const handleCallButtonClick = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    const offer = await Peer.getOffer() ; 
    socket.emit("user:call",{to:remoteSocketId,offer})
    setMyStream(stream);
  }, []);
const handleIncommingCall = useCallback((from,offer)=>{
  console.log('Incoming call',from,offer) ; 

})
 

  return (
    <div className="Room-Container w-screen h-screen relative">
      <img src={Background} alt="background-image" className="absolute inset-0 w-full h-full object-cover" />
      <HomeNavbar  />
      {myStream ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 ">
          <ReactPlayer playing muted height="900px" width="1000px" url={myStream} />
        </div>
      ) : (
        <div className="Room-body absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-opacity-80 shadow-xl font-bold p-8">
          <p className="text-2xl mb-4">Room Number: {remoteSocketId}</p>
          <p className="text-xl mb-4">{roomStatus}</p>
          {currentUserUserName ? (
            <button
              onClick={handleCallButtonClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4 transition duration-300"
            >
              Call {currentUserUserName}
            </button>
          ) : (
            <p className="text-3xl mt-4 mb-4 text-black"></p>
          )}
        </div>
      )}
    </div>
  );
}

export default Room;
