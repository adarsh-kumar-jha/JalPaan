import { motion } from "framer-motion";
import { useTheme } from "../../hooks/ThemeContext";
import React from "react";

const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      duration: 1.5,
      delay: delay,
      ease: "easeInOut",
    },
  },
});

const categoryItems = [
  {
    id: 1,
    title: "Main Dish",
    description: "(20+ dishes)",
    image: "/images/home/category/img1.jpg",
  },
  {
    id: 2,
    title: "Grocery",
    description: "(Packet Item)",
    image: "/images/home/category/img2.png",
  },
  {
    id: 3,
    title: "Ice-Cream",
    description: "(Every-Type)",
    image: "/images/home/category/img3.png",
  },
  {
    id: 4,
    title: "Browse All",
    description: "(50+ Items)",
    image: "/images/home/category/img4.png",
  },
];

const Categories = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16"
    >
      <div className="text-center">
        <p className="text-red uppercase tracking-wide font-semibold text-sm sm:text-lg">
          Customer Favorites
        </p>
        <h2
          className={`title font-patrick text-2xl sm:text-3xl md:text-4xl ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Popular Categories
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-center items-center mt-12">
        {categoryItems.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeIn("up", 0.1 * i)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className={`shadow-lg rounded-md py-6 px-5 w-64 sm:w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10
                            ${
                              isDarkMode
                                ? "bg-gray-800 shadow-gray-900"
                                : "bg-white shadow-gray-300"
                            }`}
          >
            <div className="w-full mx-auto flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="bg-new1 p-5 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5
                className={`font-semibold text-lg sm:text-xl ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {item.title}
              </h5>
              <p
                className={`text-xs sm:text-sm ${
                  isDarkMode ? "text-gray-400" : "text-secondary"
                }`}
              >
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Categories;
