"use client"

import { memo, useMemo } from "react"
import { ConfigProvider, theme } from "antd"
import frFR from "antd/locale/fr_FR"
import { useSelector } from "react-redux"
import { selectTheme } from "../redux/slices/uiSlice.js"

export const AppShell = memo(function AppShell({ children }) {
  const currentTheme = useSelector(selectTheme)

  const isDark = currentTheme === "dark"
  const algorithm = isDark ? theme.darkAlgorithm : theme.defaultAlgorithm

  const token = useMemo(
    () => ({
      colorPrimary: isDark ? "#4ad6d6" : "#1677ff",
      borderRadius: 12,
      controlHeight: 40,
    }),
    [isDark],
  )

  return (
    <ConfigProvider locale={frFR} theme={{ token, algorithm }}>
      {children}
    </ConfigProvider>
  )
})


