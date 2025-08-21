import { memo } from 'react'

import { Outlet } from 'react-router-dom'

import Main from "@/components/Dashboard/layout/Main.jsx";



function DashboardLayout() {

return (

<Main>

  <Outlet />

 </Main>

 )

}


export default memo(DashboardLayout)