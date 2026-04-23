import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthPages from "../Components/AuthPages";
import axios from "axios";
import { MdError } from "react-icons/md";
import { Oval } from "react-loader-spinner";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [errorType, setErrorType] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    setIsloading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        {
          email: email.trim(),
          username: username.trim(),
          password,
          DOB,
          displayName: displayName.trim() || username.trim(),
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        navigate("/verify-email");
        setIsloading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response?.data.message || "Server error");
      setErrorType(error?.response?.data.typeError || "general");
      setIsloading(false);

      setTimeout(() => {
        setErrorMsg("");
        setErrorType("");
      }, 3000);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleCreateAccount();
    }
  };

  return (
    <AuthPages>
      <h1 className="text-2xl font-semibold text-white">Create an account</h1>
      {errorType === "general" ? (
        <p className="text-[#ed4245] text-sm mt-2 ml-2 font-bold flex items-center gap-1">
          <MdError />
          {errorMsg}
        </p>
      ) : (
        ""
      )}

      <form
        className="w-full mt-5 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleEnter();
        }}
      >
        <div className="flex flex-col items-start">
          <label className="ml-1 my-2 text-[#b5bac1]">
            Email Address <span className="text-[#ed4245]">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className={`border p-2 rounded-xl bg-[#383a40] text-white placeholder-[#72767d] w-full transition-all ${
              errorType === "email" || errorType === "general"
                ? "border-[#ed4245] border-2"
                : "border-2 border-[#1e1f22]"
            }`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onKeyDown={handleEnter}
          />
          {errorType === "email" ? (
            <p className="text-[#ed4245] text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {errorMsg}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2 text-[#b5bac1]">
            Username <span className="text-[#ed4245]">*</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className={`border p-2 rounded-xl bg-[#383a40] text-white placeholder-[#72767d] w-full transition-all ${
              errorType === "username" || errorType === "general"
                ? "border-[#ed4245] border-2"
                : "border-2 border-[#1e1f22]"
            }`}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          {errorType === "username" ? (
            <p className="text-[#ed4245] text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {errorMsg}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2 text-[#b5bac1]">Display name</label>
          <input
            type="text"
            placeholder="Display name (optional)"
            className={`border p-2 rounded-xl bg-[#383a40] text-white placeholder-[#72767d] w-full transition-all ${
              errorType === "general" || errorType === "displayName"
                ? "border-[#ed4245] border-2"
                : "border-2 border-[#1e1f22]"
            }`}
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
          {errorType === "displayName" ? (
            <p className="text-[#ed4245] text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {errorMsg}
            </p>
          ) : (
            ""
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
              errorType === "password" || errorType === "general"
                ? "border-[#ed4245] border-2"
                : "border-2 border-[#1e1f22]"
            }`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {errorType === "password" ? (
            <p className="text-[#ed4245] text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {errorMsg}
            </p>
          ) : (
            ""
          )}

          {/* <div className="text-sm mt-3">
            <p>* Must be at least 8 characters long </p>
            <p>* Must include atleast one number </p>
            <p>* Must include at least one letter </p>
            <p>* Must include at least one uppercase letter </p>
            <p>* Must include a special character (!@#$%^&*) </p>
          </div> */}
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2 text-[#b5bac1]">
            Date of Birth <span className="text-[#ed4245]">*</span>
          </label>
          <input
            type="date"
            className={`border p-2 rounded-xl bg-[#383a40] text-white w-full transition-all ${
              errorType === "dob" || errorType === "general"
                ? "border-[#ed4245] border-2"
                : "border-2 border-[#1e1f22]"
            }`}
            onChange={(e) => setDOB(e.target.value)}
            value={DOB}
          />
          {errorType === "dob" ? (
            <p className="text-[#ed4245] text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {errorMsg}
            </p>
          ) : (
            ""
          )}
        </div>
      </form>

      <div className="w-full mt-7 flex flex-col items-center text-center">
        <button
          className="bg-[#5865f2] hover:bg-[#4752c4] w-[80%] py-4 rounded-xl text-sm text-white cursor-pointer flex items-center justify-center transition-colors"
          onClick={handleCreateAccount}
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
            "Create account"
          )}
        </button>
        <p className="mt-3 text-[#b5bac1]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-[#5865f2] hover:text-[#4752c4]"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthPages>
  );
};

export default RegisterPage;
