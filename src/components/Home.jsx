import React, { useContext, useEffect, useState } from 'react'
import SideBar from './SideBar';
import cardsArray from '../data/cards';
import { CiSearch, CiFilter, CiClock2 } from "react-icons/ci";
import { IoIosAddCircle } from 'react-icons/io';
import { GiHamburgerMenu } from "react-icons/gi";
import { AppContext } from '../context/AppContext';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit, MdSort } from "react-icons/md";
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const Home = () => {
    const { loading, showModal, setShowModal, showSideBar, setShowSideBar, fetchTasks, fetchUser, user, tasks, setData, darkMode } = useContext(AppContext);

    const [todoTasks, setTodoTasks] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [underReview, setUnderReview] = useState([]);
    const [finished, setFinished] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editTask, setEditTask] = useState({});
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const getDate = (date) => {
        const newDate = new Date(date);

        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');

        return day + '-' + month + '-' + year;
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            const fetchData = async () => {
                await fetchTasks();
                await fetchUser();
            }

            fetchData();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setTodoTasks(tasks.filter(task => task.status === "To do"));
        setInProgress(tasks?.filter(task => task?.status === "In progress"));
        setUnderReview(tasks?.filter(task => task?.status === "Under review"));
        setFinished(tasks?.filter(task => task.status === "Finished"));
        // eslint-disable-next-line
    }, [tasks]);

  return (
    <>
        {
            loading ? (<Loader />) : (
                <div className={`w-full min-h-screen ${darkMode ? 'bg-[#282828]' : 'bg-[#fff]'} flex ${(showModal || showEditModal || showDelete) && 'opacity-[0.75]'}`}>
                        {
                            !showSideBar && <button onClick={() => {
                                setShowSideBar(true);
                            }} className='flex items-center justify-center absolute top-[3vh] left-3 ipad:hidden'>
                            <GiHamburgerMenu className='text-xl' />
                        </button>
                        }
                    <SideBar setShowModal={setShowModal} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
                    <div className={`w-full min-h-screen h-auto ${darkMode ? 'bg-[#3f3f3f]' : 'bg-[#F4F4F4]'} p-7 flex flex-col gap-y-7 ${showSideBar && 'opacity-[0.25]'}`}>
                        <div className={`flex justify-between items-center max-phone:flex-col max-phone:gap-y-1 ${darkMode ? 'text-[#d0d0d0]' : 'text-black'}`}>
                            <h1 className={`text-4xl overflow-hidden max-lg:text-3xl max-md:text-2xl max-sm:text-xl max-phone:text-lg font-semibold max-phone:text-center`}>Greeting of the day, {user?.name?.split(' ')[0]}!</h1>
                            <p className='cursor-pointer text-sm max-md:text-xs'>Help & Feedback ?</p>
                        </div>

                        <div className='grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
                            {
                                cardsArray.map((card, idx) => (
                                    <div key={idx} className={`flex flex-col gap-y-2 ${darkMode ? 'bg-[#282828] text-[#d0d0d0]' : 'bg-[#ffffff] text-[#797979]'} p-3 rounded-lg  h-full justify-center`}>
                                        <p className='text-lg font-semibold max-md:text-[1rem]'>{card.title}</p>
                                        <p className='text-sm max-md:text-xs'>{card.description}</p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='flex justify-between items-center text-[#797979] max-sm:flex-col max-sm:gap-y-3 max-[300px]:gap-y-5'>
                            <form htmlFor="search" className={`flex px-3 py-2 items-center gap-x-2 ${darkMode ? 'bg-[#282828]' : 'bg-white'} rounded-md max-sm:w-full max-sm:justify-between max-[300px]:flex-col max-[300px]:gap-y-2`}>
                                <input 
                                    type="text" 
                                    name='search'
                                    placeholder='Search'
                                    className={`outline-none border-none bg-transparent text-sm ${darkMode ? 'text-[#d0d0d0]' : 'text-[#797979]'}`}
                                />
                                <button className={`${darkMode ? 'text-[#d0d0d0]' : 'text-[#797979]'} max-[300px]:w-full max-[300px]:bg-blue-600 max-[300px]:text-white max-[300px]:font-semibold max-[300px]:text-center flex items-center justify-center p-1 rounded`}><CiSearch /></button>
                            </form>

                            <div className='flex items-center gap-x-5 max-sm:w-full max-sm:justify-between max-[300px]:flex-col max-[300px]:gap-y-2'>
                                <button className={` ${darkMode ? 'bg-[#717171] text-[#d0d0d0]' : 'bg-[#e1e1e1]'} flex items-center gap-x-3 rounded px-3 py-1 max-sm:text-sm max-[300px]:w-full justify-center`}><span>Filter</span><CiFilter /></button>
                                <button onClick={() => {
                                    setShowModal(true);
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                }} className='flex items-center justify-center gap-x-2 px-3 py-1 bg-[#4B36CC] text-white rounded-md max-ipad:text-[1rem] max-sm:text-sm max-[300px]:w-full'><span>Create new</span><IoIosAddCircle /></button>
                            </div>
                        </div>

                        <div className={` ${darkMode ? 'bg-[#282828] text-[#d0d0d0]' : 'bg-[#fff] text-[#797979]'} p-5 rounded grid grid-cols-4 justify-center gap-x-5 text-lg max-xl:grid-cols-3 gap-y-5 max-md:grid-cols-2 max-sm:grid-cols-1 max-md:p-3`} >
                            <div className='flex flex-col gap-y-3 w-full items-center '>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='max-md:text-sm'>To do</span>
                                    <MdSort />
                                </div>

                                {
                                    todoTasks.map(task => (
                                        <div key={task._id} className= {` ${darkMode ? 'bg-[#575757] text-[#d0d0d0]' : 'bg-[#f4f4f4] text-[#797979]'} p-3 flex flex-col gap-y-2 text-sm rounded-md w-full`}>
                                            <h3 className='font-semibold'>{task.title}</h3>
                                            <p className='text-xs'>{task.description}</p>
                                            <div className={`
                                                text-xs text-white px-2 py-1 rounded w-fit
                                                ${task.priority === "Urgent" && 'bg-red-600'}
                                                ${task.priority === "Medium" && 'bg-yellow-600'}
                                                ${task.priority === "Low" && 'bg-green-500'}
                                                `}>{task.priority}</div>
                                            <div className='flex items-center gap-x-3'>
                                                <CiClock2 />
                                                <span>{getDate(task.deadline)}</span>
                                            </div>
                                            <div className='w-full flex items-center justify-between text-lg max-sm:text-sm'>
                                                <button onClick={() => {
                                                    setShowEditModal(true);
                                                    setEditTask(task);
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                }} title='Edit' className={` ${darkMode ? 'bg-[#282828]' : 'bg-white'} p-2 rounded-full flex items-center justify-center`}><MdEdit /></button>
                                                <button onClick={() => {
                                                    setShowDelete(true);
                                                    setId(task._id);
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                }} title='Delete' className={` ${darkMode ? 'bg-[#282828]' : 'bg-white'} p-2 rounded-full flex items-center justify-center`}><MdDelete /></button>
                                            </div>
                                        </div>
                                    ))
                                }

                                <button onClick={() => {
                                    setShowModal(true);
                                    setData({
                                        title: "",
                                            status: "To do",
                                            priority: "Urgent",
                                            deadline: "",
                                            description: "",
                                    });
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                }} className='flex items-center justify-center gap-x-5 w-[80%] px-4 text-lg py-2 bg-black text-white rounded-md hover:scale-[1.02] transition-all duration-300 ease-linear max-lg:text-[1rem] max-sm:text-sm max-sm:gap-x-3'>
                                    <span>Add new</span>
                                    <IoIosAddCircle className='text-2xl max-lg:text-xl max-sm:text-lg' />
                                </button>
                            </div>

                            <div className='flex flex-col gap-y-3 w-full items-center'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='max-md:text-sm'>In progress</span>
                                    <MdSort />
                                </div>

                                {
                                    inProgress.map(task => (
                                        <div key={task._id} className={` ${darkMode ? 'bg-[#575757] text-[#d0d0d0]' : 'bg-[#f4f4f4] text-[#797979]'} p-3 flex flex-col gap-y-2 text-sm rounded-md w-full`}>
                                            <h3 className='font-semibold'>{task.title}</h3>
                                            <p className='text-xs'>{task.description}</p>
                                            <div className={`
                                                text-xs text-white px-2 py-1 rounded w-fit
                                                ${task.priority === "Urgent" && 'bg-red-600'}
                                                ${task.priority === "Medium" && 'bg-yellow-600'}
                                                ${task.priority === "Low" && 'bg-green-500'}
                                                `}>{task.priority}</div>
                                            <div className='flex items-center gap-x-3'>
                                                <CiClock2 />
                                                <span>{getDate(task.deadline)}</span>
                                            </div>
                                            <div className='w-full flex items-center justify-between text-lg max-sm:text-sm'>
                                                <button onClick={() => {
                                                    setShowEditModal(true);
                                                    setEditTask(task);
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                }} title='Edit' className={` ${darkMode ? 'bg-[#282828]' : 'bg-white'} p-2 rounded-full flex items-center justify-center`}><MdEdit /></button>
                                                <button onClick={() => {
                                                    setShowDelete(true);
                                                    setId(task._id);
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                }} title='Delete' className={` ${darkMode ? 'bg-[#282828]' : 'bg-white'} p-2 rounded-full flex items-center justify-center`}><MdDelete /></button>
                                            </div>
                                        </div>
                                    ))
                                }

                                <button onClick={() => {
                                    setShowModal(true);
                                    setData({
                                        title: "",
                                        status: "In progress",
                                        priority: "Urgent",
                                        deadline: "",
                                        description: "",
                                    });
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                }} className='flex items-center justify-center gap-x-5 w-[80%] px-4 text-lg py-2 bg-black text-white rounded-md hover:scale-[1.02] transition-all duration-300 ease-linear max-lg:text-[1rem] max-sm:text-sm max-sm:gap-x-3'>
                                    <span>Add new</span>
                                    <IoIosAddCircle className='text-2xl max-lg:text-xl max-sm:text-lg' />
                                </button>
                            </div>

                            <div className='flex flex-col gap-y-3 w-full items-center'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='max-md:text-sm'>Under review</span>
                                    <MdSort />
                                </div>

                                {
                                    underReview.map(task => (
                                        <div key={task._id} className={` ${darkMode ? 'bg-[#575757] text-[#d0d0d0]' : 'bg-[#f4f4f4] text-[#797979]'} p-3 flex flex-col gap-y-2 text-sm rounded-md w-full`}>
                                            <h3 className='font-semibold'>{task.title}</h3>
                                            <p className='text-xs'>{task.description}</p>
                                            <div className={`
                                                text-xs text-white px-2 py-1 rounded w-fit
                                                ${task.priority === "Urgent" && 'bg-red-600'}
                                                ${task.priority === "Medium" && 'bg-yellow-600'}
                                                ${task.priority === "Low" && 'bg-green-500'}
                                                `}>{task.priority}</div>
                                            <div className='flex items-center gap-x-3'>
                                                <CiClock2 />
                                                <span>{getDate(task.deadline)}</span>
                                            </div>
                                            <div className='w-full flex items-center justify-between text-lg max-sm:text-sm'>
                                                <button onClick={() => {
                                                    setShowEditModal(true);
                                                    setEditTask(task);
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                }} title='Edit' className={` ${darkMode ? 'bg-[#282828]' : 'bg-white'} p-2 rounded-full flex items-center justify-center`}><MdEdit /></button>
                                                <button onClick={() => {
                                                    setShowDelete(true);
                                                    setId(task._id);
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                }} title='Delete' className={` ${darkMode ? 'bg-[#282828]' : 'bg-white'} p-2 rounded-full flex items-center justify-center`}><MdDelete /></button>
                                            </div>
                                        </div>
                                    ))
                                }

                                <button onClick={() => {
                                    setShowModal(true);
                                    setData({
                                        title: "",
                                        status: "Under review",
                                        priority: "Urgent",
                                        deadline: "",
                                        description: "",
                                    });
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                }} className='flex items-center justify-center gap-x-5 w-[80%] px-4 text-lg py-2 bg-black text-white rounded-md hover:scale-[1.02] transition-all duration-300 ease-linear max-lg:text-[1rem] max-sm:text-sm max-sm:gap-x-3'>
                                    <span>Add new</span>
                                    <IoIosAddCircle className='text-2xl max-lg:text-xl max-sm:text-lg' />
                                </button>
                            </div>

                            <div className='flex flex-col gap-y-3 w-full items-center'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='max-md:text-sm'>Finished</span>
                                    <MdSort />
                                </div>

                                {
                                    finished.map(task => (
                                        <div key={task._id} className={` ${darkMode ? 'bg-[#575757] text-[#d0d0d0]' : 'bg-[#f4f4f4] text-[#797979]'} p-3 flex flex-col gap-y-2 text-sm rounded-md w-full`}>
                                            <h3 className='font-semibold'>{task.title}</h3>
                                            <p className='text-xs'>{task.description}</p>
                                            <div className={`
                                                text-xs text-white px-2 py-1 rounded w-fit
                                                ${task.priority === "Urgent" && 'bg-red-600'}
                                                ${task.priority === "Medium" && 'bg-yellow-600'}
                                                ${task.priority === "Low" && 'bg-green-500'}
                                                `}>{task.priority}</div>
                                            <div className='flex items-center gap-x-3'>
                                                <CiClock2 />
                                                <span>{getDate(task.deadline)}</span>
                                            </div>
                                            <div className='w-full flex items-center justify-between text-lg max-sm:text-sm'>
                                                <button onClick={() => {
                                                    setShowEditModal(true);
                                                    setEditTask(task);
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                }} title='Edit' className={` ${darkMode ? 'bg-[#282828]' : 'bg-white'} p-2 rounded-full flex items-center justify-center`}><MdEdit /></button>
                                                <button onClick={() => {
                                                    setShowDelete(true);
                                                    setId(task._id);
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                }} title='Delete' className={` ${darkMode ? 'bg-[#282828]' : 'bg-white'} p-2 rounded-full flex items-center justify-center`}><MdDelete /></button>
                                            </div>
                                        </div>
                                    ))
                                }

                                <button onClick={() => {
                                    setShowModal(true);
                                    setData({
                                        title: "",
                                        status: "Finished",
                                        priority: "Urgent",
                                        deadline: "",
                                        description: "",
                                    });
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                }} className='flex items-center justify-center gap-x-5 w-[80%] px-4 text-lg py-2 bg-black text-white rounded-md hover:scale-[1.02] transition-all duration-300 ease-linear max-lg:text-[1rem] max-sm:text-sm max-sm:gap-x-3'>
                                    <span>Add new</span>
                                    <IoIosAddCircle className='text-2xl max-lg:text-xl max-sm:text-lg' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        <EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} editTask={editTask} setEditTask={setEditTask} />
        <DeleteModal showDelete={showDelete} setShowDelete={setShowDelete} id={id} />
    </>
  )
}

export default Home
