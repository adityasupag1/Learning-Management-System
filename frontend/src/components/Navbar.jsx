import React from 'react'
import logo from '../assets/logo.jpg'
import { IoPersonCircle } from "react-icons/io5";
const Navbar = () => {
  return (
    <div >
        <div className='w-full h-17.5 fixed top-0 px-5 py-2.5 flex items-center justify-between bg-[#00000047] z-10'>
          <div className='lg:w-[20%]w-[40%] lg:pl-12.5 '>
           <img src={logo} alt="" className='w-15 rounded-[5px] border-2 border-white  ' />
          </div>

          <div className='w-[30%] lg:flex items-center justify-center gap-4 '>
            <IoPersonCircle className='w-12.5  h-12.5 fill-black cursor-pointer' />
            <div className='px-5 py-2.5 border-2 border-white  text-white bg-[black]   rounded-[10px] text-4.5 font-light cursor-pointer'>
              Dashboard
            </div>
              <span className='px-5 py-2.5 border-2 border-white  text-white bg-[black]   rounded-[10px] text-4.5 font-light cursor-pointer'>Login</span>
              <span className='px-5 py-2.5 border-2  text-black bg-white  rounded-[10px] text-4.5 shadow-black font-light cursor-pointer'>Logout</span>
          </div>
        </div>
    </div>
  )
}

export default Navbar