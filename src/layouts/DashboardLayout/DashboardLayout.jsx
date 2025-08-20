import React, { useState, useEffect } from 'react'
import { Layout, Menu, Avatar, Dropdown, Badge, Button, Typography } from 'antd'
import { motion } from 'framer-motion'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  DashboardOutlined,
  TeamOutlined,
  BookOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  DollarOutlined,
  CalendarOutlined,
  FileTextOutlined,
  TrophyOutlined
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

const { Header, Sider, Content } = Layout
const { Title, Text } = Typography

const DashboardLayout = ({ children, userRole = 'employee' }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const getMenuItems = (role) => {
    const baseItems = [
      {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: 'Tableau de bord',
      }
    ]

    const roleItems = {
      rrh: [
        { key: '/rrh/budget', icon: <DollarOutlined />, label: 'Budget' },
        { key: '/rrh/organization', icon: <TeamOutlined />, label: 'Organisation' },
        { key: '/rrh/catalog', icon: <BookOutlined />, label: 'Catalogue' },
        { key: '/rrh/participants', icon: <TeamOutlined />, label: 'Participants' },
        { key: '/rrh/reports', icon: <BarChartOutlined />, label: 'Rapports' }
      ],
      rf: [
        { key: '/rf/planning', icon: <CalendarOutlined />, label: 'Planification' },
        { key: '/rf/validation', icon: <FileTextOutlined />, label: 'Validation' },
        { key: '/rf/reports', icon: <BarChartOutlined />, label: 'Rapports' }
      ],
      employee: [
        { key: '/employee/formations', icon: <BookOutlined />, label: 'Mes Formations' },
        { key: '/employee/demande', icon: <FileTextOutlined />, label: 'Demande' },
        { key: '/employee/certifications', icon: <TrophyOutlined />, label: 'Certifications' }
      ]
    }

    return [...baseItems, ...(roleItems[role] || [])]
  }

  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profil' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Paramètres' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Déconnexion', onClick: handleLogout }
  ]

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      handleLogout()
    } else {
      navigate(key)
    }
  }

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-white shadow-lg"
        width={280}
      >
        <div className="p-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
              <img src="/images/logo.png" alt="EHC Logo" className="w-6 h-6" />
            </div>
            {!collapsed && (
              <Title level={4} className="mb-0">EHC Formation</Title>
            )}
          </div>

          {user && !collapsed && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Avatar size={40} icon={<UserOutlined />} className="bg-blue-500" />
                <div className="ml-3">
                  <Text strong>{user.name || user.email}</Text>
                  <div className="text-xs text-gray-600">{user.role}</div>
                </div>
              </div>
            </div>
          )}

          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={getMenuItems(user?.role)}
            onClick={handleMenuClick}
            className="border-0"
          />
        </div>
      </Sider>

      <Layout>
        <Header className="bg-white shadow-sm px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-lg mr-4"
            />
            <Title level={4} className="mb-0">{user?.role} Dashboard</Title>
          </div>

          <div className="flex items-center space-x-4">
            <Badge count={5}>
              <Button type="text" icon={<BellOutlined />} />
            </Badge>

            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleMenuClick,
              }}
              placement="bottomRight"
            >
              <div className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                <Avatar size={32} icon={<UserOutlined />} className="bg-blue-500" />
                {!collapsed && (
                  <div className="ml-3">
                    <Text strong>{user?.name || user?.email}</Text>
                  </div>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
