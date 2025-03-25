const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const dotenv = require("dotenv").config();
const MenuItem = require("./schema"); // Correct model import


const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URL);
    console.log(`Example app listening at http://localhost:${port}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});

app.post("/menuItems", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      return res.status(400).send({ msg: "Please provide all details" });
    }

    const item = new MenuItem({ name, description, price });
    await item.save();
    return res.status(201).send({ msg: "Item added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Something went wrong" });
  }
});

app.get('/item', async (req, res) => {
  try {
      const items = await MenuItem.find();
      return res.status(200).json(items);
  } catch (error) {
      console.error("Error fetching menu:", error);
      return res.status(500).json({ msg: "Internal server error" });
  }
});