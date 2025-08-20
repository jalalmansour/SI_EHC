"use client"

import { useState, useEffect } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Table,
  Progress,
  Typography,
  Space,
  Divider,
  Tag,
  Tabs,
  Tooltip,
  Modal,
  message,
  Alert,
  Statistic,
} from "antd"
import {
  PlusOutlined,
  SaveOutlined,
  EditOutlined,
  EyeOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input
const { TabPane } = Tabs

const CreationBudgetaire = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [activeExercise, setActiveExercise] = useState(null)
  const [budgetHistory, setBudgetHistory] = useState([])
  const [departmentBudgets, setDepartmentBudgets] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [requestModalVisible, setRequestModalVisible] = useState(false)

  // Initialize data
  useEffect(() => {
    // Set active exercise (RF has limited view)
    setActiveExercise({
      id: 1,
      name: "Plan de Formation 2024",
      year: "2024",
      totalBudget: 250000, // RF manages a portion of total budget
      allocatedBudget: 180000,
      remainingBudget: 70000,
      status: "Actif",
      description: "Budget alloué au Responsable Formation pour 2024",
    })

    // Set budget history (RF view)
    setBudgetHistory([
      {
        key: "1",
        name: "Allocation RF 2024",
        year: "2024",
        totalBudget: 250000,
        allocated: 180000,
        used: 125000,
        status: "En cours",
        dateCreation: "2024-01-15",
      },
      {
        key: "2",
        name: "Allocation RF 2023",
        year: "2023",
        totalBudget: 220000,
        allocated: 220000,
        used: 215000,
        status: "Clôturé",
        dateCreation: "2023-01-10",
      },
    ])

    // Set department budget data (RF perspective)
    setDepartmentBudgets([
      {
        key: "1",
        department: "IT",
        budgetRequested: 45000,
        budgetAllocated: 40000,
        budgetUsed: 28000,
        remainingBudget: 12000,
        utilizationRate: 70,
        status: "Approuvé",
        priority: "Haute",
        manager: "Pierre Martin",
      },
      {
        key: "2",
        department: "Commercial",
        budgetRequested: 35000,
        budgetAllocated: 32000,
        budgetUsed: 30000,
        remainingBudget: 2000,
        utilizationRate: 94,
        status: "Approuvé",
        priority: "Haute",
        manager: "Sophie Laurent",
      },
      {
        key: "3",
        department: "RH",
        budgetRequested: 25000,
        budgetAllocated: 22000,
        budgetUsed: 15000,
        remainingBudget: 7000,
        utilizationRate: 68,
        status: "Approuvé",
        priority: "Moyenne",
        manager: "Marie Dubois",
      },
      {
        key: "4",
        department: "Production",
        budgetRequested: 40000,
        budgetAllocated: 35000,
        budgetUsed: 20000,
        remainingBudget: 15000,
        utilizationRate: 57,
        status: "Approuvé",
        priority: "Moyenne",
        manager: "Jean Dupont",
      },
      {
        key: "5",
        department: "Finance",
        budgetRequested: 30000,
        budgetAllocated: 0,
        budgetUsed: 0,
        remainingBudget: 0,
        utilizationRate: 0,
        status: "En attente",
        priority: "Faible",
        manager: "Claire Bernard",
      },
    ])
  }, [])

  const onFinish = (values) => {
    setLoading(true)
    console.log("Budget request values:", values)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      message.success("Demande budgétaire soumise avec succès!")
      form.resetFields()
      setRequestModalVisible(false)
    }, 1500)
  }

  const handleBudgetRequest = () => {
    setRequestModalVisible(true)
    form.resetFields()
  }

  const historyColumns = [
    {
      title: "Allocation",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Année",
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: "Budget Total",
      dataIndex: "totalBudget",
      key: "totalBudget",
      render: (value) => `${value?.toLocaleString()} €`,
      align: "right",
    },
    {
      title: "Alloué",
      dataIndex: "allocated",
      key: "allocated",
      render: (value) => `${value?.toLocaleString()} €`,
      align: "right",
    },
    {
      title: "Utilisé",
      dataIndex: "used",
      key: "used",
      render: (value) => `${value?.toLocaleString()} €`,
      align: "right",
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "En cours" ? "blue" : status === "Clôturé" ? "green" : "orange"}>{status}</Tag>
      ),
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Consulter">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Télécharger">
            <Button type="text" icon={<DownloadOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
      align: "center",
    },
  ]

  const departmentColumns = [
    {
      title: "Département",
      dataIndex: "department",
      key: "department",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text className="text-gray-500 text-xs">Manager: {record.manager}</Text>
        </div>
      ),
    },
    {
      title: "Demandé",
      dataIndex: "budgetRequested",
      key: "budgetRequested",
      render: (value) => `${value?.toLocaleString()} €`,
      align: "right",
    },
    {
      title: "Alloué",
      dataIndex: "budgetAllocated",
      key: "budgetAllocated",
      render: (value) => `${value?.toLocaleString()} €`,
      align: "right",
    },
    {
      title: "Utilisé",
      dataIndex: "budgetUsed",
      key: "budgetUsed",
      render: (value) => `${value?.toLocaleString()} €`,
      align: "right",
    },
    {
      title: "Restant",
      dataIndex: "remainingBudget",
      key: "remainingBudget",
      render: (value) => (
        <Text style={{ color: value < 5000 ? "#ff4d4f" : "#52c41a" }}>{value?.toLocaleString()} €</Text>
      ),
      align: "right",
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
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Approuvé" ? "green" : status === "En attente" ? "orange" : "red"}>{status}</Tag>
      ),
      align: "center",
    },
    {
      title: "Priorité",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag color={priority === "Haute" ? "red" : priority === "Moyenne" ? "orange" : "blue"}>{priority}</Tag>
      ),
      align: "center",
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2} className="mb-2 text-gray-800">
              Gestion Budgétaire Formation
            </Title>
            <Text className="text-gray-600">Responsable Formation - Allocation et suivi budgétaire</Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleBudgetRequest}
            className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Demande Budget
          </Button>
        </div>
      </div>

      {/* Alert for budget status */}
      <Alert
        message="Budget en cours d'utilisation"
        description="Vous avez utilisé 69% de votre budget alloué. Surveillez les dépenses pour les prochains mois."
        type="info"
        showIcon
        className="mb-6"
        closable
      />

      {/* Active Budget Overview */}
      {activeExercise && (
        <Card
          title="Budget Formation Actuel"
          className="mb-6 shadow-lg border-0"
          extra={<Tag color="blue">RF - Responsable Formation</Tag>}
        >
          <Row gutter={[24, 16]}>
            <Col xs={24} md={6}>
              <div>
                <Text className="text-gray-500">Budget Total Alloué</Text>
                <div className="text-2xl font-bold text-blue-600">{activeExercise.totalBudget.toLocaleString()} €</div>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div>
                <Text className="text-gray-500">Budget Distribué</Text>
                <div className="text-2xl font-bold text-green-600">
                  {activeExercise.allocatedBudget.toLocaleString()} €
                </div>
                <Progress
                  percent={Math.round((activeExercise.allocatedBudget / activeExercise.totalBudget) * 100)}
                  size="small"
                  className="mt-2"
                />
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div>
                <Text className="text-gray-500">Budget Restant</Text>
                <div className="text-2xl font-bold text-orange-600">
                  {activeExercise.remainingBudget.toLocaleString()} €
                </div>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div>
                <Text className="text-gray-500">Taux d'Allocation</Text>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((activeExercise.allocatedBudget / activeExercise.totalBudget) * 100)}%
                </div>
              </div>
            </Col>
          </Row>
          <Divider />
          <Text className="text-gray-600">{activeExercise.description}</Text>
        </Card>
      )}

      {/* Budget Statistics */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-500 to-blue-600">
            <Statistic
              title={<span className="text-white opacity-90">Départements Gérés</span>}
              value={5}
              valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-500 to-green-600">
            <Statistic
              title={<span className="text-white opacity-90">Budget Approuvé</span>}
              value={129000}
              suffix="€"
              valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              prefix={<SaveOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-500 to-orange-600">
            <Statistic
              title={<span className="text-white opacity-90">En Attente</span>}
              value={30000}
              suffix="€"
              valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-500 to-purple-600">
            <Statistic
              title={<span className="text-white opacity-90">Taux Utilisation</span>}
              value={72}
              suffix="%"
              valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              prefix={<EditOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="allocation" type="card">
        {/* Allocation par Département */}
        <TabPane tab="Allocation par Département" key="allocation">
          <Card
            title="Répartition Budgétaire par Département"
            className="shadow-lg border-0"
            extra={
              <Space>
                <Button icon={<DownloadOutlined />} size="small">
                  Exporter
                </Button>
              </Space>
            }
          >
            <Table
              columns={departmentColumns}
              dataSource={departmentBudgets}
              pagination={false}
              size="middle"
              className="mb-4"
            />
          </Card>
        </TabPane>

        {/* Historique */}
        <TabPane tab="Historique Budgétaire" key="history">
          <Card
            title="Historique des Allocations"
            className="shadow-lg border-0"
            extra={
              <Space>
                <Button icon={<DownloadOutlined />} size="small">
                  Exporter
                </Button>
              </Space>
            }
          >
            <Table columns={historyColumns} dataSource={budgetHistory} pagination={false} size="middle" />
          </Card>
        </TabPane>

        {/* Demandes */}
        <TabPane tab="Mes Demandes" key="requests">
          <Card title="Demandes Budgétaires Soumises" className="shadow-lg border-0">
            <div className="text-center py-12">
              <ExclamationCircleOutlined style={{ fontSize: "48px", color: "#ccc", marginBottom: "16px" }} />
              <Title level={4} className="text-gray-500">
                Aucune demande en cours
              </Title>
              <Text className="text-gray-400">Vos demandes budgétaires apparaîtront ici</Text>
              <br />
              <Button type="primary" icon={<PlusOutlined />} onClick={handleBudgetRequest} className="mt-4">
                Nouvelle Demande
              </Button>
            </div>
          </Card>
        </TabPane>
      </Tabs>

      {/* Budget Request Modal */}
      <Modal
        title="Demande d'Allocation Budgétaire"
        open={requestModalVisible}
        onCancel={() => {
          setRequestModalVisible(false)
          form.resetFields()
        }}
        footer={null}
        width={700}
        className="top-8"
      >
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-6">
          <Alert
            message="Demande Budgétaire"
            description="Soumettez votre demande d'allocation budgétaire. Elle sera examinée par les RRH."
            type="info"
            className="mb-6"
          />

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Département Bénéficiaire"
                rules={[{ required: true, message: "Veuillez sélectionner le département" }]}
              >
                <Select placeholder="Sélectionner le département">
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
                name="amount"
                label="Montant Demandé (€)"
                rules={[{ required: true, message: "Veuillez saisir le montant" }]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  placeholder="Ex: 25000"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="Priorité"
                rules={[{ required: true, message: "Veuillez sélectionner la priorité" }]}
              >
                <Select placeholder="Niveau de priorité">
                  <Option value="Haute">Haute</Option>
                  <Option value="Moyenne">Moyenne</Option>
                  <Option value="Faible">Faible</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Catégorie Formation"
                rules={[{ required: true, message: "Veuillez sélectionner la catégorie" }]}
              >
                <Select placeholder="Type de formation">
                  <Option value="Leadership">Leadership</Option>
                  <Option value="Technique">Technique</Option>
                  <Option value="Soft Skills">Soft Skills</Option>
                  <Option value="Réglementaire">Réglementaire</Option>
                  <Option value="Métier">Métier</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="justification"
            label="Justification de la Demande"
            rules={[{ required: true, message: "Veuillez justifier votre demande" }]}
          >
            <TextArea
              rows={4}
              placeholder="Expliquez les raisons de cette demande budgétaire, les objectifs visés et l'impact attendu..."
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item name="timeline" label="Échéancier Prévisionnel">
            <TextArea
              rows={3}
              placeholder="Décrivez le planning prévisionnel d'utilisation de ce budget..."
              showCount
              maxLength={300}
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button
                onClick={() => {
                  setRequestModalVisible(false)
                  form.resetFields()
                }}
              >
                Annuler
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                className="bg-gradient-to-r from-green-500 to-green-600 border-0"
              >
                Soumettre Demande
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreationBudgetaire
