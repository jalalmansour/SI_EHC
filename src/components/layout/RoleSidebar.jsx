"use client"
import { Layout, Menu, Avatar, Dropdown, Button, Badge } from "antd"
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarOutlined,
  BookOutlined,
  CalendarOutlined,
  TeamOutlined,
  BarChartOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  BankOutlined,
  AuditOutlined,
  UsergroupAddOutlined,
  FormOutlined,
} from "@ant-design/icons"
import { useNavigate, useLocation } from "react-router-dom"

const { Sider } = Layout

const RoleSidebar = ({ userRole = "RRH", collapsed, onCollapse }) => {
  const navigate = useNavigate()
  const location = useLocation()

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

  const getMenuItems = () => {
    switch (userRole) {
      case "RRH":
        return [
          {
            key: "/dashboard-rrh",
            icon: <DashboardOutlined />,
            label: "Dashboard RRH",
          },
          {
            key: "/creation-budgetaire",
            icon: <DollarOutlined />,
            label: "Création Budgétaire",
          },
          {
            key: "/recensement",
            icon: <BookOutlined />,
            label: "Recensement",
          },
          {
            key: "/planification-execution",
            icon: <CalendarOutlined />,
            label: "Programmation et Exécution",
          },
          {
            key: "/evaluation",
            icon: <CheckCircleOutlined />,
            label: "Évaluation",
          },
          {
            key: "/facturation",
            icon: <FileTextOutlined />,
            label: "Facturation",
          },
          {
            key: "/financement",
            icon: <BankOutlined />,
            label: "Financement & Remboursement",
          },
          {
            key: "/organisation",
            icon: <TeamOutlined />,
            label: "Organisation",
          },
          {
            key: "/organisme-formation",
            icon: <AuditOutlined />,
            label: "Organisme de formation",
          },
          {
            key: "/formateur-interne",
            icon: <UsergroupAddOutlined />,
            label: "Formateur interne",
          },
        ]

      case "RF":
        return [
          {
            key: "/dashboard-rf",
            icon: <DashboardOutlined />,
            label: "Dashboard RF",
          },
          {
            key: "/catalog-management",
            icon: <BookOutlined />,
            label: "Gestion Catalogue",
          },
          {
            key: "/planning",
            icon: <CalendarOutlined />,
            label: "Planification",
          },
          {
            key: "/evaluations-rf",
            icon: <CheckCircleOutlined />,
            label: "Évaluations",
          },
          {
            key: "/participants",
            icon: <TeamOutlined />,
            label: "Participants",
          },
          {
            key: "/reports-rf",
            icon: <BarChartOutlined />,
            label: "Rapports",
          },
        ]

      case "MANAGER":
        return [
          {
            key: "/dashboard-manager",
            icon: <DashboardOutlined />,
            label: "Dashboard Manager",
          },
          {
            key: "/team-training",
            icon: <TeamOutlined />,
            label: "Formation Équipe",
          },
          {
            key: "/team-evaluations",
            icon: <CheckCircleOutlined />,
            label: "Évaluations Équipe",
          },
          {
            key: "/budget-team",
            icon: <DollarOutlined />,
            label: "Budget Équipe",
          },
          {
            key: "/competency-tracking",
            icon: <BarChartOutlined />,
            label: "Suivi Compétences",
          },
        ]

      case "EMPLOYE":
        return [
          {
            key: "/dashboard-employee",
            icon: <DashboardOutlined />,
            label: "Mon Dashboard",
          },
          {
            key: "/my-trainings",
            icon: <BookOutlined />,
            label: "Mes Formations",
          },
          {
            key: "/my-evaluations",
            icon: <CheckCircleOutlined />,
            label: "Mes Évaluations",
          },
          {
            key: "/my-competencies",
            icon: <BarChartOutlined />,
            label: "Mes Compétences",
          },
          {
            key: "/training-catalog",
            icon: <FormOutlined />,
            label: "Catalogue",
          },
        ]

      case "ORGANISME":
        return [
          {
            key: "/dashboard-organisme",
            icon: <DashboardOutlined />,
            label: "Dashboard Organisme",
          },
          {
            key: "/training-delivery",
            icon: <BookOutlined />,
            label: "Livraison Formations",
          },
          {
            key: "/participant-management",
            icon: <TeamOutlined />,
            label: "Gestion Participants",
          },
          {
            key: "/evaluation-results",
            icon: <CheckCircleOutlined />,
            label: "Résultats Évaluations",
          },
          {
            key: "/billing-organisme",
            icon: <FileTextOutlined />,
            label: "Facturation",
          },
        ]

      default:
        return []
    }
  }

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  const handleUserMenuClick = ({ key }) => {
    if (key === "logout") {
      navigate("/login")
    } else if (key === "profile") {
      navigate("/profile")
    } else if (key === "settings") {
      navigate("/settings")
    }
  }

  const userDropdown = (
    <Dropdown
      menu={{
        items: userMenuItems,
        onClick: handleUserMenuClick,
      }}
      placement="topRight"
      arrow
    >
      <div className="flex items-center space-x-3 p-4 hover:bg-gray-100 cursor-pointer rounded-lg">
        <Avatar size="large" style={{ backgroundColor: "#1890ff" }}>
          {userRole.charAt(0)}
        </Avatar>
        {!collapsed && (
          <div className="flex-1">
            <div className="font-semibold text-gray-800">
              {userRole === "RRH" && "Responsable RH"}
              {userRole === "RF" && "Responsable Formation"}
              {userRole === "MANAGER" && "Manager"}
              {userRole === "EMPLOYE" && "Employé"}
              {userRole === "ORGANISME" && "Organisme"}
            </div>
            <div className="text-sm text-gray-500">Accès complet</div>
          </div>
        )}
      </div>
    </Dropdown>
  )

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={280}
      style={{
        background: "linear-gradient(180deg, #001529 0%, #002140 100%)",
        boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
      }}
      className="min-h-screen"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="text-white">
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  INGÉNIA
                </h2>
                <p className="text-xs text-gray-400">Plateforme de Formation</p>
              </div>
            )}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={onCollapse}
              style={{ color: "white" }}
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 py-4">
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={getMenuItems()}
            onClick={handleMenuClick}
            style={{
              background: "transparent",
              border: "none",
            }}
            className="custom-menu"
          />
        </div>

        {/* Notifications */}
        {!collapsed && (
          <div className="px-4 py-2">
            <div className="flex items-center justify-between text-white mb-2">
              <span className="text-sm font-medium">Notifications</span>
              <Badge count={3} size="small">
                <BellOutlined style={{ color: "white" }} />
              </Badge>
            </div>
            <div className="text-xs text-gray-400">3 nouvelles évaluations en attente</div>
          </div>
        )}

        {/* User Profile */}
        <div className="border-t border-gray-700">{userDropdown}</div>
      </div>
    </Sider>
  )
}

export default RoleSidebar
