// Importing required libraries
const express = require('express');
const bodyParser = require('body-parser');

// Creating an Express Application
const app = express();
const PORT = process.env.PORT || 3000;

//Using body-parser middleware for JSON parsing
app.use(bodyParser.json());

//Initializing an empty array to store products
let products = [];
let getRequestCount = 0;
let postRequestCount = 0;

// Middleware for logging requestss
app.use((req, res, next) => {
  console.log(`> ${req.method} ${req.originalUrl}: Request received`);
  next();
});

// Defining GET endpoint to retrieve products
app.get('/products', (req, res) => {
  console.log(`< ${req.method} ${req.originalUrl}: Sending response`);
  getRequestCount++;
  res.json(products);
});

// Defining POST endpoint to store products
app.post('/products', (req, res) => {
  console.log(`< ${req.method} ${req.originalUrl}: Request received`);
  const product = req.body;
  products.push(product);
  postRequestCount++;
  res.status(201).json({ message: 'Product stored successfully' });
});

// Defining DELETE endpoint to delete all products
app.delete('/products', (req, res) => {
  console.log(`< ${req.method} ${req.originalUrl}: Request received`);
  products = [];
  res.json({ message: 'All products deleted' });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is listening at http://127.0.0.1:${PORT}`);
  console.log('Endpoints:');
  console.log(`http://127.0.0.1:${PORT}/products method: GET, POST`);
});

// Logging request counters on every request
app.use((req, res, next) => {
  console.log(`Processed Request Count --> GET: ${getRequestCount}, POST: ${postRequestCount}`);
  next();
});
