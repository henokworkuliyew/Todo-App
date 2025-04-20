const express = require("express"); 
const bodyParser = require("body-parser") 
const UserRoute = require("./routes/user.routes"); 
const ToDoRoute = require('./routes/todo.routes'); 
const app = express(); 
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json()) 
app.use("/",UserRoute); 
app.use("/",ToDoRoute); 
 
module.exports = app; 