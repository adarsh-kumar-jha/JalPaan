import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const RecipeCard = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [complexity, setComplexity] = useState("");

  const handleSubmit = () => {
    const recipeData = {
      ingredients,
      mealType,
      cuisine,
      cookingTime,
      complexity,
    };
    onSubmit(recipeData);
  };

  return (
    <div className="w-full sm:w-[400px] border rounded-lg overflow-hidden shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="px-4 sm:px-6 py-4">
        <div className="font-bold text-lg sm:text-xl mb-2 text-green dark:text-green-300">
          Learn To Cook
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline dark:focus:shadow-outline-gray"
            id="ingredients"
            type="text"
            placeholder="Enter ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="mealType"
          >
            Meal Type
          </label>
          <select
            className="block appearance-none w-full bg-white dark:bg-gray-900 border border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline dark:focus:shadow-outline-gray"
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="cuisine"
          >
            Cuisine Preference
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:focus:shadow-outline-gray"
            id="cuisine"
            type="text"
            placeholder="e.g., Indian, Italian, Mexican"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="cookingTime"
          >
            Cooking Time
          </label>
          <select
            className="block appearance-none w-full bg-white dark:bg-gray-900 border border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline dark:focus:shadow-outline-gray"
            id="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          >
            <option value="Less than 30 minutes">Less than 30 minutes</option>
            <option value="30-60 minutes">30-60 minutes</option>
            <option value="More than 1 hour">More than 1 hour</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="complexity"
          >
            Complexity
          </label>
          <select
            className="block appearance-none w-full bg-white dark:bg-gray-900 border border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline dark:focus:shadow-outline-gray"
            id="complexity"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="px-6 py-4">
          <button
            className="bg-green dark:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:focus:shadow-outline-gray"
            type="button"
            onClick={handleSubmit}
          >
            Let's Generate!!
          </button>
        </div>
      </div>
    </div>
  );
};

function GeneratedText({ text }) {
  const paragraphs = text.split("\n\n");

  return (
    <div>
      {paragraphs.map((paragraph, index) => {
        const headingMatch = paragraph.match(/^(.*?):/);
        const isHeading = headingMatch !== null;
        const heading = headingMatch ? headingMatch[0].trim() : "";

        if (index === 0 && !isHeading) {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex justify-center mb-4"
            >
              <h1 className="text-lg sm:text-xl font-bold text-center dark:text-green-400">
                {paragraph.trim()}
              </h1>
            </motion.div>
          );
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {isHeading ? (
              <motion.h2
                className="text-base sm:text-lg font-bold mb-2 text-center dark:text-green-400"
                style={{ fontFamily: "Patrick Hand, cursive" }}
              >
                {heading}
              </motion.h2>
            ) : (
              <p className="dark:text-gray-300">{paragraph.trim()}</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function Ai() {
  const [recipeText, setRecipeText] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:6001/recipeStream/chat",
        data
      );
      setRecipeText(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRecipeText("Failed to fetch recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center mt-24 sm:mt-32 dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl">
        <RecipeCard onSubmit={onSubmit} />
        <div className="w-full sm:w-[400px] h-[400px] sm:h-[565px] text-xs text-gray-600 dark:text-gray-300 p-4 border rounded-lg shadow-xl dark:border-gray-700 whitespace-pre-line overflow-y-auto mt-4 sm:mt-0">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader color={"#36d7b7"} size={50} />
              <span className="ml-4 dark:text-white">
                Please Wait, Generating Recipe...
              </span>
            </div>
          ) : (
            <GeneratedText text={recipeText} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Ai;
