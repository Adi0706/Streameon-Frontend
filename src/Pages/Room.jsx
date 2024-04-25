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
      setMyStream(stream);

      const offer = await Peer.getOffer();
      socket.emit("user:call", { to: remoteSocketId, offer });
    } catch (error) {
      console.error("Error initiating call:", error);
    }
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    console.log(`${from} is calling you`);
    setRemoteSocketId(from);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setMyStream(stream);

      const answer = await Peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, answer });
    } catch (error) {
      console.error("Error accepting call:", error);
    }
  }, [socket]);

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      Peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(({ from, answer }) => {
    try {
      Peer.setLocalDescription(answer);
      console.log("Call accepted");
      sendStreams();
    } catch (error) {
      console.error("Error setting local description:", error);
    }
  }, [sendStreams]);

  const handleNegotiationNeeded = useCallback(async () => {
    try {
      const offer = await Peer.getOffer();
      socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    } catch (error) {
      console.error("Error generating offer:", error);
    }
  }, [remoteSocketId, socket]);

  const handleIncomingNegotiation = useCallback(async ({ from, offer }) => {
    try {
      const answer = await Peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, answer });
    } catch (error) {
      console.error("Error processing negotiation:", error);
    }
  }, [socket]);

  const handleNegoFinal = useCallback(async ({ answer }) => {
    try {
      await Peer.setLocalDescription(answer);
    } catch (error) {
      console.error("Error setting local description:", error);
    }
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegotiationNeeded);
    socket.on("peer:nego:final", handleNegoFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegotiationNeeded);
      socket.off("peer:nego:final", handleNegoFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegotiationNeeded,
    handleNegoFinal,
  ]);

  return (
    <div className="Room-Container w-screen h-screen relative bg-gray-100">
      <img src={Background} alt="background-image" className="absolute inset-0 w-full h-full object-cover" />
      <HomeNavbar />
      <div className="Room-body absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white bg-opacity-80 shadow-xl font-bold p-8">
        <p className="text-2xl mb-4">Room Number: {remoteSocketId}</p>
        <p className="text-xl mb-4">{roomStatus}</p>
        {currentUserUserName && (
          <button
            onClick={handleCallUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4 transition duration-300"
          >
            Call {currentUserUserName}
          </button>
        )}
      </div>
      {(myStream || remoteStream) && (
        <div className="fixed inset-0 z-50 bg-black">
          {remoteStream && (
            <ReactPlayer
              playing
              muted
              width="100%"
              height="100%"
              url={remoteStream}
            />
          )}
          {myStream && (
            <ReactPlayer
              playing
              muted
              width="100%"
              height="100%"
              url={myStream}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Room;
