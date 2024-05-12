const Category = require('./../models/categoryModel');
const Book = require('./../models/bookModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories
    }
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      category: newCategory
    }
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  const doc = await Category.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  await Category.findByIdAndDelete(req.params.id);
  await Book.deleteMany({ category: category.id });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
