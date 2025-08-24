import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Progress, 
  Table, 
  Button, 
  Tag, 
  Space, 
  Typography, 
  Avatar,
  List,
  Badge,
  Calendar,
  Select,
  DatePicker,
  Divider
} from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  DollarOutlined, 
  TrophyOutlined,
  TeamOutlined,
  CalendarOutlined,
  BarChartOutlined,
  RiseOutlined,
  FallOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { getRoleDisplayName } from '../../utils/roleUtils';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const DashboardRRH = () => {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [dateRange, setDateRange] = useState(null);

  // Mock data - replace with actual API calls
  const dashboardStats = {
    totalEmployees: 245,
    activeFormations: 18,
    totalBudget: 125000,
    usedBudget: 87500,
    completedFormations: 156,
    pendingRequests: 23,
    upcomingSessions: 8,
    satisfactionRate: 92
  };

  const recentActivities = [
    {
      id: 1,
      type: 'formation',
      title: 'Formation React.js terminée',
      description: '25 participants ont complété la formation',
      time: 'Il y a 2 heures',
      status: 'completed'
    },
    {
      id: 2,
      type: 'budget',
      title: 'Nouvelle demande de budget',
      description: 'Demande de 15,000 DHS pour formation leadership',
      time: 'Il y a 4 heures',
      status: 'pending'
    },
    {
      id: 3,
      type: 'participant',
      title: 'Nouvelle inscription',
      description: 'Ahmed Benali s\'est inscrit à la formation Python',
      time: 'Il y a 6 heures',
      status: 'new'
    },
    {
      id: 4,
      type: 'evaluation',
      title: 'Évaluation à chaud',
      description: 'Formation Excel - Taux de satisfaction: 94%',
      time: 'Il y a 1 jour',
      status: 'completed'
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Formation Leadership',
      trainer: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      time: '09:00 - 17:00',
      participants: 12,
      location: 'Salle de conférence A',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Formation Excel Avancé',
      trainer: 'Mohammed Alami',
      date: '2024-01-17',
      time: '14:00 - 18:00',
      participants: 8,
      location: 'Salle de formation B',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Formation Communication',
      trainer: 'Fatima Zahra',
      date: '2024-01-20',
      time: '10:00 - 16:00',
      participants: 15,
      location: 'Salle de conférence A',
      status: 'pending'
    }
  ];

  const budgetBreakdown = [
    { category: 'Formations Techniques', amount: 45000, percentage: 36 },
    { category: 'Formations Soft Skills', amount: 35000, percentage: 28 },
    { category: 'Certifications', amount: 25000, percentage: 20 },
    { category: 'Formations Leadership', amount: 15000, percentage: 12 },
    { category: 'Autres', amount: 5000, percentage: 4 }
  ];

  const getStatusColor = (status) => {
    const colors = {
      completed: 'success',
      pending: 'warning',
      new: 'processing',
      confirmed: 'success',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: <CheckCircleOutlined />,
      pending: <ClockCircleOutlined />,
      new: <ExclamationCircleOutlined />,
      confirmed: <CheckCircleOutlined />,
      cancelled: <ExclamationCircleOutlined />
    };
    return icons[status] || <ClockCircleOutlined />;
  };

  const activityColumns = [
    {
      title: 'Activité',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          {getStatusIcon(record.status)}
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.description}
            </Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'completed' ? 'Terminé' : 
           status === 'pending' ? 'En attente' : 
           status === 'new' ? 'Nouveau' : status}
        </Tag>
      )
    },
    {
      title: 'Temps',
      dataIndex: 'time',
      key: 'time',
      render: (time) => <Text type="secondary">{time}</Text>
    }
  ];

  const sessionColumns = [
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
      render: (trainer) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text>{trainer}</Text>
        </Space>
      )
    },
    {
      title: 'Date & Heure',
      key: 'datetime',
      render: (_, record) => (
        <div>
          <Text>{record.date}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.time}
          </Text>
        </div>
      )
    },
    {
      title: 'Participants',
      dataIndex: 'participants',
      key: 'participants',
      render: (participants) => (
        <Badge count={participants} showZero style={{ backgroundColor: '#52c41a' }} />
      )
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'confirmed' ? 'Confirmé' : 
           status === 'pending' ? 'En attente' : status}
        </Tag>
      )
    }
  ];

  return (
    <div className="rrh-dashboard">
      {/* Header */}
      <div className="dashboard-header" style={{ marginBottom: '24px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Tableau de Bord RRH
            </Title>
            <Text type="secondary">
              Bienvenue, {user?.firstName || 'Responsable RH'} - {getRoleDisplayName(user?.role)}
            </Text>
          </Col>
          <Col>
            <Space>
              <Select 
                value={selectedPeriod} 
                onChange={setSelectedPeriod}
                style={{ width: 120 }}
              >
                <Select.Option value="week">Cette semaine</Select.Option>
                <Select.Option value="month">Ce mois</Select.Option>
                <Select.Option value="quarter">Ce trimestre</Select.Option>
                <Select.Option value="year">Cette année</Select.Option>
              </Select>
              <RangePicker 
                value={dateRange}
                onChange={setDateRange}
                placeholder={['Date début', 'Date fin']}
              />
            </Space>
          </Col>
        </Row>
      </div>

      {/* Key Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Employés"
              value={dashboardStats.totalEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress 
              percent={85} 
              size="small" 
              showInfo={false}
              strokeColor="#1890ff"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Formations Actives"
              value={dashboardStats.activeFormations}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress 
              percent={72} 
              size="small" 
              showInfo={false}
              strokeColor="#52c41a"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Budget Utilisé"
              value={dashboardStats.usedBudget}
              prefix={<DollarOutlined />}
              suffix="DHS"
              valueStyle={{ color: '#faad14' }}
            />
            <Progress 
              percent={70} 
              size="small" 
              showInfo={false}
              strokeColor="#faad14"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Taux de Satisfaction"
              value={dashboardStats.satisfactionRate}
              prefix={<TrophyOutlined />}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
            <Progress 
              percent={dashboardStats.satisfactionRate} 
              size="small" 
              showInfo={false}
              strokeColor="#722ed1"
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <BarChartOutlined />
                Activités Récentes
              </Space>
            }
            extra={<Button type="link">Voir tout</Button>}
          >
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={getStatusIcon(item.status)}
                        style={{ backgroundColor: getStatusColor(item.status) === 'success' ? '#52c41a' : '#faad14' }}
                      />
                    }
                    title={item.title}
                    description={
                      <div>
                        <Text type="secondary">{item.description}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {item.time}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Budget Breakdown */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <DollarOutlined />
                Répartition du Budget
              </Space>
            }
            extra={<Button type="link">Détails</Button>}
          >
            {budgetBreakdown.map((item, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <Text>{item.category}</Text>
                  <Text strong>{item.amount.toLocaleString()} DHS</Text>
                </div>
                <Progress 
                  percent={item.percentage} 
                  size="small" 
                  showInfo={false}
                  strokeColor={['#1890ff', '#52c41a', '#faad14', '#722ed1', '#13c2c2'][index]}
                />
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      {/* Upcoming Sessions */}
      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card 
            title={
              <Space>
                <CalendarOutlined />
                Sessions à Venir
              </Space>
            }
            extra={<Button type="primary">Planifier une session</Button>}
          >
            <Table
              columns={sessionColumns}
              dataSource={upcomingSessions}
              pagination={false}
              rowKey="id"
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Actions Rapides">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Button 
                  type="primary" 
                  block 
                  icon={<BookOutlined />}
                  size="large"
                >
                  Nouvelle Formation
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button 
                  block 
                  icon={<TeamOutlined />}
                  size="large"
                >
                  Gérer Participants
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button 
                  block 
                  icon={<DollarOutlined />}
                  size="large"
                >
                  Gérer Budget
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button 
                  block 
                  icon={<BarChartOutlined />}
                  size="large"
                >
                  Générer Rapport
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardRRH;
