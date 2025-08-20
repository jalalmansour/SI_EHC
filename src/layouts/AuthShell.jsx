"use client"

import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext.jsx"

export function AuthShell() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}


