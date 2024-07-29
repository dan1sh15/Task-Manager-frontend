import { createContext, useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState({});
    const [data, setData] = useState({
        title: "",
        status: "To do",
        priority: "Urgent",
        deadline: "",
        description: "",
    });
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const fetchUser = async () => {
        const url = process.env.REACT_APP_BACKEND_URL + '/userDetails';
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        });

        const responseData = await response.json();
        if(responseData.success) {
            setUser(responseData?.user);
        } else {
            toast.error("Error fetching details");
        }
    }

    const fetchTasks = async () => {
        setLoading(true);
        const url = process.env.REACT_APP_BACKEND_URL + '/getAllTasks';
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        });

        const responseData = await response.json();

        if(responseData.success) {
            setTasks(responseData?.tasks);
        }
        else if(responseData.message === 'Invalid token') {
            toast.error(responseData.message);
            navigate('/login');
        } 
        else {
            toast.error(responseData.message);
        }
        setLoading(false);
    }

    const getFormattedDate = (date) => {
        const newDate = new Date(date);

        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');

        return year + '-' + month + '-' + day;
    }

    const value = {
        loading,
        setLoading,
        showModal,
        setShowModal,
        showSideBar,
        setShowSideBar,
        tasks,
        setTasks,
        fetchTasks,
        user,
        setUser,
        fetchUser,
        data,
        setData,
        getFormattedDate,
        darkMode,
        setDarkMode
    }

    return (<AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>)
};

export default AppContextProvider;