"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "antd"
import { Provider } from "react-redux"
import store from "./redux/store"

// Import components
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardWelcome from "./pages/DashboardWelcome"
import DashboardRRHPage from "./pages/DashboardRRHPage"
import DashboardRFPage from "./pages/DashboardRFPage"
import DashboardManagerPage from "./pages/DashboardManagerPage"
import DashboardEmployeePage from "./pages/DashboardEmployeePage"
import DashboardOrganismePage from "./pages/DashboardOrganismePage"
import CreationBudgetaire from "./pages/rrh/CreationBudgetaire"
import RecensementBesoin from "./pages/rrh/RecensementBesoin"
import PlanificationExecution from "./pages/rrh/PlanificationExecution"
import Evaluation from "./pages/rrh/Evaluation"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import RoleSidebar from "./components/layout/RoleSidebar"

// Import styles
import "./App.css"
import "./index.css"

const { Content } = Layout

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState("RRH") // Default role for demo

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />
  }

  // Dashboard Layout Component
  const DashboardLayout = ({ children }) => (
    <Layout style={{ minHeight: "100vh" }}>
      <RoleSidebar userRole={userRole} collapsed={collapsed} onCollapse={handleCollapse} />
      <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: "margin-left 0.2s" }}>
        <Content style={{ background: "#f0f2f5" }}>{children}</Content>
      </Layout>
    </Layout>
  )

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage onLogin={setIsAuthenticated} onRoleChange={setUserRole} />} />
            <Route path="/register" element={<SignupPage />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardWelcome />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* RRH Routes */}
            <Route
              path="/dashboard-rrh"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardRRHPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/creation-budgetaire"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CreationBudgetaire />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recensement"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <RecensementBesoin />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/planification-execution"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PlanificationExecution />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/evaluation"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Evaluation />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Other Role Routes */}
            <Route
              path="/dashboard-rf"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardRFPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-manager"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardManagerPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-employee"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardEmployeePage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-organisme"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardOrganismePage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Profile Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProfilePage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <SettingsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
