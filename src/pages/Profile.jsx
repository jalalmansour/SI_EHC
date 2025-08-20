"use client"

import { memo } from "react"
import { Card, Form, Input, Button, Avatar, Space } from "antd"
import { UserOutlined } from "@ant-design/icons"

function ProfileImpl() {
  return (
    <Card className="border-0 shadow-md">
      <Space align="start" size="large" className="w-full">
        <Avatar size={80} icon={<UserOutlined />} />
        <Form layout="vertical" className="flex-1">
          <Form.Item label="Nom">
            <Input placeholder="Votre nom" />
          </Form.Item>
          <Form.Item label="Email">
            <Input type="email" placeholder="email@ehc.com" />
          </Form.Item>
          <Button type="primary">Enregistrer</Button>
        </Form>
      </Space>
    </Card>
  )
}

export default memo(ProfileImpl)


