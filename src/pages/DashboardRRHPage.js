"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import {
  Layout,
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Progress,
  Alert,
  Tabs,
  InputNumber,
  Space,
  Tooltip,
  Badge,
  Avatar,
  List,
  Timeline,
} from "antd"
import {
  DollarOutlined,
  TeamOutlined,
  BookOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  DownloadOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  SettingOutlined,
  AuditOutlined,
  SafetyOutlined,
  BankOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from "@ant-design/icons"
import { Line, Pie, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js"
import moment from "moment"
import "moment/locale/fr"
import DashboardLayout from "../layouts/DashboardLayout"

// Configuration Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  BarElement,
)

const { Content } = Layout
const { TabPane } = Tabs
const { Option } = Select
const { RangePicker } = DatePicker

moment.locale("fr")

const DashboardRRHPage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [budgetModalVisible, setBudgetModalVisible] = useState(false)
  const [userModalVisible, setUserModalVisible] = useState(false)
  const [auditModalVisible, setAuditModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [form] = Form.useForm()

  // Données simulées pour le dashboard RRH
  const dashboardData = {
    globalStats: {
      totalBudget: 500000,
      usedBudget: 375000,
      totalUsers: 1250,
      activeTrainings: 45,
      pendingValidations: 12,
      completedTrainings: 156,
      budgetAlerts: 3,
      systemHealth: 98.5,
    },
    budgetEvolution: {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
      datasets: [
        {
          label: "Budget Consommé",
          data: [45000, 89000, 125000, 180000, 245000, 375000],
          borderColor: "#1890ff",
          backgroundColor: "rgba(24, 144, 255, 0.1)",
          tension: 0.4,
        },
        {
          label: "Budget Planifié",
          data: [50000, 100000, 150000, 200000, 250000, 300000],
          borderColor: "#52c41a",
          backgroundColor: "rgba(82, 196, 26, 0.1)",
          tension: 0.4,
        },
      ],
    },
    trainingTypes: {
      labels: ["Métier", "Support", "Réglementaire", "Soft Skills", "Leadership"],
      datasets: [
        {
          data: [35, 25, 20, 15, 5],
          backgroundColor: ["#1890ff", "#52c41a", "#faad14", "#f759ab", "#13c2c2"],
        },
      ],
    },
    organizationStats: {
      labels: ["Direction", "RH", "IT", "Commercial", "Production", "Finance"],
      datasets: [
        {
          label: "Formations Réalisées",
          data: [25, 35, 28, 42, 38, 22],
          backgroundColor: "#1890ff",
        },
        {
          label: "Formations Planifiées",
          data: [15, 20, 18, 25, 22, 12],
          backgroundColor: "#52c41a",
        },
      ],
    },
  }

  const users = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "RF",
      department: "RH",
      status: "active",
      lastLogin: "2024-01-15 09:30",
      permissions: ["catalog_manage", "planning", "evaluations"],
    },
    {
      id: 2,
      name: "Pierre Martin",
      role: "MANAGER",
      department: "IT",
      status: "active",
      lastLogin: "2024-01-15 08:45",
      permissions: ["team_validation", "reports_view"],
    },
    {
      id: 3,
      name: "Sophie Laurent",
      role: "EMPLOYE",
      department: "Commercial",
      status: "inactive",
      lastLogin: "2024-01-10 16:20",
      permissions: ["catalog_view", "self_register"],
    },
  ]

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 10:30:25",
      user: "Marie Dubois (RF)",
      action: "Validation formation",
      details: 'Formation "Leadership & Management" validée',
      type: "success",
      ip: "192.168.1.45",
    },
    {
      id: 2,
      timestamp: "2024-01-15 09:15:12",
      user: "Pierre Martin (MANAGER)",
      action: "Inscription équipe",
      details: '5 collaborateurs inscrits à "Excel Avancé"',
      type: "info",
      ip: "192.168.1.67",
    },
    {
      id: 3,
      timestamp: "2024-01-15 08:45:33",
      user: "System",
      action: "Alerte budget",
      details: "Seuil de 90% atteint pour le budget IT",
      type: "warning",
      ip: "system",
    },
  ]

  const budgetAlerts = [
    {
      id: 1,
      department: "IT",
      budget: 50000,
      used: 47500,
      percentage: 95,
      level: "critical",
      message: "Budget IT critique - 95% consommé",
    },
    {
      id: 2,
      department: "Commercial",
      budget: 75000,
      used: 67500,
      percentage: 90,
      level: "warning",
      message: "Budget Commercial - Seuil d'alerte atteint",
    },
    {
      id: 3,
      department: "Production",
      budget: 60000,
      used: 48000,
      percentage: 80,
      level: "info",
      message: "Budget Production - Consommation normale",
    },
  ]

  const pendingValidations = [
    {
      id: 1,
      type: "catalog",
      title: "Formation Cybersécurité Avancée",
      requestedBy: "Marie Dubois",
      date: "2024-01-15",
      priority: "high",
      cost: 15000,
    },
    {
      id: 2,
      type: "budget",
      title: "Rallonge budget Q1 - Direction IT",
      requestedBy: "Pierre Martin",
      date: "2024-01-14",
      priority: "medium",
      cost: 25000,
    },
    {
      id: 3,
      type: "user",
      title: "Création compte Organisme FormaPro",
      requestedBy: "Sophie Laurent",
      date: "2024-01-13",
      priority: "low",
      cost: 0,
    },
  ]

  // Colonnes pour le tableau des utilisateurs
  const userColumns = [
    {
      title: "Utilisateur",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: "#1890ff" }}>
            {text
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <div>
            <div style={{ fontWeight: "bold" }}>{text}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>{record.department}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Rôle",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        const colors = {
          RRH: "red",
          RF: "blue",
          MANAGER: "green",
          EMPLOYE: "default",
          ORGANISME: "orange",
        }
        return <Tag color={colors[role]}>{role}</Tag>
      },
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge status={status === "active" ? "success" : "error"} text={status === "active" ? "Actif" : "Inactif"} />
      ),
    },
    {
      title: "Dernière connexion",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (date) => moment(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir détails">
            <Button type="text" icon={<EyeOutlined />} onClick={() => handleViewUser(record)} />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEditUser(record)} />
          </Tooltip>
          <Tooltip title={record.status === "active" ? "Désactiver" : "Activer"}>
            <Button
              type="text"
              icon={record.status === "active" ? <UserDeleteOutlined /> : <UserAddOutlined />}
              onClick={() => handleToggleUser(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  // Colonnes pour les logs d'audit
  const auditColumns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      width: 150,
      render: (timestamp) => (
        <div style={{ fontSize: "12px" }}>
          {moment(timestamp).format("DD/MM/YYYY")}
          <br />
          {moment(timestamp).format("HH:mm:ss")}
        </div>
      ),
    },
    {
      title: "Utilisateur",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action, record) => (
        <div>
          <Tag color={record.type === "success" ? "green" : record.type === "warning" ? "orange" : "blue"}>
            {action}
          </Tag>
          <div style={{ fontSize: "12px", marginTop: "4px" }}>{record.details}</div>
        </div>
      ),
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
      width: 120,
    },
  ]

  // Handlers
  const handleViewUser = (user) => {
    setSelectedUser(user)
    setUserModalVisible(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    form.setFieldsValue(user)
    setUserModalVisible(true)
  }

  const handleToggleUser = (user) => {
    Modal.confirm({
      title: `${user.status === "active" ? "Désactiver" : "Activer"} l'utilisateur`,
      content: `Êtes-vous sûr de vouloir ${user.status === "active" ? "désactiver" : "activer"} ${user.name} ?`,
      onOk: () => {
        // Logique de désactivation/activation
        console.log("Toggle user:", user.id)
      },
    })
  }

  const handleBudgetModification = (values) => {
    console.log("Budget modification:", values)
    setBudgetModalVisible(false)
  }

  const handleValidation = (item, action) => {
    Modal.confirm({
      title: `${action === "approve" ? "Approuver" : "Rejeter"} la demande`,
      content: `Êtes-vous sûr de vouloir ${action === "approve" ? "approuver" : "rejeter"} "${item.title}" ?`,
      onOk: () => {
        console.log(`${action} validation:`, item.id)
      },
    })
  }

  const exportAuditLogs = () => {
    // Logique d'export des logs
    console.log("Export audit logs")
  }

  return (
    <DashboardLayout>
      <Content style={{ padding: "24px" }}>
        {/* En-tête avec titre et actions */}
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>Dashboard RRH - Super Admin</h1>
            <p style={{ margin: "4px 0 0 0", color: "#666" }}>
              Pilotage stratégique et gouvernance du système de formation
            </p>
          </div>
          <Space>
            <Select value={selectedPeriod} onChange={setSelectedPeriod} style={{ width: 120 }}>
              <Option value="week">Semaine</Option>
              <Option value="month">Mois</Option>
              <Option value="quarter">Trimestre</Option>
              <Option value="year">Année</Option>
            </Select>
            <Button icon={<DownloadOutlined />}>Export Global</Button>
            <Button type="primary" icon={<SettingOutlined />}>
              Paramètres
            </Button>
          </Space>
        </div>

        {/* Statistiques principales */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Budget Global"
                value={dashboardData.globalStats.usedBudget}
                suffix={`/ ${dashboardData.globalStats.totalBudget.toLocaleString()}€`}
                prefix={<DollarOutlined style={{ color: "#1890ff" }} />}
                valueStyle={{ color: "#1890ff" }}
              />
              <Progress
                percent={Math.round(
                  (dashboardData.globalStats.usedBudget / dashboardData.globalStats.totalBudget) * 100,
                )}
                strokeColor="#1890ff"
                size="small"
                style={{ marginTop: "8px" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Utilisateurs Actifs"
                value={dashboardData.globalStats.totalUsers}
                prefix={<TeamOutlined style={{ color: "#52c41a" }} />}
                valueStyle={{ color: "#52c41a" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>+12% ce mois</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Validations en Attente"
                value={dashboardData.globalStats.pendingValidations}
                prefix={<AlertOutlined style={{ color: "#faad14" }} />}
                valueStyle={{ color: "#faad14" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>Nécessite votre attention</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Santé Système"
                value={dashboardData.globalStats.systemHealth}
                suffix="%"
                prefix={<SafetyOutlined style={{ color: "#52c41a" }} />}
                valueStyle={{ color: "#52c41a" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>Excellent</div>
            </Card>
          </Col>
        </Row>

        {/* Alertes critiques */}
        {budgetAlerts.filter((alert) => alert.level === "critical").length > 0 && (
          <Alert
            message="Alertes Budget Critiques"
            description={
              <div>
                {budgetAlerts
                  .filter((alert) => alert.level === "critical")
                  .map((alert) => (
                    <div key={alert.id} style={{ marginBottom: "4px" }}>
                      <strong>{alert.department}</strong>: {alert.message}
                    </div>
                  ))}
              </div>
            }
            type="error"
            showIcon
            closable
            style={{ marginBottom: "24px" }}
            action={
              <Button size="small" onClick={() => setBudgetModalVisible(true)}>
                Gérer Budget
              </Button>
            }
          />
        )}

        <Tabs defaultActiveKey="overview" type="card">
          {/* Onglet Vue d'ensemble */}
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                Vue d'ensemble
              </span>
            }
            key="overview"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title="Évolution Budgétaire" extra={<Button type="link">Détails</Button>}>
                  <Line
                    data={dashboardData.budgetEvolution}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: (value) => value.toLocaleString() + "€",
                          },
                        },
                      },
                    }}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Répartition par Type" extra={<Button type="link">Catalogue</Button>}>
                  <Pie
                    data={dashboardData.trainingTypes}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "right",
                        },
                      },
                    }}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col xs={24}>
                <Card title="Performance par Département">
                  <Bar
                    data={dashboardData.organizationStats}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* Onglet Validations */}
          <TabPane
            tab={
              <span>
                <CheckCircleOutlined />
                Validations ({pendingValidations.length})
              </span>
            }
            key="validations"
          >
            <Card title="Demandes en Attente de Validation">
              <List
                dataSource={pendingValidations}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor:
                              item.priority === "high" ? "#ff4d4f" : item.priority === "medium" ? "#faad14" : "#52c41a",
                          }}
                        >
                          {item.type === "catalog" ? (
                            <BookOutlined />
                          ) : item.type === "budget" ? (
                            <DollarOutlined />
                          ) : (
                            <TeamOutlined />
                          )}
                        </Avatar>
                      }
                      title={
                        <div>
                          <span style={{ fontWeight: "bold" }}>{item.title}</span>
                          <Tag
                            color={item.priority === "high" ? "red" : item.priority === "medium" ? "orange" : "green"}
                            style={{ marginLeft: "8px" }}
                          >
                            {item.priority === "high" ? "Urgent" : item.priority === "medium" ? "Moyen" : "Faible"}
                          </Tag>
                        </div>
                      }
                      description={
                        <div>
                          <div>
                            Demandé par: <strong>{item.requestedBy}</strong>
                          </div>
                          <div>Date: {moment(item.date).format("DD/MM/YYYY")}</div>
                          {item.cost > 0 && (
                            <div>
                              Coût: <strong>{item.cost.toLocaleString()}€</strong>
                            </div>
                          )}
                        </div>
                      }
                    />
                    <List.Item
                      actions={[
                        <Button
                          type="primary"
                          icon={<CheckCircleOutlined />}
                          onClick={() => handleValidation(item, "approve")}
                        >
                          Approuver
                        </Button>,
                        <Button danger icon={<CloseCircleOutlined />} onClick={() => handleValidation(item, "reject")}>
                          Rejeter
                        </Button>,
                      ]}
                    ></List.Item>
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          {/* Onglet Gestion des Comptes */}
          <TabPane
            tab={
              <span>
                <TeamOutlined />
                Gestion Comptes
              </span>
            }
            key="users"
          >
            <Card
              title="Gestion des Utilisateurs"
              extra={
                <Space>
                  <Button type="primary" icon={<UserAddOutlined />}>
                    Nouvel Utilisateur
                  </Button>
                  <Button icon={<DownloadOutlined />}>Export</Button>
                </Space>
              }
            >
              <Table
                columns={userColumns}
                dataSource={users}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} utilisateurs`,
                }}
              />
            </Card>
          </TabPane>

          {/* Onglet Audit */}
          <TabPane
            tab={
              <span>
                <AuditOutlined />
                Audit & Logs
              </span>
            }
            key="audit"
          >
            <Card
              title="Journal d'Audit"
              extra={
                <Space>
                  <RangePicker />
                  <Button icon={<DownloadOutlined />} onClick={exportAuditLogs}>
                    Export PDF
                  </Button>
                </Space>
              }
            >
              <Table
                columns={auditColumns}
                dataSource={auditLogs}
                rowKey="id"
                pagination={{
                  pageSize: 20,
                  showSizeChanger: true,
                }}
                scroll={{ x: 800 }}
              />
            </Card>
          </TabPane>

          {/* Onglet Budget */}
          <TabPane
            tab={
              <span>
                <BankOutlined />
                Budget & Alertes
              </span>
            }
            key="budget"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={16}>
                <Card
                  title="Alertes Budget"
                  extra={<Button onClick={() => setBudgetModalVisible(true)}>Modifier Budget</Button>}
                >
                  <List
                    dataSource={budgetAlerts}
                    renderItem={(alert) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Progress
                              type="circle"
                              percent={alert.percentage}
                              width={50}
                              strokeColor={
                                alert.level === "critical"
                                  ? "#ff4d4f"
                                  : alert.level === "warning"
                                    ? "#faad14"
                                    : "#52c41a"
                              }
                            />
                          }
                          title={
                            <div>
                              <span style={{ fontWeight: "bold" }}>{alert.department}</span>
                              <Tag
                                color={
                                  alert.level === "critical" ? "red" : alert.level === "warning" ? "orange" : "green"
                                }
                                style={{ marginLeft: "8px" }}
                              >
                                {alert.level === "critical"
                                  ? "Critique"
                                  : alert.level === "warning"
                                    ? "Attention"
                                    : "Normal"}
                              </Tag>
                            </div>
                          }
                          description={
                            <div>
                              <div>{alert.message}</div>
                              <div style={{ marginTop: "4px" }}>
                                <strong>{alert.used.toLocaleString()}€</strong> / {alert.budget.toLocaleString()}€
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="Actions Rapides">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button block icon={<DollarOutlined />}>
                      Rallonge Budget
                    </Button>
                    <Button block icon={<AlertOutlined />}>
                      Configurer Alertes
                    </Button>
                    <Button block icon={<FileTextOutlined />}>
                      Rapport Financier
                    </Button>
                    <Button block icon={<BarChartOutlined />}>
                      Analyse Coûts
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        {/* Modal de modification budget */}
        <Modal
          title="Modification Budget"
          open={budgetModalVisible}
          onCancel={() => setBudgetModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form layout="vertical" onFinish={handleBudgetModification}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Département"
                  name="department"
                  rules={[{ required: true, message: "Sélectionnez un département" }]}
                >
                  <Select placeholder="Choisir un département">
                    <Option value="IT">IT</Option>
                    <Option value="Commercial">Commercial</Option>
                    <Option value="Production">Production</Option>
                    <Option value="RH">RH</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Type d'action"
                  name="action"
                  rules={[{ required: true, message: "Sélectionnez une action" }]}
                >
                  <Select placeholder="Type d'action">
                    <Option value="increase">Rallonge Budget</Option>
                    <Option value="decrease">Coupe Budget</Option>
                    <Option value="transfer">Transfert</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Montant (€)" name="amount" rules={[{ required: true, message: "Saisissez un montant" }]}>
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
            <Form.Item
              label="Justification"
              name="reason"
              rules={[{ required: true, message: "Justification obligatoire" }]}
            >
              <Input.TextArea rows={4} placeholder="Motif de la modification..." />
            </Form.Item>
            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button onClick={() => setBudgetModalVisible(false)}>Annuler</Button>
                <Button type="primary" htmlType="submit">
                  Valider Modification
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal de gestion utilisateur */}
        <Modal
          title={selectedUser ? "Détails Utilisateur" : "Nouvel Utilisateur"}
          open={userModalVisible}
          onCancel={() => {
            setUserModalVisible(false)
            setSelectedUser(null)
            form.resetFields()
          }}
          footer={null}
          width={700}
        >
          {selectedUser && (
            <div>
              <Tabs defaultActiveKey="info">
                <TabPane tab="Informations" key="info">
                  <Form form={form} layout="vertical">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Nom complet" name="name">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Rôle" name="role">
                          <Select>
                            <Option value="RRH">RRH</Option>
                            <Option value="RF">RF</Option>
                            <Option value="MANAGER">MANAGER</Option>
                            <Option value="EMPLOYE">EMPLOYE</Option>
                            <Option value="ORGANISME">ORGANISME</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Département" name="department">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Statut" name="status">
                          <Select>
                            <Option value="active">Actif</Option>
                            <Option value="inactive">Inactif</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>
                <TabPane tab="Permissions" key="permissions">
                  <div>
                    <h4>Permissions actuelles:</h4>
                    <div style={{ marginTop: "16px" }}>
                      {selectedUser.permissions?.map((permission) => (
                        <Tag key={permission} color="blue" style={{ marginBottom: "8px" }}>
                          {permission}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Activité" key="activity">
                  <Timeline>
                    <Timeline.Item color="green">Connexion - {selectedUser.lastLogin}</Timeline.Item>
                    <Timeline.Item color="blue">Modification profil - 12/01/2024 14:30</Timeline.Item>
                    <Timeline.Item color="red">Tentative connexion échouée - 10/01/2024 09:15</Timeline.Item>
                  </Timeline>
                </TabPane>
              </Tabs>
            </div>
          )}
        </Modal>
      </Content>
    </DashboardLayout>
  )
}

export default DashboardRRHPage
