import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../config/server";
import { setUserData } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam]=useState(false)

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      // console.log(res);
      // console.log(res.data.message);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <div className="w-full h-17.5 fixed top-0 px-5 py-2.5 flex items-center justify-between bg-[#00000047] z-10">
        <div className="lg:w-[20%]w-[40%] lg:pl-12.5 ">
          <img src={logo} alt="" className="w-15 rounded-[5px] border-2 border-white  " />
        </div>

        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
          {!userData && (
            <IoPersonCircle
              className="w-12.5  h-12.5 fill-black cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}

          {userData && (
            <div
              className="w-12.5  h-12.5  rounded-full flex justify-center items-center border-2 border-white  text-white bg-[black] text-4.5  cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}
          {userData?.role === "educator" && (
            <div className="px-5 py-2.5 border-2 border-white  text-white bg-[black]   rounded-[10px] text-4.5 font-light cursor-pointer">
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              className="px-5 py-2.5 border-2 border-white  text-white bg-[black]   rounded-[10px] text-4.5 font-light cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-5 py-2.5 border-2  text-black bg-white  rounded-[10px] text-4.5 shadow-black font-light cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
          {show && (
            <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-3.75 py-2.5 border-2 border-black hover:border-white hover:text-white cursor-pointer hover:bg-black">
              <span className="bg-black text-white px-7.5 py-2.5 rounded-2xl hover:bg-gray-600">My Profile</span>
              <span className="bg-black text-white px-7.5 py-2.5 rounded-2xl hover:bg-gray-600">My Courses</span>
            </div>
          )}
        </div>

        <GiHamburgerMenu
          className="w-8.75 h-8.75 lg:hidden text-black cursor-pointer"
          onClick={() => setShowHam((prev) => !prev)}
        />

        <div
          className={`fixed top-0 left-0 w-screen h-screen bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden
          transition-transform duration-600
         ${showHam ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <GiSplitCross
            className="w-8.75 h-8.75 fill-white absolute top-5 right-[4%] cursor-pointer"
            onClick={() => setShowHam((prev) => !prev)}
          />

           {userData && (
            <div
              className="w-12.5  h-12.5  rounded-full flex justify-center items-center border-2 border-white  text-white bg-[black] text-4.5  cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
