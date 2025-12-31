import React, { use } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import {ClipLoader} from 'react-spinners';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { serverUrl } = useContext(UserContext);


  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/api/auth/login`, { email, password }, { withCredentials: true });
      console.log(res.data);
      setLoading(false);
      navigate("/");
       toast.success("Login Successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex justify-center items-center">
      <form onSubmit={loginHandler} className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex ">
        {/* left div */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-3">
          {/* heading */}
          <div>
            <h1 className="font-semibold text-black text-2xl">Welcome back </h1>
            <h2 className="text-[#999797] text-4.5 ">Login to your account</h2>
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

          {/* Login button */}
          <button
            type="submit"
            className="w-[80%] h-10 bg-black text-white cursor-pointer flex justify-center items-center rounded-[5px]"
            disabled={loading}
          >
           {loading ? <ClipLoader size={30} color={"#ffffff"} /> : "Login"}
          </button>

          {/* forgot password */}
          <div
            className="text-[#6f6f6f] underline underline-offset-1  cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot your Password{" "}
          </div>

          {/* or continue with */}
          <div className="w-[80%] flex items-center gap-2">
            <div className="flex-1 h-px bg-[#c4c4c4]" />

            <div className="text-[15px] text-[#6f6f6f] whitespace-nowrap">Or continue</div>

            <div className="flex-1 h-px bg-[#c4c4c4]" />
          </div>

          {/* google login */}
          <div className="w-[80%] h-10 border border-black rounded-md flex items-center justify-center gap-2">
            <img src={google} className="w-5 h-5" alt="Google logo" />
            <span className="text-[18px] text-gray-500">Google</span>
          </div>
          {/* signup redirect */}
          <div className="text-[#6f6f6f]">
            Create new account{" "}
            <span
              className="underline underline-offset-1 text-black cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
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

export default Login;
