import React, { useContext } from 'react'
import { RxCross1 } from "react-icons/rx";
import { HiMiniCursorArrowRays } from "react-icons/hi2";
import { BsExclamationDiamond } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const EditModal = ({ setShowEditModal, editTask, setEditTask, showEditModal }) => {

    const { setLoading, fetchTasks, getFormattedDate, darkMode } = useContext(AppContext);

    const changeHandler = (e) => {
        setEditTask(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = process.env.REACT_APP_BACKEND_URL + `/editTask/${editTask._id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({...editTask})
        });
        const responseData = await response.json();

        if(responseData.success) {
            setShowEditModal(false);
            setLoading(false);
            await fetchTasks();
            toast.success(responseData.message);
        } else {
            setLoading(false);
            toast.error(responseData.message);
        }
    }

  return (
    <div className={`w-[100%] min-h-screen h-auto bg-transparent absolute ${showEditModal ? 'left-0' : '-left-[10000px]'} top-0 ${darkMode ? 'text-[#d0d0d0]' : 'text-[#797979]'} flex items-center justify-center shadow-2xl transition-left duration-300 ease-linear`}>
        <div className={`flex flex-col p-5 w-[40%] max-xl:w-[50%] max-ipad:w-[60%] max-sm:w-[80%] gap-y-5 rounded-lg shadow-2xl ${darkMode ? 'bg-[#282828]' : 'bg-white'}`}>
        <div className='w-full text-center flex justify-end'><RxCross1 onClick={() => {
            setShowEditModal(false);
        }} className='text-lg cursor-pointer' /></div>
        <form onSubmit={submitHandler} className='flex flex-col gap-y-5'>
            <input 
                type="text" 
                name='title'
                placeholder='Title'
                className='text-3xl  outline-none border-none bg-transparent max-ipad:text-2xl'
                required
                value={editTask.title}
                onChange={changeHandler}
            />

            <div className='flex items-center gap-x-3 max-ipad:text-sm max-phone:flex-col max-phone:gap-y-2 max-phone:items-start'>
                <div className='flex items-center gap-x-2 w-[35%]'>
                    <HiMiniCursorArrowRays />
                    <span>Status</span>
                </div>

                <select name="status" id="status" className={`outline-none w-full border-none ${darkMode ? 'bg-[#575757]' : 'bg-[#f4f4f4]'} rounded p-2`} value={editTask.status} onChange={changeHandler}>
                    <option value="To do">To do</option>
                    <option value="In progress">In progress</option>
                    <option value="Under review">Under review</option>
                    <option value="Finished">Finished</option>
                </select>
            </div>

            <div className='flex items-center gap-x-3 max-ipad:text-sm max-phone:flex-col max-phone:gap-y-2 max-phone:items-start'>
                <div className='flex items-center gap-x-2 w-[35%]'>
                    <BsExclamationDiamond />
                    <span>Priority</span>
                </div>

                <select name="priority" id="priority" className={`outline-none w-full border-none ${darkMode ? 'bg-[#575757]' : 'bg-[#f4f4f4]'} rounded p-2`} value={editTask.priority} onChange={changeHandler}>
                    <option value="Urgent">Urgent</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <div className='flex items-center gap-x-3 max-ipad:text-sm max-phone:flex-col max-phone:gap-y-2 max-phone:items-start'>
                <div className='flex items-center gap-x-2 w-[35%]'>
                    <CiCalendar />
                    <span>Deadline</span>
                </div>

                <input 
                    type="date" 
                    name='deadline'
                    className={`outline-none w-full border-none ${darkMode ? 'bg-[#575757]' : 'bg-[#f4f4f4]'} rounded p-2`}
                    value={getFormattedDate(editTask.deadline)}
                    onChange={changeHandler}
                />
            </div>

            <div className='flex flex-col gap-y-3 max-ipad:text-sm max-phone:flex-col max-phone:gap-y-2 max-phone:items-start'>
                <div className='flex items-center gap-x-3'>
                    <GoPencil />
                    <span>Description</span>
                </div>

                <textarea rows={5} name="description" id="description" className={`outline-none w-full border-none ${darkMode ? 'bg-[#575757]' : 'bg-[#f4f4f4]'} rounded p-2`} value={editTask.description} onChange={changeHandler}></textarea>
            </div>

            <button className='text-white py-2 bg-black rounded-md max-ipad:text-sm'>
                Submit
            </button>

        </form>
      </div>
    </div>
  )
}

export default EditModal
