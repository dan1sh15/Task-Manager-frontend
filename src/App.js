import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Boards from './components/SideNav/Boards';
import Setting from './components/SideNav/Setting';
import Teams from './components/SideNav/Teams';
import Analytics from './components/SideNav/Analytics'; 
import TaskModal from './components/TaskModal';

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9C93D4] to-[#4B36CC] poppins relative">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/boards' element={<Boards />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/analytics' element={<Analytics />} />
      </Routes>

      <TaskModal />
    </div>
  );
}

export default App;
