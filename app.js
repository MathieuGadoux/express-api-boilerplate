const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const controllers = require('./controllers');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accent, Authorization');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})
app.use(controllers);

// Error handling
app.use((req,res, next) => {
  const error = new Error('Not found');
  error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Database connection
const dbUrl = process.env.DB_URI;

mongoose.connect(dbUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      throw error;
    }
    else {
      console.log('Connected to database!');
    }
  },
);

// Starting the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});