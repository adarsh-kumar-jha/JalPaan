const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

router.post("/chat", async (req, res) => {
  const { topic, detailLevel } = req.body;

  const prompt = [
    `Provide ${detailLevel.toLowerCase()} information on ${topic}.`,
    "Include recent news, studies, and relevant tips.",
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