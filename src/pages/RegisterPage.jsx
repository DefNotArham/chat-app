import React from "react";
import { Link } from "react-router-dom";
import AuthPages from "../Components/AuthPages";

const RegisterPage = () => {
  return (
    <AuthPages>
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <div className="w-full mt-5 flex flex-col gap-5">
        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Email Address <span className="text-red-700">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-xl bg-white text-black w-full"
          />
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Username <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            placeholder="Username"
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
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Date of Birth <span className="text-red-700">*</span>
          </label>
          <input
            type="date"
            className="border p-2 rounded-xl bg-white text-black w-full"
          />
        </div>
      </div>

      <div className="w-full mt-7 flex flex-col items-center text-center">
        <button className="bg-chat-bg w-[80%] py-4 rounded-xl text-sm cursor-pointer">
          Create account
        </button>
        <p className="mt-3 text-[#E8FFF1]">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </AuthPages>
  );
};

export default RegisterPage;
