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
import LandingPage from '../pages/LandingPage.jsx'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
    <AuthProvider>
    <BookProvider>
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<LandingPage />} />      
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* Protect BookList and BookDetail routes */}
  <Route path="/books"
    element={
      <ProtectedRoute>
        <BookList />
          </ProtectedRoute>
      }
      />

              <Route
                path="/books/:id"
                element={
                  <ProtectedRoute>
                    <BookDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-book"
                element={
                  <ProtectedRoute>
                    <AddBook />
                  </ProtectedRoute>
                }
              />
      </Routes>
    </BrowserRouter>
    </BookProvider>
    </AuthProvider>
    </RecoilRoot>
  </StrictMode>,
)
