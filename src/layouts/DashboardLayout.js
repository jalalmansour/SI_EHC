"use client"

import { useState, useEffect } from "react"
import { Layout, Menu, Avatar, Dropdown, Badge, Button, Typography } from "antd"
import {
  DashboardOutlined,
  BookOutlined,
  DollarOutlined,
  FileTextOutlined,
  TeamOutlined,
  TrophyOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  RocketOutlined,
} from "@ant-design/icons"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { logoutThunk } from "../redux/thunks/authThunks"
import { fetchBudgetAlertsThunk } from "../redux/thunks/budgetThunks"

const { Header, Sider, Content } = Layout
const { Text } = Typography

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
  const { alerts } = useSelector((state) => state.budget)

  useEffect(() => {
    if (user?.organizationId) {
      dispatch(fetchBudgetAlertsThunk(user.organizationId))
    }
  }, [dispatch, user?.organizationId])

  const handleLogout = async () => {
    await dispatch(logoutThunk())
    navigate("/login")
  }

  // Menu items avec icônes et labels correspondant à l'interface
  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/catalog",
      icon: <BookOutlined />,
      label: "Catalogue de formation",
    },
    {
      key: "/budget",
      icon: <DollarOutlined />,
      label: "Budget de formation",
    },
    {
      key: "/requests",
      icon: <FileTextOutlined />,
      label: "Demandes non planifiées",
    },
    {
      key: "/participants",
      icon: <TeamOutlined />,
      label: "Affectation des participants",
    },
    {
      key: "/evaluations",
      icon: <TrophyOutlined />,
      label: "Évaluations & Quizz",
    },
    {
      key: "/certifications",
      icon: <SafetyCertificateOutlined />,
      label: "Certifications",
    },
    {
      key: "/reports",
      icon: <BarChartOutlined />,
      label: "Rapport & Historique",
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
      onClick: () => navigate("/profile"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Paramètres",
      onClick: () => navigate("/settings"),
    },
    {
      type: "divider",
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
        <Text strong>{alert.type === "CRITICAL" ? "🔴" : "🟡"} Alerte Budget</Text>
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
        width={250}
        style={{
          background: "#2B3A67", // Couleur bleu foncé comme dans l'interface
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
        }}
      >
        {/* Logo et titre */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? "0" : "0 24px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            background: "#1E2A54",
          }}
        >
          <RocketOutlined style={{ fontSize: 24, color: "#4A90E2", marginRight: collapsed ? 0 : 12 }} />
          {!collapsed && (
            <Text strong style={{ color: "white", fontSize: 18 }}>
              Ingénierie Formation
            </Text>
          )}
        </div>

        {/* Menu de navigation */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{
            background: "transparent",
            border: "none",
            paddingTop: "16px",
          }}
          className="custom-menu"
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
            zIndex: 1,
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
                <Avatar size="small" style={{ backgroundColor: "#4A90E2" }} icon={<UserOutlined />} />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <Text strong style={{ fontSize: 14, lineHeight: 1.2 }}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12, lineHeight: 1.2 }}>
                    {user?.role?.name}
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
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
