const express = require('express');
const bodyParser = require('body-parser'); // optional

const app = express();
const port = 3000;

// In-memory product data (replace with a database later)
let products = [];

// Middleware to parse request body (if using body-parser)
app.use(bodyParser.json());

// Register new product (POST /register)
app.post('/register', (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || !price) {
    return res.status(400).send('Missing required fields');
  }

  const newProduct = {
    id: Math.floor(Math.random() * 10000), // Generate a random ID
    name,
    description,
    price,
  };

  
  products.push(newProduct);
  res.status(201).send(newProduct);
});

// Get all products (GET /products)
app.get('/products', (req, res) => {
  res.json(products);
});

// Get product details by ID (GET /product/:id)
app.get('/product/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.json(product);
});

// Edit product details by ID (PUT/PATCH /product/:id/edit)
app.put('/product/:id/edit', (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const productIndex = products.findIndex(p => p.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }

  products[productIndex] = { ...products[productIndex], ...req.body };
  res.json(products[productIndex]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});