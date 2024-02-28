import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Modal from './Modal';
const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      
      const {createUser, login} = useContext(AuthContext);
      const location = useLocation();
      const navigate = useNavigate();
      const from = location.state?.from?.pathname || "/";      

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email,password).then((result)=>
    {
      const user= result.user;
      alert("Account creation successfully done!")
      document.getElementById("my_modal_5").close()
      navigate(from,{replace: true})
    })
    .catch((error) =>
    {
      const errorCode=error.code;
      const errorMessage=error.message;
    })
  }
  return (
    <div className='max-w-md flex font-patrick w-full mx-auto my-20 shadow bg-white items-center justify-center'>
      <div className="modal-action flex flex-col justify-center mt-0">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
        <h3 className="font-bold text-lg">Create An Account!!</h3>

        {/* email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required
           {...register("email",)}/>
        </div>

        {/* password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required
           {...register("password")}/>
          <label className="label mt-1">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input type="submit" value="SignUp" className="btn bg-green font-bold text-white "/>
        </div>
        <p className='text-center my-2'>have an account? 
        <button 
        className='underline text-red ml-1' 
        onClick={()=>document.getElementById('my_modal_5').showModal()} >Login</button>{" "}
        </p>

        <Link 
         to="/"
         className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>

      </form>

      {/* social sign in */}
      <div className='text-center font-patrick space-x-3 mb-5' >
      <p>Or sign-in with Google</p>
        <button className='btn btn-circle hover:bg-green hover:text'>
        <FaGoogle />
        </button>
       
      </div>
      </div>
      <Modal />
    </div>
  )
}

export default Signup
