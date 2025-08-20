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
  Rate,
  Progress,
  Statistic,
  Tabs,
  List,
  Avatar,
  Alert,
} from "antd"
import {
  StarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
  TrophyOutlined,
} from "@ant-design/icons"
import { Line, Pie, Bar } from "react-chartjs-2"
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
  BarElement,
} from "chart.js"
import moment from "moment"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  BarElement,
)

const { Option } = Select
const { RangePicker } = DatePicker
const { TabPane } = Tabs
const { TextArea } = Input

const Evaluation = () => {
  const [loading, setLoading] = useState(false)
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false)
  const [selectedEvaluation, setSelectedEvaluation] = useState(null)
  const [form] = Form.useForm()

  // Données simulées pour les évaluations
  const evaluationStats = {
    totalEvaluations: 45,
    completedEvaluations: 38,
    pendingEvaluations: 7,
    averageRating: 4.3,
  }

  const evaluations = [
    {
      id: 1,
      trainingTitle: "Leadership et Management",
      participant: "Marie Dubois",
      department: "RH",
      date: "2024-01-15",
      type: "À chaud",
      rating: 4.5,
      status: "completed",
      feedback: "Formation très enrichissante, formateur excellent",
      trainer: "Pierre Martin",
    },
    {
      id: 2,
      trainingTitle: "Cybersécurité Avancée",
      participant: "Sophie Laurent",
      department: "IT",
      date: "2024-01-14",
      type: "À froid",
      rating: 4.8,
      status: "completed",
      feedback: "Contenu très pertinent, applicable immédiatement",
      trainer: "Jean Dupont",
    },
    {
      id: 3,
      trainingTitle: "Communication Interpersonnelle",
      participant: "Claire Bernard",
      department: "Commercial",
      date: "2024-01-13",
      type: "À chaud",
      rating: 4.2,
      status: "completed",
      feedback: "Bonne formation, quelques points à améliorer",
      trainer: "Marie Dubois",
    },
    {
      id: 4,
      trainingTitle: "Gestion de Projet Agile",
      participant: "Thomas Moreau",
      department: "IT",
      date: "2024-01-12",
      type: "Positionnement",
      rating: null,
      status: "pending",
      feedback: null,
      trainer: "Sophie Laurent",
    },
    {
      id: 5,
      trainingTitle: "Excel Avancé",
      participant: "Alice Martin",
      department: "Finance",
      date: "2024-01-10",
      type: "À chaud",
      rating: 4.0,
      status: "completed",
      feedback: "Formation utile mais rythme un peu rapide",
      trainer: "Claire Bernard",
    },
  ]

  const satisfactionEvolution = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
    datasets: [
      {
        label: "Satisfaction Moyenne",
        data: [4.1, 4.2, 4.3, 4.4, 4.3, 4.5],
        borderColor: "#52c41a",
        backgroundColor: "rgba(82, 196, 26, 0.1)",
        tension: 0.4,
      },
    ],
  }

  const evaluationTypes = {
    labels: ["À chaud", "À froid", "Positionnement", "Satisfaction"],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: ["#1890ff", "#52c41a", "#faad14", "#f759ab"],
      },
    ],
  }

  const departmentSatisfaction = {
    labels: ["IT", "RH", "Commercial", "Finance", "Production"],
    datasets: [
      {
        label: "Satisfaction Moyenne",
        data: [4.6, 4.3, 4.1, 4.4, 4.2],
        backgroundColor: "#1890ff",
      },
    ],
  }

  const columns = [
    {
      title: "Formation",
      dataIndex: "trainingTitle",
      key: "trainingTitle",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{text}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>Formateur: {record.trainer}</div>
        </div>
      ),
    },
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        const colors = {
          "À chaud": "orange",
          "À froid": "blue",
          Positionnement: "green",
          Satisfaction: "purple",
        }
        return <Tag color={colors[type]}>{type}</Tag>
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
      sorter: (a, b) => moment(a.date).diff(moment(b.date)),
    },
    {
      title: "Note",
      dataIndex: "rating",
      key: "rating",
      render: (rating) =>
        rating ? (
          <Space>
            <Rate disabled defaultValue={rating} style={{ fontSize: "14px" }} />
            <span>{rating}</span>
          </Space>
        ) : (
          <Tag color="default">En attente</Tag>
        ),
      sorter: (a, b) => (a.rating || 0) - (b.rating || 0),
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          completed: "green",
          pending: "orange",
          overdue: "red",
        }
        const labels = {
          completed: "Terminé",
          pending: "En attente",
          overdue: "En retard",
        }
        return <Tag color={colors[status]}>{labels[status]}</Tag>
      },
      filters: [
        { text: "Terminé", value: "completed" },
        { text: "En attente", value: "pending" },
        { text: "En retard", value: "overdue" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir détails">
            <Button type="text" icon={<EyeOutlined />} onClick={() => handleViewEvaluation(record)} />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEditEvaluation(record)} />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteEvaluation(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const handleViewEvaluation = (evaluation) => {
    Modal.info({
      title: `Évaluation - ${evaluation.trainingTitle}`,
      width: 600,
      content: (
        <div>
          <p>
            <strong>Participant:</strong> {evaluation.participant} ({evaluation.department})
          </p>
          <p>
            <strong>Type d'évaluation:</strong> {evaluation.type}
          </p>
          <p>
            <strong>Date:</strong> {moment(evaluation.date).format("DD/MM/YYYY")}
          </p>
          <p>
            <strong>Formateur:</strong> {evaluation.trainer}
          </p>
          {evaluation.rating && (
            <p>
              <strong>Note:</strong> <Rate disabled defaultValue={evaluation.rating} /> ({evaluation.rating}/5)
            </p>
          )}
          {evaluation.feedback && (
            <div>
              <strong>Commentaires:</strong>
              <p style={{ marginTop: "8px", padding: "8px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                {evaluation.feedback}
              </p>
            </div>
          )}
        </div>
      ),
    })
  }

  const handleEditEvaluation = (evaluation) => {
    setSelectedEvaluation(evaluation)
    form.setFieldsValue({
      trainingTitle: evaluation.trainingTitle,
      participant: evaluation.participant,
      type: evaluation.type,
      date: moment(evaluation.date),
      rating: evaluation.rating,
      feedback: evaluation.feedback,
    })
    setEvaluationModalVisible(true)
  }

  const handleDeleteEvaluation = (evaluation) => {
    Modal.confirm({
      title: "Supprimer l'évaluation",
      content: `Êtes-vous sûr de vouloir supprimer l'évaluation de ${evaluation.participant} pour "${evaluation.trainingTitle}" ?`,
      onOk: () => {
        console.log("Delete evaluation:", evaluation.id)
      },
    })
  }

  const handleSaveEvaluation = (values) => {
    const evaluationData = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    }
    console.log("Save evaluation:", evaluationData)
    setEvaluationModalVisible(false)
    form.resetFields()
    setSelectedEvaluation(null)
  }

  const getTopRatedTrainings = () => {
    const trainingRatings = {}
    evaluations.forEach((evaluation) => {
      if (evaluation.rating) {
        if (!trainingRatings[evaluation.trainingTitle]) {
          trainingRatings[evaluation.trainingTitle] = { total: 0, count: 0 }
        }
        trainingRatings[evaluation.trainingTitle].total += evaluation.rating
        trainingRatings[evaluation.trainingTitle].count += 1
      }
    })

    return Object.entries(trainingRatings)
      .map(([title, data]) => ({
        title,
        average: (data.total / data.count).toFixed(1),
        count: data.count,
      }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 5)
  }

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Évaluation des Formations</h1>
        <p className="text-gray-600">Suivi et analyse des évaluations de formation</p>
      </div>

      {/* Alertes */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={24}>
          <Alert
            message="Évaluations en attente"
            description="7 évaluations sont en attente de completion. Pensez à relancer les participants concernés."
            type="info"
            showIcon
            closable
          />
        </Col>
      </Row>

      {/* Statistiques */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Évaluations"
              value={evaluationStats.totalEvaluations}
              prefix={<FileTextOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Terminées"
              value={evaluationStats.completedEvaluations}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
            <Progress
              percent={Math.round((evaluationStats.completedEvaluations / evaluationStats.totalEvaluations) * 100)}
              size="small"
              className="mt-2"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="En Attente"
              value={evaluationStats.pendingEvaluations}
              prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Satisfaction Moyenne"
              value={evaluationStats.averageRating}
              prefix={<StarOutlined style={{ color: "#722ed1" }} />}
              suffix="/5"
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="evaluations" type="card">
        {/* Onglet Évaluations */}
        <TabPane
          tab={
            <span>
              <FileTextOutlined />
              Évaluations
            </span>
          }
          key="evaluations"
        >
          <Card
            title="Liste des Évaluations"
            extra={
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setEvaluationModalVisible(true)}>
                  Nouvelle Évaluation
                </Button>
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={evaluations}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} évaluations`,
              }}
            />
          </Card>
        </TabPane>

        {/* Onglet Analytics */}
        <TabPane
          tab={
            <span>
              <BarChartOutlined />
              Analytics
            </span>
          }
          key="analytics"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Évolution de la Satisfaction">
                <Line
                  data={satisfactionEvolution}
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
              <Card title="Types d'Évaluations">
                <Pie
                  data={evaluationTypes}
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

          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col xs={24} lg={12}>
              <Card title="Satisfaction par Département">
                <Bar
                  data={departmentSatisfaction}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
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
              <Card title="Top Formations" extra={<TrophyOutlined style={{ color: "#faad14" }} />}>
                <List
                  dataSource={getTopRatedTrainings()}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{
                              backgroundColor: index === 0 ? "#faad14" : index === 1 ? "#d9d9d9" : "#f6ffed",
                              color: index === 0 ? "#fff" : "#000",
                            }}
                          >
                            {index + 1}
                          </Avatar>
                        }
                        title={item.title}
                        description={
                          <div>
                            <Rate
                              disabled
                              defaultValue={Number.parseFloat(item.average)}
                              style={{ fontSize: "12px" }}
                            />
                            <span style={{ marginLeft: "8px" }}>
                              {item.average}/5 ({item.count} évaluations)
                            </span>
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

        {/* Onglet Rapports */}
        <TabPane
          tab={
            <span>
              <FileTextOutlined />
              Rapports
            </span>
          }
          key="reports"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Commentaires Récents">
                <List
                  dataSource={evaluations.filter((e) => e.feedback).slice(0, 5)}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: "#1890ff" }}>{item.participant.charAt(0)}</Avatar>}
                        title={
                          <div>
                            <span style={{ fontWeight: "bold" }}>{item.trainingTitle}</span>
                            <Rate disabled defaultValue={item.rating} style={{ marginLeft: "8px", fontSize: "14px" }} />
                          </div>
                        }
                        description={
                          <div>
                            <div style={{ marginBottom: "4px" }}>
                              <strong>{item.participant}</strong> - {moment(item.date).format("DD/MM/YYYY")}
                            </div>
                            <div style={{ fontStyle: "italic" }}>"{item.feedback}"</div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="Actions Rapides">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button block icon={<FileTextOutlined />}>
                    Rapport Mensuel
                  </Button>
                  <Button block icon={<BarChartOutlined />}>
                    Analyse Satisfaction
                  </Button>
                  <Button block icon={<TeamOutlined />}>
                    Rapport par Département
                  </Button>
                  <Button block icon={<StarOutlined />}>
                    Top Formations
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* Modal d'évaluation */}
      <Modal
        title={selectedEvaluation ? "Modifier Évaluation" : "Nouvelle Évaluation"}
        open={evaluationModalVisible}
        onCancel={() => {
          setEvaluationModalVisible(false)
          setSelectedEvaluation(null)
          form.resetFields()
        }}
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveEvaluation}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Formation"
                name="trainingTitle"
                rules={[{ required: true, message: "Sélectionnez une formation" }]}
              >
                <Select placeholder="Sélectionnez une formation">
                  <Option value="Leadership et Management">Leadership et Management</Option>
                  <Option value="Cybersécurité Avancée">Cybersécurité Avancée</Option>
                  <Option value="Communication Interpersonnelle">Communication Interpersonnelle</Option>
                  <Option value="Gestion de Projet Agile">Gestion de Projet Agile</Option>
                  <Option value="Excel Avancé">Excel Avancé</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Participant"
                name="participant"
                rules={[{ required: true, message: "Saisissez le nom du participant" }]}
              >
                <Input placeholder="Nom du participant" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Type d'évaluation"
                name="type"
                rules={[{ required: true, message: "Sélectionnez le type" }]}
              >
                <Select placeholder="Type d'évaluation">
                  <Option value="À chaud">À chaud</Option>
                  <Option value="À froid">À froid</Option>
                  <Option value="Positionnement">Positionnement</Option>
                  <Option value="Satisfaction">Satisfaction</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date" name="date" rules={[{ required: true, message: "Sélectionnez une date" }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Note" name="rating">
                <Rate />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Commentaires" name="feedback">
            <TextArea rows={4} placeholder="Commentaires et feedback..." />
          </Form.Item>
          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setEvaluationModalVisible(false)
                  setSelectedEvaluation(null)
                  form.resetFields()
                }}
              >
                Annuler
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {selectedEvaluation ? "Modifier" : "Créer"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Evaluation
