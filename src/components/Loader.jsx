import React, { useContext } from 'react'
import './loader.css';
import { AppContext } from '../context/AppContext';

const Loader = () => {
  const {darkMode} = useContext(AppContext);
  return (
    <div className={`h-screen w-full flex justify-center items-center ${darkMode ? 'bg-[#282828]' : 'bg-white'}`}>
      <div className='loader'></div>
    </div>
  )
}

export default Loader
