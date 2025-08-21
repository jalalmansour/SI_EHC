"use client"

import { Outlet } from "react-router-dom"
import DashboardLayout from "../components/layouts/dashboard-layout.jsx"

export function AuthenticatedShell() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}


