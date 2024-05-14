const express = require('express');
const bookController = require('./../controller/bookController');
const commentRouter = require('./../routes/commentRoutes');
const authController = require('./../controller/authController');

const router = express.Router();

router.use('/:bookId/comments', commentRouter);
router.use(authController.protect);
router
  .route('/')
  .get(bookController.getAllBooks)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    bookController.createBook
  );

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    bookController.updateBook
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    bookController.deleteBook
  );

module.exports = router;
