"use client"

import { memo } from "react"
import { Button, Badge, Dropdown, Avatar } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, UserOutlined } from "@ant-design/icons"
import { ThemeSwitcher } from "./ThemeSwitcher.jsx"

export const Topbar = memo(function Topbar({
  collapsed,
  onToggleCollapse,
  userName = "Utilisateur",
  userRole = "user",
  userMenuItems,
  onUserMenuClick,
}) {
  return (
    <div className="flex items-center justify-between h-full">
      <div className="flex items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapse}
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
        <ThemeSwitcher />
        <Badge count={3} size="small">
          <Button
            type="text"
            icon={<BellOutlined />}
            className="w-10 h-10 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center justify-center"
          />
        </Badge>
        <Dropdown menu={{ items: userMenuItems, onClick: onUserMenuClick }} placement="bottomRight">
          <div className="flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 group">
            <div className="relative">
              <Avatar icon={<UserOutlined />} className="ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all duration-200" />
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
  )
})


