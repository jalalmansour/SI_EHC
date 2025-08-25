"use client"

import { memo, useCallback } from "react"
import { Switch } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { selectTheme, setTheme } from "../redux/slices/uiSlice.js"

export const ThemeSwitcher = memo(function ThemeSwitcher() {
  const dispatch = useDispatch()
  const currentTheme = useSelector(selectTheme)
  const onChange = useCallback(
    (checked) => dispatch(setTheme(checked ? "dark" : "light")),
    [dispatch],
  )
  return <Switch checked={currentTheme === "dark"} onChange={onChange} checkedChildren="Dark" unCheckedChildren="Light" />
})


