import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const LoadingSpinner = ({ size = 'large', text = 'Chargement...' }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <Spin indicator={antIcon} size={size} />
      <p style={{ color: '#666', margin: 0 }}>{text}</p>
    </div>
  )
}

export default LoadingSpinner
