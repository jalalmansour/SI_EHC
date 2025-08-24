"use client"

import { lazy, Suspense, useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { setUser } from './redux/slices/authSlice.js'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Spin } from "antd"
import { AppShell } from "./layouts/AppShell.jsx"
import ProtectedRoute from '@/components/common/ProtectedRoute.jsx'
import DashboardLayout from '@/layouts/DashboardLayout/index.jsx'

const LandingPage = lazy(() => import("./pages/LandingPage.jsx"))
const Login = lazy(() => import("./pages/auth/Login.jsx"))
const Register = lazy(() => import("./pages/auth/Register.jsx"))
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword.jsx"))
const DemandeDevis = null // removed: lazy(() => import("./pages/landing/DemandeDevis.jsx"))
const DemandeDevisSuccess = lazy(() => import("./pages/landing/DemandeDevisSuccess.jsx"))
// removed: const DemandeDevisDashboard = lazy(() => import("./pages/landing/DemandeDevisDashboard.jsx"))
const DemandeDevisPreview = lazy(() => import("./pages/landing/DemandeDevisPreview.jsx"))

// Dashboard pages
const DashboardHome = lazy(() => import("./pages/dashboard/Home.jsx"))
const DashboardProfile = lazy(() => import("./pages/dashboard/Profile.jsx"))
const DashboardTables = lazy(() => import("./pages/dashboard/Tables.jsx"))
const DashboardBilling = lazy(() => import("./pages/dashboard/Billing.jsx"))

// RRH pages
const DashboardRRH = lazy(() => import("./pages/rrh/DashboardRRH.jsx"))
const RRHBudgetManagement = lazy(() => import("./pages/rrh/CreationBudgetaire.jsx"))
const RRHOrganizationManagement = lazy(() => import("./pages/rrh/Organisation.jsx"))
const RRHTrainingCatalog = lazy(() => import("./pages/rrh/Recensement.jsx"))
const RRHParticipantManagement = lazy(() => import("./pages/rrh/RecensementBesoin.jsx"))
const RRHReports = lazy(() => import("./pages/rrh/Evaluation.jsx"))
const RRHSettings = lazy(() => import("./pages/rrh/PlanificationExecution.jsx"))

// Employee pages
const EmployeeDashboard = lazy(() => import("./pages/employee/MesFormations.jsx"))
const EmployeeDemandeFormation = lazy(() => import("./pages/employee/DemandeFormation.jsx"))

// Other role pages
const RoleDashboard = lazy(() => import("./pages/dashboard/RoleDashboard.jsx"))

const TestRoleRouting = lazy(() => import("./pages/TestRoleRouting.jsx"))
const NotFound = lazy(() => import("./pages/NotFound.jsx"))

export default function App() {
  // No internal React gate; index.html handles the first-frame loader
  const dispatch = useDispatch()
  useEffect(() => {
    // As a backup, signal readiness if not already hidden
    window.dispatchEvent(new Event('app-ready'))
    // Rehydrate user from localStorage for refresh/first load
    try {
      const token = localStorage.getItem('token')
      const userJson = localStorage.getItem('user')
      if (token && userJson) {
        const parsed = JSON.parse(userJson)
        if (parsed) dispatch(setUser(parsed))
      }
    } catch (e) {
      // ignore
    }
  }, [])

  console.log("Rendering main app with routing")
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
            <Route path="/register" element={<Navigate to="/demande-devis" replace />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Demande de Devis Routes */}
            <Route path="/demande-devis" element={<Register />} />
            <Route path="/demande-devis/success" element={<DemandeDevisSuccess />} />
            {/* removed: DemandeDevisDashboard route */}
            <Route path="/demande-devis/preview" element={<DemandeDevisPreview />} />

            {/* Protected Dashboard routes */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Default dashboard - will redirect based on role */}
              <Route index element={<DashboardHome />} />
              
              {/* RRH Routes */}
              <Route path="rrh" element={<DashboardRRH />} />
              <Route path="rrh/budget-management" element={<RRHBudgetManagement />} />
              <Route path="rrh/organization-management" element={<RRHOrganizationManagement />} />
              <Route path="rrh/training-catalog" element={<RRHTrainingCatalog />} />
              <Route path="rrh/participant-management" element={<RRHParticipantManagement />} />
              <Route path="rrh/reports" element={<RRHReports />} />
              <Route path="rrh/settings" element={<RRHSettings />} />
              
              {/* Employee Routes */}
              <Route path="employee" element={<EmployeeDashboard />} />
              <Route path="employee/mes-formations" element={<EmployeeDashboard />} />
              <Route path="employee/demande-formation" element={<EmployeeDemandeFormation />} />
              
              {/* Other Role Routes */}
              <Route path="rf" element={<RoleDashboard />} />
              <Route path="manager" element={<RoleDashboard />} />
              <Route path="formateur" element={<RoleDashboard />} />
              <Route path="admin" element={<RoleDashboard />} />
              <Route path="superadmin" element={<RoleDashboard />} />
              
              {/* Common routes */}
              <Route path="profile" element={<DashboardProfile />} />
              <Route path="tables" element={<DashboardTables />} />
              <Route path="billing" element={<DashboardBilling />} />
              
              {/* Fallback for unknown routes */}
              <Route path="*" element={<DashboardHome />} />
            </Route>

            {/* Test route */}
            <Route path="/test-role-routing" element={<TestRoleRouting />} />
            
            {/* Legacy fallbacks */}
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppShell>
    </BrowserRouter>
  )
}
