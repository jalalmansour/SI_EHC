"use client"

import { Breadcrumb } from "antd"
import { HomeOutlined } from "@ant-design/icons"

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Array<{
    title: string
    href?: string
  }>
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      {breadcrumbs && (
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          {breadcrumbs.map((crumb, index) => (
            <Breadcrumb.Item key={index} href={crumb.href}>
              {crumb.title}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}
      <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{title}</h1>
      {subtitle && <p style={{ margin: "8px 0 0 0", color: "#666" }}>{subtitle}</p>}
    </div>
  )
}
