import { Layout, Avatar, Badge, Dropdown, Space, Button } from "antd"
import { BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons"

const { Header } = Layout

const Navbar = ({ user, onLogout }) => {
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
      onClick: onLogout,
    },
  ]

  return (
    <Header className="bg-white shadow-sm border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-800">SIRH EHC</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Badge count={3} size="small">
          <Button type="text" icon={<BellOutlined />} className="text-gray-600 hover:text-blue-600" />
        </Badge>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Space className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            <Avatar size="small" src={user?.avatar} icon={<UserOutlined />} className="bg-blue-500" />
            <span className="text-gray-700 font-medium">{user?.name || "Utilisateur"}</span>
          </Space>
        </Dropdown>
      </div>
    </Header>
  )
}

export default Navbar


