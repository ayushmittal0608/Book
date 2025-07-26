const express = require("express");
const Book = require("../models/Book.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// GET book by ID (with comments)
router.get("/:id/comments",  async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST comment to a book
router.post("/:id/comments", async (req, res) => {
  const { user, content, timestamp, rating } = req.body;
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.comments.unshift({ user, content, timestamp, rating: Number(rating) });
    await book.save();

    res.status(200).json({ message: "Comment added successfully", comments: book.comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// bookRoutes.js
router.post("/", async (req, res) => {
  try {
    const { title, author, description, cover, type } = req.body;
    const newBook = new Book({ title, author, description, cover, type });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Failed to add book:", err.message);
    res.status(500).json({ error: "Failed to add book" });
  }
});


router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

module.exports = router;
