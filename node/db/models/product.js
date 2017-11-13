const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: false
  },
  designer: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: false
  },
  category: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: false
  },
  price: {
    type: String,
    required: true,
    minlength: 4,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: false
  },
  size: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  },
  stock: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = {Product};
