import React, { useState, useEffect } from 'react'
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Table, 
  Button, 
  Tag, 
  Progress, 
  Space,
  Typography,
  Avatar,
  List,
  Badge,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Timeline,
  Descriptions
} from 'antd'
import { 
  TeamOutlined, 
  BookOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BarChartOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  TrophyOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select

const DashboardManager = () => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [form] = Form.useForm()

  // Mock data
  const [stats, setStats] = useState({
    teamMembers: 12,
    pendingRequests: 5,
    approvedRequests: 23,
    teamTrainingHours: 156
  })

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Ahmed Benali',
      position: 'Développeur Senior',
      email: 'ahmed.benali@ehc.com',
      status: 'active',
      lastTraining: '2024-01-15',
      trainingCount: 5,
      skills: ['React', 'Node.js', 'TypeScript']
    },
    {
      id: 2,
      name: 'Fatima Zahra',
      position: 'Développeuse Frontend',
      email: 'fatima.zahra@ehc.com',
      status: 'active',
      lastTraining: '2024-01-10',
      trainingCount: 3,
      skills: ['Vue.js', 'CSS', 'JavaScript']
    },
    {
      id: 3,
      name: 'Karim Mansouri',
      position: 'Développeur Backend',
      email: 'karim.mansouri@ehc.com',
      status: 'active',
      lastTraining: '2024-01-20',
      trainingCount: 4,
      skills: ['Java', 'Spring', 'MySQL']
    }
  ])

  const [trainingRequests, setTrainingRequests] = useState([
    {
      id: 1,
      employee: 'Ahmed Benali',
      training: 'React.js Avancé',
      requestDate: '2024-01-25',
      status: 'pending',
      priority: 'high',
      estimatedCost: 15000,
      justification: 'Besoin de compétences avancées pour le projet en cours'
    },
    {
      id: 2,
      employee: 'Fatima Zahra',
      training: 'Vue.js 3',
      requestDate: '2024-01-24',
      status: 'approved',
      priority: 'medium',
      estimatedCost: 12000,
      justification: 'Formation nécessaire pour la maintenance du projet existant'
    },
    {
      id: 3,
      employee: 'Karim Mansouri',
      training: 'Spring Boot',
      requestDate: '2024-01-23',
      status: 'rejected',
      priority: 'low',
      estimatedCost: 18000,
      justification: 'Amélioration des compétences backend'
    }
  ])

  const teamColumns = [
    {
      title: 'Membre',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {text.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.position}</div>
          </div>
        </Space>
      )
    },
    {
      title: 'Compétences',
      dataIndex: 'skills',
      key: 'skills',
      render: (skills) => (
        <Space wrap>
          {skills.map((skill, index) => (
            <Tag key={index} color="blue" size="small">{skill}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'Formations',
      dataIndex: 'trainingCount',
      key: 'trainingCount',
      render: (count) => (
        <div style={{ textAlign: 'center' }}>
          <BookOutlined style={{ color: '#52c41a' }} />
          <br />
          {count}
        </div>
      )
    },
    {
      title: 'Dernière Formation',
      dataIndex: 'lastTraining',
      key: 'lastTraining',
      render: (date) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" size="small" icon={<EyeOutlined />}>
            Profil
          </Button>
          <Button size="small" icon={<EditOutlined />}>
            Évaluer
          </Button>
        </Space>
      )
    }
  ]

  const requestColumns = [
    {
      title: 'Employé',
      dataIndex: 'employee',
      key: 'employee'
    },
    {
      title: 'Formation',
      dataIndex: 'training',
      key: 'training',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Date de demande',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (date) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
      title: 'Priorité',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        const priorityConfig = {
          high: { color: 'red', text: 'Élevée' },
          medium: { color: 'orange', text: 'Moyenne' },
          low: { color: 'green', text: 'Faible' }
        }
        const config = priorityConfig[priority] || { color: 'default', text: priority }
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: 'Coût estimé',
      dataIndex: 'estimatedCost',
      key: 'estimatedCost',
      render: (cost) => `${cost.toLocaleString()} DHS`
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          pending: { color: 'processing', text: 'En attente' },
          approved: { color: 'success', text: 'Approuvée' },
          rejected: { color: 'error', text: 'Rejetée' }
        }
        const config = statusConfig[status] || { color: 'default', text: status }
        return <Tag color={config.color}>{config.text}</Tag>
      }
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
              setSelectedRequest(record)
              setModalVisible(true)
            }}
          >
            Détails
          </Button>
          {record.status === 'pending' && (
            <>
              <Button size="small" type="primary" style={{ backgroundColor: '#52c41a' }}>
                Approuver
              </Button>
              <Button size="small" danger>
                Rejeter
              </Button>
            </>
          )}
        </Space>
      )
    }
  ]

  const onFinish = (values) => {
    message.success('Évaluation soumise avec succès!')
    setModalVisible(false)
    form.resetFields()
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Tableau de Bord Manager
      </Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Membres d'équipe"
              value={stats.teamMembers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Demandes en attente"
              value={stats.pendingRequests}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Demandes approuvées"
              value={stats.approvedRequests}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Heures de formation"
              value={stats.teamTrainingHours}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Team Management */}
        <Col xs={24} lg={12}>
          <Card 
            title="Gestion d'équipe" 
            extra={
              <Button type="primary" icon={<PlusOutlined />}>
                Ajouter membre
              </Button>
            }
          >
            <Table
              columns={teamColumns}
              dataSource={teamMembers}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 5,
                showSizeChanger: true,
                showQuickJumper: true
              }}
            />
          </Card>
        </Col>

        {/* Training Requests */}
        <Col xs={24} lg={12}>
          <Card title="Demandes de formation">
            <Table
              columns={requestColumns}
              dataSource={trainingRequests}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 5,
                showSizeChanger: true,
                showQuickJumper: true
              }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        {/* Team Performance */}
        <Col xs={24} lg={12}>
          <Card title="Performance de l'équipe">
            <List
              dataSource={teamMembers}
              renderItem={(member) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <Text strong>{member.name}</Text>
                      <Badge 
                        status={member.status === 'active' ? 'success' : 'default'} 
                        text={member.status === 'active' ? 'Actif' : 'Inactif'} 
                      />
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                      {member.position} • {member.trainingCount} formations complétées
                    </div>
                    <Progress 
                      percent={Math.min(member.trainingCount * 20, 100)} 
                      size="small"
                      status="active"
                    />
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card title="Activités récentes">
            <Timeline>
              <Timeline.Item color="green">
                <p>Demande de formation approuvée pour Ahmed Benali</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Il y a 2 heures</p>
              </Timeline.Item>
              <Timeline.Item color="blue">
                <p>Nouvelle demande de formation soumise par Fatima Zahra</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Il y a 4 heures</p>
              </Timeline.Item>
              <Timeline.Item color="green">
                <p>Formation React.js terminée par Karim Mansouri</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Il y a 1 jour</p>
              </Timeline.Item>
              <Timeline.Item color="orange">
                <p>Évaluation de performance planifiée</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Il y a 2 jours</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* Request Details Modal */}
      <Modal
        title="Détails de la demande"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Fermer
          </Button>,
          selectedRequest?.status === 'pending' && (
            <>
              <Button key="approve" type="primary" style={{ backgroundColor: '#52c41a' }}>
                Approuver
              </Button>
              <Button key="reject" danger>
                Rejeter
              </Button>
            </>
          )
        ]}
        width={600}
      >
        {selectedRequest && (
          <div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Employé">
                {selectedRequest.employee}
              </Descriptions.Item>
              <Descriptions.Item label="Formation">
                {selectedRequest.training}
              </Descriptions.Item>
              <Descriptions.Item label="Date de demande">
                {new Date(selectedRequest.requestDate).toLocaleDateString('fr-FR')}
              </Descriptions.Item>
              <Descriptions.Item label="Coût estimé">
                {selectedRequest.estimatedCost.toLocaleString()} DHS
              </Descriptions.Item>
              <Descriptions.Item label="Priorité">
                <Tag color={selectedRequest.priority === 'high' ? 'red' : selectedRequest.priority === 'medium' ? 'orange' : 'green'}>
                  {selectedRequest.priority === 'high' ? 'Élevée' : selectedRequest.priority === 'medium' ? 'Moyenne' : 'Faible'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Justification">
                {selectedRequest.justification}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default DashboardManager
