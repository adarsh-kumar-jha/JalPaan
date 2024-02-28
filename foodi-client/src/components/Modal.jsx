import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const {signUpWithGmail, login} = useContext(AuthContext);
const [errorMessage, seterrorMessage]= useState("");


// redirecting to home page or specific page
const location = useLocation();
const navigate = useNavigate();
const from = location.state?.from?.pathname || "/";

const onSubmit = (data) =>{
const email= data.email;
const password = data.password;
login(email,password).then((result)=>
{
  const user=result.user;
  alert("Login successful");
  document.getElementById("my_modal_5").close()
  navigate(from,{replace:true})
}).catch((error)=>
{
  const errorMessage = error.message;
  seterrorMessage("Provide a correct email and password!")
})
}

  // const onSubmit = (data) => console.log(data)


  // google signin
  const handleLogin = () =>
  {
    signUpWithGmail().then((result) =>
    {
      const user = result.user;
      alert("Login successful")
      navigate(from,{replace:true})
    } ).catch((error)=> console.log(error))
  }
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
    <div className="modal-box">
      <div className="modal-action  font-patrick flex flex-col justify-center mt-0">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
        <h3 className="font-bold text-lg">Please Login !!</h3>

        {/* email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required
           {...register("email")}/>
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

    {/* error */}
    {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}



        <div className="form-control mt-6">
          <input type="submit" value="Login" className="btn bg-green font-bold text-white "/>
        </div>
        <p className='text-center my-2'>Don't have an account?{" "} <Link to="/signup"
        className='underline text-red ml-1' >Signup Now</Link></p>
         <button 
         htmlFor="my_modal_5" 
         onClick={()=>document.getElementById('my_modal_5').close()}
         className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      {/* social sign in */}
      <div className='text-center font-patrick space-x-3 mb-5' 
       >
        <p>Or sign-in with Google</p>
        <button className='btn btn-circle hover:bg-green hover:text-white' onClick={handleLogin}>
        <FaGoogle />
        </button>
       
       
      </div>
      </div>
    </div>
  </dialog>
  )
}

export default Modal
