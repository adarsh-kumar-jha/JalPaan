import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import {
  FaEdit,
  FaHome,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import {
  MdDashboard,
  MdOutlineDashboardCustomize,
  MdOutlineNewReleases,
} from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Login from "../components/Login";
import { useTheme } from "../hooks/ThemeContext";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import logo from "/logo.png";
import { showCustomerSupportForm } from "../../public/Common/showCustomerSupportForm";

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  const handleLinkClick = () => {
    document.getElementById("my-drawer-2").checked = false;
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sharedMenu = (
    <>
      <li className="mt-3">
        <Link to="/" onClick={handleLinkClick}>
          <FaHome />
          Home
        </Link>
      </li>
      <li>
        <Link to="/menu" onClick={handleLinkClick}>
          <FaCartShopping />
          Menu
        </Link>
      </li>
      <li>
        <Link to="/ai" onClick={handleLinkClick}>
          <span className="flex text-lg  ">
            <RiRobot2Fill /> <span className=" px-2 text-sm">A.I</span>
          </span>
        </Link>
      </li>
      <li>
        <Link className="text-lg" to="/new" onClick={handleLinkClick}>
          <MdOutlineNewReleases />
          <span className="flex text-sm">New</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/order" onClick={handleLinkClick}>
          <FaLocationArrow />
          Orders Tracking
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            showCustomerSupportForm();
            handleLinkClick("#");
          }}
        >
          <FaQuestionCircle />
          Customer Support
        </Link>
      </li>
    </>
  );

  return (
    <div
      className={`font-patrick ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {isAdminLoading || isAdmin ? (
        <div className="drawer sm:drawer-open ">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button sm:hidden"
              >
                <MdOutlineDashboardCustomize />
              </label>
              <button
                className={`btn flex items-center gap-2 rounded-full px-6 ${
                  isDarkMode ? "bg-green text-white" : "bg-green text-white"
                } sm:hidden`}
                onClick={handleLogout} // Attach the handleLogout function
              >
                <FaRegUser /> Logout
              </button>
            </div>
            <div className="mt-5 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul
              className={`menu p-4 w-80 min-h-full ${
                isDarkMode
                  ? "bg-black text-white"
                  : "bg-base-200 text-base-content"
              }`}
            >
              <li>
                <Link
                  to="/dashboard"
                  onClick={handleLinkClick}
                  className="flex justify-start mb-3"
                >
                  <img src={logo} alt="" className="w-20" />
                  <span className="indicator-item badge badge-primary">
                    Admin
                  </span>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="/dashboard" onClick={handleLinkClick}>
                  <MdDashboard /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/bookings" onClick={handleLinkClick}>
                  <FaShoppingBag /> Manage Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-menu" onClick={handleLinkClick}>
                  <FaPlusCircle /> Add Menu
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items" onClick={handleLinkClick}>
                  <FaEdit /> Manage Items
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/dashboard/users" onClick={handleLinkClick}>
                  <FaUsers /> Users
                </Link>
              </li>
              <hr />
              {sharedMenu}
            </ul>
          </div>
        </div>
      ) : loading ? (
        <Login />
      ) : (
        <div
          className={`h-screen flex items-center justify-center font-patrick font-bold text-3xl ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <Link to="/" className="flex items-center">
            You Are Not An Admin. Back To
            <button
              className={`ml-2 px-4 py-2 rounded-lg ${
                isDarkMode
                  ? "bg-green hover:bg-gray-600 text-white"
                  : "bg-green hover:bg-gray-600 text-black"
              }`}
            >
              Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
