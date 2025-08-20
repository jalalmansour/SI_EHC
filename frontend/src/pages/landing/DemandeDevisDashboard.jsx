import { memo, useEffect } from 'react'
import { Card, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDevisSummary } from '@/redux/slices/devisSlice.js'
import DevisSummaryChart from '@/components/common/charts/DevisSummaryChart.jsx'
import DevisDashboardLayout from '@/components/layouts/devis-dashboard-layout/index.jsx'
import DevisStats from '@/components/devis/DevisStats.jsx'
import DevisExportActions from '@/components/devis/DevisExportActions.jsx'
import DevisRecentTable from '@/components/devis/DevisRecentTable.jsx'

function DemandeDevisDashboard() {
  const dispatch = useDispatch()
  const { summary, summaryLoading } = useSelector((s) => s.devis)

  useEffect(() => {
    dispatch(fetchDevisSummary())
  }, [dispatch])

  return (
    <DevisDashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ color: 'white', margin: 0 }}>Prospection & Devis</h2>
        <DevisExportActions summary={summary} />
      </div>
      <DevisStats summary={summary} loading={summaryLoading} />
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <DevisSummaryChart trend={summary.trend} />
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Récents" variant="borderless">
            <DevisRecentTable data={summary.recent || []} loading={summaryLoading} />
          </Card>
        </Col>
      </Row>
    </DevisDashboardLayout>
  )
}

export default memo(DemandeDevisDashboard)


