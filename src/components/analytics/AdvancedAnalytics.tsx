"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, Row, Col, Statistic, Select, DatePicker, Table, Progress, Tag, Space, Button } from "antd"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUpOutlined,
  TrendingDownOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  DollarOutlined,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons"
import dayjs from "dayjs"

const { RangePicker } = DatePicker
const { Option } = Select

interface AnalyticsData {
  formations: {
    total: number
    completed: number
    inProgress: number
    planned: number
    trend: number
  }
  participants: {
    total: number
    active: number
    certified: number
    trend: number
  }
  budget: {
    allocated: number
    spent: number
    remaining: number
    trend: number
  }
  satisfaction: {
    average: number
    trend: number
  }
}

interface ChartData {
  month: string
  formations: number
  participants: number
  satisfaction: number
  budget: number
}

interface CompetencyData {
  competency: string
  level: number
  target: number
  participants: number
}

const AdvancedAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs().subtract(6, "month"), dayjs()])
  const [selectedTenant, setSelectedTenant] = useState<string>("all")
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    formations: { total: 0, completed: 0, inProgress: 0, planned: 0, trend: 0 },
    participants: { total: 0, active: 0, certified: 0, trend: 0 },
    budget: { allocated: 0, spent: 0, remaining: 0, trend: 0 },
    satisfaction: { average: 0, trend: 0 },
  })

  // Données de démonstration
  const chartData: ChartData[] = [
    { month: "Jan", formations: 45, participants: 320, satisfaction: 4.2, budget: 85000 },
    { month: "Fév", formations: 52, participants: 380, satisfaction: 4.3, budget: 92000 },
    { month: "Mar", formations: 48, participants: 350, satisfaction: 4.1, budget: 88000 },
    { month: "Avr", formations: 61, participants: 420, satisfaction: 4.4, budget: 105000 },
    { month: "Mai", formations: 58, participants: 390, satisfaction: 4.3, budget: 98000 },
    { month: "Jun", formations: 65, participants: 450, satisfaction: 4.5, budget: 112000 },
  ]

  const competencyData: CompetencyData[] = [
    { competency: "Leadership", level: 75, target: 85, participants: 120 },
    { competency: "Communication", level: 82, target: 90, participants: 150 },
    { competency: "Gestion de projet", level: 68, target: 80, participants: 95 },
    { competency: "Innovation", level: 71, target: 85, participants: 110 },
    { competency: "Digital", level: 89, target: 95, participants: 180 },
  ]

  const pieData = [
    { name: "Terminées", value: 45, color: "#52c41a" },
    { name: "En cours", value: 30, color: "#1890ff" },
    { name: "Planifiées", value: 25, color: "#faad14" },
  ]

  useEffect(() => {
    // Simulation du chargement des données
    const loadAnalytics = async () => {
      setLoading(true)

      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setAnalyticsData({
        formations: {
          total: 156,
          completed: 89,
          inProgress: 42,
          planned: 25,
          trend: 12.5,
        },
        participants: {
          total: 1247,
          active: 892,
          certified: 634,
          trend: 8.3,
        },
        budget: {
          allocated: 580000,
          spent: 425000,
          remaining: 155000,
          trend: -5.2,
        },
        satisfaction: {
          average: 4.3,
          trend: 6.1,
        },
      })

      setLoading(false)
    }

    loadAnalytics()
  }, [dateRange, selectedTenant])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(value)
  }

  const getTrendIcon = (trend: number) => {
    return trend >= 0 ? (
      <TrendingUpOutlined style={{ color: "#52c41a" }} />
    ) : (
      <TrendingDownOutlined style={{ color: "#ff4d4f" }} />
    )
  }

  const exportData = () => {
    // Logique d'export des données
    console.log("Export des données analytics...")
  }

  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* En-tête avec filtres */}
      <Card style={{ marginBottom: "24px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>Analytics Avancés</h1>
            <p style={{ margin: "4px 0 0 0", color: "#666" }}>Tableau de bord complet des performances de formation</p>
          </Col>
          <Col>
            <Space>
              <Select
                value={selectedTenant}
                onChange={setSelectedTenant}
                style={{ width: 200 }}
                placeholder="Sélectionner une organisation"
              >
                <Option value="all">Toutes les organisations</Option>
                <Option value="acme">ACME Corp</Option>
                <Option value="techno">TechnoSoft</Option>
                <Option value="global">Global Industries</Option>
              </Select>

              <RangePicker value={dateRange} onChange={(dates) => dates && setDateRange(dates)} format="DD/MM/YYYY" />

              <Button icon={<FilterOutlined />}>Filtres avancés</Button>

              <Button type="primary" icon={<DownloadOutlined />} onClick={exportData}>
                Exporter
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* KPIs principaux */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Formations totales"
              value={analyticsData.formations.total}
              prefix={<BookOutlined />}
              suffix={
                <Space>
                  {getTrendIcon(analyticsData.formations.trend)}
                  <span
                    style={{ fontSize: "14px", color: analyticsData.formations.trend >= 0 ? "#52c41a" : "#ff4d4f" }}
                  >
                    {Math.abs(analyticsData.formations.trend)}%
                  </span>
                </Space>
              }
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Participants actifs"
              value={analyticsData.participants.total}
              prefix={<UserOutlined />}
              suffix={
                <Space>
                  {getTrendIcon(analyticsData.participants.trend)}
                  <span
                    style={{ fontSize: "14px", color: analyticsData.participants.trend >= 0 ? "#52c41a" : "#ff4d4f" }}
                  >
                    {Math.abs(analyticsData.participants.trend)}%
                  </span>
                </Space>
              }
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Budget utilisé"
              value={analyticsData.budget.spent}
              formatter={(value) => formatCurrency(Number(value))}
              prefix={<DollarOutlined />}
              suffix={
                <Space>
                  {getTrendIcon(analyticsData.budget.trend)}
                  <span style={{ fontSize: "14px", color: analyticsData.budget.trend >= 0 ? "#52c41a" : "#ff4d4f" }}>
                    {Math.abs(analyticsData.budget.trend)}%
                  </span>
                </Space>
              }
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Satisfaction moyenne"
              value={analyticsData.satisfaction.average}
              precision={1}
              suffix="/ 5"
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Graphiques principaux */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} lg={16}>
          <Card title="Évolution des formations" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="formations" stroke="#1890ff" strokeWidth={2} name="Formations" />
                <Line type="monotone" dataKey="participants" stroke="#52c41a" strokeWidth={2} name="Participants" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Répartition des formations" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Analyse des compétences */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} lg={12}>
          <Card title="Progression des compétences" loading={loading}>
            <Space direction="vertical" style={{ width: "100%" }}>
              {competencyData.map((item, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <Row justify="space-between" align="middle" style={{ marginBottom: "8px" }}>
                    <Col>
                      <strong>{item.competency}</strong>
                    </Col>
                    <Col>
                      <Tag color={item.level >= item.target ? "success" : "warning"}>
                        {item.level}% / {item.target}%
                      </Tag>
                    </Col>
                  </Row>
                  <Progress
                    percent={item.level}
                    strokeColor={item.level >= item.target ? "#52c41a" : "#faad14"}
                    trailColor="#f0f0f0"
                  />
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                    {item.participants} participants
                  </div>
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Évolution du budget" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area type="monotone" dataKey="budget" stroke="#722ed1" fill="#722ed1" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Tableau détaillé */}
      <Card title="Détail des performances par département" loading={loading}>
        <Table
          dataSource={[
            {
              key: "1",
              department: "IT",
              formations: 45,
              participants: 120,
              completion: 89,
              satisfaction: 4.5,
              budget: 85000,
            },
            {
              key: "2",
              department: "RH",
              formations: 32,
              participants: 95,
              completion: 92,
              satisfaction: 4.3,
              budget: 65000,
            },
            {
              key: "3",
              department: "Commercial",
              formations: 28,
              participants: 85,
              completion: 87,
              satisfaction: 4.2,
              budget: 55000,
            },
            {
              key: "4",
              department: "Finance",
              formations: 22,
              participants: 65,
              completion: 94,
              satisfaction: 4.4,
              budget: 45000,
            },
          ]}
          columns={[
            {
              title: "Département",
              dataIndex: "department",
              key: "department",
              sorter: (a, b) => a.department.localeCompare(b.department),
            },
            {
              title: "Formations",
              dataIndex: "formations",
              key: "formations",
              sorter: (a, b) => a.formations - b.formations,
            },
            {
              title: "Participants",
              dataIndex: "participants",
              key: "participants",
              sorter: (a, b) => a.participants - b.participants,
            },
            {
              title: "Taux de completion",
              dataIndex: "completion",
              key: "completion",
              render: (value) => (
                <Progress
                  percent={value}
                  size="small"
                  strokeColor={value >= 90 ? "#52c41a" : value >= 80 ? "#faad14" : "#ff4d4f"}
                />
              ),
              sorter: (a, b) => a.completion - b.completion,
            },
            {
              title: "Satisfaction",
              dataIndex: "satisfaction",
              key: "satisfaction",
              render: (value) => (
                <Tag color={value >= 4.0 ? "success" : value >= 3.5 ? "warning" : "error"}>{value}/5</Tag>
              ),
              sorter: (a, b) => a.satisfaction - b.satisfaction,
            },
            {
              title: "Budget",
              dataIndex: "budget",
              key: "budget",
              render: (value) => formatCurrency(value),
              sorter: (a, b) => a.budget - b.budget,
            },
          ]}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  )
}

export default AdvancedAnalytics
