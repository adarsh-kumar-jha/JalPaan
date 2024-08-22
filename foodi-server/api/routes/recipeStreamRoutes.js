const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

router.post("/chat", async (req, res) => {
  const { ingredients, mealType, cuisine, cookingTime, complexity } = req.body;

  const prompt = [
    "Generate a recipe that incorporates the following details:",
    `Ingredients: ${ingredients}`, // List of ingredients provided by the user
    `Meal Type: ${mealType}`, // Type of meal (e.g., breakfast, lunch, dinner)
    `Cuisine Preference: ${cuisine}`, // Type of cuisine (e.g., Italian, Chinese)
    `Cooking Time: ${cookingTime}`, // Time available for cooking (e.g., 30 minutes)
    `Complexity: ${complexity}`, // Complexity level (e.g., easy, medium, hard)
    "Please provide a detailed recipe, including steps for preparation and cooking. Only use the ingredients provided.",
    "The recipe should highlight the fresh and vibrant flavors of the ingredients.",
    "Also, give the recipe a suitable name in its local language based on the cuisine preference.",
  ].join(" ");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.json({ message: text });

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    res.status(500).send("Error fetching data from Gemini API.");
  }
  
});

module.exports = router;
