"use client"

import { Outlet } from "react-router-dom"
import DashboardLayout from "../components/layouts/dashboard-layout.jsx"

export function DashboardShell() {
  return (
    <DashboardLayout userRole="user" userName="Utilisateur">
      <Outlet />
    </DashboardLayout>
  )
}


