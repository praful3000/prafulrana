const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let products = [];
let getRequestCount = 0;
let postRequestCount = 0;

// Logging middleware
app.use((req, res, next) => {
  console.log(`> ${req.method} ${req.originalUrl}: received request`);
  next();
});

// Define GET endpoint to retrieve images
app.get('/products', (req, res) => {
  console.log(`< ${req.method} ${req.originalUrl}: sending response`);
  getRequestCount++;
  res.json(products);
});

// Define POST endpoint to store images
app.post('/products', (req, res) => {
  console.log(`< ${req.method} ${req.originalUrl}: received request`);
  const image = req.body;
  products.push(image);
  postRequestCount++;
  res.status(201).json({ message: 'Image stored successfully' });
});

// Define DELETE endpoint to delete all images
app.delete('/products', (req, res) => {
  console.log(`< ${req.method} ${req.originalUrl}: received request`);
  products = [];
  res.json({ message: 'All images deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening at http://127.0.0.1:${PORT}`);
  console.log('Endpoints:');
  console.log(`http://127.0.0.1:${PORT}/products method: GET, POST`);
});

// Log request counters on every request
app.use((req, res, next) => {
  console.log(`Processed Request Count--> Get: ${getRequestCount}, Post: ${postRequestCount}`);
  next();
});