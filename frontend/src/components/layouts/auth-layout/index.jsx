import { memo } from 'react'
import { Layout } from 'antd'

const { Content } = Layout

function AuthLayout({ children }) {
  return (
    <Layout style={{ minHeight: '10vh',  }}>
      <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 5600 }}>{children}</div>
      </Content>
    </Layout>
  )
}

export default memo(AuthLayout)


