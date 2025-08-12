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
  Alert,
  Tabs,
  Space,
  Tooltip,
  Badge,
  Avatar,
  List,
  Rate,
  Timeline,
} from "antd"
import {
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  TrophyOutlined,
  AlertOutlined,
  BarChartOutlined,
  StarOutlined,
  CalendarOutlined,
  BookOutlined,
  BellOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { Radar as RadarChart, Bar } from "react-chartjs-2"
import moment from "moment"
import "moment/locale/fr"
import DashboardLayout from "../layouts/DashboardLayout"

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
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [form] = Form.useForm()

  // Données simulées pour le dashboard Manager
  const dashboardData = {
    teamStats: {
      totalEmployees: 12,
      trainedEmployees: 8,
      pendingRequests: 5,
      completedTrainings: 24,
      averageRating: 4.2,
      budgetUsed: 15000,
      budgetTotal: 25000,
    },
    skillsRadar: {
      labels: ["Leadership", "Technique", "Communication", "Gestion", "Innovation", "Collaboration"],
      datasets: [
        {
          label: "Niveau Actuel",
          data: [65, 78, 82, 70, 55, 88],
          backgroundColor: "rgba(24, 144, 255, 0.2)",
          borderColor: "#1890ff",
          pointBackgroundColor: "#1890ff",
        },
        {
          label: "Objectif",
          data: [80, 85, 90, 85, 75, 90],
          backgroundColor: "rgba(82, 196, 26, 0.2)",
          borderColor: "#52c41a",
          pointBackgroundColor: "#52c41a",
        },
      ],
    },
    trainingProgress: {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
      datasets: [
        {
          label: "Formations Réalisées",
          data: [2, 4, 3, 5, 4, 6],
          backgroundColor: "#1890ff",
        },
        {
          label: "Formations Planifiées",
          data: [3, 5, 4, 6, 5, 7],
          backgroundColor: "#52c41a",
        },
      ],
    },
  }

  const teamMembers = [
    {
      id: 1,
      name: "Marie Dubois",
      position: "Développeur Senior",
      department: "IT",
      trainingsCompleted: 5,
      trainingsPlanned: 2,
      lastTraining: "2024-01-15",
      skills: ["React", "Node.js", "Leadership"],
      performance: 4.5,
      status: "active",
    },
    {
      id: 2,
      name: "Pierre Martin",
      position: "Analyste Business",
      department: "IT",
      trainingsCompleted: 3,
      trainingsPlanned: 3,
      lastTraining: "2024-01-10",
      skills: ["Analyse", "SQL", "Communication"],
      performance: 4.2,
      status: "active",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      position: "Chef de Projet",
      department: "IT",
      trainingsCompleted: 4,
      trainingsPlanned: 1,
      lastTraining: "2024-01-12",
      skills: ["Gestion", "Agile", "Leadership"],
      performance: 4.7,
      status: "active",
    },
  ]

  const pendingRequests = [
    {
      id: 1,
      employee: "Marie Dubois",
      formation: "React Avancé",
      type: "Technique",
      requestDate: "2024-01-18",
      startDate: "2024-02-15",
      cost: 1500,
      priority: "high",
      justification: "Nécessaire pour le nouveau projet client",
      status: "pending",
    },
    {
      id: 2,
      employee: "Pierre Martin",
      formation: "Leadership & Management",
      type: "Soft Skills",
      requestDate: "2024-01-17",
      startDate: "2024-02-20",
      cost: 2000,
      priority: "medium",
      justification: "Évolution vers un poste de Team Lead",
      status: "pending",
    },
    {
      id: 3,
      employee: "Sophie Laurent",
      formation: "Certification PMP",
      type: "Certification",
      requestDate: "2024-01-16",
      startDate: "2024-03-01",
      cost: 3000,
      priority: "high",
      justification: "Certification requise pour les projets internationaux",
      status: "pending",
    },
  ]

  const skillsGaps = [
    {
      skill: "Intelligence Artificielle",
      currentLevel: 2,
      targetLevel: 4,
      employees: ["Marie Dubois", "Pierre Martin"],
      priority: "high",
      suggestedTraining: "Formation IA & Machine Learning",
    },
    {
      skill: "Cloud Computing",
      currentLevel: 3,
      targetLevel: 4,
      employees: ["Sophie Laurent"],
      priority: "medium",
      suggestedTraining: "Certification AWS",
    },
    {
      skill: "Cybersécurité",
      currentLevel: 2,
      targetLevel: 5,
      employees: ["Marie Dubois", "Pierre Martin", "Sophie Laurent"],
      priority: "high",
      suggestedTraining: "Formation Sécurité Avancée",
    },
  ]

  const alerts = [
    {
      id: 1,
      type: "evaluation",
      message: "Évaluation à froid manquante pour Marie Dubois (Formation React)",
      date: "2024-01-15",
      priority: "medium",
    },
    {
      id: 2,
      type: "budget",
      message: "Budget équipe à 60% - Planifier les formations Q2",
      date: "2024-01-14",
      priority: "low",
    },
    {
      id: 3,
      type: "deadline",
      message: "Certification PMP de Sophie Laurent expire dans 30 jours",
      date: "2024-01-13",
      priority: "high",
    },
  ]

  // Colonnes pour les demandes
  const requestColumns = [
    {
      title: "Employé",
      dataIndex: "employee",
      key: "employee",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar style={{ backgroundColor: "#1890ff", marginRight: "8px" }}>
            {text
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          {text}
        </div>
      ),
    },
    {
      title: "Formation",
      dataIndex: "formation",
      key: "formation",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{text}</div>
          <Tag color="blue">{record.type}</Tag>
        </div>
      ),
    },
    {
      title: "Date Demande",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Date Début",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Coût",
      dataIndex: "cost",
      key: "cost",
      render: (cost) => `${cost.toLocaleString()}€`,
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
            onClick={() => handleValidateRequest(record, "approve")}
          >
            Approuver
          </Button>
          <Button
            danger
            size="small"
            icon={<CloseCircleOutlined />}
            onClick={() => handleValidateRequest(record, "reject")}
          >
            Rejeter
          </Button>
          <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => handleViewRequest(record)}>
            Détails
          </Button>
        </Space>
      ),
    },
  ]

  // Colonnes pour l'équipe
  const teamColumns = [
    {
      title: "Employé",
      key: "employee",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar style={{ backgroundColor: "#1890ff", marginRight: "8px" }}>
            {record.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <div>
            <div style={{ fontWeight: "bold" }}>{record.name}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>{record.position}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Formations",
      key: "trainings",
      render: (_, record) => (
        <div>
          <div>
            Réalisées: <strong>{record.trainingsCompleted}</strong>
          </div>
          <div>
            Planifiées: <strong>{record.trainingsPlanned}</strong>
          </div>
        </div>
      ),
    },
    {
      title: "Dernière Formation",
      dataIndex: "lastTraining",
      key: "lastTraining",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Compétences",
      dataIndex: "skills",
      key: "skills",
      render: (skills) => (
        <div>
          {skills.slice(0, 2).map((skill) => (
            <Tag key={skill} color="blue" style={{ marginBottom: "2px" }}>
              {skill}
            </Tag>
          ))}
          {skills.length > 2 && <Tag>+{skills.length - 2}</Tag>}
        </div>
      ),
    },
    {
      title: "Performance",
      dataIndex: "performance",
      key: "performance",
      render: (rating) => (
        <div>
          <Rate disabled defaultValue={rating} style={{ fontSize: "12px" }} />
          <div style={{ fontSize: "12px" }}>{rating}/5</div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir profil">
            <Button type="text" icon={<EyeOutlined />} onClick={() => handleViewEmployee(record)} />
          </Tooltip>
          <Tooltip title="Planifier formation">
            <Button type="text" icon={<CalendarOutlined />} onClick={() => handlePlanTraining(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  // Handlers
  const handleValidateRequest = (request, action) => {
    setSelectedRequest(request)
    setValidationModalVisible(true)
  }

  const handleViewRequest = (request) => {
    setSelectedRequest(request)
    Modal.info({
      title: "Détails de la Demande",
      width: 600,
      content: (
        <div>
          <p>
            <strong>Employé:</strong> {request.employee}
          </p>
          <p>
            <strong>Formation:</strong> {request.formation}
          </p>
          <p>
            <strong>Type:</strong> {request.type}
          </p>
          <p>
            <strong>Date de début:</strong> {moment(request.startDate).format("DD/MM/YYYY")}
          </p>
          <p>
            <strong>Coût:</strong> {request.cost.toLocaleString()}€
          </p>
          <p>
            <strong>Justification:</strong>
          </p>
          <p style={{ fontStyle: "italic", backgroundColor: "#f5f5f5", padding: "8px", borderRadius: "4px" }}>
            {request.justification}
          </p>
        </div>
      ),
    })
  }

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee)
    setTeamModalVisible(true)
  }

  const handlePlanTraining = (employee) => {
    console.log("Plan training for:", employee.name)
  }

  const handleValidationSubmit = (values) => {
    console.log("Validation:", values)
    setValidationModalVisible(false)
    setSelectedRequest(null)
  }

  return (
    <DashboardLayout>
      <Content style={{ padding: "24px" }}>
        {/* En-tête */}
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>Dashboard Manager - Équipe IT</h1>
            <p style={{ margin: "4px 0 0 0", color: "#666" }}>Gestion et suivi de votre équipe</p>
          </div>
          <Space>
            <Badge count={alerts.length}>
              <Button icon={<BellOutlined />}>Alertes</Button>
            </Badge>
            <Button type="primary" icon={<BookOutlined />}>
              Demander Formation
            </Button>
          </Space>
        </div>

        {/* Alertes importantes */}
        {alerts.filter((alert) => alert.priority === "high").length > 0 && (
          <Alert
            message="Alertes Importantes"
            description={
              <div>
                {alerts
                  .filter((alert) => alert.priority === "high")
                  .map((alert) => (
                    <div key={alert.id} style={{ marginBottom: "4px" }}>
                      <ExclamationCircleOutlined style={{ color: "#ff4d4f", marginRight: "8px" }} />
                      {alert.message}
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
                title="Équipe"
                value={dashboardData.teamStats.totalEmployees}
                prefix={<TeamOutlined style={{ color: "#1890ff" }} />}
                valueStyle={{ color: "#1890ff" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
                {dashboardData.teamStats.trainedEmployees} formés cette année
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Demandes en Attente"
                value={dashboardData.teamStats.pendingRequests}
                prefix={<AlertOutlined style={{ color: "#faad14" }} />}
                valueStyle={{ color: "#faad14" }}
              />
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>Nécessite validation</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Budget Utilisé"
                value={dashboardData.teamStats.budgetUsed}
                suffix={`/ ${dashboardData.teamStats.budgetTotal.toLocaleString()}€`}
                prefix={<TrophyOutlined style={{ color: "#52c41a" }} />}
                valueStyle={{ color: "#52c41a" }}
              />
              <Progress
                percent={Math.round((dashboardData.teamStats.budgetUsed / dashboardData.teamStats.budgetTotal) * 100)}
                size="small"
                style={{ marginTop: "8px" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Satisfaction Moyenne"
                value={dashboardData.teamStats.averageRating}
                suffix="/ 5"
                prefix={<StarOutlined style={{ color: "#faad14" }} />}
                valueStyle={{ color: "#faad14" }}
              />
              <Rate
                disabled
                defaultValue={dashboardData.teamStats.averageRating}
                style={{ fontSize: "12px", marginTop: "8px" }}
              />
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="team" type="card">
          {/* Onglet Équipe */}
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
              <Col xs={24} lg={16}>
                <Card title="Membres de l'Équipe">
                  <Table columns={teamColumns} dataSource={teamMembers} rowKey="id" pagination={false} />
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="Cartographie des Compétences">
                  <div style={{ height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <RadarChart
                      data={dashboardData.skillsRadar}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                        },
                        scales: {
                          r: {
                            beginAtZero: true,
                            max: 100,
                          },
                        },
                      }}
                    />
                  </div>
                </Card>
              </Col>
            </Row>

            <Card title="Gaps de Compétences Identifiés" style={{ marginTop: "16px" }}>
              <List
                dataSource={skillsGaps}
                renderItem={(gap) => (
                  <List.Item key={gap.skill}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: gap.priority === "high" ? "#ff4d4f" : "#faad14",
                          }}
                        >
                          <TrophyOutlined />
                        </Avatar>
                      }
                      title={
                        <div>
                          <span style={{ fontWeight: "bold" }}>{gap.skill}</span>
                          <Tag color={gap.priority === "high" ? "red" : "orange"} style={{ marginLeft: "8px" }}>
                            {gap.priority === "high" ? "Priorité Haute" : "Priorité Moyenne"}
                          </Tag>
                        </div>
                      }
                      description={
                        <div>
                          <div>
                            Niveau actuel: {gap.currentLevel}/5 → Objectif: {gap.targetLevel}/5
                          </div>
                          <div>Employés concernés: {gap.employees.join(", ")}</div>
                          <div style={{ fontStyle: "italic", color: "#1890ff" }}>
                            Suggestion: {gap.suggestedTraining}
                          </div>
                        </div>
                      }
                    />
                    <List.Item actions={[<Button type="link">Planifier Formation</Button>]} />
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          {/* Onglet Validations */}
          <TabPane
            tab={
              <span>
                <CheckCircleOutlined />
                Validations ({pendingRequests.length})
              </span>
            }
            key="validations"
          >
            <Card title="Demandes de Formation à Valider">
              <Table columns={requestColumns} dataSource={pendingRequests} rowKey="id" pagination={{ pageSize: 10 }} />
            </Card>
          </TabPane>

          {/* Onglet Suivi */}
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                Suivi & Performance
              </span>
            }
            key="performance"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title="Évolution des Formations">
                  <Bar
                    data={dashboardData.trainingProgress}
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
              <Col xs={24} lg={12}>
                <Card title="Performance Individuelle">
                  <List
                    dataSource={teamMembers}
                    renderItem={(member) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar style={{ backgroundColor: "#1890ff" }}>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </Avatar>
                          }
                          title={member.name}
                          description={
                            <div>
                              <div>
                                Performance:{" "}
                                <Rate disabled defaultValue={member.performance} style={{ fontSize: "12px" }} />
                              </div>
                              <div>
                                Formations: {member.trainingsCompleted} réalisées, {member.trainingsPlanned} planifiées
                              </div>
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

          {/* Onglet Alertes */}
          <TabPane
            tab={
              <span>
                <BellOutlined />
                Alertes ({alerts.length})
              </span>
            }
            key="alerts"
          >
            <Card title="Centre d'Alertes">
              <List
                dataSource={alerts}
                renderItem={(alert) => (
                  <List.Item key={alert.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor:
                              alert.priority === "high"
                                ? "#ff4d4f"
                                : alert.priority === "medium"
                                  ? "#faad14"
                                  : "#52c41a",
                          }}
                        >
                          {alert.type === "evaluation" ? (
                            <StarOutlined />
                          ) : alert.type === "budget" ? (
                            <TrophyOutlined />
                          ) : (
                            <AlertOutlined />
                          )}
                        </Avatar>
                      }
                      title={
                        <div>
                          <span>{alert.message}</span>
                          <Tag
                            color={alert.priority === "high" ? "red" : alert.priority === "medium" ? "orange" : "green"}
                            style={{ marginLeft: "8px" }}
                          >
                            {alert.priority === "high" ? "Urgent" : alert.priority === "medium" ? "Moyen" : "Info"}
                          </Tag>
                        </div>
                      }
                      description={`Date: ${moment(alert.date).format("DD/MM/YYYY")}`}
                    />
                    <List.Item actions={[<Button type="link">Traiter</Button>]} />
                  </List.Item>
                )}
              />
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
              <div style={{ backgroundColor: "#f5f5f5", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
                <h4>Détails de la Demande</h4>
                <p>
                  <strong>Employé:</strong> {selectedRequest.employee}
                </p>
                <p>
                  <strong>Formation:</strong> {selectedRequest.formation}
                </p>
                <p>
                  <strong>Coût:</strong> {selectedRequest.cost.toLocaleString()}€
                </p>
                <p>
                  <strong>Justification:</strong> {selectedRequest.justification}
                </p>
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

              <Form.Item>
                <Space style={{ width: "100%", justifyContent: "flex-end" }}>
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
          title="Profil Employé"
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
                  <div style={{ textAlign: "center" }}>
                    <Avatar size={80} style={{ backgroundColor: "#1890ff" }}>
                      {selectedEmployee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <h3 style={{ marginTop: "16px" }}>{selectedEmployee.name}</h3>
                    <p>{selectedEmployee.position}</p>
                  </div>
                </Col>
                <Col span={16}>
                  <Tabs defaultActiveKey="overview">
                    <TabPane tab="Vue d'ensemble" key="overview">
                      <div>
                        <p>
                          <strong>Département:</strong> {selectedEmployee.department}
                        </p>
                        <p>
                          <strong>Formations réalisées:</strong> {selectedEmployee.trainingsCompleted}
                        </p>
                        <p>
                          <strong>Formations planifiées:</strong> {selectedEmployee.trainingsPlanned}
                        </p>
                        <p>
                          <strong>Dernière formation:</strong>{" "}
                          {moment(selectedEmployee.lastTraining).format("DD/MM/YYYY")}
                        </p>
                        <p>
                          <strong>Performance:</strong> <Rate disabled defaultValue={selectedEmployee.performance} />
                        </p>
                      </div>
                    </TabPane>
                    <TabPane tab="Compétences" key="skills">
                      <div>
                        <h4>Compétences actuelles:</h4>
                        {selectedEmployee.skills.map((skill) => (
                          <Tag key={skill} color="blue" style={{ marginBottom: "8px" }}>
                            {skill}
                          </Tag>
                        ))}
                      </div>
                    </TabPane>
                    <TabPane tab="Historique" key="history">
                      <Timeline>
                        <Timeline.Item color="green">Formation React Avancé - 15/01/2024</Timeline.Item>
                        <Timeline.Item color="blue">Formation Leadership - 10/12/2023</Timeline.Item>
                        <Timeline.Item color="red">Certification AWS - 05/11/2023</Timeline.Item>
                      </Timeline>
                    </TabPane>
                  </Tabs>
                </Col>
              </Row>
            </div>
          )}
        </Modal>
      </Content>
    </DashboardLayout>
  )
}

export default DashboardManagerPage
