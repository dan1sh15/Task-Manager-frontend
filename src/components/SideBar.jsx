import React, { useContext } from 'react';
import { LuSun } from 'react-icons/lu'
import { CiBellOn, CiSettings, CiCloudMoon } from 'react-icons/ci';
import { IoIosAddCircle } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { RiHome2Line } from 'react-icons/ri';
import { BsFileBarGraph, BsGraphUp } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi2';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './sidebar.css';
import toast from 'react-hot-toast';

const SideBar = () => {

    const {showSideBar, setShowSideBar, setShowModal, user, darkMode, setDarkMode} = useContext(AppContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('token');
        toast.success("Logged out successfully");
        navigate('/login');
    }

  return (
    <div className={`h-full w-[20%] p-5 flex flex-col gap-y-3 max-xl:w-[30%] max-md:w-[40%] max-sm:w-[50%] max-phone:w-[250px] max-ipad:absolute max-ipad:z-10 ${darkMode ? 'bg-[#282828]' : 'bg-[#fff]'} ${showSideBar ? 'left-0' : '-left-[1000px]'} transition-all duration-300 ease-linear`}>
        <button onClick={() => {
            setShowSideBar(false);
        }} className='bg-[#f4f4f4] text-[#797979] w-fit mx-auto px-3 py-1 text-sm rounded ipad:hidden'>Close</button>
        <p className='flex items-center gap-x-2'><FaUserCircle className='text-lg text-[#4B36CC]' /><span className={`font-[500] ${darkMode ? 'text-[#d0d0d0]' : 'text-black'} text-lg max-ipad:text-[1rem] text-center`}>{user?.name}</span></p>
        <div className='flex justify-between items-center'>
            <div className={`flex items-center gap-x-2 text-xl max-ipad:text-lg max-phone:text-[1rem] ${darkMode ? 'text-[#d0d0d0]' : 'text-[#797979]'}`}>
                <CiBellOn />
                {
                    darkMode ? (<LuSun onClick={() => {
                        setDarkMode(false);
                    }} className='cursor-pointer' />) : (<CiCloudMoon onClick={() => {
                        setDarkMode(true);
                    }} className='cursor-pointer' />)
                }
            </div>
            <button onClick={logoutHandler} className={` ${darkMode ? 'bg-[#717171] text-[#d0d0d0]': 'bg-[#f4f4f4] text-[#797979]'} text-sm max-phone:text-xs px-3 py-1`}>Logout</button>
        </div>
        <ul className={`flex flex-col gap-y-2 ${darkMode ? 'text-[#d0d0d0]' : 'text-[#797979]'} max-ipad:text-[1rem] max-sm:text-sm`}>
            <li><NavLink to={'/'} className={`flex items-center gap-x-3 p-2 `}><RiHome2Line /><span>Home</span></NavLink></li>
            <li><NavLink to={'/boards'} className={'flex items-center gap-x-3 p-2'}><BsFileBarGraph /><span>Boards</span></NavLink></li>
            <li><NavLink to={'/setting'} className={'flex items-center gap-x-3 p-2'}><CiSettings /><span>Setting</span></NavLink></li>
            <li><NavLink to={'/teams'} className={'flex items-center gap-x-3 p-2'}><HiUsers /><span>Teams</span></NavLink></li>
            <li><NavLink to={'/analytics'} className={'flex items-center gap-x-3 p-2'}><BsGraphUp /><span>Analytics</span></NavLink></li>
        </ul>
        <button onClick={() => {
            setShowModal(true);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }} className='flex items-center justify-center gap-x-2 px-3 text-lg max-lg:text-[1rem] max-sm:text-sm py-1 bg-[#4B36CC] text-white rounded-md'><span>Create new task</span><IoIosAddCircle /></button>
      </div>
  )
}

export default SideBar
