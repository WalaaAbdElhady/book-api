const Comment = require('./../models/commentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.setBookUserIds = (req, res, next) => {
  // Allow nested routes
  // console.log(req.params.bookId);
  // console.log(req.user.id);
  if (!req.body.book) req.body.book = req.params.bookId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();
  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: {
      comments
    }
  });
});

exports.getComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new AppError('No Comment found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      comment
    }
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      comment: newComment
    }
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError('No comment found with that ID', 404));
  }
  // Check if The Comment Belong To User
  if (comment.user.toString() !== req.user.id.toString()) {
    // console.log(comment.user.toString());
    // console.log(req.user.id.toString());
    return next(
      new AppError('You are not allowed to update this comment', 403)
    );
  }

  const doc = await Comment.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError('No comment found with that ID', 404));
  }
  // Check if The Comment Belong To User
  if (comment.user.toString() !== req.user.id.toString()) {
    return next(
      new AppError('You are not allowed to delete this comment', 403)
    );
  }

  await Comment.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
