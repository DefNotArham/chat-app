import React from "react";

const AuthPages = ({ children }) => {
  return (
    <div className="bg-[#313338] min-h-screen text-white flex justify-center items-center">
      <div className="bg-[#2b2d31] flex flex-col p-8 px-12 min-[600px]:rounded-2xl items-center w-120 max-[600px]:min-h-screen max-[600px]:min-w-screen">
        {children}
      </div>
    </div>
  );
};

export default AuthPages;
