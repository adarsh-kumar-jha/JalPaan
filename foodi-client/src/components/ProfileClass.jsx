import React, { useState, useEffect } from "react";
import ProfileUserClass from "./ProfileUserClass";
import ProfileRepoClass from "./ProfileRepoClass";
import ProfileUserClass1 from "./ProfileUserClass1.jsx";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";
import {
  Github_API_User,
  Github_UserName,
  Github_UserName1,
  options,
} from "../../public/Common/constant.js";

const ProfileClass = () => {
  const [userInfo1, setUserInfo1] = useState(null);
  const [userInfo2, setUserInfo2] = useState(null);
  const [repoInfo, setRepoInfo] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([
          fetch(Github_API_User + Github_UserName, options),
          fetch(Github_API_User + Github_UserName1, options),
          fetch(Github_API_User + Github_UserName + "/repos", options),
        ]);
        const resData = await Promise.all(response.map((r) => r.json()));
        setUserInfo1(resData[0]);
        setUserInfo2(resData[1]);
        setRepoInfo(resData[2]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {userInfo1 && userInfo2 && repoInfo ? (
        <div
          className={`flex flex-col items-center mt-20 px-4 ${
            isDarkMode ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          <Link to={"/about"}>
            <button
              className={`${
                isDarkMode
                  ? "bg-orange-700 text-white hover:bg-orange-600"
                  : "bg-orange-500 text-white hover:bg-orange-700"
              } py-2 px-4 rounded-lg border-none cursor-pointer text-lg font-bold mb-8`}
            >
              Hide My Profile
            </button>
          </Link>

          <div
            className={`w-full md:w-3/4 lg:w-2/3 p-5 mb-8 rounded shadow-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h1
              className={`text-2xl md:text-3xl lg:text-4xl text-center mb-6 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              JalPaan<span className="text-orange-600 "> Food</span> App Github
              Repository
            </h1>
            <ProfileRepoClass userInfo={userInfo1} repoInfo={repoInfo} />
          </div>

          <div className="flex flex-col md:flex-row w-full md:w-3/4 lg:w-2/3 gap-4">
            <div
              className={`flex-1 p-5 mb-8 rounded shadow-lg ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <h1
                className={`text-xl md:text-2xl text-center mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                About Me
              </h1>
              <ProfileUserClass userInfo={userInfo1} />
            </div>
            <div
              className={`flex-1 p-5 mb-8 rounded shadow-lg ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <h1
                className={`text-xl md:text-2xl text-center mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                About Me
              </h1>
              <ProfileUserClass1 userInfo={userInfo2} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProfileClass;
