const express = require('express');
const router = express.Router();

// Sample data - replace this with your database integration
let items = [];

// Get all items
router.get('/AllItems', (req, res) => {
  res.json(items);
});

// Get single item by ID
// Replace ':id' with id of an existing item
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const item = items.find(item => item.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// Create a new item
router.post('/', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item by ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  items[index] = updatedItem;
  res.json(updatedItem);
});

// Delete an item by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  items.splice(index, 1);
  res.json({ message: 'Item deleted' });
});

module.exports = router;