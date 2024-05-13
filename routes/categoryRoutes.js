const express = require('express');
const categoryController = require('./../controller/categoryController');
const authController = require('./../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(authController.restrictTo('admin'), categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(authController.restrictTo('admin'), categoryController.updateCategory)
  .delete(
    authController.restrictTo('admin'),
    categoryController.deleteCategory
  );

module.exports = router;
