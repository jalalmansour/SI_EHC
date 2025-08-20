"use client"
import { useState } from "react"
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Table,
  Tag,
  Progress,
  Row,
  Col,
  Tabs,
  Modal,
  Space,
  Tooltip,
  Rate,
  Avatar,
  Alert,
  Radio,
  Divider,
  message,
} from "antd"
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  TrophyOutlined,
  TeamOutlined,
  BarChartOutlined,
  FileTextOutlined,
  DownloadOutlined,
  CloseOutlined,
  SaveOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import moment from "moment"

const { TextArea } = Input
const { Option } = Select
const { TabPane } = Tabs

const Evaluation = () => {
  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const [activeTab, setActiveTab] = useState("test-positionnement")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [selectedEvaluation, setSelectedEvaluation] = useState(null)
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      points: 1,
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ])

  // Sample data for evaluations with enhanced tracking
  const evaluationsData = [
    {
      key: "1",
      evaluation: "Test de positionnement Leadership",
      formation: "Formation Leadership Avancé",
      type: "Test de positionnement",
      participants: 12,
      date: "15 Mars 2024",
      responses: "0/12",
      status: "Programmé",
      scores: [],
      competencyUpdates: [],
    },
    {
      key: "2",
      evaluation: "Evaluation Leadership - Quiz à chaud",
      formation: "Formation Leadership Avancé",
      type: "Quiz à chaud",
      participants: 12,
      date: "17 Mars 2024",
      responses: "8/12",
      status: "En cours",
      scores: [
        { participantId: "1", participantName: "Marie Martin", score: 85, type: "mcq", completedAt: "2024-03-17" },
        {
          participantId: "2",
          participantName: "Pierre Dubois",
          score: 78,
          type: "practical",
          completedAt: "2024-03-17",
        },
      ],
      competencyUpdates: [
        { participantId: "1", competency: "Leadership", hotScore: 85, updatedAt: "2024-03-17" },
        { participantId: "2", competency: "Leadership", hotScore: 78, updatedAt: "2024-03-17" },
      ],
    },
    {
      key: "3",
      evaluation: "Evaluation Leadership - À froid",
      formation: "Formation Leadership Avancé",
      type: "Evaluation à froid",
      participants: 12,
      date: "17 Juin 2024",
      responses: "5/12",
      status: "En cours",
      scheduledAfter: "3 mois",
      scores: [
        { participantId: "1", participantName: "Marie Martin", score: 82, type: "mcq", completedAt: "2024-06-17" },
        {
          participantId: "3",
          participantName: "Sophie Laurent",
          score: 75,
          type: "practical",
          completedAt: "2024-06-15",
        },
      ],
      competencyUpdates: [
        { participantId: "1", competency: "Leadership", coldScore: 82, realLevel: 83.5, updatedAt: "2024-06-17" },
        { participantId: "3", competency: "Leadership", coldScore: 75, realLevel: 75, updatedAt: "2024-06-15" },
      ],
    },
    {
      key: "4",
      evaluation: "Evaluation Cybersécurité - Satisfaction",
      formation: "Cybersécurité Entreprise",
      type: "Satisfaction",
      participants: 8,
      date: "23 Mars 2024",
      responses: "5/8",
      status: "En cours",
      satisfactionScores: [4.2, 4.5, 3.8, 4.0, 4.3],
    },
  ]

  // Enhanced competency data with real-time updates
  const competencyData = [
    {
      department: "Marketing",
      collaborators: 2,
      employees: [
        {
          id: "1",
          name: "Marie Martin",
          role: "Chef de projet",
          avatar: "MM",
          competencies: [
            {
              name: "Leadership",
              hot: 85,
              cold: 82,
              realLevel: 83.5,
              lastHotEvaluation: "2024-03-17",
              lastColdEvaluation: "2024-06-17",
              trend: "stable",
            },
            {
              name: "Communication",
              hot: 92,
              cold: 88,
              realLevel: 90.0,
              lastHotEvaluation: "2024-02-15",
              lastColdEvaluation: "2024-05-15",
              trend: "improving",
            },
            {
              name: "Gestion de projet",
              hot: 88,
              cold: 85,
              realLevel: 86.5,
              lastHotEvaluation: "2024-01-20",
              lastColdEvaluation: "2024-04-20",
              trend: "stable",
            },
          ],
        },
        {
          id: "2",
          name: "Sophie Dubois",
          role: "Responsable Marketing",
          avatar: "SD",
          competencies: [
            {
              name: "Leadership",
              hot: 78,
              cold: 75,
              realLevel: 76.5,
              lastHotEvaluation: "2024-03-17",
              lastColdEvaluation: "2024-06-15",
              trend: "declining",
            },
            {
              name: "Communication",
              hot: 95,
              cold: 92,
              realLevel: 93.5,
              lastHotEvaluation: "2024-02-10",
              lastColdEvaluation: "2024-05-10",
              trend: "excellent",
            },
          ],
        },
      ],
    },
    {
      department: "IT",
      collaborators: 2,
      employees: [
        {
          id: "3",
          name: "Ahmed Benali",
          role: "Développeur senior",
          avatar: "AB",
          competencies: [
            {
              name: "Sécurité",
              hot: 92,
              cold: 89,
              realLevel: 90.5,
              lastHotEvaluation: "2024-03-10",
              lastColdEvaluation: "2024-06-10",
              trend: "excellent",
            },
            {
              name: "Leadership",
              hot: 75,
              cold: 72,
              realLevel: 73.5,
              lastHotEvaluation: "2024-02-20",
              lastColdEvaluation: "2024-05-20",
              trend: "needs_improvement",
            },
          ],
        },
        {
          id: "4",
          name: "Jean Dupont",
          role: "Architecte logiciel",
          avatar: "JD",
          competencies: [
            {
              name: "Sécurité",
              hot: 89,
              cold: 85,
              realLevel: 87.0,
              lastHotEvaluation: "2024-03-05",
              lastColdEvaluation: "2024-06-05",
              trend: "stable",
            },
            {
              name: "Communication",
              hot: 82,
              cold: 79,
              realLevel: 80.5,
              lastHotEvaluation: "2024-02-25",
              lastColdEvaluation: "2024-05-25",
              trend: "stable",
            },
          ],
        },
      ],
    },
    {
      department: "RH",
      collaborators: 1,
      employees: [
        {
          id: "5",
          name: "Sarah Alami",
          role: "Responsable RH",
          avatar: "SA",
          competencies: [
            {
              name: "Leadership",
              hot: 90,
              cold: 87,
              realLevel: 88.5,
              lastHotEvaluation: "2024-01-15",
              lastColdEvaluation: "2024-04-15",
              trend: "excellent",
            },
            {
              name: "Communication",
              hot: 94,
              cold: 91,
              realLevel: 92.5,
              lastHotEvaluation: "2024-01-10",
              lastColdEvaluation: "2024-04-10",
              trend: "excellent",
            },
            {
              name: "Relations humaines",
              hot: 96,
              cold: 93,
              realLevel: 94.5,
              lastHotEvaluation: "2024-01-05",
              lastColdEvaluation: "2024-04-05",
              trend: "excellent",
            },
          ],
        },
      ],
    },
  ]

  const handleViewDetails = (record) => {
    setSelectedEvaluation(record)
    setShowDetailsModal(true)
  }

  const handleEditEvaluation = (record) => {
    setSelectedEvaluation(record)
    editForm.setFieldsValue({
      title: record.evaluation,
      date: moment(record.date, "DD MMMM YYYY"),
    })
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    editForm.validateFields().then((values) => {
      message.success("Évaluation modifiée avec succès")
      setShowEditModal(false)
    })
  }

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: "",
      points: 1,
      options: ["", "", "", ""],
      correctAnswer: "",
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const updateQuestionOption = (id, optionIndex, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((opt, idx) => (idx === optionIndex ? value : opt)),
            }
          : q,
      ),
    )
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case "excellent":
        return "#52c41a"
      case "improving":
        return "#1890ff"
      case "stable":
        return "#faad14"
      case "declining":
        return "#ff7875"
      case "needs_improvement":
        return "#ff4d4f"
      default:
        return "#d9d9d9"
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "excellent":
        return "📈"
      case "improving":
        return "⬆️"
      case "stable":
        return "➡️"
      case "declining":
        return "⬇️"
      case "needs_improvement":
        return "⚠️"
      default:
        return "➡️"
    }
  }

  const evaluationColumns = [
    {
      title: "Évaluation",
      dataIndex: "evaluation",
      key: "evaluation",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Formation Associée",
      dataIndex: "formation",
      key: "formation",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        const colors = {
          "Test de positionnement": "orange",
          "Quiz à chaud": "red",
          "Evaluation à froid": "blue",
          Satisfaction: "gold",
        }
        return (
          <Tag color={colors[type]} className="rounded-full">
            {type}
          </Tag>
        )
      },
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
      render: (count) => (
        <Space>
          <TeamOutlined />
          {count}
        </Space>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Réponses",
      dataIndex: "responses",
      key: "responses",
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          Programmé: "blue",
          "En cours": "orange",
          Terminé: "green",
        }
        return (
          <Tag color={colors[status]} className="rounded-full">
            {status}
          </Tag>
        )
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir détails">
            <Button type="text" icon={<EyeOutlined />} size="small" onClick={() => handleViewDetails(record)} />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button type="text" icon={<EditOutlined />} size="small" onClick={() => handleEditEvaluation(record)} />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Button type="text" icon={<DeleteOutlined />} size="small" danger />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const renderActionButtons = () => (
    <Row gutter={16} className="mb-6">
      <Col xs={24} sm={12} md={8} lg={4.8}>
        <Card
          className="text-center cursor-pointer hover:shadow-lg transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            border: "none",
            color: "white",
          }}
          onClick={() => {
            setActiveTab("test-positionnement")
            setShowCreateModal(true)
          }}
        >
          <CheckCircleOutlined className="text-2xl mb-2" />
          <div className="font-medium">Test de positionnement</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4.8}>
        <Card
          className="text-center cursor-pointer hover:shadow-lg transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            border: "none",
            color: "white",
          }}
          onClick={() => {
            setActiveTab("quiz-chaud")
            setShowCreateModal(true)
          }}
        >
          <ClockCircleOutlined className="text-2xl mb-2" />
          <div className="font-medium">Quiz à chaud</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4.8}>
        <Card
          className="text-center cursor-pointer hover:shadow-lg transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
            border: "none",
            color: "white",
          }}
          onClick={() => {
            setActiveTab("quiz-froid")
            setShowCreateModal(true)
          }}
        >
          <FileTextOutlined className="text-2xl mb-2" />
          <div className="font-medium">Quiz à froid</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4.8}>
        <Card
          className="text-center cursor-pointer hover:shadow-lg transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            border: "none",
            color: "white",
          }}
          onClick={() => setShowConfigModal(true)}
        >
          <EyeOutlined className="text-2xl mb-2" />
          <div className="font-medium">Valider les quiz</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4.8}>
        <Card
          className="text-center cursor-pointer hover:shadow-lg transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
            border: "none",
            color: "white",
          }}
          onClick={() => {
            setActiveTab("satisfaction")
            setShowCreateModal(true)
          }}
        >
          <BarChartOutlined className="text-2xl mb-2" />
          <div className="font-medium">Enquête satisfaction</div>
        </Card>
      </Col>
    </Row>
  )

  const renderStatistics = () => (
    <Row gutter={16} className="mb-6">
      <Col xs={24} sm={12} md={6}>
        <Card className="text-center">
          <FileTextOutlined className="text-3xl text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-blue-600">4</div>
          <div className="text-gray-600">En cours</div>
          <div className="text-sm text-gray-500">Évaluations actives</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card className="text-center">
          <TeamOutlined className="text-3xl text-green-500 mb-2" />
          <div className="text-2xl font-bold text-green-600">78%</div>
          <div className="text-gray-600">Moyenne générale</div>
          <div className="text-sm text-gray-500">Taux de réponse</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card className="text-center">
          <StarOutlined className="text-3xl text-purple-500 mb-2" />
          <div className="text-2xl font-bold text-purple-600">4.2</div>
          <div className="text-gray-600">Sur 5 étoiles</div>
          <div className="text-sm text-gray-500">Satisfaction moyenne</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card className="text-center">
          <TrophyOutlined className="text-3xl text-orange-500 mb-2" />
          <div className="text-2xl font-bold text-orange-600">86.2%</div>
          <div className="text-gray-600">Moyenne générale</div>
          <div className="text-sm text-gray-500">Niveau global des compétences</div>
        </Card>
      </Col>
    </Row>
  )

  const renderCompetencyCards = () => (
    <Card title="📊 Fiches des compétences - Mise à jour en temps réel" className="mb-6">
      {competencyData.map((dept, deptIndex) => (
        <div key={deptIndex} className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="font-semibold text-lg">{dept.department}</span>
            <span className="ml-2 text-gray-500">
              {dept.collaborators} collaborateur{dept.collaborators > 1 ? "s" : ""}
            </span>
          </div>
          <Row gutter={16}>
            {dept.employees.map((employee, empIndex) => (
              <Col xs={24} md={12} key={empIndex}>
                <Card className="mb-4">
                  <div className="flex items-center mb-4">
                    <Avatar
                      style={{
                        backgroundColor: empIndex % 2 === 0 ? "#52c41a" : "#1890ff",
                      }}
                    >
                      {employee.avatar}
                    </Avatar>
                    <div className="ml-3">
                      <div className="font-semibold">{employee.name}</div>
                      <div className="text-gray-500 text-sm">{employee.role}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium mb-2">Compétences acquises:</div>
                  {employee.competencies.map((comp, compIndex) => (
                    <div key={compIndex} className="mb-4 p-3 bg-gray-50 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{comp.name}</span>
                        <div className="flex items-center">
                          <span className="text-sm mr-2">{getTrendIcon(comp.trend)}</span>
                          <Rate disabled defaultValue={Math.round(comp.realLevel / 20)} className="text-sm" />
                          <span className="text-sm ml-2 font-bold" style={{ color: getTrendColor(comp.trend) }}>
                            ({comp.realLevel}%)
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>
                          <span className="font-medium">À chaud:</span> {comp.hot}%
                          <div className="text-xs text-gray-400">
                            {moment(comp.lastHotEvaluation).format("DD/MM/YYYY")}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">À froid:</span> {comp.cold}%
                          <div className="text-xs text-gray-400">
                            {moment(comp.lastColdEvaluation).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Progress
                          percent={comp.realLevel}
                          strokeColor={getTrendColor(comp.trend)}
                          size="small"
                          showInfo={false}
                        />
                        <div className="text-xs text-gray-500 mt-1">Niveau réel basé sur l'évaluation à froid</div>
                      </div>
                    </div>
                  ))}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Card>
  )

  // Details Modal
  const renderDetailsModal = () => (
    <Modal
      title="Détails de l'évaluation"
      open={showDetailsModal}
      onCancel={() => setShowDetailsModal(false)}
      width={800}
      footer={[
        <Button key="close" onClick={() => setShowDetailsModal(false)}>
          Fermer
        </Button>,
        <Button key="export" type="primary" icon={<DownloadOutlined />}>
          Exporter
        </Button>,
      ]}
    >
      {selectedEvaluation && (
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <div className="mb-4">
                <strong>Titre:</strong>
                <div>{selectedEvaluation.evaluation}</div>
              </div>
              <div className="mb-4">
                <strong>Formation:</strong>
                <div>{selectedEvaluation.formation}</div>
              </div>
              <div className="mb-4">
                <strong>Participants:</strong>
                <div>{selectedEvaluation.participants}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-4">
                <strong>Type:</strong>
                <div>{selectedEvaluation.type}</div>
              </div>
              <div className="mb-4">
                <strong>Date:</strong>
                <div>{selectedEvaluation.date}</div>
              </div>
              <div className="mb-4">
                <strong>Statut:</strong>
                <Tag color="blue" className="rounded-full">
                  {selectedEvaluation.status}
                </Tag>
              </div>
            </Col>
          </Row>

          {selectedEvaluation.scores && selectedEvaluation.scores.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Résultats des participants:</h4>
              <Table
                size="small"
                dataSource={selectedEvaluation.scores}
                columns={[
                  { title: "Participant", dataIndex: "participantName", key: "participant" },
                  { title: "Score", dataIndex: "score", key: "score", render: (score) => `${score}%` },
                  {
                    title: "Type",
                    dataIndex: "type",
                    key: "type",
                    render: (type) => (
                      <Tag color={type === "mcq" ? "blue" : "green"}>{type === "mcq" ? "QCM" : "Pratique"}</Tag>
                    ),
                  },
                  {
                    title: "Date",
                    dataIndex: "completedAt",
                    key: "completedAt",
                    render: (date) => moment(date).format("DD/MM/YYYY"),
                  },
                ]}
                pagination={false}
              />
            </div>
          )}

          {selectedEvaluation.competencyUpdates && selectedEvaluation.competencyUpdates.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Mises à jour des compétences:</h4>
              <div className="space-y-2">
                {selectedEvaluation.competencyUpdates.map((update, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                    <div className="font-medium">
                      Compétence "{update.competency}" mise à jour pour {update.participantId}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedEvaluation.type === "Quiz à chaud" && `Score à chaud: ${update.hotScore}%`}
                      {selectedEvaluation.type === "Evaluation à froid" &&
                        `Score à froid: ${update.coldScore}% - Niveau réel: ${update.realLevel}%`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  )

  // Edit Modal
  const renderEditModal = () => (
    <Modal
      title="Modifier l'évaluation"
      open={showEditModal}
      onCancel={() => setShowEditModal(false)}
      width={600}
      footer={[
        <Button key="cancel" onClick={() => setShowEditModal(false)}>
          Annuler
        </Button>,
        <Button key="save" type="primary" icon={<SaveOutlined />} onClick={handleSaveEdit}>
          Sauvegarder
        </Button>,
      ]}
    >
      <Form form={editForm} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Titre:" name="title">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date:" name="date">
              <DatePicker className="w-full" format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )

  // Configuration Modal
  const renderConfigModal = () => (
    <Modal
      title="Configuration des Évaluations"
      open={showConfigModal}
      onCancel={() => setShowConfigModal(false)}
      width={1000}
      footer={null}
    >
      <div className="space-y-6">
        <Card className="border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-blue-600">📋 Paramétrer un Test de positionnement</h4>
              <p className="text-gray-600 text-sm">
                Créer et configurer des tests de positionnement pour évaluer le niveau initial des apprenants
              </p>
            </div>
            <div className="space-x-2">
              <Button type="default">À configurer</Button>
              <Button type="link">Masquer</Button>
            </div>
          </div>
          <Divider />
          <div className="text-sm text-gray-600">
            <h5 className="font-medium mb-2">Configuration du Test de positionnement</h5>
            <div className="grid grid-cols-2 gap-4">
              <Button icon={<FileTextOutlined />} className="text-left">
                Créer un nouveau test
              </Button>
              <Button icon={<SettingOutlined />} className="text-left">
                Modifier un test existant
              </Button>
            </div>
            <p className="mt-2 text-xs">
              Définissez les questions, les critères d'évaluation et les seuils de réussite pour le test de
              positionnement.
            </p>
          </div>
        </Card>

        <Card className="border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-green-600">🔥 Paramétrer un quiz à chaud</h4>
              <p className="text-gray-600 text-sm">Configurer des évaluations immédiates après la formation</p>
            </div>
            <div className="space-x-2">
              <Button type="default">À configurer</Button>
              <Button type="primary">Configurer</Button>
            </div>
          </div>
          <Divider />
          <div className="text-sm text-gray-600">
            <Alert
              message="Types d'évaluation à chaud disponibles"
              description={
                <div className="mt-2">
                  <div className="mb-2">
                    <strong>QCM automatique:</strong> Questions à choix multiples avec correction automatique
                  </div>
                  <div>
                    <strong>Test pratique:</strong> Évaluation manuelle par le formateur avec saisie de note
                  </div>
                </div>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>

        <Card className="border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-purple-600">❄️ Paramétrer un quiz à froid</h4>
              <p className="text-gray-600 text-sm">Configurer des évaluations différées pour mesurer la rétention</p>
            </div>
            <div className="space-x-2">
              <Button type="default">À configurer</Button>
              <Button type="primary">Configurer</Button>
            </div>
          </div>
          <Divider />
          <div className="text-sm text-gray-600">
            <Alert
              message="Évaluation à froid - Mesure du niveau réel"
              description={
                <div className="mt-2">
                  <div className="mb-2">
                    <strong>Période:</strong> 1 à 12 mois après la formation
                  </div>
                  <div className="mb-2">
                    <strong>Types disponibles:</strong> QCM ou évaluation pratique
                  </div>
                  <div>
                    <strong>Impact:</strong> Met à jour automatiquement la carte de compétences avec le niveau réel
                  </div>
                </div>
              }
              type="warning"
              showIcon
            />
          </div>
        </Card>

        <Card className="border-l-4 border-orange-500">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-orange-600">✅ Valider les quiz</h4>
              <p className="text-gray-600 text-sm">Réviser et approuver les quiz créés avant leur diffusion</p>
            </div>
            <div className="space-x-2">
              <Button type="default">En attente</Button>
              <Button type="primary">Configurer</Button>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-cyan-500">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-cyan-600">👥 Paramétrer une enquête de satisfaction formation</h4>
              <p className="text-gray-600 text-sm">Créer des enquêtes pour mesurer la satisfaction des participants</p>
            </div>
            <div className="space-x-2">
              <Button type="default">À configurer</Button>
              <Button type="primary">Configurer</Button>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  )

  const renderCreateEvaluationModal = () => (
    <Modal
      title="Gestion des Évaluations"
      open={showCreateModal}
      onCancel={() => setShowCreateModal(false)}
      width={1000}
      footer={null}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4">Paramétrer une Nouvelle Évaluation</h3>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <CheckCircleOutlined /> Test de positionnement
              </span>
            }
            key="test-positionnement"
          >
            <Form form={form} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Formation associée" name="formation">
                    <Select placeholder="Sélectionner une formation du catalogue">
                      <Option value="leadership">Formation Leadership Avancé</Option>
                      <Option value="communication">Formation Communication</Option>
                      <Option value="management">Formation Management</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Titre du test de positionnement" name="titre">
                    <Input placeholder="Ex: Test de positionnement Leadership" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Description du test" name="description">
                <TextArea rows={3} placeholder="Décrivez les objectifs de ce test de positionnement..." />
              </Form.Item>

              <h4 className="font-semibold mb-3">Configuration du Test de Positionnement</h4>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Type de question" name="questionType">
                    <Select defaultValue="qcm">
                      <Option value="qcm">QCM (Questions à Choix Multiple)</Option>
                      <Option value="vrai-faux">Vrai/Faux</Option>
                      <Option value="texte">Réponse libre</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Score global du Test" name="scoreGlobal">
                    <Select placeholder="Sélectionner le barème">
                      <Option value="20">Sur 20</Option>
                      <Option value="100">Sur 100</Option>
                      <Option value="custom">Personnalisé</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Score par question" name="scoreQuestion">
                    <Input placeholder="Ex: 1pt, 2pts, etc." />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Logique du scoring du test" name="scoringLogic">
                <Select placeholder="Sélectionner la règle de notation">
                  <Option value="standard">Notation standard</Option>
                  <Option value="ponderation">Pondération par difficulté</Option>
                  <Option value="malus">Malus pour mauvaises réponses</Option>
                </Select>
              </Form.Item>

              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">Questions configurées</h4>
                <Button type="primary" icon={<PlusOutlined />} onClick={addQuestion}>
                  Ajouter une question
                </Button>
              </div>

              {questions.map((question, index) => (
                <Card key={question.id} className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium">Question {index + 1}</h5>
                    {questions.length > 1 && (
                      <Button type="text" danger icon={<CloseOutlined />} onClick={() => removeQuestion(question.id)} />
                    )}
                  </div>

                  <Form.Item label="Énoncé de la question">
                    <TextArea
                      rows={2}
                      placeholder="Saisissez votre question ici..."
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
                    />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Points attribués">
                        <InputNumber
                          min={1}
                          value={question.points}
                          onChange={(value) => updateQuestion(question.id, "points", value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item label="Options de réponse (QCM)">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center mb-2">
                        <span className="mr-2 font-medium">{String.fromCharCode(65 + optIndex)}.</span>
                        <Input
                          placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                          value={option}
                          onChange={(e) => updateQuestionOption(question.id, optIndex, e.target.value)}
                        />
                      </div>
                    ))}
                  </Form.Item>

                  <Form.Item label="Bonne réponse">
                    <Select
                      placeholder="Sélectionner la bonne réponse"
                      value={question.correctAnswer}
                      onChange={(value) => updateQuestion(question.id, "correctAnswer", value)}
                    >
                      {question.options.map((_, optIndex) => (
                        <Option key={optIndex} value={String.fromCharCode(65 + optIndex)}>
                          Option {String.fromCharCode(65 + optIndex)}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Date du test">
                        <DatePicker className="w-full" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Durée estimée">
                        <Input placeholder="Ex: 45 minutes" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              ))}

              <div className="flex justify-end space-x-2 mt-6">
                <Button onClick={() => setShowCreateModal(false)}>Annuler</Button>
                <Button type="primary">Créer l'Évaluation</Button>
              </div>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <ClockCircleOutlined /> Quiz à chaud
              </span>
            }
            key="quiz-chaud"
          >
            <Alert
              message="Quiz à chaud - Évaluation immédiate"
              description="Configuration pour les évaluations réalisées immédiatement après la formation pour mesurer l'acquisition immédiate des connaissances."
              type="info"
              className="mb-4"
            />

            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Formation associée" name="formation">
                    <Select placeholder="Sélectionner une formation">
                      <Option value="leadership">Formation Leadership Avancé</Option>
                      <Option value="communication">Formation Communication</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Type d'évaluation" name="evaluationType">
                    <Radio.Group>
                      <Radio value="mcq">QCM automatique</Radio>
                      <Radio value="practical">Test pratique (note manuelle)</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Alert
                message="Impact sur les compétences"
                description="Les résultats de cette évaluation mettront à jour automatiquement les scores 'à chaud' dans les cartes de compétences des participants."
                type="success"
                showIcon
                className="mb-4"
              />

              <div className="flex justify-end space-x-2 mt-6">
                <Button onClick={() => setShowCreateModal(false)}>Annuler</Button>
                <Button type="primary">Créer l'Évaluation</Button>
              </div>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <FileTextOutlined /> Évaluation à froid
              </span>
            }
            key="quiz-froid"
          >
            <Alert
              message="Évaluation à froid - Mesure du niveau réel"
              description="Configuration pour les évaluations différées (1-12 mois après la formation) qui déterminent le vrai niveau de compétence de l'employé."
              type="warning"
              className="mb-4"
            />

            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Formation associée" name="formation">
                    <Select placeholder="Sélectionner une formation">
                      <Option value="leadership">Formation Leadership Avancé</Option>
                      <Option value="communication">Formation Communication</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Délai après formation" name="delay">
                    <Select placeholder="Choisir le délai">
                      <Option value="1">1 mois</Option>
                      <Option value="3">3 mois</Option>
                      <Option value="6">6 mois</Option>
                      <Option value="12">12 mois</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Type d'évaluation" name="evaluationType">
                    <Radio.Group>
                      <Radio value="mcq">QCM automatique</Radio>
                      <Radio value="practical">Évaluation pratique</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Compétence évaluée" name="competency">
                    <Select placeholder="Sélectionner la compétence">
                      <Option value="leadership">Leadership</Option>
                      <Option value="communication">Communication</Option>
                      <Option value="management">Management</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Alert
                message="Impact sur les compétences - NIVEAU RÉEL"
                description={
                  <div>
                    <p>
                      Cette évaluation détermine le <strong>niveau réel</strong> de l'employé et met à jour sa carte de
                      compétences.
                    </p>
                    <p>Le score sera visible par:</p>
                    <ul className="mt-2 ml-4">
                      <li>• Le manager N+1</li>
                      <li>• Les RRH</li>
                      <li>• L'employé lui-même</li>
                    </ul>
                  </div>
                }
                type="error"
                showIcon
                className="mb-4"
              />

              <div className="flex justify-end space-x-2 mt-6">
                <Button onClick={() => setShowCreateModal(false)}>Annuler</Button>
                <Button type="primary">Créer l'Évaluation</Button>
              </div>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <StarOutlined /> Satisfaction
              </span>
            }
            key="satisfaction"
          >
            <Alert
              message="Enquête de satisfaction"
              description="Configuration pour mesurer la satisfaction des participants concernant la formation reçue."
              type="info"
              className="mb-4"
            />

            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Formation associée" name="formation">
                    <Select placeholder="Sélectionner une formation">
                      <Option value="leadership">Formation Leadership Avancé</Option>
                      <Option value="communication">Formation Communication</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Type d'enquête" name="surveyType">
                    <Select placeholder="Type d'enquête">
                      <Option value="standard">Enquête standard</Option>
                      <Option value="detailed">Enquête détaillée</Option>
                      <Option value="custom">Personnalisée</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <div className="flex justify-end space-x-2 mt-6">
                <Button onClick={() => setShowCreateModal(false)}>Annuler</Button>
                <Button type="primary">Créer l'Enquête</Button>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Évaluation des formations</h1>
        <div className="text-sm text-gray-500">Responsable RH - Accès complet</div>
      </div>

      {renderActionButtons()}
      {renderStatistics()}

      <Card
        title="Gestion des Évaluations"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowCreateModal(true)}>
            Créer une Évaluation
          </Button>
        }
        className="mb-6"
      >
        <Table
          columns={evaluationColumns}
          dataSource={evaluationsData}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {renderCompetencyCards()}

      <Row gutter={16} className="mb-6">
        <Col xs={24} md={12}>
          <Card title="⭐ Taux de satisfaction" className="h-full">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span>Par les employés:</span>
                <span className="font-bold text-lg">4.2</span>
              </div>
              <Progress percent={84} strokeColor="#52c41a" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Par le formateur:</span>
                <span className="font-bold text-lg">4.5</span>
              </div>
              <Progress percent={90} strokeColor="#1890ff" />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="📈 Scores d'évaluation" className="h-full">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <span>Moyenne des évaluations à chaud:</span>
                <span className="font-bold text-lg">8.2/10</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span>Moyenne des évaluations à froid:</span>
                <span className="font-bold text-lg">7.8/10</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {renderDetailsModal()}
      {renderEditModal()}
      {renderConfigModal()}
      {renderCreateEvaluationModal()}
    </div>
  )
}

export default Evaluation
