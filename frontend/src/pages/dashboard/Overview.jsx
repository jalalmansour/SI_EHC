"use client"

import { memo } from "react"
import { Row, Col } from "antd"
import { KpiGrid } from "../../ui/KpiGrid.jsx"
import { AreaChartCard } from "../../ui/AreaChartCard.jsx"
import { RecentActivity } from "../../ui/RecentActivity.jsx"

function OverviewImpl() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <KpiGrid />
      </Col>
      <Col xs={24} lg={16}>
        <AreaChartCard title="Tendance des formations" />
      </Col>
      <Col xs={24} lg={8}>
        <RecentActivity />
      </Col>
    </Row>
  )
}

export default memo(OverviewImpl)


