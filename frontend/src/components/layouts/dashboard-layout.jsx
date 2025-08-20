"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Layout, Menu, Avatar, Dropdown, Button, theme, Badge } from "antd"
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  TeamOutlined,
  BookOutlined,
  BarChartOutlined,
  BankOutlined,
} from "@ant-design/icons"
import { logout } from "@/redux/slices/authSlice.js"
import { ThemeSwitcher } from "../../ui/ThemeSwitcher.jsx"
import { Topbar } from "../../ui/Topbar.jsx"
import { SideNav } from "../../ui/SideNav.jsx"

const { Header, Sider, Content } = Layout
const { useToken } = theme

export default function DashboardLayout({
  children,
  userRole,
  userName = "Admin EHC",
  userAvatar,
}) {
  const [collapsed, setCollapsed] = useState(false)
  const { token } = useToken()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const professionalColors = {
    primary: "#238d94", // Teal color
    secondary: "#3b82f6", // Blue 500
    accent: "#06b6d4", // Cyan 500
    success: "#10b981", // Emerald 500
    warning: "#f59e0b", // Amber 500
    danger: "#ef4444", // Red 500
    dark: "#1f2937", // Gray 800
    light: "#f8fafc", // Slate 50
  }

  const handleMenuClick = ({ key }) => {
    // For now, we'll use simple navigation
    // In a real app, you'd use React Router or similar
    console.log(`Navigating to: ${key}`)
    
    // You can implement actual navigation here
    // For example, using window.location or React Router
    // window.location.href = `/${userRole}/${key}`
  }

  const handleUserMenuClick = ({ key }) => {
    switch (key) {
      case "profile":
        // Navigate to profile page
        navigate("/dashboard/profile")
        break
      case "settings":
        // Navigate to settings page
        console.log("Navigate to settings")
        break
      case "logout":
        // Use Redux logout action
        dispatch(logout())
        navigate("/")
        break
      default:
        break
    }
  }

  const getCurrentMenuKey = () => {
    // For now, return dashboard as default
    // In a real app, you'd get this from the current route
    return ["dashboard"]
  }

  // Menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: "Tableau de bord",
      },
    ]

    const roleSpecificItems = {
      admin: [
        {
          key: "clients",
          icon: <TeamOutlined />,
          label: "Gestion Clients",
          children: [
            { key: "clients-list", label: "Liste des clients" },
            { key: "clients-add", label: "Ajouter client" },
          ],
        },
        {
          key: "system",
          icon: <SettingOutlined />,
          label: "Configuration Système",
          children: [
            { key: "system-settings", label: "Paramètres généraux" },
            { key: "system-users", label: "Utilisateurs système" },
          ],
        },
        {
          key: "reports",
          icon: <BarChartOutlined />,
          label: "Rapports Globaux",
        },
      ],
      superadmin: [
        {
          key: "clients",
          icon: <TeamOutlined />,
          label: "Gestion Clients",
          children: [
            { key: "clients-list", label: "Liste des clients" },
            { key: "clients-add", label: "Ajouter client" },
            { key: "informations-clients", label: "Informations Clients" },
            { key: "suivi-commercial", label: "Suivi Commercial" },
            { key: "gestion-paiements", label: "Gestion Paiements" },
            { key: "prospection-devis", label: "Prospection & Devis" },
            { key: "contrats", label: "Contrats" },
          ],
        },
        {
          key: "configuration",
          icon: <SettingOutlined />,
          label: "Configuration S...",
          children: [
            { key: "system-settings", label: "Paramètres généraux" },
            { key: "integrations", label: "Intégrations" },
            { key: "security", label: "Sécurité" },
          ],
        },
        {
          key: "reports",
          icon: <BarChartOutlined />,
          label: "Rapports Globaux",
        },
      ],
      rrh: [
        {
          key: "budget",
          icon: <BankOutlined />,
          label: "Gestion Budget",
        },
        {
          key: "organization",
          icon: <TeamOutlined />,
          label: "Gestion Organisation",
        },
        {
          key: "training-catalog",
          icon: <BookOutlined />,
          label: "Catalogue Formation",
        },
        {
          key: "participants",
          icon: <UserOutlined />,
          label: "Gestion Participants",
        },
      ],
    }

    return [...baseItems, ...(roleSpecificItems[userRole] || [])]
  }

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Mon Profil",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Paramètres",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Déconnexion",
      danger: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Layout style={{ minHeight: "100vh", background: "transparent" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="shadow-2xl border-r-0"
          style={{
            background: `linear-gradient(180deg, ${professionalColors.primary} 0%, ${professionalColors.dark} 100%)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${professionalColors.accent} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${professionalColors.secondary} 0%, transparent 50%)`,
            }}
          />

          <div className="relative z-10 h-16 flex items-center justify-center border-b border-white/20 backdrop-blur-sm">
            <div className="text-center">
              <div
                className={`font-bold transition-all duration-300 ${
                  collapsed ? "text-sm" : "text-lg"
                } bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent`}
              >
                {collapsed ? "EHC" : "EHC SIRH"}
              </div>
              {!collapsed && <div className="text-xs text-blue-200 mt-1 font-medium">Système RH Intégré</div>}
            </div>
          </div>

          <div className="relative z-10">
            <SideNav
              items={getMenuItems()}
              selectedKeys={getCurrentMenuKey()}
              onClick={handleMenuClick}
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60" />
        </Sider>

        <Layout style={{ background: "transparent" }}>
          <Header className="px-4 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <Topbar
              collapsed={collapsed}
              onToggleCollapse={() => setCollapsed(!collapsed)}
              userName={userName}
              userRole={userRole}
              userMenuItems={userMenuItems}
              onUserMenuClick={handleUserMenuClick}
            />
          </Header>

          <Content className="m-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 min-h-[calc(100vh-120px)] relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, ${professionalColors.primary} 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${professionalColors.accent} 0%, transparent 50%)`,
              }}
            />
            <div className="relative z-10">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
