"use client"

import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Select,
  DatePicker,
  Space,
  Statistic,
  Progress,
  Tabs,
  List,
  Avatar,
  Divider,
} from "antd"
import {
  BarChartOutlined,
  FileTextOutlined,
  DownloadOutlined,
  PrinterOutlined,
  TeamOutlined,
  BookOutlined,
  DollarOutlined,
  StarOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  CalendarOutlined,
} from "@ant-design/icons"
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2"
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

const Reports = () => {
  const [loading, setLoading] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // Données simulées pour les rapports
  const globalStats = {
    totalTrainings: 156,
    completedTrainings: 124,
    totalParticipants: 850,
    totalBudget: 250000,
    usedBudget: 180000,
    averageSatisfaction: 4.3,
    completionRate: 89.2,
    budgetUtilization: 72,
  }

  const trainingEvolution = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
    datasets: [
      {
        label: "Formations Réalisées",
        data: [15, 28, 35, 42, 38, 45],
        borderColor: "#1890ff",
        backgroundColor: "rgba(24, 144, 255, 0.1)",
        tension: 0.4,
      },
      {
        label: "Participants",
        data: [120, 220, 280, 350, 320, 380],
        borderColor: "#52c41a",
        backgroundColor: "rgba(82, 196, 26, 0.1)",
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  }

  const budgetByDepartment = {
    labels: ["IT", "Commercial", "RH", "Production", "Finance", "Marketing"],
    datasets: [
      {
        label: "Budget Alloué",
        data: [45000, 38000, 25000, 42000, 30000, 20000],
        backgroundColor: "#1890ff",
      },
      {
        label: "Budget Utilisé",
        data: [32000, 35000, 18000, 28000, 22000, 15000],
        backgroundColor: "#52c41a",
      },
    ],
  }

  const satisfactionByCategory = {
    labels: ["Leadership", "IT", "Soft Skills", "Management", "Bureautique"],
    datasets: [
      {
        data: [4.5, 4.8, 4.2, 4.6, 4.0],
        backgroundColor: ["#1890ff", "#52c41a", "#faad14", "#f759ab", "#13c2c2"],
      },
    ],
  }

  const completionRates = {
    labels: ["IT", "Commercial", "RH", "Production", "Finance"],
    datasets: [
      {
        data: [95, 87, 92, 85, 89],
        backgroundColor: ["#52c41a", "#faad14", "#1890ff", "#ff7a00", "#722ed1"],
      },
    ],
  }

  const topTrainings = [
    {
      title: "Cybersécurité Avancée",
      participants: 45,
      satisfaction: 4.8,
      completion: 96,
      budget: 18000,
    },
    {
      title: "Leadership et Management",
      participants: 38,
      satisfaction: 4.5,
      completion: 94,
      budget: 15200,
    },
    {
      title: "Gestion de Projet Agile",
      participants: 32,
      satisfaction: 4.6,
      completion: 91,
      budget: 12800,
    },
    {
      title: "Communication Interpersonnelle",
      participants: 28,
      satisfaction: 4.2,
      completion: 89,
      budget: 8400,
    },
    {
      title: "Excel Avancé",
      participants: 25,
      satisfaction: 4.0,
      completion: 87,
      budget: 6250,
    },
  ]

  const departmentPerformance = [
    {
      department: "IT",
      trainings: 25,
      participants: 180,
      budget: 45000,
      used: 32000,
      satisfaction: 4.6,
      completion: 95,
      trend: "up",
    },
    {
      department: "Commercial",
      trainings: 22,
      participants: 165,
      budget: 38000,
      used: 35000,
      satisfaction: 4.3,
      completion: 87,
      trend: "down",
    },
    {
      department: "RH",
      trainings: 18,
      participants: 120,
      budget: 25000,
      used: 18000,
      satisfaction: 4.4,
      completion: 92,
      trend: "up",
    },
    {
      department: "Production",
      trainings: 20,
      participants: 150,
      budget: 42000,
      used: 28000,
      satisfaction: 4.1,
      completion: 85,
      trend: "stable",
    },
    {
      department: "Finance",
      trainings: 15,
      participants: 95,
      budget: 30000,
      used: 22000,
      satisfaction: 4.5,
      completion: 89,
      trend: "up",
    },
  ]

  const departmentColumns = [
    {
      title: "Département",
      dataIndex: "department",
      key: "department",
      render: (text) => (
        <Space>
          <Avatar style={{ backgroundColor: "#1890ff" }}>{text.charAt(0)}</Avatar>
          <span style={{ fontWeight: "bold" }}>{text}</span>
        </Space>
      ),
    },
    {
      title: "Formations",
      dataIndex: "trainings",
      key: "trainings",
      sorter: (a, b) => a.trainings - b.trainings,
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
      sorter: (a, b) => a.participants - b.participants,
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      render: (budget, record) => (
        <div>
          <div>{budget.toLocaleString()}€</div>
          <Progress
            percent={Math.round((record.used / budget) * 100)}
            size="small"
            status={record.used / budget > 0.9 ? "exception" : "normal"}
          />
        </div>
      ),
      sorter: (a, b) => a.budget - b.budget,
    },
    {
      title: "Satisfaction",
      dataIndex: "satisfaction",
      key: "satisfaction",
      render: (satisfaction) => (
        <Space>
          <StarOutlined style={{ color: "#faad14" }} />
          <span>{satisfaction}/5</span>
        </Space>
      ),
      sorter: (a, b) => a.satisfaction - b.satisfaction,
    },
    {
      title: "Completion",
      dataIndex: "completion",
      key: "completion",
      render: (completion) => (
        <Progress
          percent={completion}
          size="small"
          status={completion > 90 ? "success" : completion > 80 ? "normal" : "exception"}
        />
      ),
      sorter: (a, b) => a.completion - b.completion,
    },
    {
      title: "Tendance",
      dataIndex: "trend",
      key: "trend",
      render: (trend) => {
        const icons = {
          up: <RiseOutlined style={{ color: "#52c41a" }} />,
          down: <FallOutlined style={{ color: "#ff4d4f" }} />,
          stable: <span style={{ color: "#faad14" }}>—</span>,
        }
        return icons[trend]
      },
    },
  ]

  const handleExportReport = (type) => {
    console.log(`Export report: ${type}`)
  }

  const handlePrintReport = () => {
    window.print()
  }

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Rapports et Analytics</h1>
        <p className="text-gray-600">Analyse des performances et suivi des indicateurs de formation</p>
      </div>

      {/* Filtres */}
      <Card className="mb-6">
        <Row gutter={16} align="middle">
          <Col>
            <Space>
              <span>Période:</span>
              <Select value={selectedPeriod} onChange={setSelectedPeriod} style={{ width: 120 }}>
                <Option value="week">Semaine</Option>
                <Option value="month">Mois</Option>
                <Option value="quarter">Trimestre</Option>
                <Option value="year">Année</Option>
              </Select>
            </Space>
          </Col>
          <Col>
            <Space>
              <span>Département:</span>
              <Select value={selectedDepartment} onChange={setSelectedDepartment} style={{ width: 150 }}>
                <Option value="all">Tous</Option>
                <Option value="IT">IT</Option>
                <Option value="Commercial">Commercial</Option>
                <Option value="RH">RH</Option>
                <Option value="Production">Production</Option>
                <Option value="Finance">Finance</Option>
              </Select>
            </Space>
          </Col>
          <Col flex="auto" style={{ textAlign: "right" }}>
            <Space>
              <Button icon={<DownloadOutlined />} onClick={() => handleExportReport("pdf")}>
                Export PDF
              </Button>
              <Button icon={<DownloadOutlined />} onClick={() => handleExportReport("excel")}>
                Export Excel
              </Button>
              <Button icon={<PrinterOutlined />} onClick={handlePrintReport}>
                Imprimer
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* KPIs Principaux */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Formations Réalisées"
              value={globalStats.completedTrainings}
              suffix={`/ ${globalStats.totalTrainings}`}
              prefix={<BookOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
            <Progress
              percent={Math.round((globalStats.completedTrainings / globalStats.totalTrainings) * 100)}
              size="small"
              className="mt-2"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Participants Formés"
              value={globalStats.totalParticipants}
              prefix={<TeamOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
            <div className="text-xs text-gray-500 mt-2">+12% vs mois précédent</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Budget Utilisé"
              value={globalStats.usedBudget}
              suffix={`/ ${globalStats.totalBudget.toLocaleString()}€`}
              prefix={<DollarOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ color: "#faad14" }}
            />
            <Progress percent={globalStats.budgetUtilization} size="small" className="mt-2" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Satisfaction Moyenne"
              value={globalStats.averageSatisfaction}
              suffix="/5"
              prefix={<StarOutlined style={{ color: "#722ed1" }} />}
              valueStyle={{ color: "#722ed1" }}
            />
            <div className="text-xs text-gray-500 mt-2">Excellent niveau</div>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="overview" type="card">
        {/* Onglet Vue d'ensemble */}
        <TabPane
          tab={
            <span>
              <BarChartOutlined />
              Vue d'ensemble
            </span>
          }
          key="overview"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Évolution des Formations">
                <Line
                  data={trainingEvolution}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                    scales: {
                      y: {
                        type: "linear",
                        display: true,
                        position: "left",
                      },
                      y1: {
                        type: "linear",
                        display: true,
                        position: "right",
                        grid: {
                          drawOnChartArea: false,
                        },
                      },
                    },
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Satisfaction par Catégorie">
                <Doughnut
                  data={satisfactionByCategory}
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
            <Col xs={24}>
              <Card title="Budget par Département">
                <Bar
                  data={budgetByDepartment}
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
                      },
                    },
                  }}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Onglet Performance Départements */}
        <TabPane
          tab={
            <span>
              <TeamOutlined />
              Performance Départements
            </span>
          }
          key="departments"
        >
          <Card title="Performance par Département">
            <Table
              columns={departmentColumns}
              dataSource={departmentPerformance}
              rowKey="department"
              pagination={false}
            />
          </Card>

          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col xs={24} lg={12}>
              <Card title="Taux de Completion par Département">
                <Pie
                  data={completionRates}
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
              <Card title="Alertes Départementales">
                <List
                  dataSource={[
                    {
                      department: "Commercial",
                      message: "Taux de completion en baisse (87%)",
                      type: "warning",
                    },
                    {
                      department: "Production",
                      message: "Budget sous-utilisé (67%)",
                      type: "info",
                    },
                    {
                      department: "IT",
                      message: "Excellente performance globale",
                      type: "success",
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{
                              backgroundColor:
                                item.type === "warning" ? "#faad14" : item.type === "success" ? "#52c41a" : "#1890ff",
                            }}
                          >
                            {item.department.charAt(0)}
                          </Avatar>
                        }
                        title={item.department}
                        description={item.message}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Onglet Top Formations */}
        <TabPane
          tab={
            <span>
              <TrophyOutlined />
              Top Formations
            </span>
          }
          key="top-trainings"
        >
          <Card title="Formations les Plus Performantes" extra={<TrophyOutlined style={{ color: "#faad14" }} />}>
            <List
              dataSource={topTrainings}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: index === 0 ? "#faad14" : index === 1 ? "#d9d9d9" : "#f6ffed",
                          color: index < 2 ? "#fff" : "#000",
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    }
                    title={item.title}
                    description={
                      <Row gutter={16}>
                        <Col span={6}>
                          <Statistic
                            title="Participants"
                            value={item.participants}
                            prefix={<TeamOutlined />}
                            valueStyle={{ fontSize: "14px" }}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Satisfaction"
                            value={item.satisfaction}
                            suffix="/5"
                            prefix={<StarOutlined />}
                            valueStyle={{ fontSize: "14px" }}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Completion"
                            value={item.completion}
                            suffix="%"
                            valueStyle={{ fontSize: "14px" }}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Budget"
                            value={item.budget}
                            suffix="€"
                            prefix={<DollarOutlined />}
                            valueStyle={{ fontSize: "14px" }}
                          />
                        </Col>
                      </Row>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>

        {/* Onglet Rapports Détaillés */}
        <TabPane
          tab={
            <span>
              <FileTextOutlined />
              Rapports Détaillés
            </span>
          }
          key="detailed-reports"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Rapports Disponibles">
                <List
                  dataSource={[
                    {
                      title: "Rapport Mensuel de Formation",
                      description: "Synthèse complète des activités de formation du mois",
                      date: "Généré le 15/01/2024",
                      type: "monthly",
                    },
                    {
                      title: "Analyse Budgétaire Trimestrielle",
                      description: "Analyse détaillée de l'utilisation du budget formation",
                      date: "Généré le 10/01/2024",
                      type: "budget",
                    },
                    {
                      title: "Rapport de Satisfaction",
                      description: "Évaluation de la satisfaction des participants",
                      date: "Généré le 08/01/2024",
                      type: "satisfaction",
                    },
                    {
                      title: "Performance par Département",
                      description: "Analyse comparative des performances départementales",
                      date: "Généré le 05/01/2024",
                      type: "department",
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button key="download" type="link" icon={<DownloadOutlined />}>
                          Télécharger
                        </Button>,
                        <Button key="view" type="link">
                          Voir
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar style={{ backgroundColor: "#1890ff" }}>
                            <FileTextOutlined />
                          </Avatar>
                        }
                        title={item.title}
                        description={
                          <div>
                            <div>{item.description}</div>
                            <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{item.date}</div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="Génération de Rapports">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button block icon={<FileTextOutlined />} onClick={() => handleExportReport("monthly")}>
                    Rapport Mensuel
                  </Button>
                  <Button block icon={<DollarOutlined />} onClick={() => handleExportReport("budget")}>
                    Analyse Budgétaire
                  </Button>
                  <Button block icon={<StarOutlined />} onClick={() => handleExportReport("satisfaction")}>
                    Rapport Satisfaction
                  </Button>
                  <Button block icon={<TeamOutlined />} onClick={() => handleExportReport("department")}>
                    Performance Départements
                  </Button>
                  <Divider />
                  <Button block type="primary" icon={<CalendarOutlined />}>
                    Programmer Rapport
                  </Button>
                </Space>
              </Card>

              <Card title="Statistiques Rapides" style={{ marginTop: "16px" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Taux de réussite global</span>
                      <span style={{ fontWeight: "bold" }}>89.2%</span>
                    </div>
                    <Progress percent={89.2} size="small" />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>ROI Formation</span>
                      <span style={{ fontWeight: "bold", color: "#52c41a" }}>+15%</span>
                    </div>
                    <Progress percent={75} size="small" status="success" />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Engagement participants</span>
                      <span style={{ fontWeight: "bold" }}>92%</span>
                    </div>
                    <Progress percent={92} size="small" />
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Reports
