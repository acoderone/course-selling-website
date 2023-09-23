import React,{useEffect, useState} from 'react'
import AdminLogin from './Components/AdminLogin'
import AdminSignup from './Components/AdminSignup'
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Components/Landing';
import ShowCourses from './Components/ShowCourses';
import CreateCourse from './Components/CreateCourses';
import Navbar from './Components/Navbar';
import EditCourse from './Components/EditCourse';
import Signup from './Components-User/Signup';
import Login from './Components-User/Login'
import MyLearnings from './Components-User/MyLearnings';
import Courses from './Components-User/Courses';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
function App() {
  const navigate=useNavigate();
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const[isAdmin,setIsAdmin]=useState(false);

  useEffect(()=>{
const token=localStorage.getItem('token');
if(token){
  setIsLoggedIn(true);
  const decoded_token=jwt_decode(token);
  setIsAdmin(decoded_token.role==='admin');
}
  },[])
  const handleSignin = (token) => {
    localStorage.setItem('token',token);
    setIsLoggedIn(true);
    const decoded_token=jwt_decode(token);
    console.log(decoded_token.role);
    setIsAdmin(decoded_token.role==='admin');
  };
  const handleLogout=async(token)=>{
    setIsLoggedIn(false);
    localStorage.removeItem('token',token);
    navigate('/admin/Login');
    setIsAdmin(false);
   }
  
  return (
    <>
    <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} isAdmin={isAdmin}/>
      <Routes>
          <Route path="/admin/Signup" element={<AdminSignup />} />
          <Route path="/admin/Login" element={<AdminLogin handleSignin={handleSignin} />} />
          <Route path="/" element={<Landing />} />
          <Route path="/admin/courses" element={<ShowCourses />} />
          <Route path="/admin/createCourses" element={<CreateCourse />} />
          <Route path="/admin/editCourses/:courseId" element={<EditCourse />} />
          <Route path='/user/Login' element={<Login handleSignin={handleSignin}/>} />
          <Route path='/user/signup' element={<Signup />}/>
          <Route path='/user/myLearnings' element={<MyLearnings />}/>
          <Route path='/user/courses' element={<Courses />} />
      </Routes>
    </>
    
  )
}

export default App
