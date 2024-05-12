const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Book is Required']
  },
  text: {
    type: String,
    required: [true, 'Comment is Required']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
