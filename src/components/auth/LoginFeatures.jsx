import React from "react"
import { Typography } from "antd"
import { SettingOutlined, ToolOutlined, LikeOutlined, BulbOutlined } from "@ant-design/icons"

const { Text } = Typography

export default function LoginFeatures() {
  const items = [
    {
      icon: <SettingOutlined className="text-gray-400 text-xl" />,
      title: "Performance adaptable",
      description: "Notre solution s’adapte à vos besoins et simplifie vos tâches.",
    },
    {
      icon: <ToolOutlined className="text-gray-400 text-xl" />,
      title: "Conçu pour durer",
      description: "Une base solide et fiable pour votre SIRH.",
    },
    {
      icon: <LikeOutlined className="text-gray-400 text-xl" />,
      title: "Expérience agréable",
      description: "Interface claire et intuitive, adoptée par vos équipes.",
    },
    {
      icon: <BulbOutlined className="text-gray-400 text-xl" />,
      title: "Fonctionnalités innovantes",
      description: "Restez en avance avec des outils modernes.",
    },
  ]

  return (
    <div className="space-y-6 max-w-md">
      <div className="flex items-center gap-2 text-sky-600 font-medium">
        <span className="text-sky-500">✳</span>
        <span>Sitemark</span>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="mt-1">{item.icon}</div>
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <Text type="secondary" className="!text-gray-600 text-sm">
              {item.description}
            </Text>
          </div>
        </div>
      ))}
    </div>
  )
}


