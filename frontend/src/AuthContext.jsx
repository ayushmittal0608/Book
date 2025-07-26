import React, { createContext, useContext, useState } from 'react'

// Create context
const AuthContext = createContext()

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export const useAuth = () => useContext(AuthContext)
