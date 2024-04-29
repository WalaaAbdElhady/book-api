const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is Required']
    },
    author: {
      type: String,
      required: [true, 'Author is Required']
    },
    description: {
      type: String,
      required: [true, 'Description is Required']
    },
    publishedDate: {
      type: Date,
      required: [true, 'publishedDate is Required']
    },
    pageCount: {
      type: Number,
      required: [true, 'pageCount is Required']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is Required']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
