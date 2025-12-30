import React, { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import logo from "../assets/logo.jpg";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex justify-center items-center">
      <form className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex ">

        {/* left div */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-3">

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
