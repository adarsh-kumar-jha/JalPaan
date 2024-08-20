import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom"; // Import Outlet
import ClipLoader from "react-spinners/ClipLoader"; // Importing ClipLoader
import burgerImage from "/images/burgerImage.png";

const About = () => {
  const [loading, setLoading] = useState(false); // State for loader
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const handleShowProfile = () => {
    setLoading(true);
    // Simulate a delay to represent data fetching
    setTimeout(() => {

      setLoading(false);
      navigate("/profile"); // Navigate to the profile route
    }, 4000); // Adjust the delay as needed
  };

  return (
    <>
      <div className="min-h-[87vh] mt-20 flex flex-col justify-center items-center">
        <div className="text-center mt-10">
          {loading ? (
            // Display the loader while loading
            <div className="flex">
            <ClipLoader color={"#ff7043"} size={50} />
            <span className="font-patrick ml-4 mt-2 text-xl ">Loading Profile Please Wait...</span>
            </div>
          
          ) : (
            <>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded-lg border-none cursor-pointer text-lg font-bold hover:bg-orange-700 mt-10"
                onClick={handleShowProfile}
              >
                Show My Profile
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-evenly items-center my-12 mx-6">
          <div className="flex flex-col justify-start items-start overflow-hidden text-center md:text-left mt-8 md:mt-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-light-text-color leading-tight">
              Welcome to <br /> The world of <br />
              <span className="bg-orange-500 px-2 rounded-lg text-light-white-text inline-block mt-2">
                Tasty & Fresh Food
              </span>
            </h1>
            <h4 className="text-xl md:text-2xl lg:text-3xl mt-4 italic text-light-text-color">
              "Better you will feel if you eat from our
              <span className="text-dark-orange"> JalPaan's</span> menu"
            </h4>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={burgerImage}
              alt="Food Image"
              className="w-64 h-auto md:w-80 lg:w-[500px] rounded-lg"
            />
          </div>
        </div>
      </div>
      <Outlet /> {/* This will render the profile content when navigated to /profile */}
    </>
  );
};

export default About;
