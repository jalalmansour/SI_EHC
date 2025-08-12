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
} from "antd"
import { PlusOutlined, SaveOutlined, EditOutlined, EyeOutlined, DownloadOutlined } from "@ant-design/icons"
import moment from "moment"

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input
const { TabPane } = Tabs

const CreationBudgetaire = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [activeExercise, setActiveExercise] = useState(null)
  const [budgetHistory, setBudgetHistory] = useState([])
  const [monthlyBudgets, setMonthlyBudgets] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  // Initialize data
  useEffect(() => {
    // Set active exercise
    setActiveExercise({
      id: 1,
      name: "Plan de Formation 2024",
      year: "2024",
      totalBudget: 2500000,
      progression: "60% Transversal / 40% Métier",
      status: "Actif",
      description: "Budget budgétaire principal pour l'année 2024",
    })

    // Set budget history
    setBudgetHistory([
      {
        key: "1",
        name: "Plan de Formation 2024",
        year: "2024",
        totalBudget: 2500000,
        progression: "1 an, 2 mois",
        status: "Actif",
        dateCreation: "2024-01-15",
        actions: "Modifier",
      },
      {
        key: "2",
        name: "Plan de Formation 2023",
        year: "2023",
        totalBudget: 2300000,
        progression: "Terminé",
        status: "Clôturé",
        dateCreation: "2023-01-10",
        actions: "Consulter",
      },
    ])

    // Set monthly budget data
    setMonthlyBudgets([
      {
        key: "1",
        periode: "2024 - 01",
        budgetInitial: 150000,
        budgetAlloue: 145000,
        budgetRealise: 80000,
        ecart: 0,
        taux: "55%",
        statut: "En cours",
        progression: 55,
      },
      {
        key: "2",
        periode: "2024 - 02",
        budgetInitial: 140000,
        budgetAlloue: 135000,
        budgetRealise: 135000,
        ecart: 5000,
        taux: "100%",
        statut: "Terminé",
        progression: 100,
      },
      {
        key: "3",
        periode: "2024 - 03",
        budgetInitial: 135000,
        budgetAlloue: 130000,
        budgetRealise: 67500,
        ecart: 0,
        taux: "52%",
        statut: "En cours",
        progression: 52,
      },
      {
        key: "4",
        periode: "2024 - 04",
        budgetInitial: 155000,
        budgetAlloue: 145000,
        budgetRealise: 0,
        ecart: 0,
        taux: "0%",
        statut: "Planifié",
        progression: 0,
      },
    ])
  }, [])

  const onFinish = (values) => {
    setLoading(true)
    console.log("Budget creation values:", values)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      message.success("Exercice budgétaire créé avec succès!")
      form.resetFields()
      setModalVisible(false)
    }, 1500)
  }

  const historyColumns = [
    {
      title: "Nom",
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
      render: (value) => `${value?.toLocaleString()} DHS`,
      align: "right",
    },
    {
      title: "Progression",
      dataIndex: "progression",
      key: "progression",
      align: "center",
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Actif" ? "green" : status === "Clôturé" ? "red" : "orange"}>{status}</Tag>
      ),
      align: "center",
    },
    {
      title: "Date Création",
      dataIndex: "dateCreation",
      key: "dateCreation",
      render: (date) => moment(date).format("DD/MM/YYYY"),
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
          {record.status === "Actif" && (
            <Tooltip title="Modifier">
              <Button type="text" icon={<EditOutlined />} size="small" />
            </Tooltip>
          )}
        </Space>
      ),
      align: "center",
    },
  ]

  const monthlyColumns = [
    {
      title: "Période",
      dataIndex: "periode",
      key: "periode",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Budget Initial",
      dataIndex: "budgetInitial",
      key: "budgetInitial",
      render: (value) => `${value?.toLocaleString()} DHS`,
      align: "right",
    },
    {
      title: "Budget Alloué",
      dataIndex: "budgetAlloue",
      key: "budgetAlloue",
      render: (value) => `${value?.toLocaleString()} DHS`,
      align: "right",
    },
    {
      title: "Budget Réalisé",
      dataIndex: "budgetRealise",
      key: "budgetRealise",
      render: (value) => `${value?.toLocaleString()} DHS`,
      align: "right",
    },
    {
      title: "Écart",
      dataIndex: "ecart",
      key: "ecart",
      render: (value) => (
        <Text style={{ color: value > 0 ? "#52c41a" : value < 0 ? "#ff4d4f" : "#666" }}>
          {value > 0 ? "+" : ""}
          {value?.toLocaleString()} DHS
        </Text>
      ),
      align: "right",
    },
    {
      title: "Taux",
      dataIndex: "taux",
      key: "taux",
      align: "center",
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (status) => (
        <Tag color={status === "Terminé" ? "green" : status === "En cours" ? "blue" : "orange"}>{status}</Tag>
      ),
      align: "center",
    },
    {
      title: "Progression",
      dataIndex: "progression",
      key: "progression",
      render: (value) => (
        <Progress
          percent={value}
          size="small"
          strokeColor={value === 100 ? "#52c41a" : value > 50 ? "#1890ff" : "#faad14"}
        />
      ),
      width: 120,
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2} className="mb-2 text-gray-800">
              Création de l'Exercice Budgétaire de Formation
            </Title>
            <Text className="text-gray-600">Gérez et créez les exercices budgétaires pour votre organisation</Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setModalVisible(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Nouvel Exercice
          </Button>
        </div>
      </div>

      {/* Active Exercise Section */}
      {activeExercise && (
        <Card
          title="Exercice Budgétaire Actif"
          className="mb-6 shadow-lg border-0"
          extra={<Tag color="green">Actif</Tag>}
        >
          <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
              <div>
                <Text className="text-gray-500">Nom de l'Exercice</Text>
                <div className="text-lg font-semibold text-gray-800">{activeExercise.name}</div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div>
                <Text className="text-gray-500">Budget Total</Text>
                <div className="text-lg font-semibold text-green-600">
                  {activeExercise.totalBudget.toLocaleString()} DHS
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div>
                <Text className="text-gray-500">Progression</Text>
                <div className="text-lg font-semibold text-blue-600">{activeExercise.progression}</div>
              </div>
            </Col>
          </Row>
          <Divider />
          <Text className="text-gray-600">{activeExercise.description}</Text>
        </Card>
      )}

      {/* Budget History */}
      <Card
        title="Historique des Exercices Budgétaires"
        className="mb-6 shadow-lg border-0"
        extra={
          <Space>
            <Button icon={<DownloadOutlined />} size="small">
              Exporter
            </Button>
          </Space>
        }
      >
        <Table columns={historyColumns} dataSource={budgetHistory} pagination={false} size="middle" className="mb-4" />
      </Card>

      {/* Detailed Budget Tracking */}
      <Card title="Suivi Budgétaire Détaillé" className="mb-6 shadow-lg border-0">
        <div className="mb-4">
          <Row gutter={16}>
            <Col span={6}>
              <Text className="text-gray-500">Année 2024</Text>
            </Col>
            <Col span={6}>
              <Text className="text-gray-500">Toutes les entités</Text>
            </Col>
            <Col span={6}>
              <Text className="text-gray-500">Par Collaborateur</Text>
            </Col>
            <Col span={6}>
              <Text className="text-gray-500">Par Entité</Text>
            </Col>
          </Row>
        </div>
      </Card>

      {/* Budget by Period */}
      <Card title="Budget par Période" className="mb-6 shadow-lg border-0">
        <Table
          columns={monthlyColumns}
          dataSource={monthlyBudgets}
          pagination={false}
          size="middle"
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Global Budget Summary */}
      <Card title="Résumé Budgétaire Global" className="shadow-lg border-0">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">500,000</div>
              <div className="text-gray-600">Budget Disponible</div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">187,500</div>
              <div className="text-gray-600">Budget en cours</div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">312,500</div>
              <div className="text-gray-600">Budget Utilisé</div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">37.5%</div>
              <div className="text-gray-600">Taux d'utilisation</div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Create New Exercise Modal */}
      <Modal
        title="Créer un Nouvel Exercice Budgétaire"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
        }}
        footer={null}
        width={600}
        className="top-8"
      >
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-6">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="exerciseName"
                label="Nom de l'Exercice"
                rules={[{ required: true, message: "Veuillez saisir le nom de l'exercice" }]}
              >
                <Input placeholder="Ex: Plan de Formation 2025" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="year"
                label="Année"
                rules={[{ required: true, message: "Veuillez sélectionner l'année" }]}
              >
                <Select placeholder="Sélectionner l'année">
                  <Option value="2024">2024</Option>
                  <Option value="2025">2025</Option>
                  <Option value="2026">2026</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="totalBudget"
            label="Budget Total (DHS)"
            rules={[{ required: true, message: "Veuillez saisir le budget total" }]}
          >
            <InputNumber
              className="w-full"
              min={0}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder="Ex: 2500000"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="transversalPercentage"
                label="% Formations Transversales"
                rules={[{ required: true, message: "Veuillez saisir le pourcentage" }]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  placeholder="Ex: 60"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="jobSpecificPercentage"
                label="% Formations Métier"
                rules={[{ required: true, message: "Veuillez saisir le pourcentage" }]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  placeholder="Ex: 40"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Description textuelle">
            <TextArea
              rows={4}
              placeholder="Description de l'exercice budgétaire et objectifs..."
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button
                onClick={() => {
                  setModalVisible(false)
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
                Créer exercice
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreationBudgetaire
