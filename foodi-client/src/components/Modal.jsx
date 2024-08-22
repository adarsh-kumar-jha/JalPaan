import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast, { Toaster } from "react-hot-toast";

const Modal = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, reset } = useForm();

  const closeModal = () => {
    setIsModalOpen(false);
    document.getElementById("my_modal_5").close();
  };

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    setErrorMessage("");

    login(email, password)
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });
        toast.success("Login successful!", {
          position: "top-center",
          style: {
            backgroundColor: isDarkMode ? "#333" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
            fontSize: "16px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          },
        });
        navigate(from);
        closeModal();
      })
      .catch((error) => {
        setErrorMessage("Please provide valid email & password!");
      });
    reset();
  };

  // Handle Google sign-in
  const handleRegister = () => {
    signUpWithGmail().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        toast.success("Login successful!", {
          position: "top-center",
          style: {
            backgroundColor: isDarkMode ? "#333" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
            fontSize: "16px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          },
        });
        navigate(from);
        closeModal();
      });
    });
  };

  return (
    <>
      <dialog
        id="my_modal_5"
        className={`modal ${
          isModalOpen ? "modal-middle sm:modal-middle" : "hidden"
        } ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <div className={`modal-box ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <div
            className={`modal-action flex-col justify-center mt-0 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <form
              className="card-body"
              method="dialog"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3
                className={`font-bold text-lg ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Please Login!
              </h3>

              <div className="form-control">
                <label
                  className={`label ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className={`input input-bordered ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black"
                  }`}
                  {...register("email")}
                />
              </div>

              <div className="form-control">
                <label
                  className={`label ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className={`input input-bordered ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black"
                  }`}
                  {...register("password", { required: true })}
                />
                <label className="label">
                  <Link
                    to="/forgot"
                    className={`label-text-alt link link-hover mt-2 ${
                      isDarkMode ? "text-green" : "text-green"
                    }`}
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>

              {errorMessage && (
                <p
                  className={`text-green text-xs italic ${
                    isDarkMode ? "text-green" : "text-green"
                  }`}
                >
                  {errorMessage}
                </p>
              )}

              <div className="form-control mt-4">
                <input
                  type="submit"
                  className={`btn ${
                    isDarkMode ? "bg-green text-white" : "bg-green text-white"
                  }`}
                  value="Login"
                />
              </div>

              <div
                htmlFor="my_modal_5"
                className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                onClick={closeModal}
              >
                ✕
              </div>

              <p className="text-center my-2">
                Don’t have an account?
                <Link
                  to="/signup"
                  className={`underline ${
                    isDarkMode ? "text-green" : "text-green"
                  } ml-1`}
                >
                  Signup Now
                </Link>
              </p>
            </form>
            <div className="text-center space-x-3 mb-5">
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
                className={`btn btn-circle hover:bg-green hover:text-white ${
                  isDarkMode ? "text-black bg-green" : "text-black bg-green"
                }`}
              >
                <FaGoogle />
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            marginTop: "70px",
            fontSize: "16px",
          },
        }}
      />
    </>
  );
};

export default Modal;
