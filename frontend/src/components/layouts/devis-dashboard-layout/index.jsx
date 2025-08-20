import { memo } from 'react'
import { Layout } from 'antd'

const { Sider, Content } = Layout

function DevisDashboardLayout({ children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} style={{ background: '#0f172a' }}>
        <div style={{ color: 'white', padding: 16, fontWeight: 700 }}>Devis</div>
        <nav aria-label="Navigation devis" style={{ color: '#cbd5e1', padding: 16 }}>
          <div>Tableau de bord</div>
          <div>Récents</div>
        </nav>
      </Sider>
      <Content style={{ background: '#0b1220' }}>
        <div style={{ padding: 24 }}>{children}</div>
      </Content>
    </Layout>
  )
}

export default memo(DevisDashboardLayout)


