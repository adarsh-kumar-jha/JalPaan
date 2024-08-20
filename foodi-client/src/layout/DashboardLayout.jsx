import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdOutlineDashboardCustomize } from "react-icons/md";
import { FaEdit, FaHome, FaLocationArrow, FaPlusCircle, FaQuestionCircle, FaRegUser, FaShoppingBag, FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Swal from 'sweetalert2';
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import logo from "/logo.png";
import Login from "../components/Login";
import { useTheme } from "../hooks/ThemeContext"
import { RiRobot2Fill } from "react-icons/ri";
import { MdOutlineNewReleases } from "react-icons/md";

const showCustomerSupportForm = () => {
  Swal.fire({
    title: 'Customer Support',
    html: `
      <form id="customer-support-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" class="swal2-input" placeholder="Your name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" class="swal2-input" placeholder="Your email" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" class="swal2-textarea" placeholder="Your message" required></textarea>
        </div>
        <div class="form-group">
          <button type="button" id="whatsapp-btn" class="swal2-confirm swal2-styled" style="background-color: green;">
            WhatsApp
          </button>
        </div>
      </form>
    `,
    showCancelButton: true,
    confirmButtonText: 'Send',
    customClass: {
      confirmButton: 'btn btn-green',  // Custom class for the "Send" button
      cancelButton: 'btn btn-cancel'   // Custom class for the "Cancel" button (optional)
    },
    preConfirm: () => {
      const name = Swal.getPopup().querySelector('#name').value;
      const email = Swal.getPopup().querySelector('#email').value;
      const message = Swal.getPopup().querySelector('#message').value;
      if (!name || !email || !message) {
        Swal.showValidationMessage('Please fill out all fields');
      }
      return { name, email, message };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { name, email, message } = result.value;
      console.log({ name, email, message });
      // Here you can add your email sending code
    }
  });

  document.getElementById('whatsapp-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/+917377237009?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  });
};

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLinkClick = () => {
    document.getElementById('my-drawer-2').checked = false;
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
        <span className='flex text-lg  '><  RiRobot2Fill /> <span className=' px-2 text-sm'>A.I</span></span>
        </Link>
      </li>
      <li>
        <Link className='text-lg' to="/new" onClick={handleLinkClick}>
        < MdOutlineNewReleases /><span className='flex text-sm' >New</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/order" onClick={handleLinkClick}>
          <FaLocationArrow />
          Orders Tracking
        </Link>
      </li>
      <li>
        <Link onClick={() => { showCustomerSupportForm(); handleLinkClick(); }}>
          <FaQuestionCircle />
          Customer Support
        </Link>
      </li>
    </>
  );

  return (
    <div className={`font-patrick ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
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
              <button className={`btn flex items-center gap-2 rounded-full px-6 ${isDarkMode ? 'bg-green text-white' : 'bg-green text-white'} sm:hidden`}>
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
            <ul className={`menu p-4 w-80 min-h-full ${isDarkMode ? 'bg-black text-white' : 'bg-base-200 text-base-content'}`}>
              <li>
                <Link to="/dashboard" onClick={handleLinkClick} className="flex justify-start mb-3">
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
      ) : (
        loading ? (
          <Login />
        ) : (
          <div className={`h-screen flex items-center justify-center text-xl ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <Link to="/">
            You Are Not An Admin. Back To 
            <button className={`bg-green rounded-lg px-2 py-2 ml-2 ${isDarkMode ? 'bg-green text-white' : 'bg-green text-white'}`}>
              Home
            </button>
          </Link>
        </div>
        
        )
      )}
    </div>
  );
};

export default DashboardLayout;
