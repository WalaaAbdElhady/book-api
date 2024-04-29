const Category = require('./../models/categoryModel');
const Book = require('./../models/bookModel');
const catchAsync = require('./../utils/catchAsync');

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
    return next('No category found with that ID');
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
    return next('No category found with that ID');
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
    return next('No category found with that ID');
  }

  await Category.findByIdAndDelete(req.params.id);
  await Book.deleteMany({ category: category.id });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
