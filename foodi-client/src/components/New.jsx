import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { useTheme } from "../hooks/ThemeContext";
import { motion } from "framer-motion";
import "./new1.css";
import axios from "axios";
import Model1 from "./Model1";
import ClipLoader from "react-spinners/ClipLoader";

const BMR = () => {
  const [isNewsModalVisible, setNewsModalVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    if (isNewsModalVisible) {
      const fetchNews = async () => {
        setLoading(true); // Start loading
        try {
          const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${apiKey}`
          );
          setArticles(response.data.articles);
        } catch (err) {
          setError("Failed to fetch news articles.");
        } finally {
          setLoading(false);
        }
      };
      fetchNews();
    }
  }, [isNewsModalVisible]);

  const handleOpenNewsModal = () => {
    setNewsModalVisible(true);
  };

  const handleCloseNewsModal = () => {
    setNewsModalVisible(false);
  };

  return (
    <div
      className={`min-h-[87vh] overflow-hidden mt-20 ${
        isDarkMode
          ? "bg-gradient-to-r from-black to-black text-gray-100"
          : "bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] text-black"
      }`}
    >
      <div className="upside mx-auto px-4 md:px-8 lg:px-24 relative py-12 md:py-24 lg:py-48 flex flex-col items-center justify-center gap-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-center space-y-5 md:space-y-7"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mt-4 md:mt-8"
          >
            <span className="text-green">Discover your path </span>
            <span
              className={`${
                isDarkMode ? "text-white" : "text-green font-extrabold"
              } mt-2 md:mt-0`}
            >
              to health
            </span>{" "}
            <span
              className={`${
                isDarkMode ? "text-white" : "text-green font-extrabold"
              } mt-2 md:mt-0`}
            >
              with <span className="text-green font-extrabold">our</span>
            </span>{" "}
            <span
              className={`${
                isDarkMode ? "text-white" : "text-green font-extrabold"
              } mt-2 md:mt-0`}
            >
              BMR
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 2, scale: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold ${
              isDarkMode ? "text-white font-extrabold" : "text-black"
            } mt-12 md:mt-20`}
          >
            & Calorie Calculator
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1.5 }}
              transition={{ duration: 2, delay: 1 }}
              className="text-green ml-2"
            >
              - And Get Up to Date!
            </motion.span>
          </motion.p>
        </motion.div>

        <div className="flex gap-4">
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="btn bg-green rounded-full text-white flex items-center gap-2 text-sm md:text-base lg:text-lg"
          >
            Check BMR!!
          </button>
          
         <Link to="/news">
          <button
            // onClick={handleOpenNewsModal}
            className="btn bg-blue-500 rounded-full text-white flex items-center gap-2 text-sm md:text-base lg:text-lg"
          >
            Get Updated!!
          </button>
          </Link>
          <Model1 />
        </div>

        {isNewsModalVisible && (
          <dialog
            open
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="relative p-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-xl rounded-xl w-full max-w-4xl overflow-y-auto max-h-[80vh]">
              <button
                onClick={handleCloseNewsModal}
                className="absolute top-2 right-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 font-bold py-2 px-4 rounded-lg focus:outline-none"
              >
                &times;
              </button>
              <h2 className="text-center text-2xl font-semibold uppercase mb-6 font-patrick font-bold text-black dark:text-white">
                Health & Fitness News
              </h2>
              {loading ? (
                <div className="flex justify-center items-center mt-10">
                  <ClipLoader color={"#00ff00"} size={50} />
                  <span className="font-patrick ml-4 mt-2 text-2xl text-green dark:text-white">
                    Please Wait...
                  </span>
                </div>
              ) : error ? (
                <div className="bg-red-600 text-white text-center p-2 mb-4 rounded">
                  {error}
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((article, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.5 }}
                      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md flex"
                    >
                      {article.urlToImage && (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-24 h-24 object-cover rounded-lg mr-4"
                        />
                      )}
                      <div>
                        <h3 className="font-bold text-lg text-black dark:text-white">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {article.description}
                        </p>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green dark:text-green text-bold underline mt-2 block"
                        >
                          Read More
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default BMR;
