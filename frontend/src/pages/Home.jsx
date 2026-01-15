import React from "react";
import Navbar from "../components/Navbar";
import home from "../assets/home1.jpg";
import { SiViaplay } from "react-icons/si";
import ai from '../assets/ai.png'
import ai1 from '../assets/searchAi.png'
import Logo from "../components/Logo";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full lg:h-[140vh] h-[70vh] relative ">
        <Navbar />
        <img className="object-cover md:object-fill w-full lg:h-full h-[50vh]" src={home} alt="" />
        <span className="absolute top-[15%] w-full flex items-center justify-center text-white font-bold text-[20px] md:text-[40px] lg:text-[70px] lg:top-[10%]">
          Grow Your Skills to Advance
        </span>

        <span className="absolute top-[20%] w-full flex items-center justify-center text-white font-bold text-[20px] md:text-[40px] lg:text-[70px] lg:top-[18%]">
          Your Career path
        </span>

        <div className="absolute top-[80%] w-full flex flex-wrap items-center justify-center gap-3 md:top-[75%] lg:top-[30%]">
          <button className="px-5 py-2.5 border-2 border-black text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer lg:border-white lg:text-white">
            View All Courses
            <SiViaplay className="h-7.5 w-7.5 lg:fill-white fill-black "/>
          </button>
          <button className="px-5 py-2.5 border-2 border-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center lg:bg-white bg-black lg:border-white">
            Search with Ai
            <img src={ai} alt=""  className="h-7.5 w-7.5 rounded-full hidden lg:block "/>
            <img src={ai1} alt=""  className="h-8.75 w-8.75 rounded-full  lg:hidden "/>
          </button>
        </div>
        <Logo/>
      </div>
    </div>
  );
};

export default Home;
