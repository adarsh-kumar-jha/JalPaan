import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const PreferencesCard = ({ onSubmit }) => {
  const [topic, setTopic] = useState("Health");
  const [detailLevel, setDetailLevel] = useState("Bulletin");

  const handleSubmit = () => {
    const preferenceData = {
      topic,
      detailLevel,
    };
    onSubmit(preferenceData);
  };

  return (
    <div className="w-full sm:w-[400px] border rounded-lg overflow-hidden shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="px-4 sm:px-6 py-4">
        <div className="font-bold text-lg sm:text-xl mb-2 text-green dark:text-green-300 font-patrick-hand">
          Choose Your Preferences
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="topic"
          >
            Topic
          </label>
          <select
            className="block appearance-none w-full bg-white dark:bg-gray-900 border border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline dark:focus:shadow-outline-gray"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="Health">Health</option>
            <option value="Fitness">Fitness</option>
            <option value="Food">Food</option>
            <option value="Nutrition">Nutrition</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="detailLevel"
          >
            Detail Level
          </label>
          <select
            className="block appearance-none w-full bg-white dark:bg-gray-900 border border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline dark:focus:shadow-outline-gray"
            id="detailLevel"
            value={detailLevel}
            onChange={(e) => setDetailLevel(e.target.value)}
          >
            <option value="Bulletin">Bulletin</option>
            <option value="Detailed Research">Detailed Research</option>
          </select>
        </div>
        <div className="px-6 py-4">
          <button
            className="bg-green dark:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:focus:shadow-outline-gray font-patrick-hand"
            type="button"
            onClick={handleSubmit}
          >
            Update Me
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdatedInfo = ({ text }) => {
  const isHeading = (line) => line.length < 50 && /^[A-Z]/.test(line);

  const renderLine = (line) => {
    const cleanedLine = line.replace(/\*/g, ""); // Remove asterisks
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = cleanedLine.split(urlRegex);
    
    return parts.map((part, i) =>
      urlRegex.test(part) ? (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green underline"
        >
          {part}
        </a>
      ) : (
        // For content after colon, make it semibold
        part.includes(":") ? (
          <>
            {part.split(":")[0]}:
            <span className="font-normal ml-1">
              {part.split(":")[1].trim()}
            </span>
          </>
        ) : (
          part
        )
      )
    );
  };

  return (
    <div>
      {text.split("\n\n").map((paragraph, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="mb-4"
        >
          {paragraph.split("\n").map((line, i) => (
            <div key={i}>
              {isHeading(line) ? (
                <p className="text-center font-bold text-2xl mb-4 font-patrick-hand">
                  {renderLine(line.trim())}
                </p>
              ) : (
                <p className="text-sm dark:text-gray-300 font-bold mb-2 font-patrick-hand">
                  {renderLine(line.trim())}
                </p>
              )}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const News = () => {
  const [infoText, setInfoText] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:6001/news/chat",
        data
      );
      setInfoText(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setInfoText("Failed to fetch information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-24 sm:mt-32 dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl">
        <PreferencesCard onSubmit={onSubmit} />
        <div className="w-full sm:w-[400px] h-[400px] sm:h-[565px] text-xs text-gray-600 dark:text-gray-300 p-4 border rounded-lg shadow-xl dark:border-gray-700 whitespace-pre-line overflow-y-auto mt-4 sm:mt-0">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader color={"#36d7b7"} size={50} />
              <span className="ml-4 dark:text-white">
                Please Wait, Fetching Data...
              </span>
            </div>
          ) : (
            <UpdatedInfo text={infoText} />
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
