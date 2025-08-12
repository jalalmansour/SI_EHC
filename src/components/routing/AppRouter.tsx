"use client"

import type React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import ProtectedRoute from "../auth/ProtectedRoute"
import AdvancedAnalytics from "../analytics/AdvancedAnalytics"
import APIDocumentation from "../docs/APIDocumentation"
import SecurityDashboard from "../../pages/SecurityDashboard"
import LoginPage from "../../pages/LoginPage"
import DashboardPage from "../../pages/DashboardPage"
import CatalogPage from "../../pages/CatalogPage"

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/docs" element={<APIDocumentation />} />

      {/* Routes protégées */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/catalog"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CatalogPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute requiredRoles={["ADMIN", "RRH"]}>
            <DashboardLayout>
              <AdvancedAnalytics />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/security"
        element={
          <ProtectedRoute requiredRoles={["ADMIN"]}>
            <DashboardLayout>
              <SecurityDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Route par défaut */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRouter
