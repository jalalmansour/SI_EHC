"use client"
import { useSelector } from "react-redux"
import { Card, Typography, Row, Col, Button, Space, Progress } from "antd"
import {
  BookOutlined,
  BarChartOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons"
import { motion } from "framer-motion"

const { Title, Text } = Typography

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const statsData = [
    {
      title: "Formations",
      value: 12,
      icon: <BookOutlined />,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#667eea",
    },
    {
      title: "Certificats",
      value: 8,
      icon: <TrophyOutlined />,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      color: "#f093fb",
    },
    {
      title: "Évaluations",
      value: 15,
      icon: <BarChartOutlined />,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      color: "#4facfe",
    },
    {
      title: "Heures",
      value: 42,
      suffix: "h",
      icon: <ClockCircleOutlined />,
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      color: "#43e97b",
    },
  ]

  return (
    <div className="dashboard-container">
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title level={2} className="dashboard-title">
          Bienvenue {user?.role === "RRH" ? "Admin" : user?.firstName} Système
        </Title>
        <Text className="dashboard-subtitle">
          Tableau de bord {user?.role?.toLowerCase()} - INGÉNIA Experts Human Capital
        </Text>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Row gutter={[24, 24]} className="stats-row">
          {statsData.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <motion.div variants={itemVariants}>
                <Card
                  className="stat-card"
                  style={{
                    background: stat.gradient,
                    border: "none",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                  }}
                  bodyStyle={{ padding: "24px" }}
                >
                  <div className="stat-content">
                    <div className="stat-icon" style={{ color: "white", fontSize: "24px" }}>
                      {stat.icon}
                    </div>
                    <div className="stat-info">
                      <div
                        className="stat-value"
                        style={{ color: "white", fontSize: "32px", fontWeight: "bold", margin: "8px 0" }}
                      >
                        {stat.value}
                        {stat.suffix}
                      </div>
                      <div
                        className="stat-title"
                        style={{ color: "rgba(255,255,255,0.9)", fontSize: "16px", fontWeight: "500" }}
                      >
                        {stat.title}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 24]} className="content-row">
          <Col xs={24} lg={16}>
            <motion.div variants={itemVariants}>
              <Card
                title="Formations récentes"
                className="content-card"
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "none",
                }}
                headStyle={{
                  borderBottom: "1px solid #f0f0f0",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                <div className="training-list">
                  {[
                    { name: "Leadership et Management", progress: 100, status: "completed", date: "15 Nov 2024" },
                    { name: "Communication Efficace", progress: 75, status: "in-progress", date: "En cours" },
                    { name: "Gestion de Projet", progress: 45, status: "in-progress", date: "En cours" },
                  ].map((training, index) => (
                    <motion.div
                      key={index}
                      className="training-item"
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      style={{
                        padding: "20px",
                        marginBottom: "16px",
                        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div className="training-header">
                        <div>
                          <Text strong style={{ fontSize: "16px" }}>
                            {training.name}
                          </Text>
                          <br />
                          <Text className="text-gray-500">{training.date}</Text>
                        </div>
                        <div className="training-actions">
                          {training.status === "completed" ? (
                            <Button type="primary" icon={<CheckCircleOutlined />}>
                              Certificat
                            </Button>
                          ) : (
                            <Button icon={<RiseOutlined />}>Continuer</Button>
                          )}
                        </div>
                      </div>
                      {training.status === "in-progress" && (
                        <div style={{ marginTop: "12px" }}>
                          <Progress
                            percent={training.progress}
                            strokeColor={{
                              "0%": "#667eea",
                              "100%": "#764ba2",
                            }}
                            trailColor="#e2e8f0"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} lg={8}>
            <motion.div variants={itemVariants}>
              <Card
                title="Prochaines sessions"
                className="content-card"
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "none",
                }}
                headStyle={{
                  borderBottom: "1px solid #f0f0f0",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                <Space direction="vertical" className="w-full" size="middle">
                  {[
                    { name: "Gestion de Projet", time: "Demain à 14h00", color: "#667eea" },
                    { name: "Excel Avancé", time: "Vendredi à 10h00", color: "#f093fb" },
                    { name: "Communication", time: "Lundi à 09h00", color: "#43e97b" },
                  ].map((session, index) => (
                    <motion.div
                      key={index}
                      className="session-item"
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      style={{
                        padding: "16px",
                        borderRadius: "12px",
                        background: "white",
                        border: `2px solid ${session.color}20`,
                        borderLeft: `4px solid ${session.color}`,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <Text strong style={{ color: session.color }}>
                        {session.name}
                      </Text>
                      <br />
                      <Text className="text-gray-500">{session.time}</Text>
                    </motion.div>
                  ))}
                </Space>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </div>
  )
}

export default DashboardPage
