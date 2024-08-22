import React, { useContext, useEffect, useState, useRef } from "react";
import { RiUserStarLine } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useCart from "../hooks/useCart";
import Modal from "./Modal";
import Profile from "./Profile";
import { useTheme } from "../hooks/ThemeContext";
import { showCustomerSupportForm } from "../../public/Common/showCustomerSupportForm";
import "./new1.css";
import { RiRobot2Fill } from "react-icons/ri";
import { MdOutlineNewReleases } from "react-icons/md";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user } = useContext(AuthContext);
  const [cart] = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeLink, setActiveLink] = useState("/");

  const isActive = (path) => activeLink === path;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    navigate(path);
    if (menuRef.current) {
      menuRef.current.removeAttribute("open");
    }
    if (knowUsRef.current) {
      knowUsRef.current.removeAttribute("open");
    }
  };

  const currentHour = new Date().getHours();
  const message = currentHour < 19 ? "Close" : "Open";
  const messageClass =
    message === "Close" ? "bg-green text-white" : "bg-green2 text-white";

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setSticky(offset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuRef = useRef(null);
  const knowUsRef = useRef(null);

  const navItems = (
    <>
      <li>
        <Link
          to="/"
          onClick={() => handleLinkClick("/")}
          className={`text-lg ${
            isActive("/")
              ? "text-green"
              : isDarkMode
              ? "text-white"
              : "text-black"
          } hover:text-green`}
        >
          Home
        </Link>
      </li>
      <li className="text-lg" tabIndex={0}>
        <details ref={menuRef}>
          <summary
            className={`text-lg ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Menu
          </summary>
          <ul className={`p-2 ${isDarkMode ? "dark" : ""}`}>
            <li>
              <Link
                to="/menu"
                onClick={() => handleLinkClick("/menu")}
                className={`text-lg ${
                  isActive("/menu")
                    ? "text-green"
                    : isDarkMode
                    ? "text-white"
                    : "text-black"
                } hover:text-green`}
              >
                All
              </Link>
            </li>
            <li>
              <Link
                to="/menu?category=Chinese"
                onClick={() => handleLinkClick("/menu?category=Chinese")}
                className={`text-lg ${
                  isActive("/menu?category=Chinese")
                    ? "text-green"
                    : isDarkMode
                    ? "text-white"
                    : "text-black"
                } hover:text-green`}
              >
                Chinese
              </Link>
            </li>
            <li>
              <Link
                to="/menu?category=Paratha"
                onClick={() => handleLinkClick("/menu?category=Paratha")}
                className={`text-lg ${
                  isActive("/menu?category=Paratha")
                    ? "text-green"
                    : isDarkMode
                    ? "text-white"
                    : "text-black"
                } hover:text-green`}
              >
                Paratha
              </Link>
            </li>
            <li>
              <Link
                to="/menu?category=Bread Omelette"
                onClick={() => handleLinkClick("/menu?category=Bread Omelette")}
                className={`text-lg ${
                  isActive("/menu?category=Bread Omelette")
                    ? "text-green"
                    : isDarkMode
                    ? "text-white"
                    : "text-black"
                } hover:text-green`}
              >
                Bread Omelette
              </Link>
            </li>
            <li>
              <Link
                to="/menu?category=Rice"
                onClick={() => handleLinkClick("/menu?category=Rice")}
                className={`text-lg ${
                  isActive("/menu?category=Rice")
                    ? "text-green"
                    : isDarkMode
                    ? "text-white"
                    : "text-black"
                } hover:text-green`}
              >
                Rice
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li className="text-lg" tabIndex={0}>
        <details ref={knowUsRef}>
          <summary
            className={`text-lg ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Know Us
          </summary>
          <ul className={`p-2 ${isDarkMode ? "dark" : ""}`}>
            <li>
              <Link
                to="/about"
                onClick={() => handleLinkClick("/about")}
                className={`text-lg ${
                  isActive("/about")
                    ? "text-green"
                    : isDarkMode
                    ? "text-white"
                    : "text-black"
                } hover:text-green`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => {
                  showCustomerSupportForm();
                  handleLinkClick("#");
                }}
                className={`text-lg ${
                  isActive("#")
                    ? "text-green"
                    : isDarkMode
                    ? "text-white"
                    : "text-black"
                } hover:text-green`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li className="text-lg">
        <Link
          to="/new"
          onClick={() => handleLinkClick("/new")}
          className={`text-xl ${
            isActive("/new")
              ? "text-green"
              : isDarkMode
              ? "text-white"
              : "text-black"
          } hover:text-green`}
        >
          <span className="flex ">
            New
            <MdOutlineNewReleases />
          </span>
        </Link>
      </li>
      <li className="text-lg">
        <Link
          to="/ai"
          onClick={() => handleLinkClick("/ai")}
          className={`text-lg ${
            isActive("/ai")
              ? "text-green"
              : isDarkMode
              ? "text-white"
              : "text-black"
          } hover:text-green`}
        >
          <span className=" text-3xl">
            <RiRobot2Fill />
          </span>
        </Link>
      </li>
    </>
  );

  return (
    <header
      className={`max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out font-patrick ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? `${
                isDarkMode ? "bg-zinc-800" : "bg-base-100"
              } shadow-md transition-all duration-300 ease-in-out text-${
                isDarkMode ? "white" : "black"
              }`
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown justify-between">
            <label
              onClick={toggleMenu}
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3 ${
                isDarkMode ? "dark" : ""
              }`}
              style={{ display: isMenuOpen ? "block" : "none" }}
            >
              {navItems}
            </ul>
          </div>
          <Link to="/">
            <h1 className="font-patrick text-xl sm:text-4xl md:text-5xl lg:text-5xl title1">
              <span className="text-green">जल</span>pAAn
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul
            className={`${
              isDarkMode
                ? "menu-horizontal px-1 space-x-8 cursor-pointer"
                : "menu menu-horizontal px-1"
            }`}
          >
            {navItems}
          </ul>
        </div>
        <div className="sm:navbar-end md:navbar-end lg:navbar-end items-center sm:space-x-2">
          <div
            className={`text-xs text-nowrap ml-0.5 sm:text-lg lg:text-lg md:text-lg sm:p-2 md:p-2 lg:p-2 text-center rounded ${messageClass} animate-sparkle`}
          >
            {message}
          </div>
          <Link to="/cart-page">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle relative lg:flex items-center justify-center mr-3"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 w-5 lg:h-5 lg:w-5 md:h-5 md:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="sm:badge sm:badge-sm sm:indicator-item h-2 w-2 p-2 badge badge-sm indicator-item">
                  {cart.length || 0}
                </span>
              </div>
            </label>
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <Profile user={user} />
            ) : (
              <button
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
                className="btn bg-green rounded-full px-2 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm md:px-6 md:py-2 md:text-base text-white flex items-center gap-1 sm:gap-2 md:gap-3"
              >
                <RiUserStarLine className="text-xs sm:text-sm md:text-base" />
                Login
              </button>
            )}
            <Modal />
            <div className="pl-1 sm:p-4 md:p-4 lg:p-4 themediv">
              <input
                type="checkbox"
                className="toggle h-4 w-9 mr-5 sm:h-5 sm:w-10 make"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
