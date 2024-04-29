import React, {  useEffect,useRef,useState } from 'react'
import Background from "../Media/LandingImage.png";
import HomeNavBar from '../Components/HomeNavbar';
import icon from "../Media/video-camera-icon.png";
import Peer from 'simple-peer' ; 
import {CopyToClipboard} from 'react-copy-to-clipboard' ; 
import { io } from 'socket.io-client';
import { connection } from 'mongoose';


const socket = io.connect('http://localhost:8000')

function Home() {
  const [me,setMe] = useState("");
  const [stream,setStream] = useState();
  const [receivingCall,setReceivingCall] = useState(false);
  const [caller,setCaller] = useState("");
  const [callerSignal,setCallerSignal] = useState();
  const [callAccepted,setCallAccepted] = useState(false);
  const [idToCall,setIdToCall] = useState("");
  const [callEnded,setCallEnded] = useState(false);
  const [name,setName] = useState("");
  
 const myVideo = useRef() ; 
 const userVideo = useRef() ; 
 const connectionRef = useRef(); // disconnect the call 


 useEffect(()=>{
navigator.mediaDevices.getUserMedia({video:true,audio:true})
.then((stream)=>{
  setStream(stream)
  myVideo.current.srcObject = stream ; 
})

socket.on("me",(id)=>{
  setMe(id) ; 
})

socket.on("callUser",(data)=>{
  setReceivingCall(true) ; 
  setCaller(data.from) ; 
  setName(data.name) ; 
  setCallerSignal(data.signal) ; 
})
 },[])

 const callUser = (id)=>{
  const peer = new Peer ({
    initiator:true,
    trickle:false,
    stream:stream
  })

  peer.on("signal",(data)=>{
    socket.emit("callUser",{
      userToCall:id,
      signalData:data,
      from:me,
      name:name,
    })
  })

  peer.on("stream",(stream)=>{
    userVideo.current.srcObject = stream ; 
  })

  socket.on("callAccepted",(signal)=>{
    setCallAccepted(true) ; 
    peer.signal(signal) ; 
  })

connectionRef.current = peer ; 

 }


const answerCall = () =>{
  setCallAccepted(true) ;
  const peer = new Peer({
    initiator:false,
    trickle:false,
    stream:stream
  })

peer.on("signal",(data)=>{
  socket.emit("answerCall",{signal:data,to:caller})
})

peer.on("stream",(stream)=>{
  userVideo.current.srcObject = stream ; 
})

peer.signal(callerSignal)
connectionRef.current = peer ; 

}


const leaveCall = ()=>{
  setCallEnded(true) ; 
  connectionRef.current.destroy()
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
      <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
      <input
        type="text"
        id="roomNumber"
        name="roomNumber"
        // value={room}
        // onChange={(e)=>setRoom(e.target.value)}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Enter room number"
        required
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
    >
   Join Call
    </button>
  </form>
</div>

</div>
</>
  )
}

export default Home ;