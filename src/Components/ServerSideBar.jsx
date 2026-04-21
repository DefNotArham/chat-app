import React from "react";

const ServerSideBar = ({ server }) => {
  return (
    <div className="bg-side-bar w-[280px] h-screen ml-[70px] fixed left-0 top-0 flex flex-col justify-between z-40">
      <div className="w-[1px] bg-[#424644] min-h-screen"></div>
      <div className="bg-emerald-500 h-12 flex items-center px-4 text-white font-semibold">
        {server ? server.name : "Loading..."}
      </div>
    </div>
  );
};

export default ServerSideBar;
