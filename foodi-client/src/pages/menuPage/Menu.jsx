import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import Cards from "../../components/Cards";
import useMenu from "../../hooks/useMenu";
import { useTheme } from "../../hooks/ThemeContext";
import { useLocation } from "react-router-dom";
import TypewriterEffect from "../../components/TypewriterEffect";
import {Link} from "react-router-dom"

const Menu = () => {
  const [menu] = useMenu();
  const { isDarkMode } = useTheme();
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const location = useLocation();
  const cardsRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category") || "all";
    setSelectedCategory(category);
  }, [location]);

  useEffect(() => {
    const filtered =
      selectedCategory === "all"
        ? menu
        : menu.filter((item) => item.category === selectedCategory);
    setFilteredItems(filtered);
  }, [selectedCategory, menu]);

  useEffect(() => {
    if (sortOption !== "default") {
      const sortedItems = [...filteredItems];
      switch (sortOption) {
        case "A-Z":
          sortedItems.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Z-A":
          sortedItems.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "low-to-high":
          sortedItems.sort((a, b) => a.price - b.price);
          break;
        case "high-to-low":
          sortedItems.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
      setFilteredItems(sortedItems);
    }
  }, [sortOption, filteredItems]);

  useEffect(() => {
    if (selectedCategory !== "all" && cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filteredItems, selectedCategory]);

  const showAll = () => {
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const filterItems = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div
        className={`relative ${
          isDarkMode ? "bg-black" : "bg-white"
        } overflow-hidden`}
      >
        <video
          src={isDarkMode ? "" : "/images/video3.mp4"}
          autoPlay
          muted
          className="absolute inset-0 w-full h-full object-cover z-0 -top-4 md:-top-8"
        ></video>
        <div className="max-w-screen-2xl mx-auto xl:px-24 relative z-10 py-16 md:py-32 lg:py-48 flex flex-col items-center justify-center gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-center px-4 space-y-7 text-white"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 2.5 }}
              className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug"
            >
              <span className="text-green">For The Delicious </span>
              <span
                className={`${
                  isDarkMode ? "text-white" : "text-black font-extrabold"
                } mt-8 md:mt-12`}
              >
                Urff
              </span>{" "}
              <span
                className={`italic ${
                  isDarkMode ? "text-white" : "text-black font-extrabold"
                }`}
              >
                laz <span className="text-green font-extrabold">eez</span>
              </span>{" "}
              <span className="text-green font-hindi">खाना</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 2, scale: 1 }}
              transition={{ duration: 2, delay: 3 }}
              className={`font-patrick text-2xl md:text-5xl font-bold ${
                isDarkMode ? "text-green2 font-extrabold mt-2" : "text-black"
              }`}
            >
              <div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1.5 }}
                transition={{ duration: 2, delay: 2 }}
                className={`italic text-green ${isDarkMode ? "-mt-7" : "mt-0"}`}
              >
                <br />
                <TypewriterEffect text="Finger-licking food!!" duration={5} />
              </div>
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className={`${
                isDarkMode ? "bg-green text-white" : "bg-green"
              } font-semibold btn px-8 py-3 rounded-full text-white`}
            >
              <Link to="/cart-page">
              Order Now
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </div>
      <div className="section-container" ref={cardsRef}>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 mb-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={showAll}
              className={`w-full sm:w-auto px-4 py-2 rounded-md text-center ${
                selectedCategory === "all" ? "bg-green text-white" : ""
              }`}
            >
              All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => filterItems("Chinese")}
              className={`w-full sm:w-auto px-4 py-2 rounded-md text-center ${
                selectedCategory === "Chinese" ? "bg-green text-white" : ""
              }`}
            >
              Chinese
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => filterItems("Paratha")}
              className={`w-full sm:w-auto px-4 py-2 rounded-md text-center ${
                selectedCategory === "Paratha" ? "bg-green text-white" : ""
              }`}
            >
              Paratha
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => filterItems("Bread Omelette")}
              className={`w-full sm:w-auto px-4 py-2 rounded-md text-center ${
                selectedCategory === "Bread Omelette"
                  ? "bg-green text-white"
                  : ""
              }`}
            >
              Bread Omelette
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => filterItems("Rolls & Noodles")}
              className={`w-full sm:w-auto px-4 py-2 rounded-md text-center ${
                selectedCategory === "Rolls & Noodles"
                  ? "bg-green text-white"
                  : ""
              }`}
            >
              Rolls & Noodles
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => filterItems("Rice")}
              className={`w-full sm:w-auto px-4 py-2 rounded-md text-center ${
                selectedCategory === "Rice" ? "bg-green text-white" : ""
              }`}
            >
              Rice
            </motion.button>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <span>Sort by:</span>
            <select
              value={sortOption}
              className={` ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {Array.from(
            { length: Math.ceil(filteredItems.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1 ? "bg-green text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
