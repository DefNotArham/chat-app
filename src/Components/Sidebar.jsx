import React from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlineSearch } from "react-icons/md";

const Sidebar = ({ user }) => {
  return (
    <div className="flex ">
      <div className="bg-side-bar w-[70px] h-screen fixed top-0 left-0 flex flex-col items-center py-6 gap-6">
        <div className="bg-[#43B581] flex items-center justify-center p-2 rounded-2xl">
          <img className="w-6" src="/white_logo.png" alt="logo" />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-[#43B581] p-2 rounded-2xl cursor-pointer">
            <FiPlus size={24} color="white" />
          </div>

          <div className="bg-[#43B581] p-2 rounded-2xl cursor-pointer">
            <MdOutlineSearch size={24} color="white" />
          </div>
        </div>
      </div>

      <div className="bg-[#103f38] w-80 h-[60px] flex items-center absolute bottom-5 z-100 left-4 rounded-2xl px-1">
        <div className="flex gap-3 items-center hover:bg-[#007453] cursor-pointer rounded-xl px-3 py-1 transition-all">
          <div className="w-6 rounded-2xl">
            <img src="./white_logo.png" alt="" />
          </div>

          <div className="">
            <h1 className="text-white">{user.username}</h1>
            <p className="text-xs text-gray-400">Invissible</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0B2B26] w-[280px] h-screen ml-[70px] fixed left-0 top-0 flex flex-col justify-between">
        <div className="bg-[#103f38] w-full h-[60px]"></div>
      </div>
    </div>
  );
};

export default Sidebar;
