import React from "react";
import { SiGmail, SiLinkedin, SiGithub, SiTwitter } from "react-icons/si";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";

const SocialProfile = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <Link
        to="https://www.linkedin.com/in/adarsh-kumar-jha-306b81245?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        title="Follow me on LinkedIn"
        className={`text-3xl ${isDarkMode ? "text-blue-400" : "text-blue-700"}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiLinkedin title="Follow me on LinkedIn" />
      </Link>
      {/* Uncomment and adjust if Twitter link is needed */}
      {/* <Link
        to="https://twitter.com/your-twitter-handle"
        title="Follow me on Twitter"
        className={`text-3xl ${isDarkMode ? "text-blue-300" : "text-blue-500"}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiTwitter title="Follow me on Twitter" />
      </Link> */}
      <Link
        to="https://github.com/adarsh-kumar-jha"
        title="Follow me on GitHub"
        className={`text-3xl ${isDarkMode ? "text-gray-300" : "text-black"}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiGithub title="Follow me on GitHub" />
      </Link>
      <Link
        to="mailto:jhaadarsh234@gmail.com"
        title="Any Query! Mail me"
        className={`text-3xl ${isDarkMode ? "text-red-400" : "text-red-500"}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiGmail title="Any Query! Mail me" />
      </Link>
    </div>
  );
};

export default SocialProfile;
