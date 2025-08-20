"use client"

import { useState } from "react"
import {
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
  Space,
  Tooltip,
  InputNumber,
  Alert,
  Tabs,
  List,
  Avatar,
} from "antd"
import {
  DollarOutlined,
  PlusOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import { Line, Pie } from "react-chartjs-2"
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

const { Option } = Select
const { RangePicker } = DatePicker
const { TabPane } = Tabs

const BudgetAllocation = () => {
  const [loading, setLoading] = useState(false)
  const [allocationModalVisible, setAllocationModalVisible] = useState(false)
  const [selectedAllocation, setSelectedAllocation] = useState(null)
  const [form] = Form.useForm()

  // Données simulées pour l'allocation budget RF
  const budgetData = {
    totalBudget: 250000,
    allocatedBudget: 180000,
    remainingBudget: 70000,
    pendingAllocations: 15000,
    utilizationRate: 72,
  }

  const departmentAllocations = [
    {
      id: 1,
      department: "IT",
      allocated: 45000,
      used: 32000,
      remaining: 13000,
      utilizationRate: 71,
      status: "active",
      manager: "Pierre Martin",
      lastUpdate: "2024-01-15",
    },
    {
      id: 2,
      department: "Commercial",
      allocated: 38000,
      used: 35000,
      remaining: 3000,
      utilizationRate: 92,
      status: "warning",
      manager: "Sophie Laurent",
      lastUpdate: "2024-01-14",
    },
    {
      id: 3,
      department: "RH",
      allocated: 25000,
      used: 18000,
      remaining: 7000,
      utilizationRate: 72,
      status: "active",
      manager: "Marie Dubois",
      lastUpdate: "2024-01-13",
    },
    {
      id: 4,
      department: "Production",
      allocated: 42000,
      used: 28000,
      remaining: 14000,
      utilizationRate: 67,
      status: "active",
      manager: "Jean Dupont",
      lastUpdate: "2024-01-12",
    },
    {
      id: 5,
      department: "Finance",
      allocated: 30000,
      used: 22000,
      remaining: 8000,
      utilizationRate: 73,
      status: "active",
      manager: "Claire Bernard",
      lastUpdate: "2024-01-11",
    },
  ]

  const budgetEvolution = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
    datasets: [
      {
        label: "Budget Alloué",
        data: [150000, 165000, 175000, 180000, 185000, 180000],
        borderColor: "#1890ff",
        backgroundColor: "rgba(24, 144, 255, 0.1)",
        tension: 0.4,
      },
      {
        label: "Budget Utilisé",
        data: [120000, 135000, 145000, 155000, 165000, 160000],
        borderColor: "#52c41a",
        backgroundColor: "rgba(82, 196, 26, 0.1)",
        tension: 0.4,
      },
    ],
  }

  const budgetByCategory = {
    labels: ["Formation Métier", "Leadership", "IT", "Soft Skills", "Réglementaire"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: ["#1890ff", "#52c41a", "#faad14", "#f759ab", "#13c2c2"],
      },
    ],
  }

  const pendingRequests = [
    {
      id: 1,
      department: "Marketing",
      requestedAmount: 8000,
      purpose: "Formation Digital Marketing",
      requestedBy: "Alice Martin",
      date: "2024-01-15",
      priority: "high",
    },
    {
      id: 2,
      department: "IT",
      requestedAmount: 5000,
      purpose: "Certification Cloud",
      requestedBy: "Pierre Martin",
      date: "2024-01-14",
      priority: "medium",
    },
    {
      id: 3,
      department: "Commercial",
      requestedAmount: 2000,
      purpose: "Formation Négociation",
      requestedBy: "Sophie Laurent",
      date: "2024-01-13",
      priority: "low",
    },
  ]

  const columns = [
    {
      title: "Département",
      dataIndex: "department",
      key: "department",
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: "#1890ff" }}>{text.charAt(0)}</Avatar>
          <div>
            <div style={{ fontWeight: "bold" }}>{text}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>Manager: {record.manager}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Budget Alloué",
      dataIndex: "allocated",
      key: "allocated",
      render: (amount) => `${amount.toLocaleString()} €`,
      sorter: (a, b) => a.allocated - b.allocated,
    },
    {
      title: "Budget Utilisé",
      dataIndex: "used",
      key: "used",
      render: (amount) => `${amount.toLocaleString()} €`,
      sorter: (a, b) => a.used - b.used,
    },
    {
      title: "Restant",
      dataIndex: "remaining",
      key: "remaining",
      render: (amount) => (
        <span style={{ color: amount < 5000 ? "#ff4d4f" : "#52c41a" }}>{amount.toLocaleString()} €</span>
      ),
      sorter: (a, b) => a.remaining - b.remaining,
    },
    {
      title: "Utilisation",
      dataIndex: "utilizationRate",
      key: "utilizationRate",
      render: (rate) => (
        <Progress
          percent={rate}
          size="small"
          status={rate > 90 ? "exception" : rate > 75 ? "active" : "normal"}
          format={(percent) => `${percent}%`}
        />
      ),
      sorter: (a, b) => a.utilizationRate - b.utilizationRate,
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          active: "green",
          warning: "orange",
          critical: "red",
        }
        const labels = {
          active: "Normal",
          warning: "Attention",
          critical: "Critique",
        }
        return <Tag color={colors[status]}>{labels[status]}</Tag>
      },
    },
    {
      title: "Dernière MAJ",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Modifier allocation">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEditAllocation(record)} />
          </Tooltip>
          <Tooltip title="Historique">
            <Button type="text" icon={<BarChartOutlined />} onClick={() => handleViewHistory(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const handleEditAllocation = (allocation) => {
    setSelectedAllocation(allocation)
    form.setFieldsValue({
      department: allocation.department,
      allocated: allocation.allocated,
      manager: allocation.manager,
    })
    setAllocationModalVisible(true)
  }

  const handleViewHistory = (allocation) => {
    Modal.info({
      title: `Historique Budget - ${allocation.department}`,
      width: 600,
      content: (
        <div>
          <p>Évolution du budget pour le département {allocation.department}</p>
          {/* Ici on pourrait ajouter un graphique d'historique */}
        </div>
      ),
    })
  }

  const handleApproveRequest = (request) => {
    Modal.confirm({
      title: "Approuver la demande",
      content: `Approuver la demande de ${request.requestedAmount}€ pour ${request.purpose} ?`,
      onOk: () => {
        console.log("Approved:", request)
      },
    })
  }

  const handleRejectRequest = (request) => {
    Modal.confirm({
      title: "Rejeter la demande",
      content: `Rejeter la demande de ${request.requestedAmount}€ pour ${request.purpose} ?`,
      onOk: () => {
        console.log("Rejected:", request)
      },
    })
  }

  const handleSaveAllocation = (values) => {
    console.log("Save allocation:", values)
    setAllocationModalVisible(false)
    form.resetFields()
    setSelectedAllocation(null)
  }

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Allocation Budget Formation</h1>
        <p className="text-gray-600">Gestion et répartition du budget formation par département</p>
      </div>

      {/* Alertes */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={24}>
          <Alert
            message="Budget en tension"
            description="Le département Commercial a utilisé 92% de son budget alloué. Une révision pourrait être nécessaire."
            type="warning"
            showIcon
            closable
          />
        </Col>
      </Row>

      {/* Statistiques principales */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Budget Total"
              value={budgetData.totalBudget}
              prefix={<DollarOutlined style={{ color: "#1890ff" }} />}
              suffix="€"
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Budget Alloué"
              value={budgetData.allocatedBudget}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              suffix="€"
              valueStyle={{ color: "#52c41a" }}
            />
            <Progress
              percent={Math.round((budgetData.allocatedBudget / budgetData.totalBudget) * 100)}
              size="small"
              className="mt-2"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Budget Restant"
              value={budgetData.remainingBudget}
              prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
              suffix="€"
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Taux d'Utilisation"
              value={budgetData.utilizationRate}
              prefix={<BarChartOutlined style={{ color: "#722ed1" }} />}
              suffix="%"
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="allocations" type="card">
        {/* Onglet Allocations */}
        <TabPane
          tab={
            <span>
              <TeamOutlined />
              Allocations par Département
            </span>
          }
          key="allocations"
        >
          <Card
            title="Répartition Budget par Département"
            extra={
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setAllocationModalVisible(true)}>
                  Nouvelle Allocation
                </Button>
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={departmentAllocations}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} départements`,
              }}
            />
          </Card>
        </TabPane>

        {/* Onglet Demandes */}
        <TabPane
          tab={
            <span>
              <ExclamationCircleOutlined />
              Demandes en Attente ({pendingRequests.length})
            </span>
          }
          key="requests"
        >
          <Card title="Demandes d'Allocation Budget">
            <List
              dataSource={pendingRequests}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button key="approve" type="primary" size="small" onClick={() => handleApproveRequest(item)}>
                      Approuver
                    </Button>,
                    <Button key="reject" danger size="small" onClick={() => handleRejectRequest(item)}>
                      Rejeter
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor:
                            item.priority === "high" ? "#ff4d4f" : item.priority === "medium" ? "#faad14" : "#52c41a",
                        }}
                      >
                        <DollarOutlined />
                      </Avatar>
                    }
                    title={
                      <div>
                        <span style={{ fontWeight: "bold" }}>{item.purpose}</span>
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
                          <strong>{item.department}</strong> - Demandé par: {item.requestedBy}
                        </div>
                        <div>Montant: {item.requestedAmount.toLocaleString()}€</div>
                        <div>Date: {moment(item.date).format("DD/MM/YYYY")}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>

        {/* Onglet Analytics */}
        <TabPane
          tab={
            <span>
              <BarChartOutlined />
              Analytics
            </span>
          }
          key="analytics"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Évolution Budget">
                <Line
                  data={budgetEvolution}
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
            <Col xs={24} lg={12}>
              <Card title="Répartition par Catégorie">
                <Pie
                  data={budgetByCategory}
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
        </TabPane>
      </Tabs>

      {/* Modal d'allocation */}
      <Modal
        title={selectedAllocation ? "Modifier Allocation" : "Nouvelle Allocation"}
        open={allocationModalVisible}
        onCancel={() => {
          setAllocationModalVisible(false)
          setSelectedAllocation(null)
          form.resetFields()
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveAllocation}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Département"
                name="department"
                rules={[{ required: true, message: "Sélectionnez un département" }]}
              >
                <Select placeholder="Sélectionnez un département">
                  <Option value="IT">IT</Option>
                  <Option value="Commercial">Commercial</Option>
                  <Option value="RH">RH</Option>
                  <Option value="Production">Production</Option>
                  <Option value="Finance">Finance</Option>
                  <Option value="Marketing">Marketing</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Manager"
                name="manager"
                rules={[{ required: true, message: "Saisissez le nom du manager" }]}
              >
                <Input placeholder="Nom du manager" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Montant Alloué (€)"
                name="allocated"
                rules={[{ required: true, message: "Saisissez le montant" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Montant en euros"
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Période" name="period">
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Notes" name="notes">
            <Input.TextArea rows={3} placeholder="Notes ou commentaires..." />
          </Form.Item>
          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setAllocationModalVisible(false)
                  setSelectedAllocation(null)
                  form.resetFields()
                }}
              >
                Annuler
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {selectedAllocation ? "Modifier" : "Créer"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default BudgetAllocation
