import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "../../hooks/ThemeContext";
import { Link } from "react-router-dom";

const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: delay,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };
};

const serviceLists = [
  {
    id: 1,
    title: "Online Ordering",
    des: "Order Online, Connect to आशीष भैया",
    img: "/images/home/services/icon1.png",
  },
  {
    id: 2,
    title: "Fast delivery",
    des: "We Deliver Faster Than your Gf's Reply in midnight",
    img: "/images/home/services/icon2.png",
  },
  {
    id: 4,
    title: "Shaniwaar Ka Vaar",
    des: "Give the Order in Advance and skip the Rush",
    img: "/images/home/services/icon4.png",
  },
];

const OurServices = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      className={`section-container my-8 sm:my-16 px-4 py-8 sm:py-16 md:py-24 ${
        isDarkMode ? "bg-black" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
        <div className="md:w-1/2 w-full">
          <div className="text-left sm:w-4/5 w-full">
            <p
              className={`subtitle text-sm sm:text-base md:text-lg font-patrick ${
                isDarkMode ? "text-gray-400" : ""
              }`}
            >
              Our Story & Services
            </p>
            <h2
              className={`title text-xl sm:text-2xl md:text-4xl font-patrick leading-snug ${
                isDarkMode ? "text-white" : ""
              }`}
            >
              Our Culinary Journey And Services
            </h2>
            <p
              className={`my-5 text-secondary text-sm sm:text-base leading-relaxed font-patrick ${
                isDarkMode ? "text-gray-300" : ""
              }`}
            >
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>
            <button
              className={`bg-green font-semibold btn text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base ${
                isDarkMode ? "bg-green" : ""
              }`}
            >
              <Link to="/menu">Explore</Link>
            </button>
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 items-center">
            {serviceLists.map((service) => (
              <div
                key={service.id}
                className={`shadow-md rounded-sm py-4 sm:py-5 px-2 sm:px-4 text-center space-y-1 sm:space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200 font-patrick ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 shadow-none hover:border-white"
                    : ""
                }`}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="mx-auto w-12 sm:w-16 md:w-20"
                />
                <h5
                  className={`pt-2 sm:pt-3 font-semibold text-xs sm:text-sm md:text-base font-patrick ${
                    isDarkMode ? "text-gray-100" : ""
                  }`}
                >
                  {service.title}
                </h5>
                <p
                  className={`text-[#554348] text-xs sm:text-sm font-patrick ${
                    isDarkMode ? "text-gray-400" : ""
                  }`}
                >
                  {service.des}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurServices;
