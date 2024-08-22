import React from "react";
import { Link } from "react-router-dom";
import { showCustomerSupportForm } from "../../public/Common/showCustomerSupportForm";
import { useTheme } from "../hooks/ThemeContext";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaSquareGithub } from "react-icons/fa6";
import { TfiInstagram } from "react-icons/tfi";

export const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <footer
        className={`footer xl:px-24 py-10 px-4 text-base-content flex flex-col md:flex-row items-start md:items-center justify-between ${
          isDarkMode ? "bg-black text-gray-300" : "bg-white text-gray-800"
        }`}
      >
        <aside>
          <h1 className="font-patrick text-4xl md:text-5xl">
            <span className="text-green">जल</span>pAAn
          </h1>
          <p className="my-4 md:w-40 text-sm md:text-base"></p>
          <p className="font-patrick text-lg md:text-base ">
            Pure Swadeshi & Reliable since 2023
          </p>
        </aside>

        {/* Uncomment and update the nav sections as needed */}
        {/* <nav className="mt-8 md:mt-0">
          <h6 className="footer-title font-patrick text-sm md:text-base">USEFUL LINKS</h6> 
          <a className="link link-hover font-patrick text-sm md:text-base">About us</a>
          <a className="link link-hover font-patrick text-sm md:text-base">Events</a>
          <a className="link link-hover font-patrick text-sm md:text-base">Blogs</a>
          <a className="link link-hover font-patrick text-sm md:text-base">FAQs</a>
        </nav> */}
        {/* <nav className="mt-8 md:mt-0">
          <h6 className="footer-title font-patrick text-sm md:text-base">Connect With Us</h6> 
          <Link to="/about" className="link link-hover font-patrick text-sm md:text-base">About Us</Link>
          <Link to="#" onClick={showCustomerSupportForm} className="link link-hover font-patrick text-sm md:text-base">Contact Us</Link>
        </nav> */}
        {/* <nav className="mt-8 md:mt-0">
          <h6 className="footer-title font-patrick text-sm md:text-base">Legal</h6> 
          <a className="link link-hover font-patrick text-sm md:text-base">Terms of use</a>
          <a className="link link-hover font-patrick text-sm md:text-base">Privacy policy</a>
          <a className="link link-hover font-patrick text-sm md:text-base">Cookie policy</a>
        </nav> */}
      </footer>

      <hr className={`${isDarkMode ? "border-gray-700" : "border-gray-300"}`} />

      <footer
        className={`footer items-center xl:px-24 py-10 px-4 flex flex-col md:flex-row justify-between ${
          isDarkMode ? "bg-black text-gray-300" : "bg-white text-gray-800"
        }`}
      >
        <aside className="items-center text-center md:text-left">
          <p className="font-patrick font-semibold text-sm md:text-base">
            <span className="flex flex-col lg:flex-row lg:items-center">
              <span className="flex flex-col lg:flex-row lg:items-center">
                Copyright © 2024 - Built with ❤️ By
                <span className="text-green ml-1 lg:ml-3">Adarsh</span>
                <span className="mt-2 lg:mt-0 lg:ml-3 flex items-center gap-2 inline">
                  <Link
                    aria-label="LinkedIn"
                    to="https://www.linkedin.com/in/adarsh-kumar-jha-306b81245?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-xl md:text-2xl" />
                  </Link>
                  <Link
                    aria-label="GitHub"
                    to="https://github.com/adarsh-kumar-jha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="text-xl md:text-2xl" />
                  </Link>
                  <Link
                    aria-label="Instagram"
                    to="https://www.instagram.com/adarsh_addi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-xl md:text-2xl" />
                  </Link>
                </span>
              </span>
              <span className="mt-4 lg:mt-0 flex flex-col lg:flex-row lg:items-center ml-3">
                And <span className="text-green ml-1 lg:ml-3">Shashwat</span>
                <span className="mt-2 lg:mt-0 lg:ml-3 flex items-center gap-2 inline">
                  <Link
                    aria-label="LinkedIn"
                    to="https://www.linkedin.com/in/shashwat-tiwari-06313924a/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CiLinkedin className="text-2xl md:text-3xl" />
                  </Link>
                  <Link
                    aria-label="GitHub"
                    to="https://github.com/Shashwat8038"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSquareGithub className="text-xl md:text-2xl" />
                  </Link>
                  <Link
                    aria-label="Instagram"
                    to="https://www.instagram.com/shash1059/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TfiInstagram className="text-xl md:text-2xl" />
                  </Link>
                </span>
              </span>
            </span>
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
