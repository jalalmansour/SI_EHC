import { memo } from 'react'
import { Card, Col, Row, Statistic } from 'antd'

function DevisStats({ summary, loading }) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={6}>
        <Card bordered>
          <Statistic title="Devis totaux" value={summary.totalQuotes} loading={loading} />
        </Card>
      </Col>
      <Col xs={24} md={6}>
        <Card bordered>
          <Statistic title="Acceptés" value={summary.accepted} loading={loading} valueStyle={{ color: '#52c41a' }} />
        </Card>
      </Col>
      <Col xs={24} md={6}>
        <Card bordered>
          <Statistic title="En attente" value={summary.pending} loading={loading} valueStyle={{ color: '#faad14' }} />
        </Card>
      </Col>
      <Col xs={24} md={6}>
        <Card bordered>
          <Statistic title="CA potentiel" value={summary.revenuePotential} suffix="€" loading={loading} />
        </Card>
      </Col>
    </Row>
  )
}

export default memo(DevisStats)


