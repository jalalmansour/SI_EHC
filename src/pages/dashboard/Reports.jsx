"use client"

import { memo, useRef } from "react"
import { Card, Space, Button } from "antd"
import { ExportActions } from "../../ui/ExportActions.jsx"
import { AreaChartCard } from "../../ui/AreaChartCard.jsx"

function ReportsImpl() {
  const tableRef = useRef(null)

  return (
    <Space direction="vertical" size="large" className="w-full">
      <ExportActions tableRef={tableRef} />
      <Card className="border-0 shadow-md">Rapports détaillés à venir…</Card>
      <AreaChartCard title="Tendance annuelle" />
      <Button type="default">Télécharger le rapport</Button>
    </Space>
  )
}

export default memo(ReportsImpl)


