import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const AuthLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '24px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '32px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ 
              color: '#3498db', 
              margin: 0,
              fontSize: '28px',
              fontWeight: 600
            }}>
              EHC Training Hub
            </h1>
            <p style={{ 
              color: '#666', 
              margin: '8px 0 0 0',
              fontSize: '14px'
            }}>
              Plateforme de gestion de formation
            </p>
          </div>
          <Outlet />
        </div>
      </Content>
    </Layout>
  )
}

export default AuthLayout
