import React, { useState } from "react";
import AuthPages from "../Components/AuthPages";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { token } = useParams();

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError("Password does not match");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (!newPassword || !confirmNewPassword) {
      setError("All fields are required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/auth/reset-password/${token}`,
        { password: newPassword },
        { withCredentials: true },
      );

      if (response.data.success) {
        setSuccess("Password changed successfully");
        setError("");
      }
    } catch (error) {
      console.log(error);

      setError(error?.response?.data?.message || "Server error");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleResetPassword();
    }
  };

  return (
    <AuthPages>
      {!success ? (
        <>
          <div className="flex flex-col text-center mb-10">
            <h1 className="text-3xl font-semibold">Change Your Password</h1>
            <p className="mt-2">
              Enter a new password below to change your password.
            </p>
            {error ? (
              <p className="text-red-500 text-sm mt-2 ml-2 font-bold">
                {error}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="w-full">
            <div>
              <input
                type="password"
                placeholder="New password"
                className={`border p-2 rounded-xl bg-white text-black w-full transition-all ${error ? "border-red-500 border-2" : ""}`}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={handleEnter}
              />
            </div>

            <div className="mt-3">
              <input
                type="password"
                placeholder="Conform new password"
                className={`border p-2 rounded-xl bg-white text-black w-full transition-all ${error ? "border-red-500 border-2" : ""}`}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                onKeyDown={handleEnter}
              />
            </div>
          </div>
          <button
            onClick={handleResetPassword}
            className="bg-chat-bg w-[80%] py-4 rounded-xl text-sm cursor-pointer mt-3"
          >
            Reset password
          </button>
        </>
      ) : (
        <div className="flex flex-col text-center">
          <h1 className="text-emerald-500 text-2xl font-semibold">{success}</h1>
          <Link className="underline " to="/login">
            Login page
          </Link>
        </div>
      )}
    </AuthPages>
  );
};

export default ResetPasswordPage;
