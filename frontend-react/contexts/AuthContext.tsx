"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface UserData {
  nome: string
  tipo: string
}

interface AuthContextType {
  user: UserData | null
  login: (userData: UserData) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    // Verifica se há dados do usuário no localStorage ao carregar
    const userData = localStorage.getItem("concifa_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const login = (userData: UserData) => {
    localStorage.setItem("concifa_user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("concifa_user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
} 