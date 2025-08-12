"use client"

import { useState, useEffect } from "react"
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Tag,
  Modal,
  Form,
  InputNumber,
  message,
  Popconfirm,
  Card,
  Row,
  Col,
  Typography,
  Tooltip,
} from "antd"
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import { useSelector, useDispatch } from "react-redux"
import DashboardLayout from "../layouts/DashboardLayout"
import {
  fetchTrainingsThunk,
  createTrainingThunk,
  updateTrainingThunk,
  deleteTrainingThunk,
} from "../redux/thunks/catalogThunks"

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const CatalogPage = () => {
  const dispatch = useDispatch()
  const { trainings, isLoading, pagination } = useSelector((state) => state.catalog)
  const { user } = useSelector((state) => state.auth)

  const [searchText, setSearchText] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTraining, setEditingTraining] = useState(null)
  const [form] = Form.useForm()

  // Types de formation avec icônes et couleurs
  const trainingTypes = [
    { value: "Métier", label: "Métier", color: "#1890ff", icon: "💼" },
    { value: "Support", label: "Support", color: "#52c41a", icon: "🛠️" },
    { value: "Réglementaire", label: "Réglementaire", color: "#fa8c16", icon: "⚖️" },
    { value: "Soft Skills", label: "Soft Skills", color: "#722ed1", icon: "🧠" },
  ]

  // Statuts avec couleurs
  const statusConfig = {
    Validé: { color: "success", text: "Validé" },
    "En attente": { color: "warning", text: "En attente" },
    Rejeté: { color: "error", text: "Rejeté" },
    Archivé: { color: "default", text: "Archivé" },
  }

  useEffect(() => {
    dispatch(
      fetchTrainingsThunk({
        page: 1,
        limit: 10,
        search: searchText,
        type: selectedType,
        status: selectedStatus,
      }),
    )
  }, [dispatch, searchText, selectedType, selectedStatus])

  const handleSearch = (value) => {
    setSearchText(value)
  }

  const handleTypeFilter = (value) => {
    setSelectedType(value)
  }

  const handleStatusFilter = (value) => {
    setSelectedStatus(value)
  }

  const handleAddTraining = () => {
    setEditingTraining(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEditTraining = (record) => {
    setEditingTraining(record)
    form.setFieldsValue({
      ...record,
      prerequisites: record.prerequisites?.join(", "),
      objectives: record.objectives?.join(", "),
      tags: record.tags?.join(", "),
    })
    setIsModalVisible(true)
  }

  const handleDeleteTraining = async (id) => {
    try {
      await dispatch(deleteTrainingThunk(id))
      message.success("Formation supprimée avec succès")
    } catch (error) {
      message.error("Erreur lors de la suppression")
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      const formattedValues = {
        ...values,
        prerequisites: values.prerequisites?.split(",").map((item) => item.trim()) || [],
        objectives: values.objectives?.split(",").map((item) => item.trim()) || [],
        tags: values.tags?.split(",").map((item) => item.trim()) || [],
      }

      if (editingTraining) {
        await dispatch(updateTrainingThunk({ id: editingTraining.id, data: formattedValues }))
        message.success("Formation mise à jour avec succès")
      } else {
        await dispatch(createTrainingThunk(formattedValues))
        message.success("Formation créée avec succès")
      }

      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error("Erreur lors de l'enregistrement")
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
    setEditingTraining(null)
  }

  const getTypeIcon = (type) => {
    const typeConfig = trainingTypes.find((t) => t.value === type)
    return typeConfig ? typeConfig.icon : "📚"
  }

  const getTypeColor = (type) => {
    const typeConfig = trainingTypes.find((t) => t.value === type)
    return typeConfig ? typeConfig.color : "#1890ff"
  }

  const columns = [
    {
      title: "TITRE",
      dataIndex: "title",
      key: "title",
      width: "25%",
      render: (text, record) => (
        <div>
          <Text strong style={{ fontSize: "14px" }}>
            {text}
          </Text>
          {record.description && (
            <div>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {record.description.length > 50 ? `${record.description.substring(0, 50)}...` : record.description}
              </Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
      width: "15%",
      render: (type) => (
        <Tag color={getTypeColor(type)} style={{ borderRadius: "12px", padding: "2px 8px" }}>
          {getTypeIcon(type)} {type}
        </Tag>
      ),
    },
    {
      title: "DURÉE",
      dataIndex: "duration",
      key: "duration",
      width: "10%",
      render: (duration) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <ClockCircleOutlined style={{ marginRight: "4px", color: "#8c8c8c" }} />
          <Text>
            {duration} jour{duration > 1 ? "s" : ""}
          </Text>
        </div>
      ),
    },
    {
      title: "STATUT",
      dataIndex: "status",
      key: "status",
      width: "12%",
      render: (status) => {
        const config = statusConfig[status] || statusConfig["En attente"]
        return (
          <Tag color={config.color} style={{ borderRadius: "12px", padding: "2px 8px" }}>
            {config.text}
          </Tag>
        )
      },
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: "20%",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Consulter">
            <Button type="text" size="small" icon={<EyeOutlined />} style={{ color: "#1890ff" }} />
          </Tooltip>
          <Tooltip title="Valider">
            <Button type="text" size="small" style={{ color: "#52c41a" }}>
              Valider
            </Button>
          </Tooltip>
          {(user?.role?.name === "ADMIN" || user?.role?.name === "RF") && (
            <>
              <Tooltip title="Modifier">
                <Button
                  type="text"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => handleEditTraining(record)}
                  style={{ color: "#fa8c16" }}
                />
              </Tooltip>
              <Tooltip title="Archiver">
                <Popconfirm
                  title="Êtes-vous sûr de vouloir archiver cette formation ?"
                  onConfirm={() => handleDeleteTraining(record.id)}
                  okText="Oui"
                  cancelText="Non"
                >
                  <Button type="text" size="small" style={{ color: "#8c8c8c" }}>
                    Archiver
                  </Button>
                </Popconfirm>
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ]

  // Données mockées pour la démonstration
  const mockTrainings = [
    {
      id: 1,
      title: "Leadership & Management",
      description: "Formation complète sur les techniques de management et de leadership",
      type: "Métier",
      duration: 2,
      status: "Validé",
      maxParticipants: 15,
      price: 1200,
    },
    {
      id: 2,
      title: "Excel Avancé",
      description: "Maîtrise des fonctions avancées d'Excel",
      type: "Support",
      duration: 1,
      status: "En attente",
      maxParticipants: 20,
      price: 800,
    },
    {
      id: 3,
      title: "Sécurité au travail",
      description: "Formation obligatoire sur la sécurité en entreprise",
      type: "Réglementaire",
      duration: 3,
      status: "Rejeté",
      maxParticipants: 25,
      price: 600,
    },
    {
      id: 4,
      title: "Communication efficace",
      description: "Améliorer ses compétences en communication",
      type: "Soft Skills",
      duration: 1.5,
      status: "Validé",
      maxParticipants: 12,
      price: 900,
    },
  ]

  return (
    <DashboardLayout>
      <div style={{ padding: "0 0 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
              Catalogue de formation
            </Title>
            <Text type="secondary">Gérez votre catalogue de formations</Text>
          </div>
          {(user?.role?.name === "ADMIN" || user?.role?.name === "RF") && (
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTraining} size="large">
              Ajouter une formation
            </Button>
          )}
        </div>

        {/* Filtres */}
        <Card style={{ marginBottom: "24px" }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8} md={6}>
              <Input
                placeholder="Rechercher une formation..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Select
                placeholder="Tous les types"
                style={{ width: "100%" }}
                value={selectedType}
                onChange={handleTypeFilter}
                allowClear
              >
                {trainingTypes.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Select
                placeholder="Tous les statuts"
                style={{ width: "100%" }}
                value={selectedStatus}
                onChange={handleStatusFilter}
                allowClear
              >
                {Object.entries(statusConfig).map(([key, config]) => (
                  <Option key={key} value={key}>
                    {config.text}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button icon={<FilterOutlined />}>Filtres avancés</Button>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Tableau des formations */}
        <Card>
          <Table
            columns={columns}
            dataSource={mockTrainings}
            loading={isLoading}
            rowKey="id"
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: pagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} formations`,
            }}
            scroll={{ x: 800 }}
          />
        </Card>

        {/* Modal d'ajout/modification */}
        <Modal
          title={editingTraining ? "Modifier la formation" : "Ajouter une formation"}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          width={800}
          okText="Enregistrer"
          cancelText="Annuler"
        >
          <Form form={form} layout="vertical" style={{ marginTop: "20px" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Titre de la formation"
                  rules={[{ required: true, message: "Le titre est obligatoire" }]}
                >
                  <Input placeholder="Ex: Leadership & Management" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type de formation"
                  rules={[{ required: true, message: "Le type est obligatoire" }]}
                >
                  <Select placeholder="Sélectionner un type">
                    {trainingTypes.map((type) => (
                      <Option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="description" label="Description">
              <TextArea rows={3} placeholder="Description détaillée de la formation" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="duration"
                  label="Durée (jours)"
                  rules={[{ required: true, message: "La durée est obligatoire" }]}
                >
                  <InputNumber min={0.5} step={0.5} style={{ width: "100%" }} placeholder="Ex: 2" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="maxParticipants"
                  label="Nombre max de participants"
                  rules={[{ required: true, message: "Le nombre de participants est obligatoire" }]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} placeholder="Ex: 15" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="price"
                  label="Prix (€)"
                  rules={[{ required: true, message: "Le prix est obligatoire" }]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} placeholder="Ex: 1200" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="prerequisites" label="Prérequis (séparés par des virgules)">
              <Input placeholder="Ex: Expérience managériale, Niveau Bac+3" />
            </Form.Item>

            <Form.Item name="objectives" label="Objectifs pédagogiques (séparés par des virgules)">
              <TextArea rows={2} placeholder="Ex: Maîtriser les techniques de management, Développer son leadership" />
            </Form.Item>

            <Form.Item name="tags" label="Mots-clés (séparés par des virgules)">
              <Input placeholder="Ex: management, leadership, équipe" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default CatalogPage
