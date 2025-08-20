import React from 'react'
import { Row, Col, Card, Statistic, Progress, List, Tag } from 'antd'
import { 
  BookOutlined, 
  TrophyOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons'

const DashboardEmployee = () => {
  // Mock data - in real app this would come from Redux store
  const stats = {
    formationsEnCours: 3,
    formationsTerminees: 12,
    heuresFormation: 45,
    certifications: 5
  }

  const formationsRecentes = [
    {
      id: 1,
      titre: 'React.js Avancé',
      date: '2024-01-15',
      statut: 'en_cours',
      progression: 75
    },
    {
      id: 2,
      titre: 'Gestion de Projet Agile',
      date: '2024-01-10',
      statut: 'terminee',
      progression: 100
    },
    {
      id: 3,
      titre: 'Communication Interpersonnelle',
      date: '2024-01-05',
      statut: 'planifiee',
      progression: 0
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'en_cours': return 'processing'
      case 'terminee': return 'success'
      case 'planifiee': return 'default'
      default: return 'default'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'en_cours': return 'En cours'
      case 'terminee': return 'Terminée'
      case 'planifiee': return 'Planifiée'
      default: return status
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>Tableau de bord</h1>
      
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Formations en cours"
              value={stats.formationsEnCours}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#3498db' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Formations terminées"
              value={stats.formationsTerminees}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Heures de formation"
              value={stats.heuresFormation}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Certifications"
              value={stats.certifications}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#e67e22' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Formations */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Formations récentes" style={{ height: '100%' }}>
            <List
              dataSource={formationsRecentes}
              renderItem={(item) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <h4 style={{ margin: 0 }}>{item.titre}</h4>
                      <Tag color={getStatusColor(item.statut)}>
                        {getStatusText(item.statut)}
                      </Tag>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#666', fontSize: '12px' }}>
                        {new Date(item.date).toLocaleDateString('fr-FR')}
                      </span>
                      <Progress 
                        percent={item.progression} 
                        size="small" 
                        style={{ width: '100px' }}
                      />
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title="Prochaines formations" style={{ height: '100%' }}>
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <BookOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
              <p style={{ color: '#666', marginTop: '16px' }}>
                Aucune formation planifiée pour le moment
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardEmployee
