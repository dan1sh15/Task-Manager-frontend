import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import toast from 'react-hot-toast';

const DeleteModal = ({ showDelete, setShowDelete, id }) => {

    const { setLoading, fetchTasks, darkMode } = useContext(AppContext);
    const submitHandler = async () => { 
        setShowDelete(false);
        setLoading(true);
        const url = process.env.REACT_APP_BACKEND_URL + `/deleteTask/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "auth-token": localStorage.getItem('token')
            },
        });
        const responseData = await response.json();
        
        if(responseData.success) {
            await fetchTasks();
            toast.success(responseData.message);
            setLoading(false);
        } else {
            setLoading(false);
            toast.error(responseData.message);
        }
    }

  return (
    <div className={`w-[100%] min-h-screen h-auto bg-transparent absolute ${showDelete ? 'scale-1' : 'scale-0'} top-0 ${darkMode ? 'text-[#d0d0d0]' : 'text-[#797979]'} flex items-center justify-center shadow-2xl transition-scale duration-300 ease-linear`}>
      <div className={`${darkMode ? 'bg-[#282828]' : 'bg-white'} rounded flex flex-col gap-y-4 px-5 py-10 justify-center items-center w-[35%] max-ipad:w-[45%] max-md:w-[50%] max-phone:w-[80%] max-phone:p-5`}>
        <p className={`${darkMode ? 'text-[#d0d0d0]' : 'text-black'} font-semibold text-lg max-sm:text-sm text-center`}>Are you sure you want to delete the note?</p>
        <div className='flex items-center gap-x-5 max-phone:gap-x-3 max-[250px]:flex-col max-[250px]:gap-y-3 w-full justify-center'>
            <button onClick={() => {
                setShowDelete(false);
            }} className={`rounded ${darkMode ? 'bg-[#717171] text-[#d0d0d0]' : 'bg-[#f4f4f4] text-[#797979]'} px-4 py-2 w-fit max-sm:text-xs max-[250px]:w-full`}>Cancel</button>
            <button onClick={submitHandler} className='rounded bg-red-600 text-white px-4 py-2 w-fit max-sm:text-xs max-[250px]:w-full'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
