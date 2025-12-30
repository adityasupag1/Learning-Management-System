import React, { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { useNavigate} from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex justify-center items-center">
      <form className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex ">
        {/* left div */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-3">
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
            <span className="px-2.5 py-1.25 border-2 border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black">
              Student
            </span>

            <span className="px-2.5 py-1.25 border-2 border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black">
              Educator
            </span>
          </div>

          {/* signup button */}
          <button className="w-[80%] h-10 bg-black text-white cursor-pointer flex justify-center items-center rounded-[5px]">
            Signup
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
