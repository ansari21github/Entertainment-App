// // Sidebar.js
// import React from 'react';
// import { BiSolidDashboard } from "react-icons/bi";
// import Userprofile from './Userprofile';
// // import Sidebardata from './Sidebardata';
// import { useNavigate } from 'react-router-dom';
// import { MdLocalMovies } from "react-icons/md";
// import { PiTelevisionBold } from "react-icons/pi";
// import { IoBookmark } from "react-icons/io5";
// import { MdMovie } from "react-icons/md";
// const Sidebar = () => {
//   const navigate = useNavigate();
//   return (
//    <div className=' bg-form h-[39rem] w-[5rem] rounded-3xl ml-5 p-4 border transition-all duration-500 border-solid border-form relative left-aligned-container'>
//     <MdMovie className="text-red-600 text-4xl ml-2 mb-2"/>
//     <BiSolidDashboard  onClick={() => navigate("/")} className='text-glass text-2xl my-10 mx-2.5 mb-10 cursor-pointer transition duration-300 hover:text-red-600 ' />

//     <MdLocalMovies onClick={() => navigate("/movies")}  className='text-glass text-2xl my-2.5 mx-2.5 mb-10 cursor-pointer transition duration-300 hover:text-red-600   '/>
//     <PiTelevisionBold  onClick={() => navigate("/tvseries")} className='text-glass text-2xl my-2.5 mx-2.5 mb-10 cursor-pointer transition duration-300 hover:text-red-600  ' />
//     <IoBookmark  onClick={()=> navigate("/bookmark")} className='text-glass text-2xl my-2.5 mx-2.5 mb-10 cursor-pointer transition duration-300 hover:text-red-600  ' />
//     <Userprofile/>
//    </div>
  
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { BiSolidDashboard } from "react-icons/bi";
import Userprofile from './Userprofile';
import { useNavigate } from 'react-router-dom';
import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { IoBookmark } from "react-icons/io5";
import { MdMovie } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');

  const handleIconClick = (path) => {
    navigate(path);
    setActiveTab(path);
  };

  const getIconStyle = (path) => {
    return `text-glass text-2xl my-2.5 mx-2.5 mb-10 cursor-pointer transition duration-300 ${
      activeTab === path ? 'text-white hover:text-red-600' : 'hover:text-red-600'
    }`;
  };

  return (
    <div className='bg-form h-[39rem] w-[5rem] rounded-3xl ml-5 p-4 border transition-all duration-500 border-solid border-form relative left-aligned-container'>
      <MdMovie className="text-red-600 text-4xl ml-2 mb-12" />
      <BiSolidDashboard
        onClick={() => handleIconClick("/")}
        className={getIconStyle("/")}
      />
      <MdLocalMovies
        onClick={() => handleIconClick("/movies")}
        className={getIconStyle("/movies")}
      />
      <PiTelevisionBold
        onClick={() => handleIconClick("/tvseries")}
        className={getIconStyle("/tvseries")}
      />
      <IoBookmark
        onClick={() => handleIconClick("/bookmark")}
        className={getIconStyle("/bookmark")}
      />
      <Userprofile />
    </div>
  );
};

export default Sidebar;



