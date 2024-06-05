const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  Purchase_price: {
    type: Number,
    required: [true, 'Purchase_price is required.'],
  },
  sale_price: {
    type: Number,
    required: [true, 'sale_price is required.'],
  },
  
  CGST: {
    type: String,
    required: [true, 'CGST is required.'],
  },
  SGST: {
    type: String,
    required: [true, 'SGST is required.'],
  },
  stock: {
    type: String,
    required: [true, 'Stock is required.'],
  },
  image: {
    type: String,
    required: [true, 'Image is required.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
