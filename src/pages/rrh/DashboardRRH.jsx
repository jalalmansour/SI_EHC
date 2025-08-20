import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Button, Space, Avatar, Badge, Alert, Progress, Statistic, List, Modal, Form, Input, InputNumber, Select, message, Table, Tag } from 'antd'
import { motion } from 'framer-motion'
import {
  UserOutlined,
  DollarOutlined,
  BookOutlined,
  TeamOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  TrendingUpOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  TrophyOutlined,
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography
const { Option } = Select

const DashboardRRH = () => {
  const navigate = useNavigate()
  const [extensionModalVisible, setExtensionModalVisible] = useState(false)
  const [trainingModalVisible, setTrainingModalVisible] = useState(false)
  const [extensionForm] = Form.useForm()
  const [trainingForm] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Mock data for dashboard
  const dashboardData = {
    totalBudget: 150000,
    usedBudget: 89500,
    remainingBudget: 60500,
    totalTrainings: 45,
    completedTrainings: 32,
    activeTrainings: 13,
    totalEmployees: 250,
    trainedEmployees: 180,
    pendingApprovals: 8,
    extensions: 3,
  }

  const budgetUsagePercent = (dashboardData.usedBudget / dashboardData.totalBudget) * 100
  const trainingCompletionPercent = (dashboardData.completedTrainings / dashboardData.totalTrainings) * 100

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      type: 'training',
      title: 'Formation React.js terminée',
      description: '25 participants ont terminé la formation',
      time: 'Il y a 2 heures',
      status: 'completed',
      icon: <CheckCircleOutlined className="text-green-500" />
    },
    {
      id: 2,
      type: 'budget',
      title: 'Demande de rallonge budgétaire',
      description: 'Demande de 15,000€ pour formations Q4',
      time: 'Il y a 4 heures',
      status: 'pending',
      icon: <ExclamationCircleOutlined className="text-orange-500" />
    },
    {
      id: 3,
      type: 'employee',
      title: 'Nouvelle inscription',
      description: 'Marie Dupont s\'est inscrite à la formation Agile',
      time: 'Il y a 6 heures',
      status: 'new',
      icon: <UserOutlined className="text-blue-500" />
    }
  ]

  // Upcoming trainings data
  const upcomingTrainings = [
    {
      id: 1,
      title: 'Formation Leadership',
      trainer: 'Jean Martin',
      date: '2024-01-15',
      participants: 12,
      status: 'confirmed',
      budget: 8000
    },
    {
      id: 2,
      title: 'Formation Python Avancé',
      trainer: 'Sophie Bernard',
      date: '2024-01-18',
      participants: 8,
      status: 'pending',
      budget: 6000
    },
    {
      id: 3,
      title: 'Formation Communication',
      trainer: 'Pierre Dubois',
      date: '2024-01-20',
      participants: 15,
      status: 'confirmed',
      budget: 5000
    }
  ]

  const handleAddExtension = async (values) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Rallonge budgétaire ajoutée avec succès')
      setExtensionModalVisible(false)
      extensionForm.resetFields()
    } catch (error) {
      message.error('Erreur lors de l\'ajout de la rallonge')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTraining = async (values) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Formation ajoutée avec succès')
      setTrainingModalVisible(false)
      trainingForm.resetFields()
    } catch (error) {
      message.error('Erreur lors de l\'ajout de la formation')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green'
      case 'pending': return 'orange'
      case 'confirmed': return 'blue'
      case 'new': return 'purple'
      default: return 'default'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Terminé'
      case 'pending': return 'En attente'
      case 'confirmed': return 'Confirmé'
      case 'new': return 'Nouveau'
      default: return status
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-6">
          <Title level={2} className="text-gray-900 mb-2">
            Dashboard RRH
          </Title>
          <Text className="text-gray-600">
            Gestion des ressources humaines et des formations
          </Text>
        </div>

        {/* Key Metrics */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="gradient-card-blue text-white">
                <Statistic
                  title="Budget Total"
                  value={dashboardData.totalBudget}
                  prefix={<DollarOutlined />}
                  suffix="€"
                  valueStyle={{ color: 'white' }}
                />
                <Progress
                  percent={budgetUsagePercent}
                  strokeColor="white"
                  showInfo={false}
                  className="mt-2"
                />
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="gradient-card-green text-white">
                <Statistic
                  title="Formations"
                  value={dashboardData.totalTrainings}
                  prefix={<BookOutlined />}
                  valueStyle={{ color: 'white' }}
                />
                <Progress
                  percent={trainingCompletionPercent}
                  strokeColor="white"
                  showInfo={false}
                  className="mt-2"
                />
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="gradient-card-purple text-white">
                <Statistic
                  title="Employés"
                  value={dashboardData.totalEmployees}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: 'white' }}
                />
                <Text className="text-white opacity-80">
                  {dashboardData.trainedEmployees} formés
                </Text>
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="gradient-card-orange text-white">
                <Statistic
                  title="En Attente"
                  value={dashboardData.pendingApprovals}
                  prefix={<ExclamationCircleOutlined />}
                  valueStyle={{ color: 'white' }}
                />
                <Text className="text-white opacity-80">
                  Approbations requises
                </Text>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Main Content */}
        <Row gutter={[16, 16]}>
          {/* Left Column */}
          <Col xs={24} lg={16}>
            {/* Budget Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6"
            >
              <Card
                title={
                  <div className="flex items-center justify-between">
                    <span>Vue d'ensemble du budget</span>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setExtensionModalVisible(true)}
                      className="bg-blue-500 border-blue-500"
                    >
                      Ajouter une rallonge
                    </Button>
                  </div>
                }
                className="shadow-lg"
              >
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <div className="text-center">
                      <Title level={3} className="text-green-600">
                        {dashboardData.usedBudget.toLocaleString()}€
                      </Title>
                      <Text className="text-gray-600">Budget utilisé</Text>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center">
                      <Title level={3} className="text-blue-600">
                        {dashboardData.remainingBudget.toLocaleString()}€
                      </Title>
                      <Text className="text-gray-600">Budget restant</Text>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center">
                      <Title level={3} className="text-orange-600">
                        {dashboardData.extensions}
                      </Title>
                      <Text className="text-gray-600">Rallonges</Text>
                    </div>
                  </Col>
                </Row>
                <Progress
                  percent={budgetUsagePercent}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  className="mt-4"
                />
              </Card>
            </motion.div>

            {/* Upcoming Trainings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card
                title={
                  <div className="flex items-center justify-between">
                    <span>Formations à venir</span>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setTrainingModalVisible(true)}
                      className="bg-green-500 border-green-500"
                    >
                      Ajouter une formation
                    </Button>
                  </div>
                }
                className="shadow-lg"
              >
                <Table
                  dataSource={upcomingTrainings}
                  pagination={false}
                  size="small"
                  columns={[
                    {
                      title: 'Formation',
                      dataIndex: 'title',
                      key: 'title',
                      render: (text) => <Text strong>{text}</Text>
                    },
                    {
                      title: 'Formateur',
                      dataIndex: 'trainer',
                      key: 'trainer',
                    },
                    {
                      title: 'Date',
                      dataIndex: 'date',
                      key: 'date',
                      render: (date) => (
                        <div className="flex items-center">
                          <CalendarOutlined className="mr-1 text-blue-500" />
                          {new Date(date).toLocaleDateString('fr-FR')}
                        </div>
                      )
                    },
                    {
                      title: 'Participants',
                      dataIndex: 'participants',
                      key: 'participants',
                      render: (count) => (
                        <Badge count={count} showZero style={{ backgroundColor: '#52c41a' }} />
                      )
                    },
                    {
                      title: 'Budget',
                      dataIndex: 'budget',
                      key: 'budget',
                      render: (budget) => `${budget.toLocaleString()}€`
                    },
                    {
                      title: 'Statut',
                      dataIndex: 'status',
                      key: 'status',
                      render: (status) => (
                        <Tag color={getStatusColor(status)}>
                          {getStatusText(status)}
                        </Tag>
                      )
                    }
                  ]}
                />
              </Card>
            </motion.div>
          </Col>

          {/* Right Column */}
          <Col xs={24} lg={8}>
            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-6"
            >
              <Card title="Activités récentes" className="shadow-lg">
                <List
                  dataSource={recentActivities}
                  renderItem={(item) => (
                    <List.Item className="border-0 px-0">
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            icon={item.icon}
                            className="bg-gray-100"
                          />
                        }
                        title={
                          <div className="flex items-center justify-between">
                            <Text strong>{item.title}</Text>
                            <Tag color={getStatusColor(item.status)} size="small">
                              {getStatusText(item.status)}
                            </Tag>
                          </div>
                        }
                        description={
                          <div>
                            <Text className="text-gray-600">{item.description}</Text>
                            <div className="text-xs text-gray-400 mt-1">{item.time}</div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card title="Actions rapides" className="shadow-lg">
                <Space direction="vertical" className="w-full">
                  <Button
                    type="primary"
                    icon={<BarChartOutlined />}
                    className="w-full bg-blue-500 border-blue-500"
                    onClick={() => navigate('/rrh/reports')}
                  >
                    Voir les rapports
                  </Button>
                  <Button
                    icon={<FileTextOutlined />}
                    className="w-full"
                    onClick={() => navigate('/rrh/budget')}
                  >
                    Gérer le budget
                  </Button>
                  <Button
                    icon={<TeamOutlined />}
                    className="w-full"
                    onClick={() => navigate('/rrh/participants')}
                  >
                    Gérer les participants
                  </Button>
                  <Button
                    icon={<TrophyOutlined />}
                    className="w-full"
                    onClick={() => navigate('/rrh/catalog')}
                  >
                    Catalogue de formations
                  </Button>
                </Space>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Modals */}
        <Modal
          title="Ajouter une rallonge budgétaire"
          open={extensionModalVisible}
          onCancel={() => setExtensionModalVisible(false)}
          footer={null}
        >
          <Form
            form={extensionForm}
            onFinish={handleAddExtension}
            layout="vertical"
          >
            <Form.Item
              name="amount"
              label="Montant (€)"
              rules={[{ required: true, message: 'Veuillez saisir le montant' }]}
            >
              <InputNumber
                className="w-full"
                min={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
            <Form.Item
              name="reason"
              label="Raison"
              rules={[{ required: true, message: 'Veuillez saisir la raison' }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-blue-500 border-blue-500"
              >
                Ajouter la rallonge
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Ajouter une formation"
          open={trainingModalVisible}
          onCancel={() => setTrainingModalVisible(false)}
          footer={null}
        >
          <Form
            form={trainingForm}
            onFinish={handleAddTraining}
            layout="vertical"
          >
            <Form.Item
              name="title"
              label="Titre de la formation"
              rules={[{ required: true, message: 'Veuillez saisir le titre' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="trainer"
              label="Formateur"
              rules={[{ required: true, message: 'Veuillez saisir le formateur' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Veuillez saisir la date' }]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              name="budget"
              label="Budget (€)"
              rules={[{ required: true, message: 'Veuillez saisir le budget' }]}
            >
              <InputNumber className="w-full" min={0} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-green-500 border-green-500"
              >
                Ajouter la formation
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </motion.div>
    </div>
  )
}

export default DashboardRRH
