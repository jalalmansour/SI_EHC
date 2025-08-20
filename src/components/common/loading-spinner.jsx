"use client"

import { Spin } from "antd"

interface LoadingSpinnerProps {
  size?: "small" | "default" | "large"
  tip?: string
}

export default function LoadingSpinner({ size = "default", tip }: LoadingSpinnerProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 200,
      }}
    >
      <Spin size={size} tip={tip} />
    </div>
  )
}
