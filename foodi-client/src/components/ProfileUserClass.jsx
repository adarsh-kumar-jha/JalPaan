import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SocialProfile from "./SocialProfile.jsx";
import { useTheme } from "../hooks/ThemeContext";

const ProfileUser = ({ userInfo }) => {
  const { name, avatar_url, bio } = userInfo;
  const additionalUrl = "https://github.com/adarsh-kumar-jha";
  const { isDarkMode } = useTheme();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="mt-5 flex flex-col items-center gap-5">
      <Link to={additionalUrl} target="_blank" rel="noopener noreferrer">
        <img
          className="rounded-full w-36 h-36 border-none cursor-pointer m-1 transform hover:scale-105"
          src={avatar_url}
          alt={name}
          title={name}
        />
      </Link>
      <p
        className={`text-lg text-center mx-2 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {bio}
      </p>
      <SocialProfile />
    </div>
  );
};

export default ProfileUser;
