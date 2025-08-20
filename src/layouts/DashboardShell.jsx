"use client"

import { Outlet, Navigate, useLocation } from "react-router-dom"
import { Spin } from "antd"
import { useAuth } from "../contexts/AuthContext.jsx"
import DashboardLayout from "../components/layouts/dashboard-layout.jsx"

export function DashboardShell() {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  const userRole = user?.role || "user"
  const userName = user?.name || "Utilisateur"

  return (
    <DashboardLayout userRole={userRole} userName={userName}>
      <Outlet />
    </DashboardLayout>
  )
}


