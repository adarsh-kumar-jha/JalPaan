import { SiGmail, SiLinkedin, SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";

const SocialProfile1 = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex justify-center items-center space-x-4 mt-8 ${
        isDarkMode ? "text-white" : "text-gray-800"
      }`}
    >
      <Link
        to="https://www.linkedin.com/in/shashwat-tiwari-06313924a/"
        title="Follow me on Linkedin"
        className={`text-3xl ${isDarkMode ? "text-blue-400" : "text-blue-700"}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiLinkedin title="Follow me on Linkedin" />
      </Link>

      <Link
        to="https://github.com/Shashwat8038"
        title="Follow me on Github"
        className={`text-3xl ${isDarkMode ? "text-gray-300" : "text-black"}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiGithub title="Follow me on Github" />
      </Link>
      <Link
        to="mailto:shashwattiwari609@gmail.com"
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

export default SocialProfile1;
