// models/Book.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: String,
  content: String,
  timestamp: String,
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  cover: String,
  type: String,
  comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
