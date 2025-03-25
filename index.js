const express = require('express');
const { resolve } = require('path');
const dotenv=require("dotenv").config();
const mongoose=require("mongoose");
const model=require("./schema");

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, async() => {

 await mongoose.connect(process.env.MongoDB_URL);
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/menu", async (req,res) => {
   try {
    return res.status(200).send({msg:"here are the menu details"});
   } catch (error) {
    return res.status(500).send({msg:"Something wrong on server side"});
   }
});

app.post("/menuItems", async(req, res)=>{
  try{
    const {name, description, price} = req.body;
    if(!name || !description || !price){
      return res.status(401).send({msg:"Please provide all details"});
    }

    const items = new model({name, description, price});
    await items.save();
    return res.status(201).send({msg: "Item added successfully"});
  }catch(error){
    console.log(error);
    return res.status(500).send({msg:"Something went wrong"});
  }
});

// app.post('/menu', async (req, res) => {
//   try {
//     const { name, description,price} = req.body;

//     if (!name || !price || !category) {
//       return res.status(400).json({ error: 'Name, price, and description are required.' });
//     }

//     const newMenuItem = new Menu({ name, price, description});
//     const savedMenuItem = await newMenuItem.save();

//     res.status(201).json({ message: 'Menu item created successfully!', data: savedMenuItem });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });