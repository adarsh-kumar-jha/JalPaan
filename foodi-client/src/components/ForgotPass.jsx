import React, { useState } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "./Modal";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setEmail("");

      Swal.fire({
        icon: "success",
        title: "Password reset email sent!",
        text: "Check your inbox.",
        confirmButtonText: "OK",
        confirmButtonColor: "#10B981",
      });
    } catch (error) {
      setError(error.message || "Failed to send password reset email");
    }

    setLoading(false);
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-lg">
        <button
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          onClick={handleNavigateHome}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-red-600 dark:text-red-400 text-center">
              {error}
            </p>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="example@domain.com"
              required
            />
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white bg-green dark:bg-green rounded-md hover:bg-gray-200 dark:hover:gray-200 transition-colors duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Password Reset Email"}
            </button>
          </div>
        </form>

        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="w-full mt-4 text-green hover:underline text-center"
        >
          Back to Login
        </button>

        <Modal />
      </div>
    </div>
  );
};

export default ForgotPass;
