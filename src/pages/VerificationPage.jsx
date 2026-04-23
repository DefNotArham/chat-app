import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthPages from "../Components/AuthPages";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const VerificationPage = ({ user, setUser }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/verifyEmail",
        { code: code.trim() },
        { withCredentials: true },
      );
      if (response.data.success) {
        setSuccess("Verified successfully!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Verification failed");
      setIsLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <AuthPages>
      <div className="my-auto flex flex-col text-center">
        {!success ? (
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white">
              Verify your email address
            </h1>
            <p className="text-sm mt-3 text-[#b5bac1]">
              We emailed you a six-digit code. Enter the code below to confirm
              your email address{" "}
            </p>
          </div>
        ) : null}

        {error && <p className="text-[#ed4245] mt-3 font-semibold">{error}</p>}

        <div>
          {success ? (
            <>
              <p className="text-[#57f287] mt-5 text-center font-semibold text-2xl">
                {success}
              </p>
              <Link
                to="/login"
                className="underline cursor-pointer text-[#5865f2] hover:text-[#4752c4]"
              >
                Go to Login
              </Link>
            </>
          ) : (
            <>
              <input
                type="text"
                maxLength={6}
                placeholder="Enter code"
                className={`border-2 outline-none p-3 rounded-xl bg-[#383a40] text-white placeholder-[#72767d] text-center text-lg tracking-widest w-full mt-5 ${
                  error
                    ? "border-[#ed4245]"
                    : "border-[#1e1f22] focus:border-[#5865f2]"
                }`}
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
              <button
                onClick={handleVerify}
                disabled={isLoading}
                className="p-3 font-semibold cursor-pointer text-sm rounded-xl mx-auto mt-3 w-full bg-[#5865f2] hover:bg-[#4752c4] text-white flex justify-center items-center transition-colors"
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
                  "Verify"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </AuthPages>
  );
};

export default VerificationPage;
