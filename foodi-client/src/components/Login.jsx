import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useTheme } from "../hooks/ThemeContext";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const from = location.state?.from?.pathname || "/";

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log("I'm working in login.jsx")
        const userInfo = {
          email: user?.email,
          name: user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          alert("Login successful!");
          navigate("/", { replace: true });
        });
      })
      .catch((error) => {
        setErrorMessage("Please provide valid email & password!");
      });
    reset();
  };

  // Login with Google
  const handleRegister = () => {
    signUpWithGmail().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        alert("Login successful!");
        navigate(from, { replace: true });
      });
    });
  };

  // Handle close button click
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div
      className={`max-w-md w-full mx-auto flex items-center justify-center my-20 font-patrick relative ${
        isDarkMode ? "bg-gray-800 text-white shadow-white" : "bg-white text-black shadow-lg"
      }`}
    >
      {/* Close button */}
      <div className="fixed top-5 right-50 text-lg">
        <Link to="/">
          <p className="text-center font-patrick font-bold mr-3">
            Enter the *Admin* Credentials here!!
            <button
              className={`rounded-lg px-4 py-2 ml-2 ${
                isDarkMode ? "bg-green text-white hover:bg-gray-400" : "bg-green text-white hover:bg-gray-600"
              }`}
            >
              Back To Home
            </button>
          </p>
        </Link>
      </div>
      <div className="mb-5">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg font-patrick">Please Login!</h3>

          {/* Email */}
          <div className="form-control font-patrick">
            <label className="label">
              <span className={`label-text font-patrick ${isDarkMode?"text-white":"text-black"}`}>Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className={`input input-bordered ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              {...register("email")}
            />
          </div>

          {/* Password */}
          <div className="form-control font-patrick">
            <label className="label">
              <span className={`label-text font-patrick  ${isDarkMode?"text-white":"text-black"}`} >Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className={`input input-bordered font-patrick ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              {...register("password", { required: true })}
            />
            <label className="label">
              <Link
                to="/forgot"
                className={`label-text-alt link link-hover mt-2 font-patrick ${
                  isDarkMode ? "text-green" : "text-green"
                }`}
              >
                Forgot password?
              </Link>
            </label>
          </div>

          {/* Show errors */}
          {errorMessage && (
            <p className="text-red text-xs italic font-patrick">
              Provide a correct username & password.
            </p>
          )}

          {/* Submit button */}
          <div className="form-control mt-4 font-patrick">
            <input
              type="submit"
              className={`btn ${
                isDarkMode ? "bg-green text-white" : "bg-green text-white"
              }`}
              value="Login"
            />
          </div>

          <p className="text-center my-2 font-patrick">
            Don't have an account?
            <Link
              to="/signup"
              className={`underline ml-1 ${
                isDarkMode ? "text-green text-black" : "text-green text-black"
              }`}
            >
              Signup Now
            </Link>
          </p>
        </form>
        <div className="text-center space-x-3">
          <p
            className={`${
              isDarkMode ? "text-gray-200 font-patrick font-semibold" : "text-black font-patrick font-semibold"
            }`}
          >
            Or SignIn with Google
          </p>
          <button
            onClick={handleRegister}
            className={`btn btn-circle hover:bg-green hover:text-white font-patrick ${
              isDarkMode ? "text-black bg-green" : "text-black"
            }`}
          >
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
