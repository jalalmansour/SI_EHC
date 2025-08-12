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
  Progress,
  Tabs,
  Space,
  Tooltip,
  Badge,
  Avatar,
  List,
  Calendar,
  Timeline,
  Rate,
  Divider,
  Steps,
} from "antd"
import {
  BookOutlined,
  CalendarOutlined,
  TrophyOutlined,
  StarOutlined,
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BellOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons"
import { Line, Doughnut } from "react-chartjs-2"
import moment from "moment"
import "moment/locale/fr"
import DashboardLayout from "../layouts/DashboardLayout"

const { Content } = Layout
const { TabPane } = Tabs
const { Option } = Select
const { Search } = Input
const { Step } = Steps

moment.locale("fr")

const DashboardEmployeePage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [catalogModalVisible, setCatalogModalVisible] = useState(false)
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false)
  const [selectedTraining, setSelectedTraining] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [form] = Form.useForm()

  // Données simulées pour le dashboard Employé
  const dashboardData = {
    personalStats: {
      completedTrainings: 8,
      plannedTrainings: 3,
      certificates: 5,
      totalHours: 64,
      averageRating: 4.3,
      skillsAcquired: 12,
    },
    skillsProgress: {
      labels: ["React", "Node.js", "Leadership", "Communication", "Gestion"],
      datasets: [
        {
          label: "Niveau Actuel",
          data: [85, 70, 60, 75, 55],
          backgroundColor: ["#1890ff", "#52c41a", "#faad14", "#f759ab", "#13c2c2"],
        },
      ],
    },
    learningPath: {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
      datasets: [
        {
          label: "Heures de Formation",
          data: [8, 12, 6, 16, 10, 12],
          borderColor: "#1890ff",
          backgroundColor: "rgba(24, 144, 255, 0.1)",
          tension: 0.4,
        },
      ],
    },
  }

  const myTrainings = [
    {
      id: 1,
      title: "React Avancé",
      category: "Technique",
      status: "completed",
      completionDate: "2024-01-15",
      duration: "16h",
      rating: 4.5,
      certificate: true,
      trainer: "TechForm",
      progress: 100,
    },
    {
      id: 2,
      title: "Leadership & Management",
      category: "Soft Skills",
      status: "in-progress",
      startDate: "2024-01-20",
      duration: "24h",
      trainer: "FormaPro",
      progress: 65,
    },
    {
      id: 3,
      title: "Certification AWS",
      category: "Certification",
      status: "planned",
      startDate: "2024-02-15",
      duration: "40h",
      trainer: "AWS Training",
      progress: 0,
    },
  ]

  const availableTrainings = [
    {
      id: 4,
      title: "Intelligence Artificielle & Machine Learning",
      category: "Technique",
      duration: "32h",
      level: "Avancé",
      rating: 4.7,
      participants: 156,
      price: 2500,
      description: "Formation complète sur l'IA et le ML avec Python",
      skills: ["Python", "TensorFlow", "Data Science"],
      nextSession: "2024-02-20",
      trainer: "AI Academy",
      popular: true,
    },
    {
      id: 5,
      title: "Communication Efficace",
      category: "Soft Skills",
      duration: "16h",
      level: "Intermédiaire",
      rating: 4.4,
      participants: 89,
      price: 1200,
      description: "Améliorer ses compétences en communication",
      skills: ["Communication", "Présentation", "Négociation"],
      nextSession: "2024-02-25",
      trainer: "SoftSkills Pro",
    },
    {
      id: 6,
      title: "Cybersécurité Avancée",
      category: "Sécurité",
      duration: "24h",
      level: "Avancé",
      rating: 4.6,
      participants: 67,
      price: 1800,
      description: "Sécurité informatique et protection des données",
      skills: ["Sécurité", "Cryptographie", "Audit"],
      nextSession: "2024-03-01",
      trainer: "SecureTech",
    },
  ]

  const certificates = [
    {
      id: 1,
      title: "React Developer Certified",
      issueDate: "2024-01-15",
      validUntil: "2026-01-15",
      issuer: "TechForm Academy",
      credentialId: "RC-2024-001",
      verified: true,
    },
    {
      id: 2,
      title: "Leadership Fundamentals",
      issueDate: "2023-12-10",
      validUntil: "2025-12-10",
      issuer: "FormaPro Institute",
      credentialId: "LF-2023-089",
      verified: true,
    },
  ]

  const recommendations = [
    {
      id: 1,
      title: "Vue.js Avancé",
      reason: "Basé sur vos compétences React",
      match: 92,
      category: "Technique",
    },
    {
      id: 2,
      title: "Gestion de Projet Agile",
      reason: "Complément à vos compétences leadership",
      match: 87,
      category: "Gestion",
    },
    {
      id: 3,
      title: "DevOps & CI/CD",
      reason: "Évolution naturelle pour un développeur",
      match: 85,
      category: "Technique",
    },
  ]

  const upcomingEvents = [
    {
      date: "2024-01-25",
      title: "Leadership & Management - Session 3",
      time: "09:00-12:00",
      location: "Salle A",
      type: "formation",
    },
    {
      date: "2024-01-30",
      title: "Évaluation à froid - React Avancé",
      time: "14:00-15:00",
      location: "En ligne",
      type: "evaluation",
    },
    {
      date: "2024-02-15",
      title: "Début Certification AWS",
      time: "09:00-17:00",
      location: "Centre de formation",
      type: "certification",
    },
  ]

  // Colonnes pour mes formations
  const myTrainingsColumns = [
    {
      title: "Formation",
      key: "training",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{record.title}</div>
          <Tag color="blue">{record.category}</Tag>
        </div>
      ),
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusConfig = {
          completed: { color: "success", text: "Terminé", icon: <CheckCircleOutlined /> },
          "in-progress": { color: "processing", text: "En cours", icon: <PlayCircleOutlined /> },
          planned: { color: "default", text: "Planifié", icon: <ClockCircleOutlined /> },
        }
        const config = statusConfig[status]
        return (
          <Badge
            status={config.color}
            text={
              <span>
                {config.icon} {config.text}
              </span>
            }
          />
        )
      },
    },
    {
      title: "Progression",
      dataIndex: "progress",
      key: "progress",
      render: (progress) => <Progress percent={progress} size="small" />,
    },
    {
      title: "Durée",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Date",
      key: "date",
      render: (_, record) => {
        if (record.completionDate) {
          return `Terminé le ${moment(record.completionDate).format("DD/MM/YYYY")}`
        }
        if (record.startDate) {
          return `Début le ${moment(record.startDate).format("DD/MM/YYYY")}`
        }
        return "-"
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.status === "completed" && record.certificate && (
            <Tooltip title="Télécharger certificat">
              <Button type="text" icon={<DownloadOutlined />} />
            </Tooltip>
          )}
          {record.status === "completed" && (
            <Tooltip title="Évaluer">
              <Button type="text" icon={<StarOutlined />} onClick={() => handleEvaluate(record)} />
            </Tooltip>
          )}
          <Tooltip title="Voir détails">
            <Button type="text" icon={<EyeOutlined />} onClick={() => handleViewTraining(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  // Filtrer les formations disponibles
  const filteredTrainings = availableTrainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchText.toLowerCase()) ||
      training.description.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory = selectedCategory === "all" || training.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Handlers
  const handleViewTraining = (training) => {
    setSelectedTraining(training)
    setCatalogModalVisible(true)
  }

  const handleEvaluate = (training) => {
    setSelectedTraining(training)
    setEvaluationModalVisible(true)
  }

  const handleRegister = (training) => {
    Modal.confirm({
      title: "Inscription à la formation",
      content: `Voulez-vous vous inscrire à la formation "${training.title}" ?`,
      onOk: () => {
        console.log("Register for training:", training.id)
      },
    })
  }

  const handleEvaluationSubmit = (values) => {
    console.log("Evaluation submitted:", values)
    setEvaluationModalVisible(false)
  }

  const onCalendarSelect = (date) => {
    console.log("Selected date:", date.format("YYYY-MM-DD"))
  }

  const getCalendarData = (value) => {
    const eventsForDate = upcomingEvents.filter((event) => moment(event.date).isSame(value, "day"))
    return eventsForDate.map((event) => ({
      type: event.type === "formation" ? "success" : event.type === "evaluation" ? "warning" : "processing",
      content: event.title,
    }))
  }

  const dateCellRender = (value) => {
    const listData = getCalendarData(value)
    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} style={{ fontSize: "10px" }} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <DashboardLayout>
      <Content style={{ padding: "24px" }}>
        {/* En-tête */}
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>Mon Espace Formation</h1>
            <p style={{ margin: "4px 0 0 0", color: "#666" }}>Gérez votre parcours de formation personnalisé</p>
          </div>
          <Space>
            <Badge count={3}>
              <Button icon={<BellOutlined />}>Notifications</Button>
            </Badge>
            <Button type="primary" icon={<SearchOutlined />}>
              Explorer Catalogue
            </Button>
          </Space>
        </div>

        {/* Statistiques personnelles */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Formations Terminées"
                value={dashboardData.personalStats.completedTrainings}
                prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
                valueStyle={{ color: "#52c41a" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>Cette année</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Heures de Formation"
                value={dashboardData.personalStats.totalHours}
                suffix="h"
                prefix={<ClockCircleOutlined style={{ color: "#1890ff" }} />}
                valueStyle={{ color: "#1890ff" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>Temps total investi</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Certificats Obtenus"
                value={dashboardData.personalStats.certificates}
                prefix={<TrophyOutlined style={{ color: "#faad14" }} />}
                valueStyle={{ color: "#faad14" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>Certifications validées</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Note Moyenne"
                value={dashboardData.personalStats.averageRating}
                suffix="/ 5"
                prefix={<StarOutlined style={{ color: "#f759ab" }} />}
                valueStyle={{ color: "#f759ab" }}
              />
              <Rate
                disabled
                defaultValue={dashboardData.personalStats.averageRating}
                style={{ fontSize: "12px", marginTop: "8px" }}
              />
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="dashboard" type="card">
          {/* Onglet Tableau de bord */}
          <TabPane
            tab={
              <span>
                <UserOutlined />
                Tableau de Bord
              </span>
            }
            key="dashboard"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={16}>
                <Card title="Mon Parcours de Formation">
                  <Line
                    data={dashboardData.learningPath}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                      },
                    }}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="Mes Compétences">
                  <Doughnut
                    data={dashboardData.skillsProgress}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    }}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col xs={24} lg={12}>
                <Card title="Formations en Cours">
                  <List
                    dataSource={myTrainings.filter((t) => t.status === "in-progress")}
                    renderItem={(training) => (
                      <List.Item key={training.id}>
                        <List.Item.Meta
                          avatar={
                            <Avatar style={{ backgroundColor: "#1890ff" }}>
                              <BookOutlined />
                            </Avatar>
                          }
                          title={training.title}
                          description={
                            <div>
                              <Progress percent={training.progress} size="small" />
                              <div style={{ marginTop: "4px", fontSize: "12px" }}>Formateur: {training.trainer}</div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Recommandations IA">
                  <List
                    dataSource={recommendations}
                    renderItem={(rec) => (
                      <List.Item
                        key={rec.id}
                        actions={[
                          <Button type="link" size="small">
                            Voir
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar style={{ backgroundColor: "#52c41a" }}>{rec.match}%</Avatar>}
                          title={rec.title}
                          description={
                            <div>
                              <div>{rec.reason}</div>
                              <Tag color="blue">{rec.category}</Tag>
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

          {/* Onglet Mes Formations */}
          <TabPane
            tab={
              <span>
                <BookOutlined />
                Mes Formations
              </span>
            }
            key="my-trainings"
          >
            <Card title="Historique de mes Formations">
              <Table columns={myTrainingsColumns} dataSource={myTrainings} rowKey="id" pagination={{ pageSize: 10 }} />
            </Card>
          </TabPane>

          {/* Onglet Catalogue */}
          <TabPane
            tab={
              <span>
                <SearchOutlined />
                Catalogue
              </span>
            }
            key="catalog"
          >
            <Card>
              <div style={{ marginBottom: "16px", display: "flex", gap: "16px", alignItems: "center" }}>
                <Search
                  placeholder="Rechercher une formation..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ flex: 1 }}
                />
                <Select value={selectedCategory} onChange={setSelectedCategory} style={{ width: 200 }}>
                  <Option value="all">Toutes catégories</Option>
                  <Option value="Technique">Technique</Option>
                  <Option value="Soft Skills">Soft Skills</Option>
                  <Option value="Sécurité">Sécurité</Option>
                  <Option value="Certification">Certification</Option>
                </Select>
              </div>

              <Row gutter={[16, 16]}>
                {filteredTrainings.map((training) => (
                  <Col xs={24} lg={8} key={training.id}>
                    <Card
                      hoverable
                      actions={[
                        <Button type="primary" onClick={() => handleRegister(training)}>
                          S'inscrire
                        </Button>,
                        <Button type="text" icon={<EyeOutlined />} onClick={() => handleViewTraining(training)}>
                          Détails
                        </Button>,
                        <Button type="text" icon={<HeartOutlined />}>
                          Favoris
                        </Button>,
                      ]}
                    >
                      <div style={{ position: "relative" }}>
                        {training.popular && (
                          <Tag color="red" style={{ position: "absolute", top: "-8px", right: "-8px" }}>
                            Populaire
                          </Tag>
                        )}
                        <Card.Meta
                          title={training.title}
                          description={
                            <div>
                              <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                                {training.description}
                              </p>
                              <div style={{ marginBottom: "8px" }}>
                                <Tag color="blue">{training.category}</Tag>
                                <Tag color="green">{training.level}</Tag>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>
                                  <Rate disabled defaultValue={training.rating} style={{ fontSize: "12px" }} />
                                  <span style={{ marginLeft: "4px", fontSize: "12px" }}>({training.participants})</span>
                                </span>
                                <span style={{ fontWeight: "bold", color: "#1890ff" }}>
                                  {training.price.toLocaleString()}€
                                </span>
                              </div>
                              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
                                <CalendarOutlined /> Prochaine session:{" "}
                                {moment(training.nextSession).format("DD/MM/YYYY")}
                              </div>
                            </div>
                          }
                        />
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </TabPane>

          {/* Onglet Agenda */}
          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                Mon Agenda
              </span>
            }
            key="calendar"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={16}>
                <Card title="Calendrier des Formations">
                  <Calendar dateCellRender={dateCellRender} onSelect={onCalendarSelect} />
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="Événements à Venir">
                  <Timeline>
                    {upcomingEvents.map((event, index) => (
                      <Timeline.Item
                        key={index}
                        color={event.type === "formation" ? "green" : event.type === "evaluation" ? "orange" : "blue"}
                      >
                        <div>
                          <div style={{ fontWeight: "bold" }}>{event.title}</div>
                          <div style={{ fontSize: "12px", color: "#666" }}>
                            {moment(event.date).format("DD/MM/YYYY")} - {event.time}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666" }}>📍 {event.location}</div>
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* Onglet Certificats */}
          <TabPane
            tab={
              <span>
                <TrophyOutlined />
                Mes Certificats
              </span>
            }
            key="certificates"
          >
            <Card title="Certificats et Attestations">
              <Row gutter={[16, 16]}>
                {certificates.map((cert) => (
                  <Col xs={24} lg={12} key={cert.id}>
                    <Card
                      hoverable
                      actions={[
                        <Button type="primary" icon={<DownloadOutlined />}>
                          Télécharger
                        </Button>,
                        <Button type="text" icon={<ShareAltOutlined />}>
                          Partager
                        </Button>,
                      ]}
                    >
                      <Card.Meta
                        avatar={
                          <Avatar style={{ backgroundColor: "#faad14" }}>
                            <TrophyOutlined />
                          </Avatar>
                        }
                        title={
                          <div>
                            {cert.title}
                            {cert.verified && <Badge status="success" text="Vérifié" style={{ marginLeft: "8px" }} />}
                          </div>
                        }
                        description={
                          <div>
                            <p>
                              <strong>Émetteur:</strong> {cert.issuer}
                            </p>
                            <p>
                              <strong>Date d'émission:</strong> {moment(cert.issueDate).format("DD/MM/YYYY")}
                            </p>
                            <p>
                              <strong>Valide jusqu'au:</strong> {moment(cert.validUntil).format("DD/MM/YYYY")}
                            </p>
                            <p>
                              <strong>ID Credential:</strong> {cert.credentialId}
                            </p>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </TabPane>
        </Tabs>

        {/* Modal détails formation */}
        <Modal
          title="Détails de la Formation"
          open={catalogModalVisible}
          onCancel={() => {
            setCatalogModalVisible(false)
            setSelectedTraining(null)
          }}
          footer={null}
          width={800}
        >
          {selectedTraining && (
            <div>
              <Row gutter={16}>
                <Col span={16}>
                  <h3>{selectedTraining.title}</h3>
                  <p>{selectedTraining.description}</p>

                  <Divider />

                  <Row gutter={16}>
                    <Col span={12}>
                      <p>
                        <strong>Catégorie:</strong> {selectedTraining.category}
                      </p>
                      <p>
                        <strong>Niveau:</strong> {selectedTraining.level}
                      </p>
                      <p>
                        <strong>Durée:</strong> {selectedTraining.duration}
                      </p>
                    </Col>
                    <Col span={12}>
                      <p>
                        <strong>Formateur:</strong> {selectedTraining.trainer}
                      </p>
                      <p>
                        <strong>Prochaine session:</strong> {moment(selectedTraining.nextSession).format("DD/MM/YYYY")}
                      </p>
                      <p>
                        <strong>Prix:</strong> {selectedTraining.price?.toLocaleString()}€
                      </p>
                    </Col>
                  </Row>

                  <Divider />

                  <h4>Compétences acquises:</h4>
                  <div>
                    {selectedTraining.skills?.map((skill) => (
                      <Tag key={skill} color="blue" style={{ marginBottom: "4px" }}>
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </Col>
                <Col span={8}>
                  <Card>
                    <div style={{ textAlign: "center" }}>
                      <Rate disabled defaultValue={selectedTraining.rating} />
                      <div style={{ marginTop: "8px" }}>
                        <strong>{selectedTraining.rating}/5</strong>
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {selectedTraining.participants} participants
                      </div>

                      <Divider />

                      <Button type="primary" size="large" block onClick={() => handleRegister(selectedTraining)}>
                        S'inscrire
                      </Button>

                      <Button type="text" block style={{ marginTop: "8px" }} icon={<HeartOutlined />}>
                        Ajouter aux favoris
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Modal>

        {/* Modal d'évaluation */}
        <Modal
          title="Évaluation de Formation"
          open={evaluationModalVisible}
          onCancel={() => {
            setEvaluationModalVisible(false)
            setSelectedTraining(null)
          }}
          footer={null}
          width={600}
        >
          {selectedTraining && (
            <Form form={form} layout="vertical" onFinish={handleEvaluationSubmit}>
              <div style={{ backgroundColor: "#f5f5f5", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
                <h4>Formation: {selectedTraining.title}</h4>
                <p>Formateur: {selectedTraining.trainer}</p>
                <p>Date: {moment(selectedTraining.completionDate).format("DD/MM/YYYY")}</p>
              </div>

              <Form.Item
                label="Note globale"
                name="globalRating"
                rules={[{ required: true, message: "Note obligatoire" }]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                label="Qualité du contenu"
                name="contentRating"
                rules={[{ required: true, message: "Note obligatoire" }]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                label="Pédagogie du formateur"
                name="trainerRating"
                rules={[{ required: true, message: "Note obligatoire" }]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                label="Organisation"
                name="organizationRating"
                rules={[{ required: true, message: "Note obligatoire" }]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                label="Utilité pour votre poste"
                name="utilityRating"
                rules={[{ required: true, message: "Note obligatoire" }]}
              >
                <Rate />
              </Form.Item>

              <Form.Item label="Commentaires" name="comments">
                <Input.TextArea rows={4} placeholder="Vos commentaires sur la formation..." />
              </Form.Item>

              <Form.Item
                label="Recommanderiez-vous cette formation ?"
                name="recommend"
                rules={[{ required: true, message: "Réponse obligatoire" }]}
              >
                <Select placeholder="Votre recommandation">
                  <Option value="yes">Oui, je recommande</Option>
                  <Option value="maybe">Peut-être</Option>
                  <Option value="no">Non, je ne recommande pas</Option>
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

export default DashboardEmployeePage
