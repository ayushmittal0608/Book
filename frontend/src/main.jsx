import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import BookDetail from '../pages/BookDetail.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import BookList from '../pages/BookList.jsx'
import App from './App.jsx'
import AddBook from '../pages/AddBook.jsx'
import { BookProvider } from '../src/BookContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
    </BookProvider>
  </StrictMode>,
)
