import { memo } from 'react'
import { Button, Space } from 'antd'
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

function DevisExportActions({ summary }) {
  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Tableau de bord Devis', 14, 18)
    const lines = [
      `Devis totaux: ${summary.totalQuotes}`,
      `Acceptés: ${summary.accepted}`,
      `En attente: ${summary.pending}`,
      `CA potentiel: ${summary.revenuePotential} €`,
    ]
    lines.forEach((l, i) => doc.text(l, 14, 28 + i * 8))
    doc.save('devis-dashboard.pdf')
  }

  const exportXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(summary.recent || [])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Récents')
    XLSX.writeFile(wb, 'devis-recents.xlsx')
  }

  return (
    <Space>
      <Button onClick={exportPDF}>Exporter PDF</Button>
      <Button onClick={exportXLSX}>Exporter Excel</Button>
    </Space>
  )
}

export default memo(DevisExportActions)


