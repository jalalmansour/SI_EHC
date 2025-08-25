"use client"

import { memo } from "react"
import { Space, Button, message } from "antd"
import jsPDF from "jspdf"
import * as XLSX from "xlsx"
import moment from "moment"

export const ExportActions = memo(function ExportActions({ tableRef }) {
  const exportPdf = () => {
    const doc = new jsPDF()
    doc.text("Rapport EHC SIRH", 14, 16)
    doc.text(`Généré le ${moment().format("YYYY-MM-DD HH:mm")}`, 14, 26)
    doc.save("rapport-ehc.pdf")
    message.success("Export PDF lancé")
  }

  const exportXlsx = () => {
    const rows = [
      ["Session", "Date", "Statut"],
      ["Onboarding", "2025-02-15", "Planifiée"],
      ["Sécurité", "2025-03-02", "Terminée"],
    ]
    const worksheet = XLSX.utils.aoa_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rapport")
    XLSX.writeFile(workbook, "rapport-ehc.xlsx")
    message.success("Export Excel lancé")
  }

  return (
    <Space>
      <Button onClick={exportPdf}>Exporter PDF</Button>
      <Button type="primary" onClick={exportXlsx}>Exporter Excel</Button>
    </Space>
  )
})


