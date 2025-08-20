"use client"

import { lazy, Suspense, useState, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Spin } from "antd"
import { AppShell } from "./layouts/AppShell.jsx"
import { DashboardShell } from "./layouts/DashboardShell.jsx"
import { AuthShell } from "./layouts/AuthShell.jsx"

const LandingPage = lazy(() => import("./pages/LandingPage.jsx"))

const Overview = lazy(() => import("./pages/dashboard/Overview.jsx"))
const Reports = lazy(() => import("./pages/dashboard/Reports.jsx"))
const Library = lazy(() => import("./pages/dashboard/Library.jsx"))
const Training = lazy(() => import("./pages/dashboard/Training.jsx"))
const Profile = lazy(() => import("./pages/Profile.jsx"))
const NotFound = lazy(() => import("./pages/NotFound.jsx"))


import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"

export default function App() {
  // No internal React gate; index.html handles the first-frame loader
  useEffect(() => {
    // As a backup, signal readiness if not already hidden
    window.dispatchEvent(new Event('app-ready'))
  }, [])

  console.log("Rendering main app with routing")
  return (
    <BrowserRouter>
      <AppShell>
        <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}><Spin size="large" /></div>}>
          <Routes>
            {/* Public */}
            <Route element={<AuthShell />}> 
              <Route index element={<LandingPage />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            {/* Protected Dashboard */}
            <Route path="/dashboard" element={<DashboardShell />}> 
              <Route index element={<Overview />} />
              <Route path="reports" element={<Reports />} />
              <Route path="library" element={<Library />} />
              <Route path="training" element={<Training />} />
              <Route path="profile" element={<Profile />} />
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
