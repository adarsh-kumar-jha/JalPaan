import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import Cards from "../../components/Cards";
import useMenu from "../../hooks/useMenu";
import { useTheme } from "../../hooks/ThemeContext";

const Menu = () => {
  const [menu] = useMenu();
  const { isDarkMode } = useTheme();
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setFilteredItems(menu);
    console.log(menu);
  }, [menu]);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    switch (option) {
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
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="relative bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] overflow-hidden">
        <video
          src={isDarkMode ? "/images/darkmode.mp4" : "/images/Main.mp4"}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
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
              transition={{ duration: 0.75, delay: 0.5 }}
              className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug mt-8 md:mt-12"
            >
              <span className="text-green">For The Delicious </span>
              <span
                className={`${
                  isDarkMode ? "text-green2" : "text-green1 font-extrabold"
                } mt-4 md:mt-0`}
              >
                Urff
              </span>{" "}
              <span
                className={`italic ${
                  isDarkMode ? "text-green2" : "text-green1 font-extrabold"
                } mt-4 md:mt-0`}
              >
                laz <span className="text-green font-extrabold">eez</span>
              </span>{" "}
              <span className="text-green font-hindi mt-4 md:mt-0">खाना</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 2, scale: 1 }}
              transition={{ duration: 2, delay: 3 }}
              className={`text-2xl md:text-5xl font-bold ${
                isDarkMode ? "text-green2 font-extrabold" : "text-green1"
              } mt-20 md:mt-24`}
            >
              Come with friends or alone and enjoy the{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1.5 }}
                transition={{ duration: 2, delay: 2 }}
                className="italic text-green"
              >
                finger-licking foood!!
              </motion.span>
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="bg-green font-semibold btn px-8 py-3 rounded-full text-white mt-8 md:mt-12"
            >
              Order Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 mb-8">
          <div className="flex flex-row justify-start md:gap-8 gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={showAll}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === "all" ? "bg-green text-white" : ""
              }`}
            >
              All
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => filterItems("Chinese")}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === "Chinese" ? "bg-green text-white" : ""
              }`}
            >
              Chinese
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => filterItems("Paratha")}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === "Paratha" ? "bg-green text-white" : ""
              }`}
            >
              Paratha
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => filterItems("Bread Omelette")}
              className={`px-4 py-2 rounded-md ${
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
              className={`px-4 py-2 rounded-md ${
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
              className={`px-4 py-2 rounded-md ${
                selectedCategory === "Rice" ? "bg-green text-white" : ""
              }`}
            >
              Rice
            </motion.button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-black p-2 rounded-md">
              <FaFilter className="h-4 w-4 text-white" />
            </div>

            <select
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-md"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low-to-High</option>
              <option value="high-to-low">High-to-Low</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-1 grid-cols-4 gap-4">
          {currentItems.map((item) => (
            <Cards key={item._id.$oid} item={item} />
          ))}
        </div>
      </div>

      <div className="flex justify-center my-8 gap-2">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
