import React, { createContext, useContext, useState } from "react"

const initialBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/covers/gatsby.jpg",
    description: "A classic novel set in the Roaring Twenties.",
    type: "borrow"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    cover: "/covers/1984.jpg",
    description: "A dystopian novel about totalitarianism.",
    type: "have"
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/covers/gatsby.jpg",
    description: "A classic novel set in the Roaring Twenties.",
    type: "borrow"
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    cover: "/covers/1984.jpg",
    description: "A dystopian novel about totalitarianism.",
    type: "have"
  },
  {
    id: 5,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/covers/gatsby.jpg",
    description: "A classic novel set in the Roaring Twenties.",
    type: "borrow"
  },
  {
    id: 6,
    title: "1984",
    author: "George Orwell",
    cover: "/covers/1984.jpg",
    description: "A dystopian novel about totalitarianism.",
    type: "have"
  },
  {
    id: 7,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/covers/gatsby.jpg",
    description: "A classic novel set in the Roaring Twenties.",
    type: "borrow"
  },
  {
    id: 8,
    title: "1984",
    author: "George Orwell",
    cover: "/covers/1984.jpg",
    description: "A dystopian novel about totalitarianism.",
    type: "have"
  },
  // Add more book objects as needed
]

const BookContext = createContext()

export function BookProvider({ children }) {
  const [books, setBooks] = useState(initialBooks)
  const addBook = (book) => setBooks([book, ...books])
  return (
    <BookContext.Provider value={{ books, addBook }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  return useContext(BookContext)
}