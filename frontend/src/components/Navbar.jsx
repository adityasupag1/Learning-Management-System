import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../config/server";
import { setUserData } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { GiHamburgerMenu, GiSplitCross } from "react-icons/gi";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Redux auth state
  const { userData } = useSelector((state) => state.user);

  // 🔹 UI states
  const [showProfile, setShowProfile] = useState(false);
  const [showHam, setShowHam] = useState(false);

  // 🔹 Logout handler
  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/auth/logout`,
        { withCredentials: true }
      );

      dispatch(setUserData(null)); // clear redux auth
      toast.success(res.data.message);
      navigate("/login");

    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div>
      {/* ===================== MAIN NAVBAR ===================== */}
      <div className="w-full fixed top-0 px-5 py-2.5 flex items-center justify-between bg-[#00000047] z-10">

        {/* ---------- LOGO ---------- */}
        <div className="lg:w-[20%] w-[40%] lg:pl-12.5">
          <img
            src={logo}
            alt="logo"
            className="w-15 rounded-[5px] border-2 border-white"
          />
        </div>

        {/* ---------- DESKTOP MENU ---------- */}
        {/* IMPORTANT: hidden FIRST, lg:flex SECOND (fixes refresh issue) */}
        <div className="w-[30%] hidden lg:flex items-center justify-center gap-4">

          {/* Profile icon / avatar */}
          {!userData ? (
            <IoPersonCircle
              className="w-12.5 h-12.5 fill-black cursor-pointer"
              onClick={() => setShowProfile(prev => !prev)}
            />
          ) : (
            <div
              className="w-12.5 h-12.5 rounded-full flex items-center justify-center border-2 border-white bg-black text-white text-4.5 cursor-pointer"
              onClick={() => setShowProfile(prev => !prev)}
            >
              {userData.name.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Educator dashboard (ROLE BASED) */}
          {userData?.role === "educator" && (
            <div className="px-5 py-2.5 border-2 border-white text-white bg-black rounded-[10px] cursor-pointer">
              Dashboard
            </div>
          )}

          {/* Login / Logout */}
          {!userData ? (
            <span
              className="px-5 py-2.5 border-2 border-white text-white bg-black rounded-[10px] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-5 py-2.5 border-2 text-black bg-white rounded-[10px] cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}

          {/* ---------- PROFILE DROPDOWN ---------- */}
          {showProfile && userData && (
            <div className="absolute top-[110%] right-[15%] flex flex-col gap-2 bg-white px-4 py-3 border-2 border-black rounded-md">
              <span 
              onClick={()=>navigate('/profile')}
              className="bg-black text-white px-6 py-2 rounded-xl cursor-pointer">
                My Profile
              </span>
              <span className="bg-black text-white px-6 py-2 rounded-xl cursor-pointer">
                My Courses
              </span>
            </div>
          )}
        </div>

        {/* ---------- HAMBURGER ICON (MOBILE) ---------- */}
        <GiHamburgerMenu
          className="w-8.75 h-8.75 lg:hidden text-black cursor-pointer"
          onClick={() => setShowHam(true)}
        />

        {/* ===================== MOBILE MENU ===================== */}
        <div
          className={`fixed top-0 left-0 w-screen h-screen bg-[#000000d6] flex flex-col items-center justify-center gap-5 z-10 lg:hidden
          transition-transform duration-500
          ${showHam ? "translate-x-0" : "translate-x-full"}
        `}
        >
          {/* Close icon */}
          <GiSplitCross
            className="w-8.75 h-8.75 fill-white absolute top-5 right-5 cursor-pointer"
            onClick={() => setShowHam(false)}
          />

          {/* User avatar */}
          {userData && (
            <div className="w-12.5 h-12.5 rounded-full flex items-center justify-center border-2 border-white bg-black text-white text-4.5">
              {userData.name.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Mobile menu items */}
          <div 
          onClick={()=>navigate('/profile')}
          className="w-50 h-16.25 border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] cursor-pointer">
            My Profile
          </div>

          <div className="w-50 h-16.25 border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] cursor-pointer">
            My Courses
          </div>

          {userData?.role === "educator" && (
            <div className="w-50 h-16.25 border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] cursor-pointer">
              Dashboard
            </div>
          )}

          {!userData ? (
            <span
              className="w-[200px] h-[65px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="w-[200px] h-[65px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
