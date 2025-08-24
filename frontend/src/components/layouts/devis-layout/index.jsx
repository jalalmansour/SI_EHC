import { memo } from 'react'
import { Layout } from 'antd'

const { Header, Content, Footer } = Layout

function DevisPublicLayout({ children }) {
  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0B1220 0%, #0E172A 100%)' }}>
      <Header style={{ background: 'transparent', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: '#1890ff' }} aria-hidden />
        <div style={{ color: 'white', fontWeight: 700, letterSpacing: 0.5 }}>EHC Formation</div>
      </Header>
      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div>
      </Content>
      <Footer style={{ background: 'transparent', color: '#94A3B8', textAlign: 'center' }}>© {new Date().getFullYear()} EHC Groupe</Footer>
    </Layout>
  )
}

export default memo(DevisPublicLayout)


