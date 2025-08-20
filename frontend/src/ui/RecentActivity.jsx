"use client"

import { memo } from "react"
import { Card, List, Avatar, Tag } from "antd"

export const RecentActivity = memo(function RecentActivity() {
  const items = [
    { title: "Nouvelle session créée", desc: "Formation Sécurité Mai", tag: "Nouveau" },
    { title: "Participant ajouté", desc: "Jean Dupont (Equipe IT)", tag: "Mise à jour" },
    { title: "Rapport exporté", desc: "Performance T1 2025", tag: "Export" },
  ]
  return (
    <Card title="Activité récente" className="border-0 shadow-md">
      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="/placeholder-user.jpg" />}
              title={item.title}
              description={item.desc}
            />
            <Tag color="blue">{item.tag}</Tag>
          </List.Item>
        )}
      />
    </Card>
  )
})


