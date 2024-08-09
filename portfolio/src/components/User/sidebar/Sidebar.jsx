import React from "react";
import PersonalInfo from "./PersonalInfo";
import { MdOutlineMail } from "react-icons/md";
import { CiMobile1 } from "react-icons/ci";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoLogoLinkedin } from "react-icons/io5";
import { SiLeetcode } from "react-icons/si";
import img from './my-avatarr.jpg';

const Sidebar = () => {
  return (
    <aside className="md:w-1/4 w-full flex justify-end">
      <section className="m-2 border-slate-600 bg-customColor border w-full flex flex-col align-center p-4 sm:p-6 md:p-8 pt-8 sm:pt-12 md:pt-16 rounded-2xl sticky md:h-fit">
        <div className="flex flex-col items-center">
          <div className="w-24 sm:w-28 md:w-36 bg-customColor2 rounded-3xl h-24 sm:h-28 md:h-36">
            <img src={img} alt="" className="rounded-3xl object-cover w-full h-full" />
          </div>
          <h3 className="text-center m-4 text-lg sm:text-xl md:text-2xl font-semibold">Rutik Vaskar</h3>
          <p className="text-center m-3 bg-customColor2 text-xs sm:text-sm md:text-base px-4 py-1 rounded-lg">Web Developer</p>
        </div>
        <hr className="w-full h-0.5 bg-neutral-400 my-4" />
        <div>
          <PersonalInfo title={'EMAIL'} img={<MdOutlineMail />} content={'rutikkvaskar@9gmail.com'} />
          <PersonalInfo title={'PHONE'} img={<CiMobile1 />} content={'+91 7875159648'} />
          <PersonalInfo title={'LOCATION'} img={<MdOutlineLocationOn />} content={'Thane, Maharashtra '} />
        </div>
        <div className="mt-4 flex justify-around text-customColor5">
          <span className="flex w-24 sm:w-28 md:w-32 justify-around text-xl sm:text-2xl">
            <Link to={'https://github.com/Rvaskar'} target="_blank" rel="noopener noreferrer"><FaGithub className="hover:text-customColor3" /></Link>
            <Link to={'https://www.linkedin.com/in/vaskar-rutik/'} target="_blank" rel="noopener noreferrer"><IoLogoLinkedin className="hover:text-customColor3" /></Link>
            <Link to={'https://leetcode.com/u/EagleEye12/'} target="_blank" rel="noopener noreferrer"><SiLeetcode className="hover:text-customColor3" /></Link>
          </span>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
