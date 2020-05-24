const mongoose = require("mongoose");
const Todo = require('./todo');

var express = require('express');
var path = require('path');
var app = express();

const port = 3000;

// view engine setup

app.use(express.json());

app.get('/', (req, res, next) => {
  res.json({message: "This api is working"})
})

app.post('/todo', async (req, res, next) => {
  const { description, deadline, progress } = req.body;
  const createdTodo = new Todo({
    description,
    deadline,
    progress
  })
  try{
    await createdTodo.save();
  }catch(err){
    console.log(err);
  }
  res.status(201).json(createdTodo);
})

mongoose
  .connect(
    "mongodb+srv://chris:eKMMU5IkPnP2BSDo@cluster0-qsimx.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to db");
    app.listen(port, () => console.log("Server is running on port 3000"));
  })
  .catch((err) => {
    console.log(err);
  });
  