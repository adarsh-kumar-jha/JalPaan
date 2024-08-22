// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// const PORT = process.env.PORT || 3000;

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const dotenv = require("dotenv");
// dotenv.config();
// app.use(bodyParser.json());

// const genAI = new GoogleGenerativeAI("AIzaSyBdOS0f0Ejk4WSbGKxaOkAQDzYBFdRIQCg");


// app.use(express.static('public'));
// console.log("hel");

// app.post('/chat', async (req, res) => {
// async function run() {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});
//     console.log(model);
//   const prompt = req.body.mess;
//   console.log(prompt);

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
//   res.json({ message: text });
// }

// run();

// });


// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });