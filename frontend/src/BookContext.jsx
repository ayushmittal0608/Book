import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

  // 🔁 Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/api/books");
        setBooks(res.data); // assumes array of books with _id
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };
    fetchBooks();
  }, []);

  // ➕ Add book to backend + state
  const addBook = async (bookData) => {
    try {
      const res = await axios.post("/api/books", bookData);
      setBooks((prev) => [res.data, ...prev]); // API returns saved book with _id
    } catch (err) {
      console.error("Failed to add book:", err);
    }
  };

  return (
    <BookContext.Provider value={{ books, addBook }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  return useContext(BookContext);
}
