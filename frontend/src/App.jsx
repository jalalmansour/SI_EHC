"use client"

import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Spin } from "antd"
import { AppShell } from "./layouts/AppShell.jsx"
import { AuthenticatedShell } from "./layouts/AuthenticatedShell.jsx"
import ProtectedRoute from "./components/common/security/ProtectedRoute.jsx"
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard.jsx";
import RRHDashboard from "./pages/rrh/RRHDashboard.jsx";

const LandingPage = lazy(() => import("./pages/home/LandingPage.jsx"))
const Login = lazy(() => import("./pages/auth/Login.jsx"))
const Register = lazy(() => import("./pages/auth/Register.jsx"))
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword.jsx"))

const NotFound = lazy(() => import("./pages/NotFound.jsx"))

export default function App() {
  useEffect(() => {
    // As a backup, signal readiness if not already hidden
    window.dispatchEvent(new Event('app-ready'))
  }, [])

    const ProtectedLayout = () => (
        <ProtectedRoute>
            <AuthenticatedShell />
        </ProtectedRoute>
    );
  return (
    <BrowserRouter>
      <AppShell>
        <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}><Spin size="large" /></div>}>
          <Routes>
            {/* Public */}
            <Route index element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Dashboard */}
            <Route element={<ProtectedLayout/>}>
              <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
              <Route path="/rrh/dashboard" element={<RRHDashboard />} />
            </Route>

            {/* Legacy fallbacks */}
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppShell>
    </BrowserRouter>
  )
}
