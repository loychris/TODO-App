var express = require('express');
var path = require('path');
var app = express();

const port = 3000;

// view engine setup

app.use(express.json());

app.get('/', (req, res, next) => {
  res.json({message: "This api is working"})
})

app.listen(3000, () => console.log(`Server is running on port 3000`));