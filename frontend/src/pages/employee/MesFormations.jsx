import React, { useState, useEffect } from 'react'
import { 
  Card, 
  Table, 
  Tag, 
  Progress, 
  Button, 
  Space, 
  Modal, 
  Descriptions,
  Row,
  Col,
  Statistic,
  Timeline,
  Empty
} from 'antd'
import { 
  BookOutlined, 
  ClockCircleOutlined, 
  TrophyOutlined,
  EyeOutlined,
  DownloadOutlined,
  CalendarOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

const MesFormations = () => {
  const [formations, setFormations] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedFormation, setSelectedFormation] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  // Mock data - in real app this would come from Redux store
  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setFormations([
        {
          id: 1,
          titre: 'React.js Avancé',
          formateur: 'Dr. Ahmed Benali',
          dateDebut: '2024-01-15',
          dateFin: '2024-01-20',
          duree: '40h',
          statut: 'en_cours',
          progression: 75,
          type: 'Technique',
          lieu: 'Salle de formation A',
          prix: '15,000 DHS',
          description: 'Formation avancée sur React.js incluant les hooks, le contexte, et les bonnes pratiques.',
          competences: ['React Hooks', 'Context API', 'Performance', 'Testing'],
          certificat: true
        },
        {
          id: 2,
          titre: 'Gestion de Projet Agile',
          formateur: 'Mme. Fatima Zahra',
          dateDebut: '2024-01-10',
          dateFin: '2024-01-12',
          duree: '24h',
          statut: 'terminee',
          progression: 100,
          type: 'Management',
          lieu: 'Salle de formation B',
          prix: '12,000 DHS',
          description: 'Formation complète sur les méthodologies Agile et Scrum.',
          competences: ['Scrum', 'Kanban', 'User Stories', 'Sprint Planning'],
          certificat: true
        },
        {
          id: 3,
          titre: 'Communication Interpersonnelle',
          formateur: 'Dr. Karim Mansouri',
          dateDebut: '2024-02-01',
          dateFin: '2024-02-03',
          duree: '16h',
          statut: 'planifiee',
          progression: 0,
          type: 'Soft Skills',
          lieu: 'Salle de formation C',
          prix: '8,000 DHS',
          description: 'Améliorer ses compétences en communication et leadership.',
          competences: ['Communication', 'Leadership', 'Team Building', 'Negotiation'],
          certificat: false
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

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

  const getTypeColor = (type) => {
    switch (type) {
      case 'Technique': return 'blue'
      case 'Management': return 'green'
      case 'Soft Skills': return 'orange'
      default: return 'default'
    }
  }

  const columns = [
    {
      title: 'Formation',
      dataIndex: 'titre',
      key: 'titre',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1890ff' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <UserOutlined /> {record.formateur}
          </div>
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={getTypeColor(type)}>{type}</Tag>
      )
    },
    {
      title: 'Dates',
      key: 'dates',
      render: (_, record) => (
        <div>
          <div style={{ fontSize: '12px' }}>
            <CalendarOutlined /> {new Date(record.dateDebut).toLocaleDateString('fr-FR')}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            au {new Date(record.dateFin).toLocaleDateString('fr-FR')}
          </div>
        </div>
      )
    },
    {
      title: 'Durée',
      dataIndex: 'duree',
      key: 'duree',
      render: (duree) => (
        <div style={{ textAlign: 'center' }}>
          <ClockCircleOutlined style={{ color: '#1890ff' }} />
          <br />
          {duree}
        </div>
      )
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut) => (
        <Tag color={getStatusColor(statut)}>
          {getStatusText(statut)}
        </Tag>
      )
    },
    {
      title: 'Progression',
      key: 'progression',
      render: (_, record) => (
        <div style={{ width: 120 }}>
          <Progress 
            percent={record.progression} 
            size="small" 
            status={record.statut === 'terminee' ? 'success' : 'active'}
          />
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedFormation(record)
              setModalVisible(true)
            }}
          >
            Détails
          </Button>
          {record.statut === 'terminee' && record.certificat && (
            <Button 
              type="default" 
              size="small" 
              icon={<DownloadOutlined />}
            >
              Certificat
            </Button>
          )}
        </Space>
      )
    }
  ]

  const stats = {
    total: formations.length,
    enCours: formations.filter(f => f.statut === 'en_cours').length,
    terminees: formations.filter(f => f.statut === 'terminee').length,
    planifiees: formations.filter(f => f.statut === 'planifiee').length
  }

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>Mes Formations</h1>

      {/* Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Formations"
              value={stats.total}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="En Cours"
              value={stats.enCours}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Terminées"
              value={stats.terminees}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Planifiées"
              value={stats.planifiees}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Formations Table */}
      <Card title="Liste des Formations" style={{ marginBottom: '24px' }}>
        <Table
          columns={columns}
          dataSource={formations}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} formations`
          }}
        />
      </Card>

      {/* Timeline of Recent Activity */}
      <Card title="Activité Récente">
        <Timeline
          items={formations.slice(0, 5).map((formation) => ({
            key: formation.id,
            color: formation.statut === 'terminee' ? 'green' : 
                   formation.statut === 'en_cours' ? 'blue' : 'gray',
            dot: formation.statut === 'terminee' ? <CheckCircleOutlined /> : 
                 formation.statut === 'en_cours' ? <ClockCircleOutlined /> : <CalendarOutlined />,
            children: (
              <>
                <p style={{ margin: 0 }}>
                  <strong>{formation.titre}</strong> - {getStatusText(formation.statut)}
                </p>
                <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>
                  {new Date(formation.dateDebut).toLocaleDateString('fr-FR')} - {formation.formateur}
                </p>
              </>
            )
          }))}
        />
      </Card>

      {/* Formation Details Modal */}
      <Modal
        title="Détails de la Formation"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Fermer
          </Button>,
          selectedFormation?.statut === 'terminee' && selectedFormation?.certificat && (
            <Button key="certificate" type="primary" icon={<DownloadOutlined />}>
              Télécharger Certificat
            </Button>
          )
        ]}
        width={800}
      >
        {selectedFormation && (
          <div>
            <Descriptions title="" bordered column={2}>
              <Descriptions.Item label="Titre" span={2}>
                {selectedFormation.titre}
              </Descriptions.Item>
              <Descriptions.Item label="Formateur">
                {selectedFormation.formateur}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                <Tag color={getTypeColor(selectedFormation.type)}>
                  {selectedFormation.type}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Date de début">
                {new Date(selectedFormation.dateDebut).toLocaleDateString('fr-FR')}
              </Descriptions.Item>
              <Descriptions.Item label="Date de fin">
                {new Date(selectedFormation.dateFin).toLocaleDateString('fr-FR')}
              </Descriptions.Item>
              <Descriptions.Item label="Durée">
                {selectedFormation.duree}
              </Descriptions.Item>
              <Descriptions.Item label="Lieu">
                {selectedFormation.lieu}
              </Descriptions.Item>
              <Descriptions.Item label="Prix">
                {selectedFormation.prix}
              </Descriptions.Item>
              <Descriptions.Item label="Statut">
                <Tag color={getStatusColor(selectedFormation.statut)}>
                  {getStatusText(selectedFormation.statut)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Progression" span={2}>
                <Progress 
                  percent={selectedFormation.progression} 
                  status={selectedFormation.statut === 'terminee' ? 'success' : 'active'}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                {selectedFormation.description}
              </Descriptions.Item>
              <Descriptions.Item label="Compétences" span={2}>
                <Space wrap>
                  {selectedFormation.competences.map((comp, index) => (
                    <Tag key={index} color="blue">{comp}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default MesFormations
