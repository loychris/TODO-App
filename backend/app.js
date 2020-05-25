const mongoose = require("mongoose");
const Todo = require('./todo');

var express = require('express');
var path = require('path');
var app = express();

const port = 3000;

// view engine setup

app.use(express.json());

app.get('/', async (req, res, next) => {
  let todos; 
  try{
    todos = await Todo.find({});
  }catch(err){
    console.log(err);
  }
  console.log("Fetched all todos");
  res.json(todos);
})

app.post('/todo', async (req, res, next) => {
  const { description, deadline, progress } = req.body;
  const createdTodo = new Todo({
    description,
    deadline,
    progress
  })
  try{
    await createdTodo.save(  () => console.log("created todo"));
  }catch(err){
    console.log(err);
  }
  res.status(201).json(createdTodo);
})

app.delete('/todo/:id', async (req, res, next) => {
  const id = req.params.id;
  let todo;
  try{
    todo = await Todo.findByIdAndDelete(id, () => console.log("deleted todo"));
  }catch(err){
    console.log(err); 
  }
  res.json({message: "Deleted Successfully"});
})

mongoose
  .connect(
    "mongodb+srv://chris:Uh30ggX40gR86kXU@cluster0-qsimx.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to db");
    app.listen(port, () => console.log("Server is running on port 3000"));
  })
  .catch((err) => {
    console.log(err);
  });
  