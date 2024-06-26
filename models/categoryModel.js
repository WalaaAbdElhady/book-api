const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is Required'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Description is Required']
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
