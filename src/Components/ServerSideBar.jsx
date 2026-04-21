import React, { useState } from "react";

import { RiUserAddFill } from "react-icons/ri";

const ServerSideBar = ({ server, setInviteToServerPopUp }) => {
  return (
    <div className="bg-side-bar w-[280px] h-screen ml-[70px] fixed left-0 top-0 flex flex-col justify-between z-40">
      <div className="h-12 flex items-center px-1 text-white font-semibold border-b border-[#424644]  justify-between pr-5 text-sm">
        <h1> {server?.name ?? "Loading..."}</h1>
        <RiUserAddFill
          className="cursor-pointer"
          size={19}
          onClick={() => {
            setInviteToServerPopUp(true);
          }}
        />
      </div>
    </div>
  );
};

export default ServerSideBar;
