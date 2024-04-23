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
  const [remoteStream, setRemoteStream] = useState(null);

  const handleUserJoined = useCallback(({ userName, id }) => {
    console.log(`${userName} joined room`);
    if (!remoteSocketId) {
      setRemoteSocketId(id);
    }
    setCurrentUserUserName(userName);
    setRoomStatus("Connected");
  }, [remoteSocketId]);

  const handleCallUser = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const offer = await Peer.getOffer();
      socket.emit("user:call", { to: remoteSocketId, offer });
      setMyStream(stream);
    } catch (error) {
      console.error("Error initiating call:", error);
    }
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    console.log(from + "is calling you ");
    setRemoteSocketId(from);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    setMyStream(stream);
    console.log('Incoming call', from, offer);
    const answer = await Peer.getAnswer(offer);
    socket.emit("call:accepted", { to: from, answer });
  }, [socket]);

  const handleCallAccepted = useCallback(({ from, answer }) => {
    console.log("Call accepted");
    Peer.setRemoteDescription(answer); // Assuming 'ans' is the remote description
  }, []);
  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);


    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
     
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
     handleCallAccepted,
    
  ]);

 

  return (
    <div className="Room-Container w-screen h-screen relative">
      <img src={Background} alt="background-image" className="absolute inset-0 w-full h-full object-cover" />
      <HomeNavbar />
      <div className="Room-body absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-opacity-80 shadow-xl font-bold p-8">
        <p className="text-2xl mb-4">Room Number: {remoteSocketId}</p>
        <p className="text-xl mb-4">{roomStatus}</p>
        {currentUserUserName ? (
          <button
            onClick={handleCallUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4 transition duration-300"
          >
            Call {currentUserUserName}
          </button>
        ) : (
          <p className="text-3xl mt-4 mb-4 text-black"></p>
        )}
      </div>
      {myStream && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 ">
          <ReactPlayer playing muted height="900px" width="1000px" url={myStream} />
        </div>
      )}
      {remoteStream && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 ">
          <ReactPlayer playing muted height="900px" width="1000px" url={remoteStream} />
        </div>
      )}
    </div>
  );
}

export default Room;
