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
  Rate
} from 'antd'
import { 
  BookOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  StarOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const DashboardFormateur = () => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)
  const [form] = Form.useForm()

  // Mock data
  const [stats, setStats] = useState({
    totalSessions: 28,
    activeSessions: 3,
    totalStudents: 156,
    averageRating: 4.8
  })

  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'React.js Avancé',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      participants: 15,
      maxParticipants: 20,
      status: 'upcoming',
      location: 'Salle A',
      rating: 4.9,
      progress: 0
    },
    {
      id: 2,
      title: 'Vue.js 3',
      startDate: '2024-02-10',
      endDate: '2024-02-14',
      participants: 12,
      maxParticipants: 15,
      status: 'completed',
      location: 'Salle B',
      rating: 4.7,
      progress: 100
    },
    {
      id: 3,
      title: 'Node.js Backend',
      startDate: '2024-02-05',
      endDate: '2024-02-09',
      participants: 18,
      maxParticipants: 18,
      status: 'completed',
      location: 'Salle C',
      rating: 4.8,
      progress: 100
    }
  ])

  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Ahmed Benali',
      email: 'ahmed.benali@ehc.com',
      currentSession: 'React.js Avancé',
      progress: 75,
      lastActivity: '2024-02-14',
      performance: 'excellent'
    },
    {
      id: 2,
      name: 'Fatima Zahra',
      email: 'fatima.zahra@ehc.com',
      currentSession: 'React.js Avancé',
      progress: 60,
      lastActivity: '2024-02-13',
      performance: 'good'
    },
    {
      id: 3,
      name: 'Karim Mansouri',
      email: 'karim.mansouri@ehc.com',
      currentSession: 'React.js Avancé',
      progress: 90,
      lastActivity: '2024-02-14',
      performance: 'excellent'
    }
  ])

  const sessionColumns = [
    {
      title: 'Formation',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1890ff' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <CalendarOutlined /> {new Date(record.startDate).toLocaleDateString('fr-FR')} - {new Date(record.endDate).toLocaleDateString('fr-FR')}
          </div>
        </div>
      )
    },
    {
      title: 'Participants',
      key: 'participants',
      render: (_, record) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600 }}>{record.participants}/{record.maxParticipants}</div>
          <Progress 
            percent={Math.round((record.participants / record.maxParticipants) * 100)} 
            size="small"
            status={record.participants === record.maxParticipants ? 'success' : 'active'}
          />
        </div>
      )
    },
    {
      title: 'Progression',
      key: 'progress',
      render: (_, record) => (
        <div style={{ textAlign: 'center' }}>
          <Progress 
            percent={record.progress} 
            size="small"
            status={record.progress === 100 ? 'success' : 'active'}
          />
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.progress}% terminé
          </div>
        </div>
      )
    },
    {
      title: 'Note',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <div style={{ textAlign: 'center' }}>
          <Rate disabled defaultValue={rating} style={{ fontSize: '12px' }} />
          <div style={{ fontSize: '12px', color: '#666' }}>
            {rating}/5
          </div>
        </div>
      )
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          upcoming: { color: 'blue', text: 'À venir' },
          active: { color: 'green', text: 'En cours' },
          completed: { color: 'default', text: 'Terminée' }
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
          <Button type="primary" size="small" icon={<EyeOutlined />}>
            Voir
          </Button>
          <Button size="small" icon={<EditOutlined />}>
            Modifier
          </Button>
        </Space>
      )
    }
  ]

  const studentColumns = [
    {
      title: 'Étudiant',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {text.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      )
    },
    {
      title: 'Session actuelle',
      dataIndex: 'currentSession',
      key: 'currentSession'
    },
    {
      title: 'Progression',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress) => (
        <div style={{ textAlign: 'center' }}>
          <Progress 
            percent={progress} 
            size="small"
            status={progress >= 80 ? 'success' : progress >= 60 ? 'normal' : 'exception'}
          />
          <div style={{ fontSize: '12px', color: '#666' }}>
            {progress}%
          </div>
        </div>
      )
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      render: (performance) => {
        const performanceConfig = {
          excellent: { color: 'success', text: 'Excellent' },
          good: { color: 'processing', text: 'Bon' },
          average: { color: 'warning', text: 'Moyen' },
          poor: { color: 'error', text: 'Faible' }
        }
        const config = performanceConfig[performance] || { color: 'default', text: performance }
        return <Badge status={config.color} text={config.text} />
      }
    },
    {
      title: 'Dernière activité',
      dataIndex: 'lastActivity',
      key: 'lastActivity',
      render: (date) => new Date(date).toLocaleDateString('fr-FR')
    }
  ]

  const onFinish = (values) => {
    message.success('Session mise à jour avec succès!')
    setModalVisible(false)
    form.resetFields()
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Tableau de Bord Formateur
      </Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Sessions"
              value={stats.totalSessions}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sessions Actives"
              value={stats.activeSessions}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Étudiants"
              value={stats.totalStudents}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Note Moyenne"
              value={stats.averageRating}
              prefix={<StarOutlined />}
              suffix="/5"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Sessions Management */}
        <Col xs={24} lg={16}>
          <Card 
            title="Mes Sessions" 
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setModalVisible(true)}
              >
                Nouvelle Session
              </Button>
            }
          >
            <Table
              columns={sessionColumns}
              dataSource={sessions}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true
              }}
            />
          </Card>
        </Col>

        {/* Students Overview */}
        <Col xs={24} lg={8}>
          <Card title="Mes Étudiants">
            <List
              size="small"
              dataSource={students}
              renderItem={(student) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '4px'
                    }}>
                      <Text strong>{student.name}</Text>
                      <Badge 
                        status={student.performance === 'excellent' ? 'success' : 
                               student.performance === 'good' ? 'processing' : 'default'} 
                        text={student.performance === 'excellent' ? 'Excellent' : 
                              student.performance === 'good' ? 'Bon' : 'Moyen'} 
                      />
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                      {student.currentSession}
                    </div>
                    <Progress 
                      percent={student.progress} 
                      size="small"
                      status={student.progress >= 80 ? 'success' : 'active'}
                    />
                  </div>
                </List.Item>
              )}
            />
          </Card>

          {/* Recent Activities */}
          <Card title="Activités récentes" style={{ marginTop: '16px' }}>
            <Timeline>
              <Timeline.Item color="green">
                <p>Session React.js terminée avec succès</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Il y a 2 heures</p>
              </Timeline.Item>
              <Timeline.Item color="blue">
                <p>Nouvelle session Vue.js planifiée</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Il y a 4 heures</p>
              </Timeline.Item>
              <Timeline.Item color="green">
                <p>Évaluation des étudiants soumise</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Il y a 1 jour</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* Students Management */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24}>
          <Card title="Gestion des Étudiants">
            <Table
              columns={studentColumns}
              dataSource={students}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Session Details Modal */}
      <Modal
        title="Détails de la Session"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Fermer
          </Button>,
          <Button key="submit" type="primary">
            Mettre à jour
          </Button>
        ]}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Titre de la formation"
                rules={[{ required: true, message: 'Veuillez saisir le titre' }]}
              >
                <Input placeholder="Ex: React.js Avancé" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Lieu"
                rules={[{ required: true, message: 'Veuillez saisir le lieu' }]}
              >
                <Input placeholder="Ex: Salle de formation A" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Date de début"
                rules={[{ required: true, message: 'Veuillez sélectionner la date de début' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="Date de fin"
                rules={[{ required: true, message: 'Veuillez sélectionner la date de fin' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={4} placeholder="Description de la formation..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DashboardFormateur
