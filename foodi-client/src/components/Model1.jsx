import React, { useState } from "react";
import { useTheme } from "../hooks/ThemeContext";
import { motion } from "framer-motion";
import './new1.css'

function Model1() {
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [activity, setActivity] = useState("");
  const [bmr, setBmr] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [pal, setPal] = useState("");
  const [weightType, setWeightType] = useState("");
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();

  const handleAgeChange = (event) => setAge(event.target.value);
  const handleWeightChange = (event) => setWeight(event.target.value);
  const handleHeightFeetChange = (event) => setHeightFeet(event.target.value);
  const handleHeightInchesChange = (event) => setHeightInches(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleActivityChange = (event) => setActivity(event.target.value);
  const handleWeightTypeChange = (event) => setWeightType(event.target.value);

  const calculateBMR = () => {
    if (!age || !gender || !heightFeet || !heightInches || !weight) {
      setError("All Fields are Required");
      return;
    }

    let height = heightFeet * 30.48 + heightInches * 2.54;
    let bmrCalc = "";

    if (weightType === "1") {
      if (gender === "2") {
        bmrCalc = 66 + 6.2 * weight + 12.7 * height - 6.76 * age;
      } else if (gender === "1") {
        bmrCalc = 655.1 + 4.35 * weight + 4.7 * height - 4.7 * age;
      }
    } else if (weightType === "2") {
      if (gender === "2") {
        bmrCalc = 66.5 + 13.75 * weight + 5.003 * height - 6.755 * age;
      } else if (gender === "1") {
        bmrCalc = 655 + 9.563 * weight + 1.85 * height - 4.676 * age;
      }
    }

    setBmr(bmrCalc);

    let activitySug = "";
    if (bmrCalc <= 1926) {
      activitySug =
        "Suggestion: Very little or no exercise. Consider starting with light activities like walking or yoga.";
    } else if (bmrCalc > 1926 && bmrCalc <= 2207) {
      activitySug =
        "Suggestion: Light exercise 1-3 times/week. Try incorporating some cardio or strength training.";
    } else if (bmrCalc > 2207 && bmrCalc <= 2351) {
      activitySug =
        "Suggestion: Moderate exercise 3-4 times/week. Aim for a mix of cardio, strength, and flexibility exercises.";
    } else if (bmrCalc > 2351 && bmrCalc <= 2488) {
      activitySug =
        "Suggestion: Regular exercise 4-5 times/week. Include high-intensity interval training (HIIT) or sports.";
    } else if (bmrCalc > 2488 && bmrCalc <= 2796) {
      activitySug =
        "Suggestion: Intense exercise 6-7 times/week. Focus on endurance and strength-building workouts.";
    } else if (bmrCalc > 2796) {
      activitySug =
        "Suggestion: Very intense exercise daily, or a physically demanding job. Ensure you balance intensity with recovery.";
    }

    setSuggestion(activitySug);
    setError("");
  };

  const calculateKCalories = () => {
    let resultPAL;
    if (activity) {
      resultPAL = <div className="resultPAL">{bmr * activity}</div>;
    }
    setPal(resultPAL);
  };

  const handleClose = () => {
    // Reset all form fields
    setGender("");
    setWeight("");
    setAge("");
    setHeightFeet("");
    setHeightInches("");
    setActivity("");
    setBmr("");
    setSuggestion("");
    setPal("");
    setWeightType("");
    setError("");
  
    // Close the modal
    document.getElementById("my_modal_3").close();
  };
  

  return (
    <dialog
      id="my_modal_3"
      className={`modal ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >
      <div className={`modal-content ${isDarkMode ? "dark:bg-gray-800 dark:text-white" : "bg-white text-black"}`}>
        <button
          onClick={handleClose}
          className={`close-button button1 ${isDarkMode ? "hover:bg-gray-400 text-black" : "hover:bg-gray-200 text-black"}`}
        >
          &times;
        </button>
        <h2 className={`heading text-center text-base sm:text-lg md:text-2xl font-semibold uppercase ${isDarkMode ? "text-white" : "text-black"}`}>
          BMR & Daily Calorie Calculator
        </h2>

        {error && (
          <div className="bg-red-600 text-white text-center p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <div className="mb-4 w-full">
          <label className={`block text-lg mb-2 font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Gender</label>
          <div className="flex items-center ">
            <label className="mr-4 flex items-center">
              <input
                type="radio"
                checked={gender === "1"}
                onChange={handleGenderChange}
                className={`mr-2 ${isDarkMode?"text-white":"text-black"}`}
                name="gender"
                value="1"
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={gender === "2"}
                onChange={handleGenderChange}
                className={`mr-2 ${isDarkMode?"text-white":"text-black"}`}
                name="gender"
                value="2"
              />
              Male
            </label>
          </div>
        </div>
        <div className="mb-4 w-full">
          <label className={`block text-lg mb-2 font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Weight</label>
          <div className="flex flex-row md:flex-row md:items-center md:space-x-4">
            <label className="mr-4 flex items-center ">
              <input
                type="radio"
                checked={weightType === "1"}
                onChange={handleWeightTypeChange}
                className={`mr-2 ${isDarkMode? "text-white":"text-black"} `}
                name="weightType"
                value="1"
              />
              Imperial <span className={`text-nowrap ${isDarkMode? "text-white":"text-black"}`}> (In lbs)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={weightType === "2"}
                onChange={handleWeightTypeChange}
                className={`mr-2 ${isDarkMode? "text-white":"text-black"} `}
                name="weightType"
                value="2"
              />
              Metric <span className={`text-nowrap ${isDarkMode? "text-white":"text-black"}`}> (In KG)</span>
            </label>
          </div>
          <input
            type="number"
            value={weight}
            onChange={handleWeightChange}
            name="weight"
            className={`p-2 w-full md:w-1/2 border ${isDarkMode ? "border-gray-700 bg-gray-900 text-white" : "border-gray-300"} rounded mt-2`}
            min="0"
            max="999"
            placeholder="Weight"
          />
        </div>
        <div className="mb-4 w-full">
          <label className={`block text-lg mb-2 font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Height in feet and inches</label>
          <div className="flex flex-row space-x-4">
            <input
              type="number"
              value={heightFeet}
              onChange={handleHeightFeetChange}
              name="heightFeet"
              className={`p-2 w-full h-10 md:w-1/4 border ${isDarkMode ? "border-gray-700 bg-gray-900 text-white" : "border-gray-300"} rounded`}
              min="0"
              max="8"
              placeholder="Feet"
            />
            <input
              type="number"
              value={heightInches}
              onChange={handleHeightInchesChange}
              name="heightInches"
              className={`p-2 w-full h-10 md:w-1/4 border ${isDarkMode ? "border-gray-700 bg-gray-900 text-white" : "border-gray-300"} rounded`}
              min="0"
              max="11"
              placeholder="Inches"
            />
          </div>
        </div>
        <div className="mb-4 w-full">
          <label className={`block text-lg mb-2 font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Age in years</label>
          <input
            type="number"
            value={age}
            onChange={handleAgeChange}
            className={`p-2 w-full md:w-1/2 border ${isDarkMode ? "border-gray-700 bg-gray-900 text-white" : "border-gray-300"} rounded`}
            name="age"
            min="0"
            max="120"
            placeholder="Age"
          />
        </div>
        <button
          type="button"
          onClick={calculateBMR}
          className={`bg-green text-black font-bold p-3 w-full md:w-1/3 rounded-lg uppercase transition duration-300 ease-in-out transform hover:bg-gray-200 hover:scale-105 ${isDarkMode ? "dark:bg-gray-700 dark:text-white" : "text-white"}`}
        >
          Calculate BMR
        </button>

        {bmr && (
          <div className={`bg-blue-100 text-black text-center p-2 mt-4 rounded ${isDarkMode ? "dark:bg-gray-700 dark:text-white" : "bg-blue-100"}`}>
            {bmr}
          </div>
        )}
        {suggestion && (
          <div className={`bg-blue-100 text-black text-center p-2 mt-4 rounded ${isDarkMode ? "dark:bg-gray-700 dark:text-white" : "bg-blue-100"}`}>
            {suggestion}
          </div>
        )}
        <div className="mt-6 w-full">
          <div className="mb-4">
            <label className={`block text-lg mb-2 font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Workout in a Week</label>
            <input
              type="number"
              value={activity}
              onChange={handleActivityChange}
              className={`p-2 w-full md:w-1/2 border ${isDarkMode ? "border-gray-700 bg-gray-900 text-white" : "border-gray-300"} rounded`}
              name="activity"
              placeholder="Number Of Days"
            />
          </div>
          <button
            type="button"
            onClick={calculateKCalories}
            className={`bg-green text-black p-3 w-full md:w-1/3 rounded-lg uppercase font-bold transition duration-300 ease-in-out transform hover:bg-gray-200 hover:scale-105 ${isDarkMode ? "dark:bg-gray-700 dark:text-white" : "text-white"}`}
          >
            Calculate Daily Calories
          </button>
          {pal && (
            <div className={`bg-blue-100 text-black text-center p-2 mt-4 rounded ${isDarkMode ? "dark:bg-gray-700 dark:text-white" : "bg-blue-100"}`}>
              {pal}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}

export default Model1;
