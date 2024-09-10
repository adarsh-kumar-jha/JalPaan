const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 6001;

const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const jwt = require('jsonwebtoken');
const recipeStreamRoutes = require("./api/routes/recipeStreamRoutes");
const newsRoutes=require("./api/routes/news");


// CORS options
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-client.ok1xabi.mongodb.net/demo-foodi-client?retryWrites=true&w=majority&appName=demo-foodi-client`)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// jwt authentication

// jwt related api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

// import routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartsRoutes = require("./api/routes/cartRoutes");
const usersRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
const adminStats = require('./api/routes/adminStats');
const orderStats = require('./api/routes/orderStats');
const checkoutRoutes = require('./api/routes/checkout');

app.use("/menu", menuRoutes);
app.use("/carts", cartsRoutes);
app.use("/users", usersRoutes);
app.use("/payments", paymentRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/admin-stats', adminStats);
app.use('/order-stats', orderStats);

// Add recipe stream route
app.use('/recipeStream', recipeStreamRoutes);
app.use('/news',newsRoutes);

// payment methods routes
const verifyToken = require('./api/middlewares/verifyToken');

app.post("/create-payment-intent", verifyToken, async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent 
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => {
  res.send("Foodi Server is Running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


