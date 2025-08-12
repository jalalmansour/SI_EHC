"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Layout, Menu, Avatar, Dropdown, Badge, Button, Typography } from "antd"
import {
  DashboardOutlined,
  TeamOutlined,
  DollarOutlined,
  BookOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RocketOutlined,
} from "@ant-design/icons"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import type { RootState, AppDispatch } from "../../store"
import { logout } from "../../store/slices/authSlice"
import { fetchBudgetAlerts } from "../../store/slices/budgetSlice"

const { Header, Sider, Content } = Layout
const { Text } = Typography

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)
  const { alerts } = useSelector((state: RootState) => state.budget)

  useEffect(() => {
    if (user?.organizationId) {
      dispatch(fetchBudgetAlerts(user.organizationId))
    }
  }, [dispatch, user?.organizationId])

  const handleLogout = async () => {
    await dispatch(logout())
    router.push("/login")
  }

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Tableau de bord",
    },
    {
      key: "/organization",
      icon: <TeamOutlined />,
      label: "Organigramme",
    },
    {
      key: "/budget",
      icon: <DollarOutlined />,
      label: "Budget",
    },
    {
      key: "/catalog",
      icon: <BookOutlined />,
      label: "Catalogue",
    },
    {
      key: "/calendar",
      icon: <CalendarOutlined />,
      label: "Calendrier",
    },
    {
      key: "/participants",
      icon: <UserOutlined />,
      label: "Participants",
    },
    {
      key: "/requests",
      icon: <FileTextOutlined />,
      label: "Demandes",
    },
    {
      key: "/reports",
      icon: <BarChartOutlined />,
      label: "Rapports",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Paramètres",
    },
  ]

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Mon profil",
      onClick: () => router.push("/profile"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Paramètres",
      onClick: () => router.push("/settings"),
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Se déconnecter",
      onClick: handleLogout,
    },
  ]

  const notificationMenuItems = alerts.slice(0, 5).map((alert, index) => ({
    key: `alert-${index}`,
    label: (
      <div style={{ maxWidth: 250 }}>
        <Text strong>{alert.type === "CRITICAL" ? "🔴" : "🟡"} Budget Alert</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          {alert.message}
        </Text>
      </div>
    ),
  }))

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#0F141E",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #192335",
          }}
        >
          <RocketOutlined style={{ fontSize: 24, color: "#238D94", marginRight: collapsed ? 0 : 8 }} />
          {!collapsed && (
            <Text strong style={{ color: "white", fontSize: 18 }}>
              INGÉNIA
            </Text>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[router.pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          style={{
            background: "#0F141E",
            border: "none",
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Dropdown menu={{ items: notificationMenuItems }} placement="bottomRight" trigger={["click"]}>
              <Badge count={alerts.filter((a) => a.isTriggered).length} size="small">
                <Button type="text" icon={<BellOutlined />} style={{ fontSize: 16 }} />
              </Badge>
            </Dropdown>

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={["click"]}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: 6,
                  transition: "background-color 0.2s",
                }}
              >
                <Avatar size="small" style={{ backgroundColor: "#238D94" }} icon={<UserOutlined />} />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <Text strong style={{ fontSize: 14, lineHeight: 1.2 }}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12, lineHeight: 1.2 }}>
                    {user?.role.name}
                  </Text>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: 24,
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: "calc(100vh - 112px)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
