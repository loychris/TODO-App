const mongoose = require("mongoose");
const Todo = require('./todo');  


var express = require('express');
var path = require('path');
var cors = require('cors');
const multiparty = require('multiparty');


var app = express();     
                       
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

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
    todos = await Todo.find({});                          
  }catch(err){
    console.log(err);
  }
  console.log("Fetched all todos");
  res.json(todos);                                        
})


// get a single TODO by its id
app.get('/todo/:id', async (req, res, next) => {
  const id = req.params.id; 
  let todo;
  try{
    todo = await Todo.findById(id);                       
  }catch(err){
    console.log(err);
  }
  res.json(todo);                                         
})

// post a new TODO
app.post('/todo', async (req, res, next) => {

  console.log("body", req.body);
  const { description, deadline, progress, subTasks } = req.body;   
  const createdTodo = new Todo({
    description,
    deadline,
    progress,
    subTasks
  })
  console.log(createdTodo);
  try{
    await createdTodo.save(() => console.log("created todo"));  
  }catch(err){
    console.log(err);
  }
  res.redirect('/');                      
})

// update an existing TODO
app.patch('/todo/:id', async (req, res, next) => {
  const id = req.params.id
  let todo;
  try{
    todo = await Todo.findById(id);                       
  }catch(err){
    console.log(err);
  }
  todo = {
    description,
    deadline,
    progress,
    subTasks
  }
  try{
    todo.save()
  }catch(err){
    console.log(err);
  }
  res.status(204).json(todo);
})  

// delete a TODO by its id
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

app.post("/printrequest", (req, res, next) => {
  console.log(req.body);
})

//connect to db and start server
mongoose
  .connect(                                                
    "mongodb+srv://chris:qr16vN1H1C7zShHB@cluster0-qsimx.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to db");
    app.listen(port, () => console.log("Server is running on port 3000"));  
  })
  .catch((err) => {
    console.log(err);
  });
  
