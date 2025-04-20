require('dotenv').config();
const mongoose = require('mongoose');
//MONGO_URI_ATLAS=mongodb+srv://todoapp:1212@cluster0.37hyc.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0
const connection = mongoose
  .createConnection(process.env.MONGO_URI_ATLAS)
  .on('open', () => {
    console.log('MongoDB Connected');
  })
  .on('error', (err) => {
    console.log('MongoDB Connection error', err);
  });

module.exports = connection;
