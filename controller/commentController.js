const Comment = require('./../models/commentModel');
const catchAsync = require('./../utils/catchAsync');

exports.setBookId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.book) req.body.book = req.params.bookId;
  // console.log(req.params.bookId);
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
    return next('No Comment found with that ID');
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
    return next('No comment found with that ID');
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
    return next('No comment found with that ID');
  }

  await Comment.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
