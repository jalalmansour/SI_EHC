"use client"

import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Main from '@/components/Dashbord/layout/Main.jsx'
import RoleBasedRoute from '@/components/common/RoleBasedRoute.jsx'

function DashboardLayout() {
  return (
    <RoleBasedRoute>
      <Main>
        <Outlet />
      </Main>
    </RoleBasedRoute>
  )
}

export default memo(DashboardLayout)


