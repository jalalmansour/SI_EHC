"use client"

import { useState, useEffect } from "react"
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Alert,
  Button,
  Space,
  Typography,
  Progress,
  Timeline,
  Descriptions,
  Modal,
  Form,
  Select,
  DatePicker,
} from "antd"
import {
  ShieldCheckOutlined,
  WarningOutlined,
  LockOutlined,
  EyeOutlined,
  DownloadOutlined,
  ReloadOutlined,
  SafetyOutlined,
  MobileOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { getSecurityDashboardThunk, getComplianceReportThunk } from "../store/slices/authSlice"
import moment from "moment"

const { Title, Text } = Typography
const { RangePicker } = DatePicker

const SecurityDashboard = () => {
  const dispatch = useDispatch()
  const { securityDashboard, complianceReports, isLoading } = useSelector((state) => state.auth)
  const [reportModalVisible, setReportModalVisible] = useState(false)
  const [reportForm] = Form.useForm()

  useEffect(() => {
    dispatch(getSecurityDashboardThunk())
  }, [dispatch])

  const handleGenerateReport = async (values) => {
    try {
      await dispatch(
        getComplianceReportThunk({
          startDate: values.dateRange[0].format("YYYY-MM-DD"),
          endDate: values.dateRange[1].format("YYYY-MM-DD"),
          type: values.reportType,
        }),
      )
      setReportModalVisible(false)
      reportForm.resetFields()
    } catch (error) {
      console.error("Error generating report:", error)
    }
  }

  const loginHistoryColumns = [
    {
      title: "Date/Heure",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => moment(timestamp).format("DD/MM/YYYY HH:mm"),
      sorter: (a, b) => moment(a.timestamp).unix() - moment(b.timestamp).unix(),
    },
    {
      title: "Adresse IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "Localisation",
      dataIndex: "location",
      key: "location",
      render: (location) => (
        <Space>
          <GlobalOutlined />
          {location}
        </Space>
      ),
    },
    {
      title: "Navigateur",
      dataIndex: "userAgent",
      key: "userAgent",
      render: (userAgent) => {
        const browser = userAgent.split(" ")[0]
        return <Tag color="blue">{browser}</Tag>
      },
    },
    {
      title: "Méthode",
      dataIndex: "method",
      key: "method",
      render: (method) => {
        const colors = {
          password: "green",
          biometric: "purple",
          "2fa": "orange",
        }
        return <Tag color={colors[method]}>{method.toUpperCase()}</Tag>
      },
    },
    {
      title: "Statut",
      dataIndex: "success",
      key: "success",
      render: (success) => <Tag color={success ? "success" : "error"}>{success ? "Succès" : "Échec"}</Tag>,
    },
  ]

  const deviceColumns = [
    {
      title: "Appareil",
      dataIndex: "deviceName",
      key: "deviceName",
      render: (deviceName, record) => (
        <Space>
          <MobileOutlined />
          {deviceName}
          {record.isCurrent && <Tag color="green">Actuel</Tag>}
        </Space>
      ),
    },
    {
      title: "Dernière activité",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (lastActive) => moment(lastActive).fromNow(),
    },
    {
      title: "Adresse IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "Localisation",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {!record.isCurrent && (
            <Button type="link" danger size="small">
              Déconnecter
            </Button>
          )}
        </Space>
      ),
    },
  ]

  const getRiskColor = (score) => {
    if (score < 30) return "#52c41a"
    if (score < 60) return "#faad14"
    return "#ff4d4f"
  }

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <ShieldCheckOutlined style={{ marginRight: 8, color: "#238D94" }} />
          Tableau de Bord Sécurité
        </Title>
        <Text type="secondary">Surveillance et analyse de la sécurité de votre compte</Text>
      </div>

      {/* Statistiques principales */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Score de Risque"
              value={securityDashboard.riskScore}
              suffix="/100"
              valueStyle={{ color: getRiskColor(securityDashboard.riskScore) }}
              prefix={<SafetyOutlined />}
            />
            <Progress
              percent={securityDashboard.riskScore}
              strokeColor={getRiskColor(securityDashboard.riskScore)}
              showInfo={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Connexions Réussies"
              value={securityDashboard.loginHistory?.filter((h) => h.success).length || 0}
              prefix={<LockOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Appareils Actifs"
              value={securityDashboard.activeDevices?.length || 0}
              prefix={<MobileOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Alertes Sécurité"
              value={securityDashboard.securityAlerts?.length || 0}
              prefix={<WarningOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Alertes de sécurité */}
      {securityDashboard.securityAlerts?.length > 0 && (
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Card title="Alertes de Sécurité" extra={<Button icon={<EyeOutlined />}>Voir tout</Button>}>
              <Space direction="vertical" style={{ width: "100%" }}>
                {securityDashboard.securityAlerts.map((alert) => (
                  <Alert
                    key={alert.id}
                    message={alert.message}
                    type={alert.severity}
                    showIcon
                    closable
                    description={`${moment(alert.timestamp).fromNow()}`}
                  />
                ))}
              </Space>
            </Card>
          </Col>
        </Row>
      )}

      <Row gutter={[16, 16]}>
        {/* Historique des connexions */}
        <Col xs={24} lg={14}>
          <Card
            title="Historique des Connexions"
            extra={
              <Space>
                <Button icon={<ReloadOutlined />} onClick={() => dispatch(getSecurityDashboardThunk())}>
                  Actualiser
                </Button>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => setReportModalVisible(true)}
                  style={{ backgroundColor: "#238D94", borderColor: "#238D94" }}
                >
                  Rapport
                </Button>
              </Space>
            }
          >
            <Table
              columns={loginHistoryColumns}
              dataSource={securityDashboard.loginHistory}
              rowKey="id"
              size="small"
              pagination={{ pageSize: 5 }}
              loading={isLoading}
            />
          </Card>
        </Col>

        {/* Appareils connectés */}
        <Col xs={24} lg={10}>
          <Card title="Appareils Connectés">
            <Table
              columns={deviceColumns}
              dataSource={securityDashboard.activeDevices}
              rowKey="id"
              size="small"
              pagination={false}
              loading={isLoading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* Statut de conformité */}
        <Col xs={24} lg={12}>
          <Card title="Statut de Conformité">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Politique de mot de passe" span={1}>
                <Tag color={securityDashboard.complianceStatus?.passwordPolicy ? "success" : "error"}>
                  {securityDashboard.complianceStatus?.passwordPolicy ? "Conforme" : "Non conforme"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Authentification 2FA" span={1}>
                <Tag color={securityDashboard.complianceStatus?.twoFactorAuth ? "success" : "warning"}>
                  {securityDashboard.complianceStatus?.twoFactorAuth ? "Activée" : "Désactivée"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Enregistrement d'appareil" span={1}>
                <Tag color={securityDashboard.complianceStatus?.deviceRegistration ? "success" : "error"}>
                  {securityDashboard.complianceStatus?.deviceRegistration ? "Conforme" : "Non conforme"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Dernier audit" span={1}>
                <Space>
                  <ClockCircleOutlined />
                  {moment(securityDashboard.complianceStatus?.lastAudit).fromNow()}
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Timeline des événements récents */}
        <Col xs={24} lg={12}>
          <Card title="Événements Récents">
            <Timeline size="small">
              {securityDashboard.loginHistory?.slice(0, 5).map((event) => (
                <Timeline.Item
                  key={event.id}
                  color={event.success ? "green" : "red"}
                  dot={event.success ? <LockOutlined /> : <WarningOutlined />}
                >
                  <div>
                    <Text strong>{event.success ? "Connexion réussie" : "Tentative de connexion échouée"}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {moment(event.timestamp).format("DD/MM/YYYY HH:mm")} - {event.location}
                    </Text>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* Modal de génération de rapport */}
      <Modal
        title="Générer un Rapport de Conformité"
        open={reportModalVisible}
        onCancel={() => setReportModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form form={reportForm} layout="vertical" onFinish={handleGenerateReport}>
          <Form.Item
            name="reportType"
            label="Type de rapport"
            rules={[{ required: true, message: "Sélectionnez un type de rapport" }]}
          >
            <Select placeholder="Choisir le type de rapport">
              <Select.Option value="security">Rapport de Sécurité</Select.Option>
              <Select.Option value="compliance">Rapport de Conformité</Select.Option>
              <Select.Option value="activity">Rapport d'Activité</Select.Option>
              <Select.Option value="audit">Rapport d'Audit</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="dateRange" label="Période" rules={[{ required: true, message: "Sélectionnez une période" }]}>
            <RangePicker style={{ width: "100%" }} format="DD/MM/YYYY" placeholder={["Date de début", "Date de fin"]} />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setReportModalVisible(false)}>Annuler</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{ backgroundColor: "#238D94", borderColor: "#238D94" }}
              >
                Générer le Rapport
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default SecurityDashboard
