import React, { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import {ClipLoader} from 'react-spinners';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [show, setShow] = useState(true);
  cosnt [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {serverUrl} = useContext(UserContext);
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password, role },
        { withCredentials: true }
      );

      console.log(res.data);
      setLoading(false);
      navigate("/login");
      toast.success("Signup Successfully");
      
    } catch (error) {
      setLoading(false);
      if (error.response) {
       toast.error(error.response.data.message); // "Email Already Exist"
      } else {
       toast.error("Server not responding");
      }
    }
  };

  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex justify-center items-center">
      <form onSubmit={handleSignup} className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex ">
        {/* left div */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center text-center gap-3">
          {/* heading */}
          <div>
            <h1 className="font-semibold text-black text-2xl">Let's get started </h1>
            <h2 className="text-[#999797] text-4.5 ">Create your account</h2>
         
          </div>

          {/* name input */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border w-full h-8.75 border-[#e7e6e6] text-3.75 px-5"
              placeholder="Your Name"
            />
          </div>

          {/* email input */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border w-full h-8.75 border-[#e7e6e6] text-3.75 px-5"
              placeholder="Enter Email"
            />
          </div>

          {/* password input */}
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type={show ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full h-8.75 border-[#e7e6e6] text-3.75 px-5"
              placeholder="Enter Password"
            />
            {show ? (
              <IoMdEye onClick={() => setShow(!show)} className="absolute right-6 bottom-2.5 cursor-pointer" />
            ) : (
              <IoMdEyeOff onClick={() => setShow(!show)} className="absolute right-6 bottom-2.5 cursor-pointer" />
            )}
          </div>

          {/* role input */}
          <div className="flex md:w-[50%] w-[70%] items-center justify-between">
            <span
              onClick={() => setRole("student")}
              className={`px-2.5 py-1.25 border-2 border-[#e7e6e6] rounded-xl cursor-pointer  ${
                role === "student" ? "border-black" : ""
              }`}
            >
              Student
            </span>

            <span
              onClick={() => setRole("educator")}
              className={`px-2.5 py-1.25 border-2 border-[#e7e6e6] rounded-xl cursor-pointer  ${
                role === "educator" ? "border-black" : ""
              }`}
            >
              Educator
            </span>
          </div>

          {/* signup button */}
          <button
            type="submit"
             disabled={loading}
            className="w-[80%] h-10 bg-black text-white cursor-pointer flex justify-center items-center rounded-[5px]"
          >
           {loading ? <ClipLoader size={25} color={"#ffffff"} /> : "Sign Up"}
          </button>


          {/* or continue with */}
          <div className="w-[80%] flex items-center gap-2">
            <div className="flex-1 h-px bg-[#c4c4c4]" />

            <div className="text-[15px] text-[#6f6f6f] whitespace-nowrap">Or continue</div>

            <div className="flex-1 h-px bg-[#c4c4c4]" />
          </div>

          {/* google signup */}
          <div className="w-[80%] h-10 border border-black rounded-md flex items-center justify-center gap-2">
            <img src={google} className="w-5 h-5" alt="Google logo" />
            <span className="text-[18px] text-gray-500">Google</span>
          </div>
          <div className="text-[#6f6f6f]">
            already have an account{" "}
            <span className="underline underline-offset-1 text-black cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </span>
          </div>
        </div>

        {/* right div */}
        <div className="w-[50%]  h-full  flex-col bg-[black] md:flex items-center justify-center hidden">
          <img src={logo} alt="logo" className="w-30  shadow-2xl" />
          <span className="text-2xl text-white ">Virtual Courses</span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
