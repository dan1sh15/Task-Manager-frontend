import React, { useContext } from 'react'
import SideBar from '../SideBar';
import { GiHamburgerMenu } from "react-icons/gi";
import { AppContext } from '../../context/AppContext';

const Boards = () => {

  const {showSideBar, setShowSideBar, setShowModal, darkMode} = useContext(AppContext);

  return (
    <div className={`w-full min-h-screen ${darkMode ? 'bg-[#282828]' : 'bg-[#fff]'} flex`}>
      {
            !showSideBar && <button onClick={() => {
                setShowSideBar(true);
            }} className='flex items-center justify-center absolute top-[3vh] left-3 ipad:hidden'>
            <GiHamburgerMenu className='text-xl' />
        </button>
        }
      <SideBar setShowModal={setShowModal} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className={`w-full min-h-screen ${darkMode ? 'bg-[#3f3f3f]' : 'bg-[#F4F4F4]'} p-7 flex items-center justify-center`}>
          <h1 className={`text-4xl font-bold overflow-hidden ${darkMode ? 'text-[#d0d0d0]' :'text-black'}`}>Boards</h1>
      </div>
    </div>
  )
}

export default Boards
