import React from "react";
import bannerImg from "/images/home/banner.jpg";
import backGround from "/images/home/canteenmenu.jpg";
import { useTheme } from "../hooks/ThemeContext";
import { Link } from "react-router-dom";
// motion
import { motion } from "framer-motion";
// variants
import { fadeIn } from "../variants";

const Banner = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div
      className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%`}
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "70px",
        borderRadius: "5%",
      }}
    >
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className={`py-12 sm:py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8 px-4 md:px-0`}
      >
        {/* img */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
          <img
            src={backGround}
            className="mt-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            alt=""
          />

          <div className="flex flex-col md:flex-row items-center justify-around -mt-8 md:-mt-14 gap-4 w-full">
            <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-full max-w-xs">
              <img
                src="/images/home/b-food1.png"
                alt=""
                className="rounded-2xl"
              />
              <div className="space-y-1">
                <h5 className={` ${isDarkMode ? "text-black" : ""}`}>
                  Spring noodles
                </h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                </div>
                <p className="text-red">Rs 100.00</p>
              </div>
            </div>
            <div className="bg-white px-3 py-2 rounded-2xl md:flex items-center gap-3 shadow-sm w-full max-w-xs hidden md:block">
              <img
                src="/images/home/b-food1.png"
                alt=""
                className="rounded-2xl"
              />
              <div className="space-y-1">
                <h5 className={` ${isDarkMode ? "text-black" : ""}`}>
                  Spring noodles
                </h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                </div>
                <p className="text-red">Rs 100.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* texts */}
        <div className="w-full md:w-1/2 space-y-7 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold md:leading-snug leading-snug text-white">
            Ashish Bhaiya ka <span className="italic">lazeez</span>{" "}
            <span className="text-green font-hindi">खाना खजाना</span>
          </h2>
          <p className="font-patrick text-[#4A4A4A] text-lg sm:text-2xl md:text-3xl text-white">
            CaNtEEn mei nahi hai SEAT{" "}
            <span className="italic text-green text-4xl sm:text-5xl">
              {" "}
              आरू दा{" "}
            </span>{" "}
            ka khana hai HIT!!
          </p>
          <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
            <Link to="/menu">Order Now</Link>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
