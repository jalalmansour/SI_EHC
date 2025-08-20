"use client"

import { memo } from "react"
import { Menu } from "antd"

export const SideNav = memo(function SideNav({ items, selectedKeys, onClick }) {
  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      items={items}
      onClick={onClick}
      className="border-r-0 bg-transparent"
      style={{ background: "transparent", border: "none", color: "white" }}
      theme="dark"
    />
  )
})


