const mongoose = require("mongoose");
const Todo = require('./todo');  


var express = require('express');
var path = require('path');
var cors = require('cors')

var app = express();     
                                 

const port = 3000;


app.use(express.json());    
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/home.html'));
});

app.get('/newTodo', (req, res) => {
  res.sendFile(path.join(__dirname + '/newTODO.html'));
});

app.get('/editTodo', (req, res) => {
  res.sendFile(path.join(__dirname + '/editTODO.html'));
});

app.get('/howToEditTodo', (req, res) => {
  res.sendFile(path.join(__dirname + '/howToEditTODO.html'));
});

app.get('/impressum', (req, res) => {
  res.sendFile(path.join(__dirname + '/impressum.html'));
});

// get all TODOs 
app.get('/all', async (req, res, next) => {  
  let todos; 
  try{
    todos = await Todo.find({});                          // find all todos in the db
  }catch(err){
    console.log(err);
  }
  console.log("Fetched all todos");
  res.json(todos);                                        // respond to the http request with all TODOs that have been found
})


// get a single TODO by its id
app.get('/:id', async (req, res, next) => {
  const id = req.params.id; 
  let todo;
  try{
    todo = await Todo.findById(id);                       // find the TODO with the given id in the db
  }catch(err){
    console.log(err);
  }
  res.json(todo);                                         // respond to the http request with the todo
})

// post a new TODO
app.post('/todo', async (req, res, next) => {
  const { description, deadline, progress } = req.body;   // get description etc. from request-body -> screenshot
  const createdTodo = new Todo({
    description,
    deadline,
    progress
  })
  try{
    await createdTodo.save(() => console.log("created todo"));  // save the newly created TODO to the db
  }catch(err){
    console.log(err);
  }
  res.status(201).json(createdTodo);                      // respond to the http request with success (and the created TODO)
})

// update an existing TODO
app.patch('/todo/:id', async (req, res, next) => {
  const id = req.params.id
  let todo;
  try{
    todo = await Todo.findById(id);                       // find the TODO with the given id in the db
  }catch(err){
    console.log(err);
  }
  const { description, deadline, progress } = req.body;   // get description etc. from request-body -> screenshot
  todo.description = description;
  todo.deadline = deadline;
  todo.progress = progress;
  try{
    await todo.save(() => console.log("updated todo"));  // save the updated TODO to the db
  }catch(err){
    console.log(err);
  }
  res.status(204).json(todo);
})  

// delete a TODO by its id
app.delete('/todo/:id', async (req, res, next) => {
  const id = req.params.id;                               // get id from url (z.B. http://localhost:3000/5ecbe9cc719c1e159051d2b8)
  let todo;
  try{
    todo = await Todo.findByIdAndDelete(id, () => console.log("deleted todo"));
  }catch(err){
    console.log(err); 
  }
  res.json({message: "Deleted Successfully"});            // return success to the client
})


//connect to db and start server
mongoose
  .connect(                                                                 // Connect to the db 
    "mongodb+srv://chris:qr16vN1H1C7zShHB@cluster0-qsimx.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to db");
    app.listen(port, () => console.log("Server is running on port 3000"));  // Start the server
  })
  .catch((err) => {
    console.log(err);
  });
  
