"use client"

import { memo } from "react"
import { Card, Row, Col, Statistic } from "antd"
import { BarChartOutlined, TeamOutlined, ScheduleOutlined, CheckCircleOutlined } from "@ant-design/icons"

export const KpiGrid = memo(function KpiGrid() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12} lg={6}>
        <Card className="border-0 shadow-md">
          <Statistic title="Utilisateurs actifs" value={50231} prefix={<TeamOutlined />} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <Card className="border-0 shadow-md">
          <Statistic title="Sessions en cours" value={128} prefix={<ScheduleOutlined />} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <Card className="border-0 shadow-md">
          <Statistic title="Formations complétées" value={1843} prefix={<CheckCircleOutlined />} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <Card className="border-0 shadow-md">
          <Statistic title="Indice performance" value={96} suffix="%" prefix={<BarChartOutlined />} />
        </Card>
      </Col>
    </Row>
  )
})


