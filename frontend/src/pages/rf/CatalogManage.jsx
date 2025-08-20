"use client"

import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Tooltip,
  Badge,
  InputNumber,
  Tabs,
  List,
  Avatar,
  Rate,
  Progress,
  Statistic,
} from "antd"
import {
  BookOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  DownloadOutlined,
  StarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"

const { Option } = Select
const { RangePicker } = DatePicker
const { TabPane } = Tabs
const { Search } = Input

const CatalogManage = () => {
  const [loading, setLoading] = useState(false)
  const [trainingModalVisible, setTrainingModalVisible] = useState(false)
  const [selectedTraining, setSelectedTraining] = useState(null)
  const [form] = Form.useForm()
  const [searchText, setSearchText] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  // Données simulées pour le catalogue
  const catalogStats = {
    totalTrainings: 156,
    activeTrainings: 89,
    pendingApproval: 12,
    averageRating: 4.2,
  }

  const trainings = [
    {
      id: 1,
      title: "Leadership et Management d'Équipe",
      category: "Leadership",
      provider: "Cabinet Excellence",
      duration: 16,
      price: 1200,
      rating: 4.5,
      participants: 25,
      status: "active",
      lastUpdate: "2024-01-15",
      description: "Formation complète sur les techniques de management moderne",
      level: "Intermédiaire",
      format: "Présentiel",
    },
    {
      id: 2,
      title: "Cybersécurité Avancée",
      category: "IT",
      provider: "TechSecure Formation",
      duration: 24,
      price: 1800,
      rating: 4.8,
      participants: 15,
      status: "active",
      lastUpdate: "2024-01-14",
      description: "Sécurité informatique et protection des données",
      level: "Avancé",
      format: "Hybride",
    },
    {
      id: 3,
      title: "Communication Interpersonnelle",
      category: "Soft Skills",
      provider: "Formateurs Associés",
      duration: 8,
      price: 600,
      rating: 4.2,
      participants: 32,
      status: "pending",
      lastUpdate: "2024-01-13",
      description: "Améliorer ses compétences en communication",
      level: "Débutant",
      format: "Présentiel",
    },
    {
      id: 4,
      title: "Gestion de Projet Agile",
      category: "Management",
      provider: "Agile Academy",
      duration: 20,
      price: 1500,
      rating: 4.6,
      participants: 18,
      status: "active",
      lastUpdate: "2024-01-12",
      description: "Méthodologies agiles et gestion de projet",
      level: "Intermédiaire",
      format: "Distanciel",
    },
    {
      id: 5,
      title: "Excel Avancé",
      category: "Bureautique",
      provider: "Office Pro",
      duration: 12,
      price: 450,
      rating: 4.0,
      participants: 45,
      status: "inactive",
      lastUpdate: "2024-01-10",
      description: "Maîtrise avancée d'Excel",
      level: "Avancé",
      format: "Distanciel",
    },
  ]

  const categories = ["Leadership", "IT", "Soft Skills", "Management", "Bureautique", "Commercial", "Finance"]

  const columns = [
    {
      title: "Formation",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{text}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            <Tag color="blue">{record.category}</Tag>
            <Tag color="green">{record.format}</Tag>
            <Tag color="orange">{record.level}</Tag>
          </div>
        </div>
      ),
      filterable: true,
    },
    {
      title: "Prestataire",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Durée",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => `${duration}h`,
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "Prix",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price}€`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Note",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <Space>
          <Rate disabled defaultValue={rating} style={{ fontSize: "14px" }} />
          <span>{rating}</span>
        </Space>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
      render: (count) => (
        <Badge count={count} style={{ backgroundColor: "#52c41a" }}>
          <TeamOutlined style={{ fontSize: "16px" }} />
        </Badge>
      ),
      sorter: (a, b) => a.participants - b.participants,
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          active: "green",
          pending: "orange",
          inactive: "red",
        }
        const labels = {
          active: "Actif",
          pending: "En attente",
          inactive: "Inactif",
        }
        return <Tag color={colors[status]}>{labels[status]}</Tag>
      },
      filters: [
        { text: "Actif", value: "active" },
        { text: "En attente", value: "pending" },
        { text: "Inactif", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir détails">
            <Button type="text" icon={<EyeOutlined />} onClick={() => handleViewTraining(record)} />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEditTraining(record)} />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteTraining(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const handleViewTraining = (training) => {
    Modal.info({
      title: training.title,
      width: 600,
      content: (
        <div>
          <p>
            <strong>Prestataire:</strong> {training.provider}
          </p>
          <p>
            <strong>Description:</strong> {training.description}
          </p>
          <p>
            <strong>Durée:</strong> {training.duration} heures
          </p>
          <p>
            <strong>Prix:</strong> {training.price}€
          </p>
          <p>
            <strong>Format:</strong> {training.format}
          </p>
          <p>
            <strong>Niveau:</strong> {training.level}
          </p>
          <p>
            <strong>Note:</strong> <Rate disabled defaultValue={training.rating} /> ({training.rating}/5)
          </p>
        </div>
      ),
    })
  }

  const handleEditTraining = (training) => {
    setSelectedTraining(training)
    form.setFieldsValue({
      title: training.title,
      category: training.category,
      provider: training.provider,
      duration: training.duration,
      price: training.price,
      description: training.description,
      level: training.level,
      format: training.format,
    })
    setTrainingModalVisible(true)
  }

  const handleDeleteTraining = (training) => {
    Modal.confirm({
      title: "Supprimer la formation",
      content: `Êtes-vous sûr de vouloir supprimer "${training.title}" ?`,
      onOk: () => {
        console.log("Delete training:", training.id)
      },
    })
  }

  const handleSaveTraining = (values) => {
    console.log("Save training:", values)
    setTrainingModalVisible(false)
    form.resetFields()
    setSelectedTraining(null)
  }

  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchText.toLowerCase()) ||
      training.provider.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory = filterCategory === "all" || training.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Gestion du Catalogue Formation</h1>
        <p className="text-gray-600">Administration et maintenance du catalogue des formations</p>
      </div>

      {/* Statistiques */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Formations"
              value={catalogStats.totalTrainings}
              prefix={<BookOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Formations Actives"
              value={catalogStats.activeTrainings}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="En Attente"
              value={catalogStats.pendingApproval}
              prefix={<ExclamationCircleOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Note Moyenne"
              value={catalogStats.averageRating}
              prefix={<StarOutlined style={{ color: "#722ed1" }} />}
              suffix="/5"
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="catalog" type="card">
        {/* Onglet Catalogue */}
        <TabPane
          tab={
            <span>
              <BookOutlined />
              Catalogue Formations
            </span>
          }
          key="catalog"
        >
          <Card
            title="Gestion du Catalogue"
            extra={
              <Space>
                <Search
                  placeholder="Rechercher une formation..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 250 }}
                />
                <Select
                  value={filterCategory}
                  onChange={setFilterCategory}
                  style={{ width: 150 }}
                  placeholder="Catégorie"
                >
                  <Option value="all">Toutes</Option>
                  {categories.map((cat) => (
                    <Option key={cat} value={cat}>
                      {cat}
                    </Option>
                  ))}
                </Select>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setTrainingModalVisible(true)}>
                  Nouvelle Formation
                </Button>
                <Button icon={<UploadOutlined />}>Import</Button>
                <Button icon={<DownloadOutlined />}>Export</Button>
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={filteredTrainings}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} formations`,
              }}
            />
          </Card>
        </TabPane>

        {/* Onglet Prestataires */}
        <TabPane
          tab={
            <span>
              <TeamOutlined />
              Prestataires
            </span>
          }
          key="providers"
        >
          <Card title="Gestion des Prestataires">
            <List
              dataSource={[
                {
                  name: "Cabinet Excellence",
                  specialties: ["Leadership", "Management"],
                  rating: 4.5,
                  trainings: 12,
                  contact: "contact@excellence.fr",
                },
                {
                  name: "TechSecure Formation",
                  specialties: ["IT", "Cybersécurité"],
                  rating: 4.8,
                  trainings: 8,
                  contact: "info@techsecure.fr",
                },
                {
                  name: "Formateurs Associés",
                  specialties: ["Soft Skills", "Communication"],
                  rating: 4.2,
                  trainings: 15,
                  contact: "hello@formateurs.fr",
                },
              ]}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button key="edit" type="link">
                      Modifier
                    </Button>,
                    <Button key="view" type="link">
                      Voir formations
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: "#1890ff" }}>{item.name.charAt(0)}</Avatar>}
                    title={
                      <div>
                        <span style={{ fontWeight: "bold" }}>{item.name}</span>
                        <Rate disabled defaultValue={item.rating} style={{ marginLeft: "8px", fontSize: "14px" }} />
                      </div>
                    }
                    description={
                      <div>
                        <div>Spécialités: {item.specialties.join(", ")}</div>
                        <div>
                          Formations: {item.trainings} | Contact: {item.contact}
                        </div>
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
              <StarOutlined />
              Analytics
            </span>
          }
          key="analytics"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Formations par Catégorie">
                <div>
                  {categories.map((category) => {
                    const count = trainings.filter((t) => t.category === category).length
                    const percentage = Math.round((count / trainings.length) * 100)
                    return (
                      <div key={category} style={{ marginBottom: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span>{category}</span>
                          <span>{count} formations</span>
                        </div>
                        <Progress percent={percentage} size="small" />
                      </div>
                    )
                  })}
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Top Formations">
                <List
                  dataSource={trainings.sort((a, b) => b.rating - a.rating).slice(0, 5)}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: "#52c41a" }}>{index + 1}</Avatar>}
                        title={item.title}
                        description={
                          <div>
                            <Rate disabled defaultValue={item.rating} style={{ fontSize: "12px" }} />
                            <span style={{ marginLeft: "8px" }}>({item.participants} participants)</span>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* Modal de formation */}
      <Modal
        title={selectedTraining ? "Modifier Formation" : "Nouvelle Formation"}
        open={trainingModalVisible}
        onCancel={() => {
          setTrainingModalVisible(false)
          setSelectedTraining(null)
          form.resetFields()
        }}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveTraining}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Titre de la formation"
                name="title"
                rules={[{ required: true, message: "Saisissez le titre" }]}
              >
                <Input placeholder="Titre de la formation" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Catégorie"
                name="category"
                rules={[{ required: true, message: "Sélectionnez une catégorie" }]}
              >
                <Select placeholder="Sélectionnez une catégorie">
                  {categories.map((cat) => (
                    <Option key={cat} value={cat}>
                      {cat}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Prestataire"
                name="provider"
                rules={[{ required: true, message: "Saisissez le prestataire" }]}
              >
                <Input placeholder="Nom du prestataire" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Durée (heures)"
                name="duration"
                rules={[{ required: true, message: "Saisissez la durée" }]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="Durée en heures" min={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Prix (€)" name="price" rules={[{ required: true, message: "Saisissez le prix" }]}>
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Prix en euros"
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Niveau" name="level" rules={[{ required: true, message: "Sélectionnez le niveau" }]}>
                <Select placeholder="Niveau">
                  <Option value="Débutant">Débutant</Option>
                  <Option value="Intermédiaire">Intermédiaire</Option>
                  <Option value="Avancé">Avancé</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Format" name="format" rules={[{ required: true, message: "Sélectionnez le format" }]}>
                <Select placeholder="Format">
                  <Option value="Présentiel">Présentiel</Option>
                  <Option value="Distanciel">Distanciel</Option>
                  <Option value="Hybride">Hybride</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} placeholder="Description de la formation..." />
          </Form.Item>
          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setTrainingModalVisible(false)
                  setSelectedTraining(null)
                  form.resetFields()
                }}
              >
                Annuler
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {selectedTraining ? "Modifier" : "Créer"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CatalogManage
