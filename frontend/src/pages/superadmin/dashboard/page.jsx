"use client"
import { Card, Row, Col, Statistic, Table, Progress, Tag, Spin } from "antd"
import {
  UserOutlined,
  BookOutlined,
  TrophyOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { useSuperAdminDashboardData } from "@/lib/hooks/use-dashboard-data"

export default function DashboardSuperAdminPage() {
  const { stats, employees, departmentProgress, loading } = useSuperAdminDashboardData()

  const employeesColumns = [
    {
      title: "Employé",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Département",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Formations",
      dataIndex: "formations",
      key: "formations",
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Actif" ? "green" : status === "En formation" ? "processing" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Dernière Activité",
      dataIndex: "lastActivity",
      key: "lastActivity",
    },
  ]

  if (loading) {
    return (
      <DashboardLayout userRole="superadmin" userName="Super Admin EHC">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
          <Spin size="large" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="superadmin" userName="Super Admin EHC">
      <div style={{ padding: 0 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Tableau de Bord Super Administrateur</h1>
          <p style={{ margin: "8px 0 0 0", color: "#666" }}>Gestion des employés et formations de votre organisation</p>
          <p style={{ margin: "4px 0 0 0", color: "#999", fontSize: 12 }}>
            Mise à jour automatique: {new Date().toLocaleTimeString()}
          </p>
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={
                    index === 0 ? (
                      <UserOutlined style={{ color: "#52c41a" }} />
                    ) : index === 1 ? (
                      <BookOutlined style={{ color: "#1890ff" }} />
                    ) : index === 2 ? (
                      <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    ) : (
                      <TrophyOutlined style={{ color: "#faad14" }} />
                    )
                  }
                  valueStyle={{ fontSize: 24 }}
                />
                {stat.change && (
                  <div style={{ marginTop: 8, fontSize: 12 }}>
                    {stat.trend === "up" ? (
                      <span style={{ color: "#52c41a" }}>
                        <ArrowUpOutlined /> +{stat.change}
                      </span>
                    ) : (
                      <span style={{ color: "#f5222d" }}>
                        <ArrowDownOutlined /> {stat.change}
                      </span>
                    )}
                    <span style={{ color: "#666", marginLeft: 4 }}>vs période précédente</span>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="Employés Récents" extra={<a href="#">Voir tout</a>}>
              <Table dataSource={employees} columns={employeesColumns} pagination={false} size="small" />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Progression par Département">
              {Object.entries(departmentProgress).map(([dept, progress]) => (
                <div key={dept} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span>{dept}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress percent={progress} status={progress > 80 ? "active" : undefined} />
                </div>
              ))}
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card title="Actions Rapides">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Card hoverable style={{ textAlign: "center", cursor: "pointer" }} bodyStyle={{ padding: 16 }}>
                    <UserOutlined style={{ fontSize: 32, color: "#52c41a", marginBottom: 8 }} />
                    <div>Ajouter Employé</div>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card hoverable style={{ textAlign: "center", cursor: "pointer" }} bodyStyle={{ padding: 16 }}>
                    <BookOutlined style={{ fontSize: 32, color: "#1890ff", marginBottom: 8 }} />
                    <div>Créer Formation</div>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card hoverable style={{ textAlign: "center", cursor: "pointer" }} bodyStyle={{ padding: 16 }}>
                    <CalendarOutlined style={{ fontSize: 32, color: "#faad14", marginBottom: 8 }} />
                    <div>Planifier Session</div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  )
}
