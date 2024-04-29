const Book = require('./../models/bookModel');
const Comment = require('./../models/commentModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books
    }
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next('No book found with that ID');
  }

  res.status(200).json({
    status: 'success',
    data: {
      book
    }
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      book: newBook
    }
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next('No book found with that ID');
  }

  const doc = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      doc
    }
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next('No book found with that ID');
  }

  await Book.findByIdAndDelete(req.params.id);
  await Comment.deleteMany({ book: book.id });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
