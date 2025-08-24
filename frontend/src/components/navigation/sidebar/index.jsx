"use client"

import { useState } from "react"
import { Layout, Menu } from "antd"
import {
  DashboardOutlined,
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
  BarChartOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons"

const { Sider } = Layout

const Sidebar = ({ userRole, currentPath, onMenuClick }) => {
  const [collapsed, setCollapsed] = useState(false)

  const getMenuItems = (role) => {
    const commonItems = [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: "Tableau de Bord",
      },
      {
        key: "profile",
        icon: <SettingOutlined />,
        label: "Profil",
      },
    ]

    const roleSpecificItems = {
      admin: [
        {
          key: "clients",
          icon: <TeamOutlined />,
          label: "Gestion Clients",
          children: [
            { key: "clients-list", label: "Liste des Clients" },
            { key: "clients-add", label: "Ajouter Client" },
          ],
        },
        {
          key: "formations",
          icon: <BookOutlined />,
          label: "Formations",
        },
      ],
      superadmin: [
        {
          key: "clients",
          icon: <TeamOutlined />,
          label: "Gestion Clients",
          children: [
            { key: "informations-clients", label: "Informations Clients" },
            { key: "suivi-commercial", label: "Suivi Commercial" },
            { key: "gestion-paiements", label: "Gestion Paiements" },
            { key: "contrats", label: "Contrats" },
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
          icon: <BarChartOutlined />,
          label: "Gestion Budget",
        },
        {
          key: "formations",
          icon: <BookOutlined />,
          label: "Catalogue Formations",
        },
        {
          key: "planning",
          icon: <CalendarOutlined />,
          label: "Planning",
        },
      ],
      rf: [
        { key: 'planning', icon: <CalendarOutlined />, label: 'Planification' },
        { key: 'validations', icon: <DashboardOutlined />, label: 'Validations' },
        { key: 'reports', icon: <BarChartOutlined />, label: 'Rapports' },
      ],
      formateur: [
        { key: 'mes-formations', icon: <BookOutlined />, label: 'Mes Formations' },
        { key: 'evaluations', icon: <BarChartOutlined />, label: 'Evaluations' },
      ],
      manager: [
        { key: 'team-formations', icon: <BookOutlined />, label: 'Formations Équipe' },
        { key: 'approvals', icon: <DashboardOutlined />, label: 'Approbations' },
      ],
      employee: [
        { key: 'mes-formations', icon: <BookOutlined />, label: 'Mes Formations' },
        { key: 'demande-formation', icon: <CalendarOutlined />, label: 'Demander Formation' },
      ],
    }

    return [
      ...commonItems,
      ...(roleSpecificItems[role] || []),
      {
        key: "settings",
        icon: <SettingOutlined />,
        label: "Paramètres",
      },
    ]
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="bg-gradient-to-b from-blue-900 to-blue-800 shadow-xl"
      width={280}
    >
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        <div className={`text-white font-bold text-lg ${collapsed ? "hidden" : "block"}`}>EHC</div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-blue-700 p-2 rounded-lg transition-colors"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentPath]}
        items={getMenuItems(userRole)}
        onClick={onMenuClick}
        className="bg-transparent border-none"
        style={{
          backgroundColor: "transparent",
        }}
      />
    </Sider>
  )
}

export default Sidebar


