import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCross, FaCut, FaGoogle, FaHome } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaCrosshairs } from "react-icons/fa6";
import { useTheme } from "../hooks/ThemeContext";

const Signup = () => {
  const { signUpWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photoURL);
      const userInfo = { name: data.name, email: data.email };
      await axiosPublic.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Signup successful!",
        confirmButtonText: "OK",
        confirmButtonColor: "#10B981",
        customClass: {
          confirmButton: "text-white",
        },
      });

      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#10B981",
        customClass: {
          confirmButton: "text-white",
        },
      });
    }
  };

  const handleRegister = async () => {
    try {
      const result = await signUpWithGmail();
      console.log(result.user);

      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };

      await axiosPublic.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Successfully Logged In Using Google",
        timer: 1000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/");
        closeModal();
      }, 1000);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div
      className={`max-w-md ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow w-full mx-auto flex items-center justify-center my-20 font-patrick`}
    >
      <div className="fixed top-5 right-5 text-3xl">
        <Link to="/">
          <FaHome />
        </Link>
      </div>
      <div className="mb-5">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3
            className={` ${
              isDarkMode ? "text-white" : "text-black"
            } font-bold text-lg`}
          >
            Please Create An Account!!
          </h3>

          <div className="form-control">
            <label className="label">
              <span
                className={`label-text ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered text-black"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span
                className={`label-text ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered text-black"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span
                className={`label-text ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered text-black"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-green text-white"
              value="Sign up"
            />
          </div>

          <div
            className={`text-center my-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Have an account?
            <Link to="/login">
              <button className="ml-2 underline text-green">Login here</button>
            </Link>
          </div>
        </form>

        <div className="text-center space-x-3">
          <p
            className={`${
              isDarkMode
                ? "text-white font-patrick font-semibold"
                : "text-black font-patrick font-semibold"
            }`}
          >
            Or SignIn with Google
          </p>
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-green hover:text-white bg-green"
          >
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
