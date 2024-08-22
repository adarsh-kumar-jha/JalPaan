import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import avatarImg from "/images/avatar.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar md:drawer-button md:btn md:btn-ghost md:btn-circle md:avatar sm:drawer-button sm:btn sm:btn-ghost sm:btn-circle sm:avatar lg:drawer-button lg:btn lg:btn-ghost lg:btn-circle lg:avatar"
          >
            <div className=" mr-2.5 w-8 h-8.5 rounded-full sm:mr-0 sm:w-10 sm:rounded-full lg:mr-0 lg:w-10 lg:rounded-full md:w-10 md:mr-0 md:rounded-full">
              {user.photoURL ? (
                <img alt="" src={user.photoURL} />
              ) : (
                <img alt="" src={avatarImg} />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>
              <Link to="/update-profile">Profile</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>

            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
