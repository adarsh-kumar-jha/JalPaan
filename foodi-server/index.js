const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config()


// middleware
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose
// jhaadarsh234      
// WhT899jcQkONtlWv

// mongoose
//   .connect(
//     `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@domo-foodi-client.eqs1v9d.mongodb.net/demo-foodi-client?retryWrites=true&w=majority`
//   )
  // .then(
  //   console.log("MongoDB Connected Successfully!")
  // )
  // .catch((error) => console.log("Error connecting to MongoDB", error));


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi-client-cluster.qlohahw.mongodb.net/?retryWrites=true&w=majority&appName=foodi-client-cluster`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  const menus = "menus"; // Define the variable "menus"

  try {
    await client.connect();
    // database and collections
    const menuCollections = client.db("demo-foodi-client").collection(menus);
    const cartCollections = client.db("demo-foodi-client").collection("cartItems");
    // all menu items operation
    app.get("/menu", async (req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result);
    });

    //all carts operations

    // posting carts to db
    app.post('/carts', async(req, res) => {
        const cartItem = req.body;
        const result = await cartCollections.insertOne(cartItem);
          res.send(result);
      })
     


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


  // // jwt authentication
  // app.post('/jwt', async(req, res) => {
  //   const user = req.body;
  //   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
  //     expiresIn: '1hr'
  //   })
  //   res.send({token});
  // })


//   import routes here
// const menuRoutes = require('./api/routes/menuRoutes');
// const cartRoutes = require('./api/routes/cartRoutes');
// const userRoutes = require('./api/routes/userRoutes')
// app.use('/menu', menuRoutes)
// app.use('/carts', cartRoutes);
// app.use('/users', userRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
