import React from 'react'
import { Layout, Menu, Button } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout

const LandingLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      label: 'Accueil',
      onClick: () => navigate('/')
    },
    {
      key: '/demo',
      label: 'Démo',
      onClick: () => navigate('/demo')
    },
    {
      key: '/demande-devis',
      label: 'Demande de devis',
      onClick: () => navigate('/demande-devis')
    }
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ 
            color: '#3498db', 
            margin: 0,
            fontSize: '24px',
            fontWeight: 600
          }}>
            EHC Training Hub
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ border: 'none', background: 'transparent' }}
          />
          <Button 
            type="primary" 
            icon={<UserOutlined />}
            onClick={() => navigate('/auth/login')}
          >
            Connexion
          </Button>
        </div>
      </Header>
      
      <Content>
        <Outlet />
      </Content>
      
      <Footer style={{ 
        textAlign: 'center',
        background: '#f0f2f5',
        borderTop: '1px solid #d9d9d9'
      }}>
        <p style={{ margin: 0, color: '#666' }}>
          © 2024 EHC Training Hub. Tous droits réservés.
        </p>
      </Footer>
    </Layout>
  )
}

export default LandingLayout
