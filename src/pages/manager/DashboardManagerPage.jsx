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
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Progress,
  Alert,
  Tabs,
  Space,
  Badge,
  Avatar,
  List,
  Rate,
  DatePicker,
} from "antd"
import {
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  TrophyOutlined,
  BarChartOutlined,
  StarOutlined,
  CalendarOutlined,
  BookOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  UserOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons"
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
} from "chart.js"
import moment from "moment"
import "moment/locale/fr"

// Import des nouveaux composants
import NotificationSystem from "../../components/manager/NotificationSystem"
import AdvancedCalendar from "../../components/manager/AdvancedCalendar"
import ReportExporter from "../../components/manager/ReportExporter"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, ArcElement)

const { Content } = Layout
const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

moment.locale("fr")

const DashboardManagerPage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [validationModalVisible, setValidationModalVisible] = useState(false)
  const [teamModalVisible, setTeamModalVisible] = useState(false)
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false)
  const [trainingRequestModalVisible, setTrainingRequestModalVisible] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [form] = Form.useForm()
  const [evaluationForm] = Form.useForm()
  const [requestForm] = Form.useForm()

  // Données simulées pour le dashboard Manager N+1
  const dashboardData = {
    teamStats: {
      totalMembers: 4,
      ongoingTrainings: 7,
      averageScore: 80,
      pendingRequests: 1,
      completedEvaluations: 4,
      objectivesAchieved: 2,
    },
  }

  // Données des membres de l'équipe
  const teamMembers = [
    {
      id: 1,
      name: "Marie Dubois",
      position: "Développeuse Frontend",
      email: "marie.dubois@company.com",
      location: "Paris",
      status: "Excellent",
      evaluationScore: 85,
      completedTrainings: 12,
      ongoingTrainings: 2,
      nextTraining: "Formation React Avancé",
      nextTrainingDate: "15 févr. 2024",
      competencies: {
        React: 90,
        TypeScript: 85,
        CSS: 100,
      },
      feedback: "Excellente performance, leadership naturel démontré",
      lastEvaluation: "15 janv. 2024",
      nextEvaluation: "15 avr. 2024",
    },
    {
      id: 2,
      name: "Thomas Martin",
      position: "Développeur Backend",
      email: "thomas.martin@company.com",
      location: "Lyon",
      status: "Bon",
      evaluationScore: 78,
      completedTrainings: 8,
      ongoingTrainings: 1,
      nextTraining: "Architecture Microservices",
      nextTrainingDate: "20 févr. 2024",
      competencies: {
        "Node.js": 70,
        Python: 65,
        Docker: 85,
      },
      feedback: "Bonne progression technique, à développer côté leadership",
      lastEvaluation: "10 janv. 2024",
      nextEvaluation: "10 avr. 2024",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      position: "UX Designer",
      email: "sophie.laurent@company.com",
      location: "Marseille",
      status: "Excellent",
      evaluationScore: 92,
      completedTrainings: 15,
      ongoingTrainings: 1,
      nextTraining: "Design System Avancé",
      nextTrainingDate: "10 févr. 2024",
      competencies: {
        Figma: 95,
        "User Research": 90,
        Prototypage: 88,
      },
      feedback: "Performance exceptionnelle, véritable moteur de l'équipe",
      lastEvaluation: "20 janv. 2024",
      nextEvaluation: "20 avr. 2024",
    },
    {
      id: 4,
      name: "Lucas Petit",
      position: "Développeur Junior",
      email: "lucas.petit@company.com",
      location: "Toulouse",
      status: "En progression",
      evaluationScore: 65,
      completedTrainings: 3,
      ongoingTrainings: 3,
      nextTraining: "Fondamentaux React",
      nextTrainingDate: "05 févr. 2024",
      competencies: {
        JavaScript: 60,
        HTML: 55,
        React: 45,
      },
      feedback: "Progression constante, besoin d'accompagnement continu",
      lastEvaluation: "25 janv. 2024",
      nextEvaluation: "25 avr. 2024",
    },
  ]

  // Demandes de formation en attente
  const trainingRequests = [
    {
      id: 1,
      employee: "Jean Dupont",
      position: "Développeur Senior",
      training: "Leadership Avancé",
      category: "Management d'équipe",
      requestDate: "15 janv. 2024",
      startDate: "15 févr. 2024",
      endDate: "17 févr. 2024",
      location: "Paris",
      cost: 1500,
      priority: "Haute",
      status: "En attente",
      justification: "Nécessaire pour le projet client stratégique",
      provider: "TechFormation Pro",
    },
    {
      id: 2,
      employee: "Marie Leblanc",
      position: "Analyste Data",
      training: "Excel Expert",
      category: "Bureautique avancée",
      requestDate: "20 janv. 2024",
      startDate: "17 mars 2024",
      endDate: "17 mars 2024",
      location: "En ligne",
      cost: 800,
      priority: "Moyenne",
      status: "En attente",
      justification: "Améliorer l'efficacité des analyses financières",
      provider: "UX Institute",
    },
  ]

  // Formations programmées
  const scheduledTrainings = [
    {
      id: 1,
      title: "Formation React Avancé",
      employee: "Marie Dubois",
      startDate: "15 févr. 2024",
      endDate: "17 févr. 2024",
      location: "Paris",
      provider: "TechFormation Pro",
      status: "Planifiée",
      type: "Présentiel",
    },
    {
      id: 2,
      title: "Design System Avancé",
      employee: "Sophie Laurent",
      startDate: "10 févr. 2024",
      endDate: "10 févr. 2024",
      location: "En ligne",
      provider: "UX Institute",
      status: "Planifiée",
      type: "Distanciel",
    },
    {
      id: 3,
      title: "Fondamentaux React",
      employee: "Lucas Petit",
      startDate: "05 févr. 2024",
      endDate: "07 févr. 2024",
      location: "Toulouse",
      provider: "Dev Academy",
      status: "En cours",
      type: "Hybride",
    },
    {
      id: 4,
      title: "Architecture Microservices",
      employee: "Thomas Martin",
      startDate: "20 févr. 2024",
      endDate: "22 févr. 2024",
      location: "Lyon",
      provider: "Cloud Academy",
      status: "Planifiée",
      type: "Présentiel",
    },
  ]

  const handleValidateRequest = (request, action) => {
    setSelectedRequest(request)
    setValidationModalVisible(true)
  }

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee)
    setTeamModalVisible(true)
  }

  const handleNewEvaluation = () => {
    setEvaluationModalVisible(true)
  }

  const handleNewTrainingRequest = () => {
    setTrainingRequestModalVisible(true)
  }

  const handleValidationSubmit = (values) => {
    console.log("Validation:", values)
    setValidationModalVisible(false)
    setSelectedRequest(null)
  }

  const handleEvaluationSubmit = (values) => {
    console.log("Evaluation:", values)
    setEvaluationModalVisible(false)
    evaluationForm.resetFields()
  }

  const handleTrainingRequestSubmit = (values) => {
    console.log("Training Request:", values)
    setTrainingRequestModalVisible(false)
    requestForm.resetFields()
  }

  const handleNotificationClick = (notification) => {
    console.log("Notification clicked:", notification)
    // Logique pour traiter les notifications
  }

  const getStatusColor = (status) => {
    const colors = {
      Excellent: "green",
      Bon: "blue",
      "En progression": "orange",
      "À améliorer": "red",
    }
    return colors[status] || "default"
  }

  const getTrainingStatusColor = (status) => {
    const colors = {
      Planifiée: "blue",
      "En cours": "orange",
      Terminée: "green",
      Annulée: "red",
    }
    return colors[status] || "default"
  }

  const onCalendarSelect = (value) => {
    console.log("Selected date:", value.format("YYYY-MM-DD"))
  }

  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD")
    const dayTrainings = scheduledTrainings.filter(
      (training) => moment(training.startDate, "DD MMM YYYY").format("YYYY-MM-DD") === dateStr,
    )

    return (
      <ul className="events">
        {dayTrainings.map((training) => (
          <li key={training.id}>
            <Badge
              status={training.status === "En cours" ? "processing" : "default"}
              text={<span style={{ fontSize: "11px" }}>{training.title.substring(0, 15)}...</span>}
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* En-tête */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Dashboard Manager N+1</h1>
            <p className="text-gray-600">Gestion et suivi de votre équipe - Vue managériale</p>
          </div>
          <Space>
            <NotificationSystem onNotificationClick={handleNotificationClick} />
            <ReportExporter teamMembers={teamMembers} evaluations={teamMembers} trainings={scheduledTrainings} />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleNewEvaluation}>
              Nouvelle Évaluation
            </Button>
          </Space>
        </div>
      </div>

      {/* Alertes importantes */}
      <Alert
        message="Demandes en attente de validation"
        description={`${trainingRequests.length} demande(s) de formation nécessitent votre validation.`}
        type="info"
        showIcon
        className="mb-6"
        action={
          <Button size="small" type="primary">
            Voir les demandes
          </Button>
        }
      />

      <Tabs defaultActiveKey="dashboard" type="card">
        {/* Onglet Tableau de Bord */}
        <TabPane
          tab={
            <span>
              <BarChartOutlined />
              Tableau de Bord
            </span>
          }
          key="dashboard"
        >
          {/* Statistiques principales */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-500 to-blue-600">
                <Statistic
                  title={<span className="text-white opacity-90">Membres d'équipe</span>}
                  value={dashboardData.teamStats.totalMembers}
                  valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-500 to-green-600">
                <Statistic
                  title={<span className="text-white opacity-90">Formations en cours</span>}
                  value={dashboardData.teamStats.ongoingTrainings}
                  valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
                  prefix={<BookOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-500 to-purple-600">
                <Statistic
                  title={<span className="text-white opacity-90">Score moyen équipe</span>}
                  value={dashboardData.teamStats.averageScore}
                  suffix="%"
                  valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
                  prefix={<TrophyOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-500 to-orange-600">
                <Statistic
                  title={<span className="text-white opacity-90">Demandes en attente</span>}
                  value={dashboardData.teamStats.pendingRequests}
                  valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
                  prefix={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* Aperçu de l'équipe */}
          <Card title="👥 Aperçu de l'équipe" className="mb-6">
            <Row gutter={[16, 16]}>
              {teamMembers.map((member) => (
                <Col xs={24} md={12} key={member.id}>
                  <Card
                    size="small"
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleViewEmployee(member)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Avatar size={40} style={{ backgroundColor: "#1890ff", marginRight: 12 }}>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar>
                        <div>
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.position}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Tag color={getStatusColor(member.status)}>{member.status}</Tag>
                        <div className="text-sm text-gray-500">{member.ongoingTrainings} formations</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(member.competencies).map(([skill, level]) => (
                        <div key={skill} className="flex items-center justify-between">
                          <span className="text-sm">{skill}:</span>
                          <div className="flex items-center">
                            <Rate
                              disabled
                              defaultValue={Math.round(level / 20)}
                              style={{ fontSize: "12px", marginRight: 8 }}
                            />
                            <span className="text-sm">({level}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        <strong>Prochaine formation:</strong> {member.nextTraining}
                      </div>
                      <div className="text-sm text-gray-500">{member.nextTrainingDate}</div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>

          {/* Prochaines formations */}
          <Card title="📅 Prochaines formations" className="mb-6">
            <List
              dataSource={scheduledTrainings.filter((t) => t.status !== "Terminée")}
              renderItem={(training) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<BookOutlined />} style={{ backgroundColor: "#52c41a" }} />}
                    title={
                      <div>
                        <span className="font-semibold">{training.title}</span>
                        <Tag color={getTrainingStatusColor(training.status)} className="ml-2">
                          {training.status}
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <div>
                          <strong>Participant:</strong> {training.employee}
                        </div>
                        <div>
                          <strong>Dates:</strong> {training.startDate} - {training.endDate}
                        </div>
                        <div>
                          <strong>Lieu:</strong> {training.location} | <strong>Type:</strong> {training.type}
                        </div>
                      </div>
                    }
                  />
                  <div className="flex space-x-2">
                    <Button size="small" icon={<EyeOutlined />}>
                      Détails
                    </Button>
                    <Button size="small" icon={<CalendarOutlined />}>
                      Calendrier
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </TabPane>

        {/* Onglet Mon Équipe */}
        <TabPane
          tab={
            <span>
              <TeamOutlined />
              Mon Équipe
            </span>
          }
          key="team"
        >
          <Row gutter={[16, 16]}>
            {teamMembers.map((member) => (
              <Col xs={24} lg={12} key={member.id}>
                <Card
                  title={
                    <div className="flex items-center">
                      <Avatar size={32} style={{ backgroundColor: "#1890ff", marginRight: 12 }}>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <div>
                        <div className="font-semibold">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.position}</div>
                      </div>
                    </div>
                  }
                  extra={<Tag color={getStatusColor(member.status)}>{member.status}</Tag>}
                  className="hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">📧 {member.email}</span>
                        <span className="text-sm text-gray-500">📍 {member.location}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Compétences</div>
                      <div className="space-y-2">
                        {Object.entries(member.competencies).map(([skill, level]) => (
                          <div key={skill}>
                            <div className="flex justify-between text-sm">
                              <span>{skill}</span>
                              <span>{level}%</span>
                            </div>
                            <Progress percent={level} size="small" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">Score évaluation</div>
                      <Progress
                        percent={member.evaluationScore}
                        status={member.evaluationScore >= 80 ? "success" : "normal"}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-green-600 font-semibold">{member.completedTrainings}</div>
                        <div className="text-gray-500">Terminées</div>
                      </div>
                      <div>
                        <div className="text-blue-600 font-semibold">{member.ongoingTrainings}</div>
                        <div className="text-gray-500">En cours</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">Prochaine formation</div>
                      <div className="text-sm text-gray-600">{member.nextTraining}</div>
                      <div className="text-sm text-gray-500">{member.nextTrainingDate}</div>
                    </div>

                    <div className="flex space-x-2 pt-2 border-t">
                      <Button size="small" icon={<UserOutlined />} onClick={() => handleViewEmployee(member)}>
                        Profil
                      </Button>
                      <Button size="small" icon={<StarOutlined />}>
                        Évaluer
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        {/* Onglet Demandes Formation */}
        <TabPane
          tab={
            <span>
              <ExclamationCircleOutlined />
              Demandes Formation
            </span>
          }
          key="requests"
        >
          {/* Statistiques des demandes */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={6}>
              <Card className="text-center bg-blue-50 border-blue-200">
                <Statistic
                  title="Total demandes"
                  value={4}
                  prefix={<BarChartOutlined style={{ color: "#1890ff" }} />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card className="text-center bg-green-50 border-green-200">
                <Statistic
                  title="Approuvées"
                  value={2}
                  prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card className="text-center bg-orange-50 border-orange-200">
                <Statistic
                  title="En attente"
                  value={1}
                  prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
                  valueStyle={{ color: "#faad14" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card className="text-center bg-purple-50 border-purple-200">
                <Statistic
                  title="Coût total"
                  value="4900€"
                  prefix={<TrophyOutlined style={{ color: "#722ed1" }} />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
          </Row>

          <Card
            title="Demandes récentes"
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={handleNewTrainingRequest}>
                Nouvelle demande
              </Button>
            }
          >
            <div className="space-y-4">
              {trainingRequests.map((request) => (
                <Card key={request.id} size="small" className="hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar icon={<BookOutlined />} style={{ backgroundColor: "#52c41a" }} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold">{request.training}</span>
                          <Tag color="blue">{request.employee}</Tag>
                          <Tag color={request.priority === "Haute" ? "red" : "orange"}>{request.priority}</Tag>
                          <Tag color={request.status === "En attente" ? "orange" : "green"}>{request.status}</Tag>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <strong>Demandé le:</strong> {request.requestDate}
                          </div>
                          <div>
                            <strong>Début prévu:</strong> {request.startDate}
                          </div>
                          <div>
                            <strong>Coût:</strong> {request.cost}€
                          </div>
                          <div>
                            <strong>Organisme:</strong> {request.provider}
                          </div>
                        </div>

                        <div className="text-sm">
                          <strong>Justification:</strong> {request.justification}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="small" icon={<EyeOutlined />}>
                        Détails
                      </Button>
                      {request.status === "En attente" && (
                        <>
                          <Button
                            size="small"
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            onClick={() => handleValidateRequest(request, "approve")}
                          >
                            Approuver
                          </Button>
                          <Button
                            size="small"
                            danger
                            icon={<CloseCircleOutlined />}
                            onClick={() => handleValidateRequest(request, "reject")}
                          >
                            Rejeter
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
          {/* Statistiques des évaluations */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={6}>
              <Card className="text-center bg-blue-50 border-blue-200">
                <Statistic
                  title="Évaluations totales"
                  value={4}
                  prefix={<ClockCircleOutlined style={{ color: "#1890ff" }} />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card className="text-center bg-green-50 border-green-200">
                <Statistic
                  title="Score moyen"
                  value="80%"
                  prefix={<TrophyOutlined style={{ color: "#52c41a" }} />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card className="text-center bg-orange-50 border-orange-200">
                <Statistic
                  title="En cours"
                  value={1}
                  prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
                  valueStyle={{ color: "#faad14" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card className="text-center bg-purple-50 border-purple-200">
                <Statistic
                  title="Objectifs atteints"
                  value={2}
                  prefix={<CheckCircleOutlined style={{ color: "#722ed1" }} />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
          </Row>

          <Card
            title="Évaluations de l'équipe"
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={handleNewEvaluation}>
                Nouvelle évaluation
              </Button>
            }
          >
            <Row gutter={[16, 16]}>
              {teamMembers.map((member) => (
                <Col xs={24} lg={12} key={member.id}>
                  <Card
                    size="small"
                    title={
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.lastEvaluation}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{member.evaluationScore}%</div>
                          <Tag color={getStatusColor(member.status)}>
                            {member.status === "Excellent" ? "Terminée" : "En cours"}
                          </Tag>
                        </div>
                      </div>
                    }
                  >
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium mb-2">Compétences acquises</div>
                        <div className="space-y-1">
                          {Object.entries(member.competencies).map(([skill, level]) => (
                            <div key={skill}>
                              <div className="flex justify-between text-sm">
                                <span>{skill}</span>
                                <span>{level}%</span>
                              </div>
                              <Progress percent={level} size="small" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-1">Feedback</div>
                        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{member.feedback}</div>
                      </div>

                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Évalué le: {member.lastEvaluation}</span>
                        <span>Prochain: {member.nextEvaluation}</span>
                      </div>

                      <div className="flex space-x-2 pt-2 border-t">
                        <Button size="small" icon={<EyeOutlined />}>
                          Détails
                        </Button>
                        <Button size="small" icon={<StarOutlined />}>
                          Modifier
                        </Button>
                        <Button size="small" icon={<DownloadOutlined />}>
                          PDF
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </TabPane>

        {/* Onglet Planning Formation */}
        <TabPane
          tab={
            <span>
              <CalendarOutlined />
              Planning Formation
            </span>
          }
          key="planning"
        >
          <AdvancedCalendar teamMembers={teamMembers} scheduledTrainings={scheduledTrainings} />
        </TabPane>

        {/* Onglet Catalogue Formation */}
        <TabPane
          tab={
            <span>
              <BookOutlined />
              Catalogue Formation
            </span>
          }
          key="catalog"
        >
          <Card title="Manager N+1 • Validation uniquement" className="mb-6">
            <Alert
              message="Catalogue tel qu'il apparaît sur la plateforme"
              description="Aperçu de l'interface finale publiée par le RRH"
              type="info"
              className="mb-4"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Card title="Formations Support" size="small">
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-green-600">Leadership</div>
                      <ul className="text-sm text-gray-600 ml-4">
                        <li>• Management d'équipe</li>
                        <li>• Communication managériale</li>
                        <li>• Prise de décision</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-green-600">Communication</div>
                      <ul className="text-sm text-gray-600 ml-4">
                        <li>• Communication interpersonnelle</li>
                        <li>• Présentation orale</li>
                        <li>• Négociation</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-blue-600">Cybersécurité Avancée</div>
                      <ul className="text-sm text-gray-600 ml-4">
                        <li>• Ethical Hacking</li>
                        <li>• Sécurité des Applications Web</li>
                        <li>• Gestion des Incidents de Sécurité</li>
                      </ul>
                      <Tag color="blue" size="small" className="mt-1">
                        Nouvellement ajouté
                      </Tag>
                    </div>
                  </div>
                </Card>

                <Card title="Formations Métier" size="small" className="mt-4">
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-green-600">Développement Web</div>
                      <ul className="text-sm text-gray-600 ml-4">
                        <li>• Frontend</li>
                        <li>• Backend</li>
                        <li>• Full Stack</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-blue-600">Design Thinking</div>
                      <ul className="text-sm text-gray-600 ml-4">
                        <li>• Méthodologie Design Thinking</li>
                        <li>• Prototypage Rapide</li>
                        <li>• User Experience Research</li>
                      </ul>
                      <Tag color="blue" size="small" className="mt-1">
                        Nouvellement ajouté
                      </Tag>
                    </div>
                    <div>
                      <div className="font-medium text-green-600">Ressources Humaines</div>
                      <ul className="text-sm text-gray-600 ml-4">
                        <li>• Recrutement</li>
                        <li>• Paie</li>
                        <li>• Gestion des talents</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <Card title="✅ Choix des collaborateurs à valider" size="small">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">Jean Dupont</div>
                          <div className="text-sm text-gray-500">• Développeur Senior</div>
                        </div>
                        <Tag color="orange">En attente</Tag>
                      </div>
                      <div className="text-sm mb-2">
                        <strong>Formation:</strong> Leadership Avancé
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Thématique: Management d'équipe • Catégorie: Support • Soumis le: 18 mars 2024
                      </div>
                      <div className="flex space-x-2">
                        <Button size="small" danger icon={<CloseCircleOutlined />}>
                          Rejeter
                        </Button>
                        <Button size="small" type="primary" icon={<CheckCircleOutlined />}>
                          Valider
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">Marie Leblanc</div>
                          <div className="text-sm text-gray-500">• Analyste Data</div>
                        </div>
                        <Tag color="orange">En attente</Tag>
                      </div>
                      <div className="text-sm mb-2">
                        <strong>Formation:</strong> Excel Expert
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Thématique: Bureautique avancée • Catégorie: Métier • Soumis le: 17 mars 2024
                      </div>
                      <div className="flex space-x-2">
                        <Button size="small" danger icon={<CloseCircleOutlined />}>
                          Rejeter
                        </Button>
                        <Button size="small" type="primary" icon={<CheckCircleOutlined />}>
                          Valider
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card title="📊 Historique des validations récentes" size="small" className="mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Ahmed Benali</div>
                        <div className="text-xs text-gray-500">
                          Cybersécurité Avancée • Gestion des Incidents • 16 mars 2024
                        </div>
                      </div>
                      <Tag color="green">Validé</Tag>
                    </div>
                  </div>
                </Card>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium mb-2">Légende des statuts:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>Formations disponibles</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span>Nouvellement ajoutées</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                      <span>En attente de validation (côté RRH)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabPane>
      </Tabs>

      {/* Modal de validation */}
      <Modal
        title="Validation de Demande"
        open={validationModalVisible}
        onCancel={() => {
          setValidationModalVisible(false)
          setSelectedRequest(null)
        }}
        footer={null}
        width={600}
      >
        {selectedRequest && (
          <Form form={form} layout="vertical" onFinish={handleValidationSubmit}>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">Détails de la Demande</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Employé:</strong> {selectedRequest.employee}
                </div>
                <div>
                  <strong>Formation:</strong> {selectedRequest.training}
                </div>
                <div>
                  <strong>Coût:</strong> {selectedRequest.cost}€
                </div>
                <div>
                  <strong>Priorité:</strong> {selectedRequest.priority}
                </div>
              </div>
              <div className="mt-2">
                <strong>Justification:</strong>
                <p className="text-gray-600 mt-1">{selectedRequest.justification}</p>
              </div>
            </div>

            <Form.Item
              label="Décision"
              name="decision"
              rules={[{ required: true, message: "Sélectionnez une décision" }]}
            >
              <Select placeholder="Votre décision">
                <Option value="approve">Approuver</Option>
                <Option value="reject">Rejeter</Option>
                <Option value="modify">Demander modification</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Commentaire"
              name="comment"
              rules={[{ required: true, message: "Commentaire obligatoire" }]}
            >
              <TextArea rows={4} placeholder="Votre commentaire..." />
            </Form.Item>

            <Form.Item className="mb-0 text-right">
              <Space>
                <Button onClick={() => setValidationModalVisible(false)}>Annuler</Button>
                <Button type="primary" htmlType="submit">
                  Valider Décision
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Modal détails employé */}
      <Modal
        title="Profil Employé - Vue Manager"
        open={teamModalVisible}
        onCancel={() => {
          setTeamModalVisible(false)
          setSelectedEmployee(null)
        }}
        footer={null}
        width={800}
      >
        {selectedEmployee && (
          <div>
            <Row gutter={16}>
              <Col span={8}>
                <div className="text-center">
                  <Avatar size={80} style={{ backgroundColor: "#1890ff" }}>
                    {selectedEmployee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <h3 className="mt-4 mb-1">{selectedEmployee.name}</h3>
                  <p className="text-gray-500">{selectedEmployee.position}</p>
                  <Tag color={getStatusColor(selectedEmployee.status)}>{selectedEmployee.status}</Tag>
                </div>
              </Col>
              <Col span={16}>
                <Tabs defaultActiveKey="overview">
                  <TabPane tab="Vue d'ensemble" key="overview">
                    <div className="space-y-4">
                      <div>
                        <strong>Email:</strong> {selectedEmployee.email}
                      </div>
                      <div>
                        <strong>Localisation:</strong> {selectedEmployee.location}
                      </div>
                      <div>
                        <strong>Score évaluation:</strong>
                        <Progress percent={selectedEmployee.evaluationScore} className="ml-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <strong>Formations terminées:</strong> {selectedEmployee.completedTrainings}
                        </div>
                        <div>
                          <strong>Formations en cours:</strong> {selectedEmployee.ongoingTrainings}
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Compétences" key="skills">
                    <div className="space-y-3">
                      <h4>Compétences actuelles:</h4>
                      {Object.entries(selectedEmployee.competencies).map(([skill, level]) => (
                        <div key={skill}>
                          <div className="flex justify-between mb-1">
                            <span>{skill}</span>
                            <span>{level}%</span>
                          </div>
                          <Progress percent={level} />
                        </div>
                      ))}
                    </div>
                  </TabPane>
                  <TabPane tab="Formations" key="trainings">
                    <div className="space-y-3">
                      <div>
                        <strong>Prochaine formation:</strong>
                        <div className="mt-2 p-3 bg-blue-50 rounded">
                          <div className="font-medium">{selectedEmployee.nextTraining}</div>
                          <div className="text-sm text-gray-600">{selectedEmployee.nextTrainingDate}</div>
                        </div>
                      </div>
                      <div>
                        <strong>Dernière évaluation:</strong> {selectedEmployee.lastEvaluation}
                      </div>
                      <div>
                        <strong>Prochaine évaluation:</strong> {selectedEmployee.nextEvaluation}
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      {/* Modal nouvelle évaluation */}
      <Modal
        title="Nouvelle évaluation à froid"
        open={evaluationModalVisible}
        onCancel={() => setEvaluationModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form form={evaluationForm} layout="vertical" onFinish={handleEvaluationSubmit}>
          <Alert
            message="Manager"
            description="Sélectionnez une formation au catalogue."
            type="info"
            className="mb-4"
          />

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Formation associée"
                name="training"
                rules={[{ required: true, message: "Sélectionnez une formation" }]}
              >
                <Select placeholder="Sélectionner une formation au catalogue">
                  <Option value="react-advanced">Formation React Avancé</Option>
                  <Option value="leadership">Leadership Avancé</Option>
                  <Option value="design-system">Design System Avancé</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Titre de l'évaluation à froid"
                name="title"
                rules={[{ required: true, message: "Saisissez le titre" }]}
              >
                <Input placeholder="Ex: Évaluation Impact Leadership" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Description de l'évaluation" name="description">
            <TextArea rows={3} placeholder="Décrivez les objectifs de cette évaluation à froid..." />
          </Form.Item>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-3">Configuration de l'évaluation à froid</h4>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Type de question" name="questionType">
                  <Select placeholder="Sélectionner le type de question">
                    <Option value="multiple">Questions à choix multiples</Option>
                    <Option value="open">Questions ouvertes</Option>
                    <Option value="mixed">Questions mixtes</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Score global de l'évaluation" name="globalScore">
                  <Select placeholder="Sélectionner la barème">
                    <Option value="5">Sur 5 points</Option>
                    <Option value="10">Sur 10 points</Option>
                    <Option value="20">Sur 20 points</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-3">Logique du scoring</h4>
            <Form.Item label="Sélectionner la règle de notation" name="scoringRule">
              <Select placeholder="Sélectionner la règle de notation">
                <Option value="average">Moyenne des réponses</Option>
                <Option value="weighted">Pondération par importance</Option>
                <Option value="custom">Règle personnalisée</Option>
              </Select>
            </Form.Item>
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Date d'évaluation" name="evaluationDate">
                <DatePicker className="w-full" placeholder="jj/mm/aaaa" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Durée estimée" name="duration">
                <Select placeholder="Sélectionner la durée">
                  <Option value="15">15 minutes</Option>
                  <Option value="30">30 minutes</Option>
                  <Option value="45">45 minutes</Option>
                  <Option value="60">1 heure</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button onClick={() => setEvaluationModalVisible(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit">
                Créer Évaluation
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal nouvelle demande de formation */}
      <Modal
        title="Demander d'autres formations (hors ingénierie de Formation)"
        open={trainingRequestModalVisible}
        onCancel={() => setTrainingRequestModalVisible(false)}
        footer={null}
        width={800}
      >
        <div className="mb-4">
          <p className="text-gray-600">Spécifiez vos besoins de formation personnalisés</p>
        </div>

        <Form form={requestForm} layout="vertical" onFinish={handleTrainingRequestSubmit}>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="text-blue-800 font-semibold mb-2">1. Type de Compétence</h4>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Catégorie de compétence" name="competencyCategory">
                  <Select placeholder="Compétences Transversales">
                    <Option value="transversal">Compétences Transversales</Option>
                    <Option value="technique">Compétences Techniques</Option>
                    <Option value="management">Management</Option>
                    <Option value="commercial">Commercial</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Nom du domaine" name="domainName">
                  <Input placeholder="Ex: Intelligence Artificielle, Gestion de crise..." />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="text-green-800 font-semibold mb-2">2. Détails de la Formation</h4>
            <Form.Item label="Nom de la thématique" name="themeName">
              <Input placeholder="Ex: ChatGPT pour les professionnels, Gestion de crise sanitaire..." />
            </Form.Item>
            <Form.Item label="Description détaillée" name="detailedDescription">
              <TextArea rows={3} placeholder="Décrivez en détail le contenu souhaité de la formation..." />
            </Form.Item>
            <Form.Item label="Objectifs pédagogiques" name="pedagogicalObjectives">
              <TextArea rows={3} placeholder="Quels sont les objectifs d'apprentissage visés ?" />
            </Form.Item>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="text-yellow-800 font-semibold mb-2">3. Spécifications</h4>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Durée souhaitée" name="desiredDuration">
                  <Input placeholder="Ex: 2 jours, 1 semaine, 20h..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Niveau requis" name="requiredLevel">
                  <Select placeholder="Débutant">
                    <Option value="beginner">Débutant</Option>
                    <Option value="intermediate">Intermédiaire</Option>
                    <Option value="advanced">Avancé</Option>
                    <Option value="expert">Expert</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Organisme préféré (optionnel)" name="preferredProvider">
              <Input placeholder="Ex: CNAM, Université, organisme privé..." />
            </Form.Item>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="text-purple-800 font-semibold mb-2">4. Informations Administratives et Financières</h4>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Priorité" name="priority">
                  <Select placeholder="Normale">
                    <Option value="low">Faible</Option>
                    <Option value="normal">Normale</Option>
                    <Option value="high">Haute</Option>
                    <Option value="urgent">Urgente</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date souhaitée" name="desiredDate">
                  <DatePicker className="w-full" placeholder="jj/mm/aaaa" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Budget estimé (optionnel)" name="estimatedBudget">
              <Input placeholder="Ex: 1500€, 2000€..." />
            </Form.Item>
            <Form.Item label="Justification de la demande" name="requestJustification">
              <Select placeholder="Liste Déroulante (Besoin de service, Besoin de la fonction, Besoin personnel)">
                <Option value="service">Besoin de service</Option>
                <Option value="function">Besoin de la fonction</Option>
                <Option value="personal">Besoin personnel</Option>
                <Option value="strategic">Besoin stratégique</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="text-gray-800 font-semibold mb-2">👁️ Aperçu de votre demande</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Catégorie:</strong> Compétences Transversales
              </div>
              <div>
                <strong>Domaine:</strong> Non spécifié
              </div>
              <div>
                <strong>Thématique:</strong> Non spécifiée
              </div>
              <div>
                <strong>Durée:</strong> Non spécifiée
              </div>
              <div>
                <strong>Niveau:</strong> débutant
              </div>
              <div>
                <strong>Priorité:</strong> normal
              </div>
              <div>
                <strong>Participants:</strong> 1
              </div>
            </div>
          </div>

          <Form.Item className="mb-0">
            <div className="flex justify-between">
              <Button onClick={() => setTrainingRequestModalVisible(false)}>Annuler</Button>
              <div className="space-x-2">
                <Button icon={<CalendarOutlined />}>Programmer</Button>
                <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
                  Soumettre la demande
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DashboardManagerPage
