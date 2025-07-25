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
import { AuthProvider } from '../src/AuthContext.jsx'
import ProtectedRoute from '../src/ProtectedRoute.jsx'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
    <AuthProvider>
    <BookProvider>
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<App />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* Protect BookList and BookDetail routes */}
  <Route
    path="/books"
    element={
      
        <BookList />
    
    }
  />

  <Route
    path="/books/:id"
    element={
        <BookDetail />
      
    }
  />

  <Route
    path="/add-book"
    element={
        <AddBook />

    }
  />
</Routes>
    </BrowserRouter>
    </BookProvider>
    </AuthProvider>
    </RecoilRoot>
  </StrictMode>,
)
