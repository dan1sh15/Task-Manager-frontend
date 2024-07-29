import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';

const Signup = () => {

    const { setUser, setLoading } = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setUserData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = process.env.REACT_APP_BACKEND_URL + '/signup';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({...userData})
        });

        const responseData = await response.json();

        if(responseData.success) {
            localStorage.setItem('token', responseData.token);
            setUser(responseData.user);
            setLoading(false);
            toast.success(responseData.message);
            navigate('/');
        } else {
            toast.error(responseData.message);
            setLoading(false);
            setUserData({
                name: "",
                email: "",
                password: "",
            });
        }
    }

  return (
    <div className='min-h-screen h-auto w-full flex justify-center items-center max-phone:p-7 max-[250px]:p-3 p-10'>
      <div className='w-[40%] max-lg:w-[60%] max-md:w-[70%] max-sm:w-[90%] max-[400px]:w-full bg-white rounded-lg p-5 max-sm:p-3 max-sm:py-10 flex flex-col gap-y-8 max-phone:gap-y-5 py-14 shadow-lg' >
        <h1 className='text-3xl max-md:text-2xl max-phone:text-xl font-semibold text-center'>Welcome to <span className='text-[#4B36CC]'>Workflo</span>!</h1>
        <form onSubmit={submitHandler} className='w-full flex flex-col items-center gap-y-5 max-phone:gap-y-3'>
            <input 
                type="text" 
                placeholder='Full name'
                className='outline-none border-none bg-[#EBEBEB] w-[80%] rounded-md px-5 py-3 max-phone:text-sm max-phone:p-3 max-phone:w-[90%]'
                id='name'
                name='name'
                value={userData.name}
                onChange={changeHandler}
                required
            />

            <input 
                type="email" 
                placeholder='Your email'
                className='outline-none border-none bg-[#EBEBEB] w-[80%] rounded-md px-5 py-3 max-phone:text-sm max-phone:p-3 max-phone:w-[90%]'
                id='email'
                name='email'
                value={userData.email}
                onChange={changeHandler}
                required
            />

            <div className='bg-[#EBEBEB] w-[80%] rounded-md gap-x-1 px-5 py-3 flex items-center max-phone:text-sm max-phone:p-3 max-phone:w-[90%]'>
                <input 
                    type={`${showPassword ? 'text' : 'password'}`}
                    placeholder='Password'
                    className='outline-none border-none w-full bg-transparent'
                    id='password'
                    name='password'
                    value={userData.password}
                    onChange={changeHandler}
                    required
                    minLength={8}
                />
                {
                    showPassword ? (<FaEyeSlash onClick={() => {
                        setShowPassword(false);
                    }} className='text-[#999999] cursor-pointer' />) : (<FaEye onClick={() => {
                        setShowPassword(true);
                    }} className='text-[#999999] cursor-pointer' />)
                }
                
            </div>

            <button className='bg-[#9C93D4] w-[80%] rounded-md text-white py-2 max-phone:text-sm max-phone:p-3 max-phone:w-[90%]'>
                Sign Up 
            </button>

            <div className='text-sm max-phone:text-xs text-center'>
                Already have an account? <span className='text-blue-500'><NavLink to={'/login'}>Log in</NavLink></span>.
            </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
