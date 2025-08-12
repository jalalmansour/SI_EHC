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
  Upload,
  Progress,
  Alert,
  Tabs,
  Space,
  Tooltip,
  Badge,
  Avatar,
  List,
  Rate,
  Divider,
  Steps,
  Timeline,
  message,
} from "antd"
import {
  FileTextOutlined,
  StarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  BarChartOutlined,
  CalendarOutlined,
  BellOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
} from "@ant-design/icons"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import moment from "moment"
import "moment/locale/fr"
import DashboardLayout from "../layouts/DashboardLayout"

const { Content } = Layout
const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input
const { Dragger } = Upload
const { Step } = Steps

moment.locale("fr")

const DashboardOrganismePage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [offerModalVisible, setOfferModalVisible] = useState(false)
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [selectedSession, setSelectedSession] = useState(null)
  const [form] = Form.useForm()
  const [evaluationForm] = Form.useForm()

  // Données simulées pour le dashboard Organisme
  const dashboardData = {
    organizationStats: {
      totalOffers: 15,
      acceptedOffers: 12,
      pendingOffers: 3,
      totalSessions: 28,
      completedSessions: 24,
      averageRating: 4.6,
      totalRevenue: 125000,
      activeClients: 8,
    },
    satisfactionTrend: {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
      datasets: [
        {
          label: "Satisfaction Moyenne",
          data: [4.2, 4.3, 4.5, 4.4, 4.6, 4.7],
          borderColor: "#52c41a",
          backgroundColor: "rgba(82, 196, 26, 0.1)",
          tension: 0.4,
        },
      ],
    },
    sessionsByType: {
      labels: ["Technique", "Soft Skills", "Leadership", "Sécurité", "Certification"],
      datasets: [
        {
          data: [35, 25, 20, 15, 5],
          backgroundColor: ["#1890ff", "#52c41a", "#faad14", "#f759ab", "#13c2c2"],
        },
      ],
    },
    monthlyRevenue: {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
      datasets: [
        {
          label: "Chiffre d'Affaires (€)",
          data: [18000, 22000, 19000, 25000, 21000, 20000],
          backgroundColor: "#1890ff",
        },
      ],
    },
  }

  const myOffers = [
    {
      id: 1,
      title: "Formation React Avancé",
      category: "Technique",
      duration: "16h",
      price: 2500,
      status: "accepted",
      submissionDate: "2024-01-10",
      validationDate: "2024-01-12",
      client: "TechCorp",
      sessions: 3,
      participants: 24,
    },
    {
      id: 2,
      title: "Leadership & Management",
      category: "Soft Skills",
      duration: "24h",
      price: 3200,
      status: "pending",
      submissionDate: "2024-01-15",
      client: "InnovateCorp",
      sessions: 0,
      participants: 0,
    },
    {
      id: 3,
      title: "Cybersécurité Avancée",
      category: "Sécurité",
      duration: "32h",
      price: 4500,
      status: "rejected",
      submissionDate: "2024-01-08",
      validationDate: "2024-01-10",
      client: "SecureTech",
      rejectionReason: "Budget insuffisant",
      sessions: 0,
      participants: 0,
    },
  ]

  const completedSessions = [
    {
      id: 1,
      title: "Formation React Avancé - Session 1",
      date: "2024-01-15",
      duration: "8h",
      participants: 12,
      client: "TechCorp",
      location: "Paris",
      status: "completed",
      evaluationStatus: "completed",
      averageRating: 4.5,
      feedback: "Excellente formation, très pratique",
    },
    {
      id: 2,
      title: "Formation React Avancé - Session 2",
      date: "2024-01-18",
      duration: "8h",
      participants: 12,
      client: "TechCorp",
      location: "Paris",
      status: "completed",
      evaluationStatus: "pending",
      averageRating: null,
      feedback: null,
    },
  ]

  const trainers = [
    {
      id: 1,
      name: "Jean Dupont",
      specialties: ["React", "Node.js", "JavaScript"],
      experience: "8 ans",
      rating: 4.7,
      sessionsCount: 45,
      status: "active",
    },
    {
      id: 2,
      name: "Marie Martin",
      specialties: ["Leadership", "Management", "Communication"],
      experience: "12 ans",
      rating: 4.8,
      sessionsCount: 67,
      status: "active",
    },
    {
      id: 3,
      name: "Pierre Dubois",
      specialties: ["Cybersécurité", "Audit", "Conformité"],
      experience: "10 ans",
      rating: 4.6,
      sessionsCount: 38,
      status: "active",
    },
  ]

  const notifications = [
    {
      id: 1,
      type: "evaluation",
      message: "Nouvelle évaluation à compléter pour la session React Avancé",
      date: "2024-01-18",
      priority: "high",
      read: false,
    },
    {
      id: 2,
      type: "offer",
      message: 'Votre offre "Leadership & Management" est en cours de validation',
      date: "2024-01-15",
      priority: "medium",
      read: false,
    },
    {
      id: 3,
      type: "payment",
      message: "Paiement reçu pour la formation React Avancé - 2500€",
      date: "2024-01-14",
      priority: "low",
      read: true,
    },
  ]

  // Colonnes pour les offres
  const offerColumns = [
    {
      title: "Formation",
      key: "formation",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{record.title}</div>
          <Tag color="blue">{record.category}</Tag>
        </div>
      ),
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Durée",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Prix",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()}€`,
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusConfig = {
          accepted: { color: "success", text: "Accepté" },
          pending: { color: "processing", text: "En attente" },
          rejected: { color: "error", text: "Rejeté" },
        }
        const config = statusConfig[status]
        return <Badge status={config.color} text={config.text} />
      },
    },
    {
      title: "Sessions",
      dataIndex: "sessions",
      key: "sessions",
      render: (sessions, record) => (
        <div>
          <div>{sessions} réalisées</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{record.participants} participants</div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir détails">
            <Button type="text" icon={<EyeOutlined />} onClick={() => handleViewOffer(record)} />
          </Tooltip>
          {record.status === "pending" && (
            <Tooltip title="Modifier">
              <Button type="text" icon={<EditOutlined />} onClick={() => handleEditOffer(record)} />
            </Tooltip>
          )}
          {record.status === "accepted" && (
            <Tooltip title="Rapport de session">
              <Button type="text" icon={<FileTextOutlined />} onClick={() => handleSessionReport(record)} />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ]

  // Colonnes pour les sessions
  const sessionColumns = [
    {
      title: "Session",
      key: "session",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{record.title}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{record.client}</div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
    },
    {
      title: "Lieu",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Évaluation",
      key: "evaluation",
      render: (_, record) => (
        <div>
          {record.evaluationStatus === "completed" ? (
            <div>
              <Rate disabled defaultValue={record.averageRating} style={{ fontSize: "12px" }} />
              <div style={{ fontSize: "12px" }}>Terminé</div>
            </div>
          ) : (
            <Badge status="warning" text="En attente" />
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.evaluationStatus === "pending" && (
            <Button type="primary" size="small" onClick={() => handleCompleteEvaluation(record)}>
              Compléter Évaluation
            </Button>
          )}
          <Button type="text" icon={<EyeOutlined />} onClick={() => handleViewSession(record)}>
            Détails
          </Button>
        </Space>
      ),
    },
  ]

  // Handlers
  const handleViewOffer = (offer) => {
    setSelectedOffer(offer)
    Modal.info({
      title: "Détails de l'Offre",
      width: 600,
      content: (
        <div>
          <p>
            <strong>Formation:</strong> {offer.title}
          </p>
          <p>
            <strong>Catégorie:</strong> {offer.category}
          </p>
          <p>
            <strong>Client:</strong> {offer.client}
          </p>
          <p>
            <strong>Durée:</strong> {offer.duration}
          </p>
          <p>
            <strong>Prix:</strong> {offer.price.toLocaleString()}€
          </p>
          <p>
            <strong>Date de soumission:</strong> {moment(offer.submissionDate).format("DD/MM/YYYY")}
          </p>
          {offer.validationDate && (
            <p>
              <strong>Date de validation:</strong> {moment(offer.validationDate).format("DD/MM/YYYY")}
            </p>
          )}
          {offer.rejectionReason && (
            <Alert
              message="Motif de rejet"
              description={offer.rejectionReason}
              type="error"
              style={{ marginTop: "16px" }}
            />
          )}
        </div>
      ),
    })
  }

  const handleEditOffer = (offer) => {
    setSelectedOffer(offer)
    form.setFieldsValue(offer)
    setOfferModalVisible(true)
  }

  const handleSessionReport = (offer) => {
    console.log("Generate session report for:", offer.id)
  }

  const handleCompleteEvaluation = (session) => {
    setSelectedSession(session)
    setEvaluationModalVisible(true)
  }

  const handleViewSession = (session) => {
    console.log("View session details:", session.id)
  }

  const handleCreateOffer = () => {
    setSelectedOffer(null)
    form.resetFields()
    setOfferModalVisible(true)
  }

  const handleOfferSubmit = (values) => {
    console.log("Offer submitted:", values)
    setOfferModalVisible(false)
    message.success("Offre soumise avec succès")
  }

  const handleEvaluationSubmit = (values) => {
    console.log("Evaluation submitted:", values)
    setEvaluationModalVisible(false)
    message.success("Évaluation complétée avec succès")
  }

  const uploadProps = {
    name: "file",
    multiple: true,
    action: "/api/upload",
    onChange(info) {
      const { status } = info.file
      if (status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (status === "done") {
        message.success(`${info.file.name} téléchargé avec succès.`)
      } else if (status === "error") {
        message.error(`${info.file.name} échec du téléchargement.`)
      }
    },
    beforeUpload: (file) => {
      const isValidType =
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      if (!isValidType) {
        message.error("Seuls les fichiers PDF et DOC sont autorisés!")
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        message.error("Le fichier doit faire moins de 10MB!")
      }
      return isValidType && isLt10M
    },
  }

  return (
    <DashboardLayout>
      <Content style={{ padding: "24px" }}>
        {/* En-tête */}
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>Dashboard Organisme - FormaPro</h1>
            <p style={{ margin: "4px 0 0 0", color: "#666" }}>Gestion de vos offres et sessions de formation</p>
          </div>
          <Space>
            <Badge count={notifications.filter((n) => !n.read).length}>
              <Button icon={<BellOutlined />}>Notifications</Button>
            </Badge>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateOffer}>
              Nouvelle Offre
            </Button>
          </Space>
        </div>

        {/* Notifications importantes */}
        {notifications.filter((n) => !n.read && n.priority === "high").length > 0 && (
          <Alert
            message="Notifications Importantes"
            description={
              <div>
                {notifications
                  .filter((n) => !n.read && n.priority === "high")
                  .map((notif) => (
                    <div key={notif.id} style={{ marginBottom: "4px" }}>
                      <ExclamationCircleOutlined style={{ color: "#ff4d4f", marginRight: "8px" }} />
                      {notif.message}
                    </div>
                  ))}
              </div>
            }
            type="warning"
            showIcon
            closable
            style={{ marginBottom: "24px" }}
          />
        )}

        {/* Statistiques principales */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Offres Acceptées"
                value={dashboardData.organizationStats.acceptedOffers}
                suffix={`/ ${dashboardData.organizationStats.totalOffers}`}
                prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
                valueStyle={{ color: "#52c41a" }}
              />
              <Progress
                percent={Math.round(
                  (dashboardData.organizationStats.acceptedOffers / dashboardData.organizationStats.totalOffers) * 100,
                )}
                size="small"
                style={{ marginTop: "8px" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Sessions Réalisées"
                value={dashboardData.organizationStats.completedSessions}
                prefix={<CalendarOutlined style={{ color: "#1890ff" }} />}
                valueStyle={{ color: "#1890ff" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>Cette année</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Chiffre d'Affaires"
                value={dashboardData.organizationStats.totalRevenue}
                suffix="€"
                prefix={<BarChartOutlined style={{ color: "#faad14" }} />}
                valueStyle={{ color: "#faad14" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>+15% vs année précédente</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Satisfaction Moyenne"
                value={dashboardData.organizationStats.averageRating}
                suffix="/ 5"
                prefix={<StarOutlined style={{ color: "#f759ab" }} />}
                valueStyle={{ color: "#f759ab" }}
              />
              <Rate
                disabled
                defaultValue={dashboardData.organizationStats.averageRating}
                style={{ fontSize: "12px", marginTop: "8px" }}
              />
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="offers" type="card">
          {/* Onglet Mes Offres */}
          <TabPane
            tab={
              <span>
                <FileTextOutlined />
                Mes Offres
              </span>
            }
            key="offers"
          >
            <Card
              title="Gestion des Offres"
              extra={
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateOffer}>
                  Nouvelle Offre
                </Button>
              }
            >
              <Table columns={offerColumns} dataSource={myOffers} rowKey="id" pagination={{ pageSize: 10 }} />
            </Card>
          </TabPane>

          {/* Onglet Sessions */}
          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                Sessions
              </span>
            }
            key="sessions"
          >
            <Card title="Sessions Réalisées">
              <Table
                columns={sessionColumns}
                dataSource={completedSessions}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </TabPane>

          {/* Onglet Évaluations */}
          <TabPane
            tab={
              <span>
                <StarOutlined />
                Évaluations
              </span>
            }
            key="evaluations"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title="Évolution de la Satisfaction">
                  <Line
                    data={dashboardData.satisfactionTrend}
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
                          max: 5,
                        },
                      },
                    }}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Répartition par Type">
                  <Doughnut
                    data={dashboardData.sessionsByType}
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

            <Card title="Évaluations en Attente" style={{ marginTop: "16px" }}>
              <List
                dataSource={completedSessions.filter((s) => s.evaluationStatus === "pending")}
                renderItem={(session) => (
                  <List.Item key={session.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar style={{ backgroundColor: "#faad14" }}>
                          <StarOutlined />
                        </Avatar>
                      }
                      title={session.title}
                      description={
                        <div>
                          <div>Date: {moment(session.date).format("DD/MM/YYYY")}</div>
                          <div>Participants: {session.participants}</div>
                          <div>Client: {session.client}</div>
                        </div>
                      }
                    />
                    <List.Item
                      actions={[
                        <Button type="primary" onClick={() => handleCompleteEvaluation(session)}>
                          Compléter
                        </Button>,
                      ]}
                    ></List.Item>
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          {/* Onglet Formateurs */}
          <TabPane
            tab={
              <span>
                <TeamOutlined />
                Formateurs
              </span>
            }
            key="trainers"
          >
            <Card title="Équipe de Formateurs">
              <Row gutter={[16, 16]}>
                {trainers.map((trainer) => (
                  <Col xs={24} lg={8} key={trainer.id}>
                    <Card
                      hoverable
                      actions={[
                        <Button type="text" icon={<EyeOutlined />}>
                          Profil
                        </Button>,
                        <Button type="text" icon={<CalendarOutlined />}>
                          Planning
                        </Button>,
                        <Button type="text" icon={<BarChartOutlined />}>
                          Stats
                        </Button>,
                      ]}
                    >
                      <Card.Meta
                        avatar={
                          <Avatar size={64} style={{ backgroundColor: "#1890ff" }}>
                            {trainer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                        }
                        title={trainer.name}
                        description={
                          <div>
                            <div style={{ marginBottom: "8px" }}>
                              <strong>Expérience:</strong> {trainer.experience}
                            </div>
                            <div style={{ marginBottom: "8px" }}>
                              <Rate disabled defaultValue={trainer.rating} style={{ fontSize: "12px" }} />
                              <span style={{ marginLeft: "8px", fontSize: "12px" }}>{trainer.rating}/5</span>
                            </div>
                            <div style={{ marginBottom: "8px" }}>
                              <strong>Sessions:</strong> {trainer.sessionsCount}
                            </div>
                            <div>
                              <strong>Spécialités:</strong>
                              <div style={{ marginTop: "4px" }}>
                                {trainer.specialties.map((specialty) => (
                                  <Tag key={specialty} color="blue" size="small">
                                    {specialty}
                                  </Tag>
                                ))}
                              </div>
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </TabPane>

          {/* Onglet Statistiques */}
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                Statistiques
              </span>
            }
            key="stats"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title="Chiffre d'Affaires Mensuel">
                  <Bar
                    data={dashboardData.monthlyRevenue}
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
                <Card title="Performance Globale">
                  <div style={{ textAlign: "center" }}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Statistic
                          title="Taux d'Acceptation"
                          value={Math.round(
                            (dashboardData.organizationStats.acceptedOffers /
                              dashboardData.organizationStats.totalOffers) *
                              100,
                          )}
                          suffix="%"
                          valueStyle={{ color: "#52c41a" }}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="Clients Actifs"
                          value={dashboardData.organizationStats.activeClients}
                          valueStyle={{ color: "#1890ff" }}
                        />
                      </Col>
                    </Row>
                    <Divider />
                    <Timeline>
                      <Timeline.Item color="green">Certification qualité obtenue - Déc 2023</Timeline.Item>
                      <Timeline.Item color="blue">Nouveau formateur recruté - Nov 2023</Timeline.Item>
                      <Timeline.Item color="red">Partenariat avec TechCorp - Oct 2023</Timeline.Item>
                    </Timeline>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        {/* Modal nouvelle offre */}
        <Modal
          title={selectedOffer ? "Modifier l'Offre" : "Nouvelle Offre"}
          open={offerModalVisible}
          onCancel={() => {
            setOfferModalVisible(false)
            setSelectedOffer(null)
            form.resetFields()
          }}
          footer={null}
          width={800}
        >
          <Form form={form} layout="vertical" onFinish={handleOfferSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Titre de la Formation"
                  name="title"
                  rules={[{ required: true, message: "Titre obligatoire" }]}
                >
                  <Input placeholder="Ex: Formation React Avancé" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Catégorie"
                  name="category"
                  rules={[{ required: true, message: "Catégorie obligatoire" }]}
                >
                  <Select placeholder="Sélectionner une catégorie">
                    <Option value="Technique">Technique</Option>
                    <Option value="Soft Skills">Soft Skills</Option>
                    <Option value="Leadership">Leadership</Option>
                    <Option value="Sécurité">Sécurité</Option>
                    <Option value="Certification">Certification</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Durée" name="duration" rules={[{ required: true, message: "Durée obligatoire" }]}>
                  <Input placeholder="Ex: 16h" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Prix (€)" name="price" rules={[{ required: true, message: "Prix obligatoire" }]}>
                  <Input type="number" placeholder="2500" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Nombre max participants"
                  name="maxParticipants"
                  rules={[{ required: true, message: "Nombre obligatoire" }]}
                >
                  <Input type="number" placeholder="15" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description obligatoire" }]}
            >
              <TextArea rows={4} placeholder="Description détaillée de la formation..." />
            </Form.Item>

            <Form.Item
              label="Objectifs pédagogiques"
              name="objectives"
              rules={[{ required: true, message: "Objectifs obligatoires" }]}
            >
              <TextArea rows={3} placeholder="Liste des objectifs pédagogiques..." />
            </Form.Item>

            <Form.Item label="Prérequis" name="prerequisites">
              <TextArea rows={2} placeholder="Prérequis nécessaires (optionnel)..." />
            </Form.Item>

            <Form.Item label="Documents de support" name="documents">
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Cliquez ou glissez les fichiers ici</p>
                <p className="ant-upload-hint">Supports de cours, CV formateurs, programmes détaillés (PDF, DOC)</p>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button onClick={() => setOfferModalVisible(false)}>Annuler</Button>
                <Button type="primary" htmlType="submit">
                  {selectedOffer ? "Modifier" : "Soumettre"} l'Offre
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal évaluation session */}
        <Modal
          title="Évaluation de Session"
          open={evaluationModalVisible}
          onCancel={() => {
            setEvaluationModalVisible(false)
            setSelectedSession(null)
            evaluationForm.resetFields()
          }}
          footer={null}
          width={700}
        >
          {selectedSession && (
            <Form form={evaluationForm} layout="vertical" onFinish={handleEvaluationSubmit}>
              <div style={{ backgroundColor: "#f5f5f5", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
                <h4>Session: {selectedSession.title}</h4>
                <p>Date: {moment(selectedSession.date).format("DD/MM/YYYY")}</p>
                <p>Participants: {selectedSession.participants}</p>
                <p>Client: {selectedSession.client}</p>
              </div>

              <Steps current={0} style={{ marginBottom: "24px" }}>
                <Step title="Évaluation à Chaud" />
                <Step title="Rapport Formateur" />
                <Step title="Recommandations" />
              </Steps>

              <Form.Item
                label="Note globale de la session"
                name="globalRating"
                rules={[{ required: true, message: "Note obligatoire" }]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                label="Participation des stagiaires"
                name="participationRating"
                rules={[{ required: true, message: "Note obligatoire" }]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                label="Atteinte des objectifs"
                name="objectivesRating"
                rules={[{ required: true, message: "Note obligatoire" }]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                label="Qualité des échanges"
                name="interactionRating"
                rules={[{ required: true, message: "Note obligatoire" }]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                label="Points forts de la session"
                name="strengths"
                rules={[{ required: true, message: "Points forts obligatoires" }]}
              >
                <TextArea rows={3} placeholder="Décrivez les points forts observés..." />
              </Form.Item>

              <Form.Item label="Axes d'amélioration" name="improvements">
                <TextArea rows={3} placeholder="Suggestions d'amélioration..." />
              </Form.Item>

              <Form.Item label="Recommandations pour les participants" name="recommendations">
                <TextArea rows={3} placeholder="Recommandations post-formation..." />
              </Form.Item>

              <Form.Item label="Suivi nécessaire" name="followUp">
                <Select placeholder="Type de suivi recommandé">
                  <Option value="none">Aucun suivi</Option>
                  <Option value="evaluation">Évaluation à froid</Option>
                  <Option value="coaching">Coaching individuel</Option>
                  <Option value="advanced">Formation complémentaire</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                  <Button onClick={() => setEvaluationModalVisible(false)}>Annuler</Button>
                  <Button type="primary" htmlType="submit">
                    Soumettre Évaluation
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </Content>
    </DashboardLayout>
  )
}

export default DashboardOrganismePage
