import React, { memo } from "react"
import { Typography, Space, Tag } from "antd"

const { Title, Paragraph, Text } = Typography

const AuthBranding = memo(function AuthBranding({ title, subtitle }) {
  return (
    <div style={{ width: "100%", maxWidth: 520 }}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/images/logo.png" alt="EHC" width={40} height={40} style={{ borderRadius: 8 }} />
          <Tag color="#111827" style={{ color: "#fff", padding: "8px 12px", borderRadius: 10 }}>EHC</Tag>
        </div>
        <Title level={1} style={{ margin: 0, fontWeight: 800, letterSpacing: -0.5 }}>{title}</Title>
        <Paragraph style={{ color: "#4b5563", fontSize: 16 }}>{subtitle}</Paragraph>
        <div style={{ height: 220, borderRadius: 16, overflow: 'hidden', boxShadow: "inset 0 0 0 1px rgba(0,0,0,.05)" }}>
          <img src="/images/dashboard-reference.png" alt="dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </Space>
    </div>
  )
})

export default AuthBranding


