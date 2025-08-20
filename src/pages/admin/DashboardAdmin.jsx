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
  Switch
} from 'antd'
import { 
  SettingOutlined, 
  TeamOutlined, 
  BookOutlined, 
  DollarOutlined,
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BarChartOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  TrophyOutlined,
  SecurityScanOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select

const DashboardAdmin = () => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [form] = Form.useForm()

  // Mock data
  const [stats, setStats] = useState({
    totalUsers: 245,
    activeUsers: 198,
    totalCourses: 67,
    totalBudget: 1250000,
    systemHealth: 98
  })

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ahmed Benali',
      email: 'ahmed.benali@ehc.com',
      role: 'EMPLOYEE',
      department: 'IT',
      status: 'active',
      lastLogin: '2024-02-14',
      loginCount: 45
    },
    {
      id: 2,
      name: 'Fatima Zahra',
      email: 'fatima.zahra@ehc.com',
      role: 'RRH',
      department: 'RH',
      status: 'active',
      lastLogin: '2024-02-14',
      loginCount: 32
    },
    {
      id: 3,
      name: 'Karim Mansouri',
      email: 'karim.mansouri@ehc.com',
      role: 'MANAGER',
      department: 'IT',
      status: 'inactive',
      lastLogin: '2024-02-10',
      loginCount: 28
    }
  ])

  const [systemLogs, setSystemLogs] = useState([
    {
      id: 1,
      action: 'Nouvel utilisateur créé',
      user: 'Admin',
      timestamp: '2024-02-14 15:30:00',
      level: 'info'
    },
    {
      id: 2,
      action: 'Tentative de connexion échouée',
      user: 'unknown@ehc.com',
      timestamp: '2024-02-14 14:25:00',
      level: 'warning'
    },
    {
      id: 3,
      action: 'Sauvegarde automatique effectuée',
      user: 'System',
      timestamp: '2024-02-14 02:00:00',
      level: 'info'
    },
    {
      id: 4,
      action: 'Mise à jour de la base de données',
      user: 'System',
      timestamp: '2024-02-14 01:30:00',
      level: 'info'
    }
  ])

  const userColumns = [
    {
      title: 'Utilisateur',
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
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const roleConfig = {
          ADMIN: { color: 'red', text: 'Administrateur' },
          RRH: { color: 'blue', text: 'RH' },
          RF: { color: 'green', text: 'Responsable Formation' },
          MANAGER: { color: 'orange', text: 'Manager' },
          EMPLOYEE: { color: 'default', text: 'Employé' },
          TRAINER: { color: 'purple', text: 'Formateur' }
        }
        const config = roleConfig[role] || { color: 'default', text: role }
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: 'Département',
      dataIndex: 'department',
      key: 'department',
      render: (dept) => <Tag color="blue">{dept}</Tag>
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'active' ? 'success' : 'default'} 
          text={status === 'active' ? 'Actif' : 'Inactif'} 
        />
      )
    },
    {
      title: 'Dernière connexion',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date) => new Date(date).toLocaleDateString('fr-FR')
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
          <Button size="small" danger icon={<DeleteOutlined />}>
            Supprimer
          </Button>
        </Space>
      )
    }
  ]

  const logColumns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action'
    },
    {
      title: 'Utilisateur',
      dataIndex: 'user',
      key: 'user'
    },
    {
      title: 'Horodatage',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => new Date(timestamp).toLocaleString('fr-FR')
    },
    {
      title: 'Niveau',
      dataIndex: 'level',
      key: 'level',
      render: (level) => {
        const levelConfig = {
          info: { color: 'blue', text: 'Info' },
          warning: { color: 'orange', text: 'Avertissement' },
          error: { color: 'red', text: 'Erreur' }
        }
        const config = levelConfig[level] || { color: 'default', text: level }
        return <Tag color={config.color}>{config.text}</Tag>
      }
    }
  ]

  const onFinish = (values) => {
    message.success('Utilisateur mis à jour avec succès!')
    setModalVisible(false)
    form.resetFields()
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Tableau de Bord Administrateur
      </Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Utilisateurs"
              value={stats.totalUsers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Utilisateurs Actifs"
              value={stats.activeUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Formations"
              value={stats.totalCourses}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Santé du Système"
              value={stats.systemHealth}
              prefix={<SecurityScanOutlined />}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* User Management */}
        <Col xs={24} lg={16}>
          <Card 
            title="Gestion des Utilisateurs" 
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setModalVisible(true)}
              >
                Nouvel Utilisateur
              </Button>
            }
          >
            <Table
              columns={userColumns}
              dataSource={users}
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

        {/* System Overview */}
        <Col xs={24} lg={8}>
          <Card title="Aperçu du Système">
            <List
              size="small"
              dataSource={[
                { label: 'Base de données', status: 'online', value: 'MySQL 8.0' },
                { label: 'Serveur Web', status: 'online', value: 'Node.js 18' },
                { label: 'Stockage', status: 'online', value: '85% utilisé' },
                { label: 'Mémoire', status: 'warning', value: '72% utilisé' },
                { label: 'CPU', status: 'online', value: '45% utilisé' }
              ]}
              renderItem={(item) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '4px'
                    }}>
                      <Text>{item.label}</Text>
                      <Badge 
                        status={item.status === 'online' ? 'success' : 
                               item.status === 'warning' ? 'warning' : 'error'} 
                        text={item.value} 
                      />
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>

          {/* Recent System Logs */}
          <Card title="Logs Système" style={{ marginTop: '16px' }}>
            <Timeline>
              {systemLogs.slice(0, 5).map((log) => (
                <Timeline.Item 
                  key={log.id}
                  color={log.level === 'error' ? 'red' : log.level === 'warning' ? 'orange' : 'blue'}
                >
                  <p style={{ margin: 0, fontSize: '12px' }}>{log.action}</p>
                  <p style={{ margin: 0, fontSize: '10px', color: '#666' }}>
                    {new Date(log.timestamp).toLocaleString('fr-FR')} • {log.user}
                  </p>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* System Logs */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24}>
          <Card title="Logs Système Détaillés">
            <Table
              columns={logColumns}
              dataSource={systemLogs}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 15,
                showSizeChanger: true,
                showQuickJumper: true
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* User Management Modal */}
      <Modal
        title="Gestion Utilisateur"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Annuler
          </Button>,
          <Button key="submit" type="primary">
            Enregistrer
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
                name="firstName"
                label="Prénom"
                rules={[{ required: true, message: 'Veuillez saisir le prénom' }]}
              >
                <Input placeholder="Prénom" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Nom"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Nom" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Veuillez saisir l\'email' },
              { type: 'email', message: 'Veuillez saisir un email valide' }
            ]}
          >
            <Input placeholder="email@ehc.com" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Rôle"
                rules={[{ required: true, message: 'Veuillez sélectionner le rôle' }]}
              >
                <Select placeholder="Sélectionner le rôle">
                  <Option value="ADMIN">Administrateur</Option>
                  <Option value="RRH">RH</Option>
                  <Option value="RF">Responsable Formation</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="EMPLOYEE">Employé</Option>
                  <Option value="TRAINER">Formateur</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Département"
                rules={[{ required: true, message: 'Veuillez sélectionner le département' }]}
              >
                <Select placeholder="Sélectionner le département">
                  <Option value="IT">IT</Option>
                  <Option value="RH">RH</Option>
                  <Option value="FINANCE">Finance</Option>
                  <Option value="MARKETING">Marketing</Option>
                  <Option value="SALES">Ventes</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="isActive"
            label="Statut"
            valuePropName="checked"
          >
            <Switch checkedChildren="Actif" unCheckedChildren="Inactif" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DashboardAdmin