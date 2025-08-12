"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme")
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: "#238D94",
      secondary: "#0F141E",
      text: "#192335",
      background: isDarkMode ? "#0F141E" : "#F8FAFC",
      surface: isDarkMode ? "#192335" : "#FFFFFF",
    },
  }

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
