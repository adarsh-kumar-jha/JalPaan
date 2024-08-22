import { motion } from "framer-motion";
import React from "react";
import { FaStar } from "react-icons/fa";
import { useTheme } from "../../hooks/ThemeContext";

const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

const Testimonials = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      className={`section-container px-4 py-16 md:py-24 ${
        isDarkMode ? "bg-dark" : "bg-white"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/images/home/testimonials/testimonials.png"
            alt="Testimonials"
            className="w-full h-auto max-w-xs md:max-w-md"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p
              className={`subtitle ${
                isDarkMode ? "text-gray-400" : "text-black"
              }`}
            >
              Testimonials
            </p>
            <h2
              className={`title font-patrick ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              What Our Customers Say About Us
            </h2>
            <blockquote
              className={`my-5 leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-secondary"
              }`}
            >
              “I had the pleasure of dining at Jalpaan last night, and I'm still
              raving about the experience! The attention to detail in
              presentation and service was impeccable”
            </blockquote>

            {/* Avatar Section */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img
                      src="/images/home/testimonials/testimonial1.png"
                      alt="Customer 1"
                    />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img
                      src="/images/home/testimonials/testimonial2.png"
                      alt="Customer 2"
                    />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img
                      src="/images/home/testimonials/testimonial3.png"
                      alt="Customer 3"
                    />
                  </div>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="space-y-1">
                <h5
                  className={`text-lg font-patrick font-semibold ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Customer Feedback
                </h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span
                    className={`font-medium ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    4.9
                  </span>
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-[#807E7E]"
                    }`}
                  >
                    (18.6k Reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;
