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
  Tabs,
  Upload,
  Space,
  Tooltip,
  Badge,
  Avatar,
  List,
  Calendar,
  Timeline,
  Divider,
  Rate,
} from "antd"
import {
  CalendarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
  UploadOutlined,
  PlusOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  StarOutlined,
  BellOutlined,
} from "@ant-design/icons"
import { Bar, Doughnut } from "react-chartjs-2"
import moment from "moment"
import "moment/locale/fr"
import DashboardLayout from "../layouts/DashboardLayout"

const { Content } = Layout
const { TabPane } = Tabs
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

moment.locale("fr")

const DashboardRFPage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(moment())
  const [planningModalVisible, setPlanningModalVisible] = useState(false)
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false)
  const [uploadModalVisible, setUploadModalVisible] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)
  const [form] = Form.useForm()

  // Données simulées pour le dashboard RF
  const dashboardData = {
    stats: {
      plannedSessions: 24,
      completedSessions: 18,
      pendingValidations: 8,
      totalParticipants: 156,
      averageRating: 4.3,
      documentsUploaded: 45,
    },
    weeklyPlanning: {
      labels: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
      datasets: [
        {
          label: "Sessions Planifiées",
          data: [3, 5, 2, 4, 3],
          backgroundColor: "#1890ff",
        },
        {
          label: "Sessions Réalisées",
          data: [2, 4, 2, 3, 2],
          backgroundColor: "#52c41a",
        },
      ],
    },
    evaluationStats: {
      labels: ["Excellent", "Très Bien", "Bien", "Moyen", "Faible"],
      datasets: [
        {
          data: [45, 35, 15, 4, 1],
          backgroundColor: ["#52c41a", "#1890ff", "#faad14", "#fa8c16", "#ff4d4f"],
        },
      ],
    },
  }

  const pendingValidations = [
    {
      id: 1,
      type: "inscription",
      participant: "Marie Dubois",
      formation: "Leadership & Management",
      manager: "Pierre Martin",
      date: "2024-01-20",
      priority: "high",
      department: "RH",
    },
    {
      id: 2,
      type: "inscription",
      participant: "Jean Dupont",
      formation: "Excel Avancé",
      manager: "Sophie Laurent",
      date: "2024-01-22",
      priority: "medium",
      department: "Finance",
    },
    {
      id: 3,
      type: "annulation",
      participant: "Paul Moreau",
      formation: "Sécurité au travail",
      manager: "Luc Bernard",
      date: "2024-01-18",
      priority: "low",
      department: "Production",
    },
  ]

  const plannedSessions = [
    {
      id: 1,
      title: "Leadership & Management",
      date: "2024-01-20",
      time: "09:00-17:00",
      location: "Salle A",
      trainer: "FormaPro",
      participants: 12,
      maxParticipants: 15,
      status: "confirmed",
      type: "Métier",
    },
    {
      id: 2,
      title: "Excel Avancé",
      date: "2024-01-22",
      time: "14:00-18:00",
      location: "Salle B",
      trainer: "TechForm",
      participants: 8,
      maxParticipants: 10,
      status: "pending",
      type: "Support",
    },
    {
      id: 3,
      title: "Communication efficace",
      date: "2024-01-25",
      time: "09:00-12:00",
      location: "Salle C",
      trainer: "SoftSkills Pro",
      participants: 15,
      maxParticipants: 20,
      status: "confirmed",
      type: "Soft Skills",
    },
  ]

  const evaluations = [
    {
      id: 1,
      formation: "Leadership & Management",
      date: "2024-01-15",
      participants: 12,
      responses: 10,
      averageRating: 4.5,
      status: "completed",
    },
    {
      id: 2,
      formation: "Excel Avancé",
      date: "2024-01-12",
      participants: 8,
      responses: 8,
      averageRating: 4.2,
      status: "completed",
    },
    {
      id: 3,
      formation: "Sécurité au travail",
      date: "2024-01-18",
      participants: 15,
      responses: 12,
      status: "pending",
    },
  ]

  const documents = [
    {
      id: 1,
      name: "Support_Leadership_v2.pdf",
      formation: "Leadership & Management",
      uploadDate: "2024-01-15",
      size: "2.5 MB",
      type: "support",
      downloads: 45,
    },
    {
      id: 2,
      name: "Quiz_Excel_Avance.pdf",
      formation: "Excel Avancé",
      uploadDate: "2024-01-12",
      size: "1.2 MB",
      type: "evaluation",
      downloads: 32,
    },
    {
      id: 3,
      name: "Certificat_Template.docx",
      formation: "Général",
      uploadDate: "2024-01-10",
      size: "0.8 MB",
      type: "certificat",
      downloads: 78,
    },
  ]

  // Colonnes pour les validations
  const validationColumns = [
    {
      title: "Participant",
      dataIndex: "participant",
      key: "participant",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{text}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{record.department}</div>
        </div>
      ),
    },
    {
      title: "Formation",
      dataIndex: "formation",
      key: "formation",
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "inscription" ? "blue" : "orange"}>
          {type === "inscription" ? "Inscription" : "Annulation"}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Priorité",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag color={priority === "high" ? "red" : priority === "medium" ? "orange" : "green"}>
          {priority === "high" ? "Urgent" : priority === "medium" ? "Moyen" : "Faible"}
        </Tag>
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
            icon={<CheckCircleOutlined />}
            onClick={() => handleValidation(record, "approve")}
          >
            Valider
          </Button>
          <Button danger size="small" icon={<CloseCircleOutlined />} onClick={() => handleValidation(record, "reject")}>
            Rejeter
          </Button>
        </Space>
      ),
    },
  ]

  // Colonnes pour les sessions
  const sessionColumns = [
    {
      title: "Formation",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{text}</div>
          <Tag color="blue">{record.type}</Tag>
        </div>
      ),
    },
    {
      title: "Date & Heure",
      key: "datetime",
      render: (_, record) => (
        <div>
          <div>{moment(record.date).format("DD/MM/YYYY")}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{record.time}</div>
        </div>
      ),
    },
    {
      title: "Lieu",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Formateur",
      dataIndex: "trainer",
      key: "trainer",
    },
    {
      title: "Participants",
      key: "participants",
      render: (_, record) => (
        <div>
          <Progress
            percent={Math.round((record.participants / record.maxParticipants) * 100)}
            size="small"
            format={() => `${record.participants}/${record.maxParticipants}`}
          />
        </div>
      ),
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge
          status={status === "confirmed" ? "success" : status === "pending" ? "processing" : "error"}
          text={status === "confirmed" ? "Confirmé" : status === "pending" ? "En attente" : "Annulé"}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir détails">
            <Button type="text" icon={<EyeOutlined />} onClick={() => handleViewSession(record)} />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEditSession(record)} />
          </Tooltip>
          <Tooltip title="Participants">
            <Button type="text" icon={<TeamOutlined />} onClick={() => handleViewParticipants(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  // Handlers
  const handleValidation = (record, action) => {
    Modal.confirm({
      title: `${action === "approve" ? "Valider" : "Rejeter"} la demande`,
      content: `Êtes-vous sûr de vouloir ${action === "approve" ? "valider" : "rejeter"} la demande de ${record.participant} ?`,
      onOk: () => {
        console.log(`${action} validation:`, record.id)
      },
    })
  }

  const handleViewSession = (session) => {
    setSelectedSession(session)
    setPlanningModalVisible(true)
  }

  const handleEditSession = (session) => {
    setSelectedSession(session)
    form.setFieldsValue({
      ...session,
      date: moment(session.date),
      time: session.time.split("-"),
    })
    setPlanningModalVisible(true)
  }

  const handleViewParticipants = (session) => {
    console.log("View participants for session:", session.id)
  }

  const handleCreateSession = () => {
    setSelectedSession(null)
    form.resetFields()
    setPlanningModalVisible(true)
  }

  const handleSaveSession = (values) => {
    console.log("Save session:", values)
    setPlanningModalVisible(false)
  }

  const onCalendarSelect = (date) => {
    setSelectedDate(date)
  }

  const getCalendarData = (value) => {
    const sessionsForDate = plannedSessions.filter((session) => moment(session.date).isSame(value, "day"))
    return sessionsForDate.map((session) => ({
      type: session.status === "confirmed" ? "success" : "warning",
      content: session.title,
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
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>Dashboard RF - Responsable Formation</h1>
            <p style={{ margin: "4px 0 0 0", color: "#666" }}>Gestion opérationnelle et planification des formations</p>
          </div>
          <Space>
            <Button icon={<BellOutlined />} badge={{ count: 5 }}>
              Notifications
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateSession}>
              Nouvelle Session
            </Button>
          </Space>
        </div>

        {/* Statistiques principales */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Sessions Planifiées"
                value={dashboardData.stats.plannedSessions}
                prefix={<CalendarOutlined style={{ color: "#1890ff" }} />}
                valueStyle={{ color: "#1890ff" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>Ce mois</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Sessions Réalisées"
                value={dashboardData.stats.completedSessions}
                prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
                valueStyle={{ color: "#52c41a" }}
              />
              <Progress
                percent={Math.round(
                  (dashboardData.stats.completedSessions / dashboardData.stats.plannedSessions) * 100,
                )}
                size="small"
                style={{ marginTop: "8px" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Validations en Attente"
                value={dashboardData.stats.pendingValidations}
                prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
                valueStyle={{ color: "#faad14" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>Nécessite action</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Note Moyenne"
                value={dashboardData.stats.averageRating}
                suffix="/ 5"
                prefix={<StarOutlined style={{ color: "#faad14" }} />}
                valueStyle={{ color: "#faad14" }}
              />
              <Rate
                disabled
                defaultValue={dashboardData.stats.averageRating}
                style={{ fontSize: "12px", marginTop: "8px" }}
              />
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="planning" type="card">
          {/* Onglet Planification */}
          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                Planification
              </span>
            }
            key="planning"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={16}>
                <Card title="Calendrier des Sessions">
                  <Calendar dateCellRender={dateCellRender} onSelect={onCalendarSelect} value={selectedDate} />
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="Sessions à Venir" extra={<Button type="link">Voir tout</Button>}>
                  <Timeline>
                    {plannedSessions.slice(0, 5).map((session) => (
                      <Timeline.Item key={session.id} color={session.status === "confirmed" ? "green" : "orange"}>
                        <div style={{ marginBottom: "8px" }}>
                          <div style={{ fontWeight: "bold" }}>{session.title}</div>
                          <div style={{ fontSize: "12px", color: "#666" }}>
                            {moment(session.date).format("DD/MM/YYYY")} - {session.time}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666" }}>
                            {session.participants}/{session.maxParticipants} participants
                          </div>
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Card>
              </Col>
            </Row>

            <Card title="Gestion des Sessions" style={{ marginTop: "16px" }}>
              <Table columns={sessionColumns} dataSource={plannedSessions} rowKey="id" pagination={{ pageSize: 10 }} />
            </Card>
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
            <Card title="Demandes en Attente">
              <Table
                columns={validationColumns}
                dataSource={pendingValidations}
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
                <Card title="Répartition des Notes">
                  <Doughnut
                    data={dashboardData.evaluationStats}
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
              <Col xs={24} lg={12}>
                <Card title="Performance Hebdomadaire">
                  <Bar
                    data={dashboardData.weeklyPlanning}
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
            </Row>

            <Card title="Évaluations Récentes" style={{ marginTop: "16px" }}>
              <List
                dataSource={evaluations}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar style={{ backgroundColor: item.status === "completed" ? "#52c41a" : "#faad14" }}>
                          {item.status === "completed" ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                        </Avatar>
                      }
                      title={item.formation}
                      description={
                        <div>
                          <div>Date: {moment(item.date).format("DD/MM/YYYY")}</div>
                          <div>
                            Participants: {item.participants} | Réponses: {item.responses || "En attente"}
                          </div>
                          {item.averageRating && (
                            <div>
                              Note moyenne:{" "}
                              <Rate disabled defaultValue={item.averageRating} style={{ fontSize: "12px" }} />
                            </div>
                          )}
                        </div>
                      }
                    />
                    <List.Item
                      actions={[
                        <Button type="link" onClick={() => setEvaluationModalVisible(true)}>
                          Voir Détails
                        </Button>,
                      ]}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          {/* Onglet Bibliothèque */}
          <TabPane
            tab={
              <span>
                <FileTextOutlined />
                Bibliothèque
              </span>
            }
            key="library"
          >
            <Card
              title="Gestion des Documents"
              extra={
                <Button type="primary" icon={<UploadOutlined />} onClick={() => setUploadModalVisible(true)}>
                  Ajouter Document
                </Button>
              }
            >
              <List
                dataSource={documents}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar style={{ backgroundColor: "#1890ff" }}>
                          <FileTextOutlined />
                        </Avatar>
                      }
                      title={item.name}
                      description={
                        <div>
                          <div>Formation: {item.formation}</div>
                          <div>
                            Taille: {item.size} | Téléchargements: {item.downloads}
                          </div>
                          <div>Ajouté le: {moment(item.uploadDate).format("DD/MM/YYYY")}</div>
                          <Tag color="blue">{item.type}</Tag>
                        </div>
                      }
                    />
                    <List.Item
                      actions={[
                        <Button type="link" icon={<DownloadOutlined />}>
                          Télécharger
                        </Button>,
                        <Button type="link" icon={<EditOutlined />}>
                          Modifier
                        </Button>,
                        <Button type="link" danger icon={<DeleteOutlined />}>
                          Supprimer
                        </Button>,
                      ]}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>
        </Tabs>

        {/* Modal de planification */}
        <Modal
          title={selectedSession ? "Modifier Session" : "Nouvelle Session"}
          open={planningModalVisible}
          onCancel={() => {
            setPlanningModalVisible(false)
            setSelectedSession(null)
            form.resetFields()
          }}
          footer={null}
          width={800}
        >
          <Form form={form} layout="vertical" onFinish={handleSaveSession}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Formation"
                  name="title"
                  rules={[{ required: true, message: "Sélectionnez une formation" }]}
                >
                  <Select placeholder="Choisir une formation">
                    <Option value="Leadership & Management">Leadership & Management</Option>
                    <Option value="Excel Avancé">Excel Avancé</Option>
                    <Option value="Communication efficace">Communication efficace</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Type" name="type" rules={[{ required: true, message: "Sélectionnez un type" }]}>
                  <Select placeholder="Type de formation">
                    <Option value="Métier">Métier</Option>
                    <Option value="Support">Support</Option>
                    <Option value="Réglementaire">Réglementaire</Option>
                    <Option value="Soft Skills">Soft Skills</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Date" name="date" rules={[{ required: true, message: "Sélectionnez une date" }]}>
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Heure de début"
                  name={["time", 0]}
                  rules={[{ required: true, message: "Heure de début requise" }]}
                >
                  <Input placeholder="09:00" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Heure de fin"
                  name={["time", 1]}
                  rules={[{ required: true, message: "Heure de fin requise" }]}
                >
                  <Input placeholder="17:00" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Lieu" name="location" rules={[{ required: true, message: "Lieu requis" }]}>
                  <Input placeholder="Salle de formation" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Formateur/Organisme"
                  name="trainer"
                  rules={[{ required: true, message: "Formateur requis" }]}
                >
                  <Select placeholder="Choisir un formateur">
                    <Option value="FormaPro">FormaPro</Option>
                    <Option value="TechForm">TechForm</Option>
                    <Option value="SoftSkills Pro">SoftSkills Pro</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nombre max de participants"
                  name="maxParticipants"
                  rules={[{ required: true, message: "Nombre requis" }]}
                >
                  <Input type="number" placeholder="15" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Statut" name="status">
                  <Select placeholder="Statut de la session">
                    <Option value="confirmed">Confirmé</Option>
                    <Option value="pending">En attente</Option>
                    <Option value="cancelled">Annulé</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Description" name="description">
              <TextArea rows={4} placeholder="Description de la session..." />
            </Form.Item>
            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button onClick={() => setPlanningModalVisible(false)}>Annuler</Button>
                <Button type="primary" htmlType="submit">
                  {selectedSession ? "Modifier" : "Créer"} Session
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal d'évaluation */}
        <Modal
          title="Détails de l'Évaluation"
          open={evaluationModalVisible}
          onCancel={() => setEvaluationModalVisible(false)}
          footer={null}
          width={700}
        >
          <div>
            <h3>Formation: Leadership & Management</h3>
            <p>Date: 15/01/2024</p>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Participants" value="12" />
              </Col>
              <Col span={12}>
                <Statistic title="Réponses" value="10" />
              </Col>
            </Row>
            <Divider />
            <h4>Questions d'évaluation:</h4>
            <List
              dataSource={[
                { question: "Qualité du contenu", rating: 4.5 },
                { question: "Pédagogie du formateur", rating: 4.3 },
                { question: "Organisation générale", rating: 4.7 },
                { question: "Utilité pour votre poste", rating: 4.2 },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <div
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <span>{item.question}</span>
                    <Rate disabled defaultValue={item.rating} />
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Modal>

        {/* Modal d'upload */}
        <Modal
          title="Ajouter un Document"
          open={uploadModalVisible}
          onCancel={() => setUploadModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form layout="vertical">
            <Form.Item
              label="Formation associée"
              name="formation"
              rules={[{ required: true, message: "Sélectionnez une formation" }]}
            >
              <Select placeholder="Choisir une formation">
                <Option value="Leadership & Management">Leadership & Management</Option>
                <Option value="Excel Avancé">Excel Avancé</Option>
                <Option value="Communication efficace">Communication efficace</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Type de document"
              name="type"
              rules={[{ required: true, message: "Sélectionnez un type" }]}
            >
              <Select placeholder="Type de document">
                <Option value="support">Support de cours</Option>
                <Option value="evaluation">Évaluation</Option>
                <Option value="certificat">Certificat</Option>
                <Option value="autre">Autre</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Fichier" name="file" rules={[{ required: true, message: "Sélectionnez un fichier" }]}>
              <Upload.Dragger>
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">Cliquez ou glissez un fichier ici</p>
                <p className="ant-upload-hint">Formats supportés: PDF, DOC, DOCX, XLS, XLSX</p>
              </Upload.Dragger>
            </Form.Item>
            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button onClick={() => setUploadModalVisible(false)}>Annuler</Button>
                <Button type="primary">Télécharger</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </DashboardLayout>
  )
}

export default DashboardRFPage
