import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

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
        // Signed in
        const user = result.user;

        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
        alert("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
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
      });
      navigate("/");
    });
  };

  // Handle close button click
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20 font-patrick relative">
      {/* Close button */}
      <button
        className="absolute top-2 right-2 text-black text-2xl font-bold hover:text-red-600"
        onClick={handleClose}
      >
        &times;
      </button>
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
              <span className="label-text font-patrick">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          {/* Password */}
          <div className="form-control font-patrick">
            <label className="label">
              <span className="label-text font-patrick">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered font-patrick"
              {...register("password", { required: true })}
            />
            <label className="label">
              <a
                href="#"
                className="label-text-alt link link-hover mt-2 font-patrick"
              >
                Forgot password?
              </a>
            </label>
          </div>

          {/* Show errors */}
          {errorMessage ? (
            <p className="text-red text-xs italic font-patrick">
              Provide a correct username & password.
            </p>
          ) : (
            ""
          )}

          {/* Submit button */}
          <div className="form-control mt-4 font-patrick">
            <input
              type="submit"
              className="btn bg-green text-white"
              value="Login"
            />
          </div>

          <p className="text-center my-2 font-patrick">
            Don't have an account?
            <Link to="/signup" className="underline text-red ml-1">
              Signup Now
            </Link>
          </p>
        </form>
        <div className="text-center space-x-3">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-green hover:text-white font-patrick"
          >
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
