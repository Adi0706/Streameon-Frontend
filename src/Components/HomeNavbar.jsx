import React from 'react';
import VideoIcon from '../Media/video-camera-icon.png'
import  {NavLink}  from 'react-router-dom';
import user from '../Media/usericon.png';


function HomeNavBar() {
  return (
    <nav className='navbar  '>
      <ul className='flex p-4'>
        <li className='ml-6 text-3xl font-bold flex items-center'>Streameon <img src={VideoIcon} alt="video-icon" className='w-7 h-7  ml-2  mt-2'></img></li>
        <li className='ml-6 text-2xl  flex items-center w-7 h-7'><img src={user}></img></li>
       
      </ul>
    </nav>
  );
}

export default HomeNavBar;
