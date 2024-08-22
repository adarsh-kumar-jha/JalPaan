import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiGitRepoForked, BiStar } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { Github_Repository_Name } from "../../public/Common/constant.js";
import { useTheme } from "../hooks/ThemeContext";

const ProfileRepo = ({ userInfo, repoInfo }) => {
  const { followers, html_url } = userInfo;
  const repoList = Array.isArray(repoInfo) ? repoInfo : [];
  const repoUrl = "https://github.com/adarsh-kumar-jha/JalPaan";
  const { isDarkMode } = useTheme();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-md overflow-hidden shadow-lg h-full p-4 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {repoList
        .filter((repo) => repo.name === Github_Repository_Name)
        .map((repo) => {
          return (
            <div
              key={repo.id}
              className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            >
              <h1
                className={`flex items-center justify-center rounded-md shadow-md my-5 p-4 ${
                  isDarkMode
                    ? "bg-gray-700 text-orange-500"
                    : "bg-gray-100 text-orange-600"
                } text-center text-sm sm:text-base md:text-lg lg:text-xl`}
              >
                <Link
                  to={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:scale-105 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold ${
                    isDarkMode
                      ? "hover:text-orange-400"
                      : "hover:text-orange-500"
                  }`}
                >
                  {repo.name}
                </Link>
              </h1>
              <h3
                className={`my-4 mx-4 sm:mx-6 md:mx-8 lg:mx-10 text-center ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } text-xs sm:text-sm md:text-base lg:text-lg`}
              >
                {repo.description}
              </h3>
              <div
                className={`flex flex-col sm:flex-row items-center justify-between my-5 ${
                  isDarkMode ? "text-orange-500" : "text-orange-600"
                }`}
              >
                <h3 className="my-2 sm:my-0 mx-4 sm:mx-6">
                  <Link
                    to={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center hover:scale-105 ${
                      isDarkMode
                        ? "hover:text-orange-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    <FiUsers className="text-lg sm:text-xl md:text-2xl" />
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm md:text-base lg:text-lg">
                      {followers} Followers
                    </span>
                  </Link>
                </h3>
                <h3 className="my-2 sm:my-0 mx-4 sm:mx-6">
                  <Link
                    to={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center hover:scale-105 ${
                      isDarkMode
                        ? "hover:text-orange-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    <BiGitRepoForked className="text-lg sm:text-xl md:text-2xl" />
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm md:text-base lg:text-lg">
                      {repo.forks_count} Forks
                    </span>
                  </Link>
                </h3>
                <h3 className="my-2 sm:my-0 mx-4 sm:mx-6">
                  <Link
                    to={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center hover:scale-105 ${
                      isDarkMode
                        ? "hover:text-orange-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    <BiStar className="text-lg sm:text-xl md:text-2xl" />
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm md:text-base lg:text-lg">
                      {repo.stargazers_count} Stars
                    </span>
                  </Link>
                </h3>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProfileRepo;
