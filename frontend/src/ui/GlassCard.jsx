"use client"

import { memo } from "react"
import { Card } from "antd"

export const GlassCard = memo(function GlassCard({ children, title }) {
  return (
    <Card
      title={title}
      className="border-0 shadow-lg"
      styles={{ body: { backdropFilter: "blur(6px)" } }}
      style={{ background: "rgba(255,255,255,0.7)" }}
    >
      {children}
    </Card>
  )
})


