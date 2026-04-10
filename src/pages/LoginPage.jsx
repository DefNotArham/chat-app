import React from "react";
import { Link } from "react-router-dom";

import AuthPages from "../Components/AuthPages";

const LoginPage = () => {
  return (
    <AuthPages>
      <div>
        <h1 className="text-2xl font-semibold">Welcome back!</h1>
        <p>We are happy to see again!</p>
      </div>
      <div className="w-full mt-5 flex flex-col gap-5">
        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Email Address <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="border p-2 rounded-xl bg-white text-black w-full"
          />
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Password <span className="text-red-700">*</span>
          </label>
          <input
            type="Password"
            placeholder="Password"
            className="border p-2 rounded-xl bg-white text-black w-full"
          />
          <Link
            to="/forgot-password"
            className="mt-2 ml-1 underline text-sm text-[#E8FFF1]"
          >
            Forgot your password?
          </Link>
        </div>

        <div className="w-full mt-7 flex flex-col items-center text-center">
          <button className="bg-chat-bg w-[80%] py-4 rounded-xl text-sm cursor-pointer">
            Log in
          </button>
          <p className="mt-3 text-[#E8FFF1]">
            Need an account?{" "}
            <Link to="/register" className="underline ">
              Register
            </Link>
          </p>
        </div>
      </div>
    </AuthPages>
  );
};

export default LoginPage;
