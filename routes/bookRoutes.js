const express = require('express');
const bookController = require('./../controller/bookController');
const commentRouter = require('./../routes/commentRoutes');
const authController = require('./../controller/authController');

const router = express.Router();

router.use('/:bookId/comments', commentRouter);

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(authController.restrictTo('admin'), bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(authController.restrictTo('admin'), bookController.updateBook)
  .delete(authController.restrictTo('admin'), bookController.deleteBook);

module.exports = router;
