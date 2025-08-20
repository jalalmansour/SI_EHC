import React, { useState } from 'react'
import { Row, Col, Card, Statistic, Button, Space, Typography, Calendar, List, Tag } from 'antd'
import { CalendarOutlined, BookOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const DashboardRF = () => {
  const stats = {
    totalSessions: 45,
    activeSessions: 12,
    totalParticipants: 234,
    upcomingSessions: 8
  }

  const upcomingSessions = [
    {
      id: 1,
      title: 'React.js Avancé',
      date: '2024-02-15',
      participants: 15,
      maxParticipants: 20
    },
    {
      id: 2,
      title: 'Gestion de Projet Agile',
      date: '2024-02-18',
      participants: 12,
      maxParticipants: 15
    }
  ]

  return (
    <div>
      <Title level={2}>Tableau de Bord Responsable Formation</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Sessions"
              value={stats.totalSessions}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sessions Actives"
              value={stats.activeSessions}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Participants"
              value={stats.totalParticipants}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sessions à venir"
              value={stats.upcomingSessions}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Sessions à venir">
            <List
              dataSource={upcomingSessions}
              renderItem={(item) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <Text strong>{item.title}</Text>
                      <Tag color="blue">{new Date(item.date).toLocaleDateString('fr-FR')}</Tag>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      Participants: {item.participants}/{item.maxParticipants}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title="Calendrier des formations">
            <Calendar fullscreen={false} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardRF
