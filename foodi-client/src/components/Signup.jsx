import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCross, FaCut, FaGoogle, FaHome } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaCrosshairs } from "react-icons/fa6";

const Signup = () => {
  const { signUpWithGmail, createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photoURL);
      const userInfo = { name: data.name, email: data.email };
      await axiosPublic.post("/users", userInfo);
      Swal.fire("Success", "Signup successful!", "success");
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleRegister = async () => {
    try {
      const result = await signUpWithGmail(); // Sign up with Gmail
      console.log(result.user);
  
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
  
      await axiosPublic.post("/users", userInfo); // Save user info in the database
  
      // Show success alert for 1 second
      Swal.fire({
        icon: 'success',
        title: 'Successfully Logged In Using Google',
        timer: 1000, // 1 second
        showConfirmButton: false,
      });
  
      // Redirect to home page after alert
      setTimeout(() => {
        navigate("/"); // Redirect to home page
        closeModal(); // Close the modal if it's open
      }, 1000); // Ensure this runs after the alert disappears
  
    } catch (error) {
      // Handle error case
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20 font-patrick">
      <div className="fixed top-5 right-5 text-3xl"><Link to="/"><FaHome/></Link></div>
      <div className="mb-5">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Create An Account!!</h3>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-green text-white"
              value="Sign up"
            />
          </div>

          <div className="text-center my-2">
            Have an account?
            <Link to="/login">
              <button className="ml-2 underline">Login here</button>
            </Link>
          </div>
        </form>
        
        <div className="text-center space-x-3">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-green hover:text-white"
          >
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
