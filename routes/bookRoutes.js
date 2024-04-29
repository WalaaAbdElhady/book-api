const express = require('express');
const bookController = require('./../controller/bookController');
const commentRouter = require('./../routes/commentRoutes');

const router = express.Router();

router.use('/:bookId/comments', commentRouter);

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
