"use client"

import { useState } from "react"
import { Layout, Menu, Avatar, Dropdown, Button, Badge, Space, Typography } from "antd"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  PieChartOutlined,
  TeamOutlined,
  BookOutlined,
  DollarOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BankOutlined,
  HomeOutlined,
} from "@ant-design/icons"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import {logout} from "../redux/thunks/authThunks.js";

const { Header, Sider, Content } = Layout
const { Text } = Typography

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate("/profile")}>
        Profil
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate("/settings")}>
        Paramètres
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Déconnexion
      </Menu.Item>
    </Menu>
  )

  const getMenuItems = () => {
    const commonItems = [
      {
        key: "/dashboard",
        icon: <HomeOutlined />,
        label: "Accueil",
        onClick: () => navigate("/dashboard"),
      },
      {
        key: "/dashboard/summary",
        icon: <PieChartOutlined />,
        label: "Résumé",
        onClick: () => navigate("/dashboard/summary"),
      },
    ]

    if (user?.role === "RRH") {
      return [
        ...commonItems,
        {
          key: "rrh-section",
          icon: <TeamOutlined />,
          label: "Gestion RRH",
          children: [
            {
              key: "/rrh/creation-budgetaire",
              icon: <DollarOutlined />,
              label: "Création Budgétaire",
              onClick: () => navigate("/rrh/creation-budgetaire"),
            },
            {
              key: "/rrh/recensement",
              icon: <FileTextOutlined />,
              label: "Recensement",
              onClick: () => navigate("/rrh/recensement"),
            },
            {
              key: "/rrh/planification-execution",
              icon: <CalendarOutlined />,
              label: "Planification",
              onClick: () => navigate("/rrh/planification-execution"),
            },
            {
              key: "/rrh/evaluation",
              icon: <BookOutlined />,
              label: "Évaluation",
              onClick: () => navigate("/rrh/evaluation"),
            },
            {
              key: "/rrh/organisation",
              icon: <BankOutlined />,
              label: "Organisation",
              onClick: () => navigate("/rrh/organisation"),
            },
          ],
        },
      ]
    }

    if (user?.role === "RF") {
      return [
        ...commonItems,
        {
          key: "rf-section",
          icon: <DollarOutlined />,
          label: "Gestion RF",
          children: [
            {
              key: "/rf/budget-allocation",
              icon: <DollarOutlined />,
              label: "Allocation Budget",
              onClick: () => navigate("/rf/budget-allocation"),
            },
            {
              key: "/rf/catalog-manage",
              icon: <BookOutlined />,
              label: "Gestion Catalogue",
              onClick: () => navigate("/rf/catalog-manage"),
            },
            {
              key: "/rf/planning",
              icon: <CalendarOutlined />,
              label: "Planification",
              onClick: () => navigate("/rf/planning"),
            },
            {
              key: "/rf/evaluation",
              icon: <FileTextOutlined />,
              label: "Évaluation",
              onClick: () => navigate("/rf/evaluation"),
            },
            {
              key: "/rf/reports",
              icon: <PieChartOutlined />,
              label: "Rapports",
              onClick: () => navigate("/rf/reports"),
            },
          ],
        },
      ]
    }

    return commonItems
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#fff",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Text strong style={{ color: "#1890ff", fontSize: collapsed ? "16px" : "20px" }}>
            {collapsed ? "I" : "INGENIA"}
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ borderRight: 0, marginTop: "16px" }}
          items={getMenuItems()}
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
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />

          <Space size="large">
            <Badge count={5}>
              <Button type="text" icon={<BellOutlined />} size="large" />
            </Badge>

            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} />
                <Text strong>
                  {user?.firstName} {user?.lastName}
                </Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content
          style={{
            margin: 0,
            minHeight: "calc(100vh - 64px)",
            background: "#f5f5f5",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
