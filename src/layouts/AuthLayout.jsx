"use client"

import React, { memo } from "react"
import { Layout, Grid } from "antd"

const { Content } = Layout
const { useBreakpoint } = Grid

const AuthLayout = memo(function AuthLayout({ left, children }) {
  const screens = useBreakpoint()
  const isDesktop = screens.lg

  return (
    <Layout style={{ minHeight: "100vh", background: "linear-gradient(120deg,#eef2ff 0%,#f0f9ff 50%,#f7fee7 100%)" }}>
      <Content style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: 0 }}>
        {isDesktop && (
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px" }}>
            {left}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: isDesktop ? "64px" : "24px" }}>
          {children}
        </div>
      </Content>
    </Layout>
  )
})

export default AuthLayout
