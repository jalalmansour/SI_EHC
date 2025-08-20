"use client"

import { memo } from "react"
import { Card, Table, Tag } from "antd"

const columns = [
  { title: "Session", dataIndex: "name", key: "name" },
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Formateur", dataIndex: "trainer", key: "trainer" },
  {
    title: "Statut",
    dataIndex: "status",
    key: "status",
    render: (status) => <Tag color={status === 'Planifiée' ? 'blue' : 'green'}>{status}</Tag>,
  },
]

const data = [
  { key: 1, name: "Onboarding", date: "2025-02-15", trainer: "EHC", status: "Planifiée" },
  { key: 2, name: "Sécurité", date: "2025-03-02", trainer: "EHC", status: "Terminée" },
]

function TrainingImpl() {
  return (
    <Card className="border-0 shadow-md">
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  )
}

export default memo(TrainingImpl)


