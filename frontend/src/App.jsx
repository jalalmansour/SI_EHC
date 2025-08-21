"use client"

import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Spin } from "antd"
import AppShell from "./layouts/AppShell.jsx";
import AuthenticatedShell from "./layouts/AuthenticatedShell.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx"
const DashboardRRH = lazy(() => import("./pages/rrh/DashboardRRH.jsx"))

const LandingPage = lazy(() => import("./pages/LandingPage.jsx"))
const Login = lazy(() => import("./pages/auth/Login.jsx"))
const Register = lazy(() => import("./pages/auth/Register.jsx"))
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword.jsx"))
const DemandeDevis = lazy(() => import("./pages/landing/DemandeDevis.jsx"))
const DemandeDevisSuccess = lazy(() => import("./pages/landing/DemandeDevisSuccess.jsx"))
const DemandeDevisDashboard = lazy(() => import("./pages/landing/DemandeDevisDashboard.jsx"))
const DemandeDevisPreview = lazy(() => import("./pages/landing/DemandeDevisPreview.jsx"))



const NotFound = lazy(() => import("./pages/NotFound.jsx"))

export default function App() {
  useEffect(() => {
    // As a backup, signal readiness if not already hidden
    window.dispatchEvent(new Event('app-ready'))
  }, [])

  return (
    <BrowserRouter>
      <AppShell>
        <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}><Spin size="large" /></div>}>
       
          <Routes>
              <Route path="/dashboard/rrh" element={<DashboardShell><DashboardRRH /></DashboardShell>} />
               {/* Public - LandingPage en premier */}
            <Route index element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
              
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Demande de Devis Routes */}
            <Route path="/demande-devis" element={<DemandeDevis />} />
            <Route path="/demande-devis/success" element={<DemandeDevisSuccess />} />
            <Route path="/demande-devis/dashboard" element={<DemandeDevisDashboard />} />
            <Route path="/demande-devis/preview" element={<DemandeDevisPreview />} />

            {/* Protected Dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AuthenticatedShell />
              </ProtectedRoute>
            }> 
              
              
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
