"use client"

import { useState } from "react"
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
import { useRouter, usePathname } from "next/navigation"

const { Header, Sider, Content } = Layout
const { useToken } = theme

export default function DashboardLayout({ children, userRole, userName = "Admin EHC", userAvatar }) {
  const [collapsed, setCollapsed] = useState(false)
  const { token } = useToken()
  const router = useRouter()
  const pathname = usePathname()

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
    const routes = {
      dashboard: `/${userRole}/dashboard`,
      "clients-list": `/${userRole}/clients`,
      "clients-add": `/${userRole}/clients/add`,
      "prospection-devis": `/${userRole}/prospection-devis`,
      contrats: `/${userRole}/contrats`,
      "informations-clients": `/${userRole}/informations-clients`,
      "suivi-commercial": `/${userRole}/suivi-commercial`,
      "gestion-paiements": `/${userRole}/gestion-paiements`,
      "system-settings": `/${userRole}/settings`,
      "system-users": `/${userRole}/users`,
      reports: `/${userRole}/reports`,
      budget: `/${userRole}/budget`,
      organization: `/${userRole}/organization`,
      "training-catalog": `/${userRole}/training-catalog`,
      participants: `/${userRole}/participants`,
    }

    if (routes[key]) {
      router.push(routes[key])
    }
  }

  const handleUserMenuClick = ({ key }) => {
    switch (key) {
      case "profile":
        router.push("/profile")
        break
      case "settings":
        router.push(`/${userRole}/settings`)
        break
      case "logout":
        // Handle logout logic
        console.log("Logging out...")
        break
      default:
        break
    }
  }

  const getCurrentMenuKey = () => {
    if (pathname.includes("/contrats")) return ["contrats"]
    if (pathname.includes("/prospection-devis")) return ["prospection-devis"]
    if (pathname.includes("/informations-clients")) return ["informations-clients"]
    if (pathname.includes("/suivi-commercial")) return ["suivi-commercial"]
    if (pathname.includes("/gestion-paiements")) return ["gestion-paiements"]
    if (pathname.includes("/clients")) return ["clients-list"]
    if (pathname.includes("/dashboard")) return ["dashboard"]
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
            <Menu
              mode="inline"
              defaultSelectedKeys={["dashboard"]}
              selectedKeys={getCurrentMenuKey()}
              items={getMenuItems()}
              onClick={handleMenuClick}
              className="border-r-0 bg-transparent"
              style={{
                background: "transparent",
                border: "none",
                color: "white",
              }}
              theme="dark"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60" />
        </Sider>

        <Layout style={{ background: "transparent" }}>
          <Header className="px-4 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center">
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  className="w-16 h-16 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  style={{ fontSize: 16 }}
                />

                <div className="ml-4 hidden md:block">
                  <h1 className="text-lg font-semibold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Dashboard EHC
                  </h1>
                  <p className="text-sm text-gray-500 -mt-1">Gestion des ressources humaines</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge count={3} size="small">
                  <Button
                    type="text"
                    icon={<BellOutlined />}
                    className="w-10 h-10 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center justify-center"
                  />
                </Badge>

                <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }} placement="bottomRight">
                  <div className="flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 group">
                    <div className="relative">
                      <Avatar
                        src={userAvatar}
                        icon={<UserOutlined />}
                        className="ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all duration-200"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="hidden md:block">
                      <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                        {userName}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">{userRole}</div>
                    </div>
                  </div>
                </Dropdown>
              </div>
            </div>
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
