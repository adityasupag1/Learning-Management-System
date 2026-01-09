import { useState } from 'react'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser'
function App() {
  
  getCurrentUser();
  return (
    <>
     <ToastContainer/>
       <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/login" element = {<Login/>} />
       </Routes>
    </>
  )
}

export default App

