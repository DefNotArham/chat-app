import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdError } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { Oval } from "react-loader-spinner";

import AuthPages from "../Components/AuthPages";

const LoginPage = ({ setIsAuthentication, setUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [errorType, setErrorType] = useState("");

  const [forgotPassSucess, setForgotPassSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadServers = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/checkAuth",
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        {
          email: email.trim(),
          password,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthentication(true);
        setIsLoading(false);
        loadServers();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response?.data.message || "Server error");
      setErrorType(error?.response?.data.typeError || "general");
      setIsLoading(false);

      setTimeout(() => {
        setErrorMsg("");
        setErrorType("");
      }, 3000);
    }
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/forgot-password",
        { email: email.trim() },
        { withCredentials: true },
      );

      if (response.data.success) {
        setForgotPassSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
      setErrorType("email");
      setForgotPassSuccess(false);
      setIsLoading(false);

      setTimeout(() => {
        setErrorMsg("");
        setErrorType("");
      }, 3000);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <AuthPages>
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-semibold text-white">Welcome back!</h1>
        <p className="text-[#b5bac1]">We are happy to see again!</p>

        {errorType === "general" && (
          <p className="text-[#ed4245] text-sm mt-2 ml-2 font-bold flex items-center gap-1">
            <MdError />
            {errorMsg}
          </p>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="w-full mt-5 flex flex-col gap-5"
      >
        <div className="flex flex-col items-start">
          <label className="ml-1 my-2 text-[#b5bac1]">
            Email Address <span className="text-[#ed4245]">*</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className={`border p-2 rounded-xl bg-[#383a40] text-white placeholder-[#72767d] w-full transition-all ${
              errorType === "general" || errorType === "email"
                ? "border-[#ed4245] border-2"
                : "border-2 border-[#1e1f22]"
            }`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errorType === "email" && (
            <p className="text-[#ed4245] text-sm mt-1">{errorMsg}</p>
          )}
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2 text-[#b5bac1]">
            Password <span className="text-[#ed4245]">*</span>
          </label>
          <input
            type="Password"
            placeholder="Password"
            className={`border p-2 rounded-xl bg-[#383a40] text-white placeholder-[#72767d] w-full transition-all ${
              errorType === "general" || errorType === "password"
                ? "border-[#ed4245] border-2"
                : "border-2 border-[#1e1f22]"
            }`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errorType === "password" && (
            <p className="text-[#ed4245] text-sm mt-1">{errorMsg}</p>
          )}
          <a
            onClick={handleForgotPassword}
            className="mt-2 ml-1 underline text-sm text-[#b5bac1] hover:text-white cursor-pointer"
          >
            Forgot your password?
          </a>
        </div>

        <div className="w-full mt-7 flex flex-col items-center text-center">
          <button
            onClick={handleLogin}
            className="bg-[#5865f2] hover:bg-[#4752c4] w-[80%] py-4 rounded-xl text-sm text-white cursor-pointer flex justify-center items-center transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <Oval
                height={26}
                width={26}
                color="#ffffff"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#ffffff"
                strokeWidth={7}
                strokeWidthSecondary={5}
              />
            ) : (
              "Log in"
            )}
          </button>
          <p className="mt-3 text-[#b5bac1]">
            Need an account?{" "}
            <Link
              to="/register"
              className="underline text-[#5865f2] hover:text-[#4752c4]"
            >
              Register
            </Link>
          </p>
        </div>
      </form>

      {forgotPassSucess && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40"></div>

          <div className="fixed bg-[#57f287] p-6 rounded-2xl top-10 z-50">
            <div className="flex items-center gap-3 text-lg font-semibold justify-center text-[#1e1f22]">
              <h1>Check your email to reset your password</h1>
              <IoCloseSharp
                size={25}
                className="cursor-pointer"
                onClick={() => setForgotPassSuccess(false)}
              />
            </div>
          </div>
        </>
      )}
    </AuthPages>
  );
};

export default LoginPage;
