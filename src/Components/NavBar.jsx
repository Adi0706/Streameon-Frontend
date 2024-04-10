import React from 'react';
import VideoIcon from '../Media/video-camera-icon.png'


function NavBar() {
  return (
    <nav className='navbar'>
      <ul className='flex p-4'>
        <li className='ml-6 text-3xl font-bold flex items-center'>Streameon <img src={VideoIcon} alt="video-icon" className='w-7 h-7  ml-2  mt-2'></img></li>
        <li className='mr-7  rounded-lg p-2 shadow-lg bg-zinc-100 text-black font-bold'>Try Streameon</li>
      </ul>
    </nav>
  );
}

export default NavBar;
