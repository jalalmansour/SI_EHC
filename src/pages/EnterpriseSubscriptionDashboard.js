"use client"

import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Statistic,
  Progress,
  Modal,
  Form,
  Input,
  Select,
  Tabs,
  List,
  Avatar,
  Descriptions,
  Badge,
} from "antd"
import {
  CrownOutlined,
  TeamOutlined,
  DollarOutlined,
  TrophyOutlined,
  BarChartOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DownloadOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons"
import { Line, Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import moment from "moment"

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
)

const { Title, Text } = Typography
const { TabPane } = Tabs

// Données simulées des entreprises abonnées
const ENTERPRISE_SUBSCRIPTIONS = [
  {
    id: 1,
    companyName: "TechCorp Solutions",
    contactPerson: "Marie Dubois",
    email: "marie.dubois@techcorp.com",
    phone: "+33 1 23 45 67 89",
    plan: "Enterprise Premium",
    users: 500,
    maxUsers: 1000,
    monthlyRevenue: 15000,
    startDate: "2024-01-15",
    status: "active",
    industry: "Technologie",
    country: "France",
    usage: {
      trainingsCompleted: 2450,
      activeUsers: 485,
      satisfaction: 4.7,
    },
  },
  {
    id: 2,
    companyName: "Global Manufacturing Inc",
    contactPerson: "John Smith",
    email: "j.smith@globalmanuf.com",
    phone: "+1 555 123 4567",
    plan: "Enterprise Standard",
    users: 750,
    maxUsers: 1000,
    monthlyRevenue: 12000,
    startDate: "2023-11-20",
    status: "active",
    industry: "Manufacturing",
    country: "USA",
    usage: {
      trainingsCompleted: 3200,
      activeUsers: 720,
      satisfaction: 4.5,
    },
  },
  {
    id: 3,
    companyName: "HealthCare Plus",
    contactPerson: "Dr. Sarah Johnson",
    email: "sarah.j@healthcareplus.com",
    phone: "+44 20 7123 4567",
    plan: "Enterprise Premium",
    users: 300,
    maxUsers: 500,
    monthlyRevenue: 8500,
    startDate: "2024-03-01",
    status: "active",
    industry: "Santé",
    country: "UK",
    usage: {
      trainingsCompleted: 1800,
      activeUsers: 285,
      satisfaction: 4.8,
    },
  },
  {
    id: 4,
    companyName: "EduTech Academy",
    contactPerson: "Pierre Martin",
    email: "p.martin@edutech.fr",
    phone: "+33 4 56 78 90 12",
    plan: "Enterprise Standard",
    users: 200,
    maxUsers: 300,
    monthlyRevenue: 5500,
    startDate: "2024-02-10",
    status: "trial",
    industry: "Éducation",
    country: "France",
    usage: {
      trainingsCompleted: 950,
      activeUsers: 180,
      satisfaction: 4.6,
    },
  },
  {
    id: 5,
    companyName: "Financial Services Corp",
    contactPerson: "Anna Weber",
    email: "a.weber@finservices.de",
    phone: "+49 30 1234 5678",
    plan: "Enterprise Premium",
    users: 400,
    maxUsers: 600,
    monthlyRevenue: 11000,
    startDate: "2023-12-05",
    status: "active",
    industry: "Finance",
    country: "Germany",
    usage: {
      trainingsCompleted: 2100,
      activeUsers: 380,
      satisfaction: 4.4,
    },
  },
]

const EnterpriseSubscriptionDashboard = () => {
  const [subscriptions, setSubscriptions] = useState(ENTERPRISE_SUBSCRIPTIONS)
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Calculs des statistiques
  const totalRevenue = subscriptions.reduce((sum, sub) => sum + sub.monthlyRevenue, 0)
  const totalUsers = subscriptions.reduce((sum, sub) => sum + sub.users, 0)
  const activeSubscriptions = subscriptions.filter((sub) => sub.status === "active").length
  const averageSatisfaction = subscriptions.reduce((sum, sub) => sum + sub.usage.satisfaction, 0) / subscriptions.length

  // Configuration des graphiques
  const revenueChartData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
    datasets: [
      {
        label: "Revenus Mensuels (€)",
        data: [45000, 48000, 52000, 49000, 55000, 52000],
        borderColor: "#238D94",
        backgroundColor: "rgba(35, 141, 148, 0.1)",
        tension: 0.4,
      },
    ],
  }

  const industryChartData = {
    labels: ["Technologie", "Manufacturing", "Santé", "Éducation", "Finance"],
    datasets: [
      {
        data: [2, 1, 1, 1, 1],
        backgroundColor: ["#238D94", "#52c41a", "#1890ff", "#faad14", "#722ed1"],
      },
    ],
  }

  const usageChartData = {
    labels: subscriptions.map((sub) => sub.companyName.split(" ")[0]),
    datasets: [
      {
        label: "Utilisateurs Actifs",
        data: subscriptions.map((sub) => sub.usage.activeUsers),
        backgroundColor: "#238D94",
      },
      {
        label: "Formations Complétées",
        data: subscriptions.map((sub) => sub.usage.trainingsCompleted / 10),
        backgroundColor: "#52c41a",
      },
    ],
  }

  const columns = [
    {
      title: "Entreprise",
      dataIndex: "companyName",
      key: "companyName",
      render: (name, record) => (
        <Space>
          <Avatar style={{ backgroundColor: "#238D94" }}>{name.charAt(0)}</Avatar>
          <div>
            <Text strong>{name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.industry}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contactPerson",
      key: "contactPerson",
      render: (person, record) => (
        <div>
          <Text>{person}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.email}
          </Text>
        </div>
      ),
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      render: (plan) => {
        const color = plan.includes("Premium") ? "gold" : "blue"
        const icon = plan.includes("Premium") ? <CrownOutlined /> : <TrophyOutlined />
        return (
          <Tag color={color} icon={icon}>
            {plan}
          </Tag>
        )
      },
    },
    {
      title: "Utilisateurs",
      key: "users",
      render: (_, record) => (
        <div>
          <Text strong>
            {record.users}/{record.maxUsers}
          </Text>
          <Progress
            percent={(record.users / record.maxUsers) * 100}
            size="small"
            showInfo={false}
            strokeColor="#238D94"
          />
        </div>
      ),
    },
    {
      title: "Revenus/Mois",
      dataIndex: "monthlyRevenue",
      key: "monthlyRevenue",
      render: (revenue) => (
        <Text strong style={{ color: "#52c41a" }}>
          {revenue.toLocaleString()} €
        </Text>
      ),
      sorter: (a, b) => a.monthlyRevenue - b.monthlyRevenue,
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          active: "success",
          trial: "warning",
          suspended: "error",
        }
        const labels = {
          active: "Actif",
          trial: "Essai",
          suspended: "Suspendu",
        }
        return <Tag color={colors[status]}>{labels[status]}</Tag>
      },
    },
    {
      title: "Satisfaction",
      key: "satisfaction",
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <Text strong>{record.usage.satisfaction}/5</Text>
          <br />
          <Progress
            type="circle"
            percent={(record.usage.satisfaction / 5) * 100}
            width={40}
            strokeColor="#faad14"
            format={() => "⭐"}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedSubscription(record)
              setDetailModalVisible(true)
            }}
          >
            Détails
          </Button>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedSubscription(record)
              form.setFieldsValue(record)
              setModalVisible(true)
            }}
          >
            Modifier
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <CrownOutlined style={{ marginRight: 8, color: "#238D94" }} />
          Dashboard Abonnements Entreprise
        </Title>
        <Text type="secondary">Gestion et suivi des entreprises clientes de la plateforme SIRH EHC</Text>
      </div>

      {/* Statistiques principales */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Revenus Mensuels"
              value={totalRevenue}
              suffix="€"
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Abonnements Actifs"
              value={activeSubscriptions}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#238D94" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Utilisateurs Total"
              value={totalUsers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Satisfaction Moyenne"
              value={averageSatisfaction.toFixed(1)}
              suffix="/5"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Graphiques */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Évolution des Revenus" extra={<BarChartOutlined />}>
            <Line data={revenueChartData} options={{ responsive: true }} />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card title="Répartition par Secteur">
            <Pie data={industryChartData} options={{ responsive: true }} />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card title="Top Entreprises">
            <List
              size="small"
              dataSource={subscriptions.slice(0, 3)}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Badge count={index + 1} style={{ backgroundColor: "#238D94" }}>
                        <Avatar>{item.companyName.charAt(0)}</Avatar>
                      </Badge>
                    }
                    title={item.companyName}
                    description={`${item.monthlyRevenue.toLocaleString()} €/mois`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau des abonnements */}
      <Card
        title="Abonnements Entreprise"
        extra={
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setSelectedSubscription(null)
                form.resetFields()
                setModalVisible(true)
              }}
              style={{ backgroundColor: "#238D94", borderColor: "#238D94" }}
            >
              Nouvel Abonnement
            </Button>
            <Button icon={<DownloadOutlined />}>Exporter</Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={subscriptions}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} abonnements`,
          }}
        />
      </Card>

      {/* Modal de détails */}
      <Modal
        title={`Détails - ${selectedSubscription?.companyName}`}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Fermer
          </Button>,
        ]}
      >
        {selectedSubscription && (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Informations Générales" key="1">
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Entreprise" span={2}>
                  {selectedSubscription.companyName}
                </Descriptions.Item>
                <Descriptions.Item label="Contact">{selectedSubscription.contactPerson}</Descriptions.Item>
                <Descriptions.Item label="Email">
                  <Space>
                    <MailOutlined />
                    {selectedSubscription.email}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Téléphone">
                  <Space>
                    <PhoneOutlined />
                    {selectedSubscription.phone}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Pays">
                  <Space>
                    <GlobalOutlined />
                    {selectedSubscription.country}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Plan">
                  <Tag color={selectedSubscription.plan.includes("Premium") ? "gold" : "blue"}>
                    {selectedSubscription.plan}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Date de début">
                  {moment(selectedSubscription.startDate).format("DD/MM/YYYY")}
                </Descriptions.Item>
              </Descriptions>
            </TabPane>
            <TabPane tab="Utilisation" key="2">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Statistic
                    title="Formations Complétées"
                    value={selectedSubscription.usage.trainingsCompleted}
                    prefix={<TrophyOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Utilisateurs Actifs"
                    value={selectedSubscription.usage.activeUsers}
                    prefix={<TeamOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Satisfaction"
                    value={selectedSubscription.usage.satisfaction}
                    suffix="/5"
                    prefix={<TrophyOutlined />}
                  />
                </Col>
              </Row>
              <div style={{ marginTop: 24 }}>
                <Bar
                  data={{
                    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
                    datasets: [
                      {
                        label: "Utilisateurs Actifs",
                        data: [320, 340, 360, 380, 400, selectedSubscription.usage.activeUsers],
                        backgroundColor: "#238D94",
                      },
                    ],
                  }}
                  options={{ responsive: true }}
                />
              </div>
            </TabPane>
          </Tabs>
        )}
      </Modal>

      {/* Modal d'édition */}
      <Modal
        title={selectedSubscription ? "Modifier l'Abonnement" : "Nouvel Abonnement"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log("Form values:", values)
            setModalVisible(false)
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="companyName"
                label="Nom de l'entreprise"
                rules={[{ required: true, message: "Nom requis" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="contactPerson"
                label="Personne de contact"
                rules={[{ required: true, message: "Contact requis" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Email requis" },
                  { type: "email", message: "Format email invalide" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Téléphone" rules={[{ required: true, message: "Téléphone requis" }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="plan" label="Plan d'abonnement" rules={[{ required: true, message: "Plan requis" }]}>
                <Select>
                  <Select.Option value="Enterprise Standard">Enterprise Standard</Select.Option>
                  <Select.Option value="Enterprise Premium">Enterprise Premium</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxUsers"
                label="Nombre max d'utilisateurs"
                rules={[{ required: true, message: "Nombre requis" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setModalVisible(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: "#238D94", borderColor: "#238D94" }}>
                {selectedSubscription ? "Modifier" : "Créer"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default EnterpriseSubscriptionDashboard
