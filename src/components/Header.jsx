"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Button, Drawer, Avatar, Dropdown, Space } from "antd"
import { MenuOutlined, UserOutlined, LogoutOutlined, DashboardOutlined } from "@ant-design/icons"
import { logout } from "../redux/slices/authSlice"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const handleSignup = () => {
    navigate("/signup")
  }

  const userMenuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Tableau de bord",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Mon profil",
      onClick: () => navigate("/profile"),
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

  const navigationItems = [
    { key: "features", label: "Fonctionnalités", href: "#features" },
    { key: "actors", label: "Acteurs", href: "#actors" },
    { key: "mission", label: "Mission", href: "#mission" },
    { key: "benefits", label: "Avantages", href: "#benefits" },
    { key: "testimonials", label: "Témoignages", href: "#testimonials" },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              INGÉNIA
            </span>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-indigo-50"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                  <Avatar icon={<UserOutlined />} className="bg-indigo-600" />
                  <span className="hidden sm:inline text-gray-700 font-medium">{user?.firstName || "Utilisateur"}</span>
                </div>
              </Dropdown>
            ) : (
              <Space>
                <Button
                  type="text"
                  onClick={handleLogin}
                  className="hidden sm:inline-flex font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                >
                  Se connecter
                </Button>
                <Button
                  type="primary"
                  onClick={handleSignup}
                  className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  S'inscrire
                </Button>
              </Space>
            )}

            {/* Menu mobile */}
            <Button type="text" icon={<MenuOutlined />} onClick={() => setMobileMenuOpen(true)} className="md:hidden" />
          </div>
        </div>
      </div>

      {/* Drawer mobile */}
      <Drawer
        title={
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">I</span>
            </div>
            <span className="text-lg font-bold text-indigo-600">INGÉNIA</span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={300}
      >
        <div className="flex flex-col space-y-4">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.href)}
              className="text-left text-gray-600 hover:text-indigo-600 py-3 text-lg font-medium hover:bg-indigo-50 px-3 rounded-lg transition-colors"
            >
              {item.label}
            </button>
          ))}

          {!isAuthenticated && (
            <div className="border-t pt-6 mt-6 space-y-3">
              <Button
                type="text"
                onClick={handleLogin}
                className="w-full text-left justify-start font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 h-12"
              >
                Se connecter
              </Button>
              <Button
                type="primary"
                onClick={handleSignup}
                className="w-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 font-medium h-12"
              >
                S'inscrire
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </header>
  )
}

export default Header
