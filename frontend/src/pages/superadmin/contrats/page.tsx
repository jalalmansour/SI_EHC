"use client"

import { useState } from "react"
import { Card, Row, Col, Table, Tag, Button, Space, Select, Input, DatePicker } from "antd"
import {
  EyeOutlined,
  EditOutlined,
  FileTextOutlined,
  PlusOutlined,
  DownloadOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import PageHeader from "@/components/common/page-header"

const { Search } = Input
const { Option } = Select
const { RangePicker } = DatePicker

export default function ContratsPage() {
  const [selectedContract, setSelectedContract] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  console.log("[v0] Contracts page is rendering")

  // Données des contrats
  const contratsData = [
    {
      key: "1",
      numero: "CONT-2024-001",
      client: "TechCorp Solutions",
      contact: "Marie Dubois",
      dateDebut: "2024-01-01",
      dateFin: "2024-12-31",
      montantAnnuel: "120000",
      statut: "Actif",
      typeContrat: "Formation Continue",
      nombreUtilisateurs: 50,
      servicesInclus: ["Formations", "Support", "Reporting"],
      dateSignature: "2023-12-15",
      prochainRenouvellement: "2024-11-01",
    },
    {
      key: "2",
      numero: "CONT-2024-002",
      client: "Industrie Plus",
      contact: "Jean Martin",
      dateDebut: "2024-02-01",
      dateFin: "2025-01-31",
      montantAnnuel: "85000",
      statut: "En attente signature",
      typeContrat: "Formation Ponctuelle",
      nombreUtilisateurs: 100,
      servicesInclus: ["Formations", "Support"],
      dateSignature: null,
      prochainRenouvellement: "2025-01-01",
    },
    {
      key: "3",
      numero: "CONT-2023-045",
      client: "Services Avenir",
      contact: "Sophie Laurent",
      dateDebut: "2023-06-01",
      dateFin: "2024-05-31",
      montantAnnuel: "45000",
      statut: "Expiré",
      typeContrat: "Formation Continue",
      nombreUtilisateurs: 25,
      servicesInclus: ["Formations", "Reporting"],
      dateSignature: "2023-05-20",
      prochainRenouvellement: "2024-04-01",
    },
    {
      key: "4",
      numero: "CONT-2024-003",
      client: "Groupe Gamma",
      contact: "Pierre Moreau",
      dateDebut: "2024-03-01",
      dateFin: "2025-02-28",
      montantAnnuel: "200000",
      statut: "Actif",
      typeContrat: "Formation Premium",
      nombreUtilisateurs: 200,
      servicesInclus: ["Formations", "Support", "Reporting", "Consulting"],
      dateSignature: "2024-02-15",
      prochainRenouvellement: "2025-01-15",
    },
  ]

  const contratsColumns = [
    {
      title: "N° Contrat",
      dataIndex: "numero",
      key: "numero",
      render: (numero) => <span style={{ fontWeight: "bold", color: "#1890ff" }}>{numero}</span>,
    },
    {
      title: "Client",
      key: "client",
      render: (record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{record.client}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{record.contact}</div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "typeContrat",
      key: "typeContrat",
      render: (type) => {
        const colors = {
          "Formation Continue": "#52c41a",
          "Formation Ponctuelle": "#1890ff",
          "Formation Premium": "#faad14",
        }
        return <Tag color={colors[type]}>{type}</Tag>
      },
    },
    {
      title: "Période",
      key: "periode",
      render: (record) => (
        <div>
          <div>{record.dateDebut}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>au {record.dateFin}</div>
        </div>
      ),
    },
    {
      title: "Utilisateurs",
      dataIndex: "nombreUtilisateurs",
      key: "nombreUtilisateurs",
      render: (nombre) => <span style={{ fontWeight: "bold" }}>{nombre}</span>,
    },
    {
      title: "Montant Annuel",
      dataIndex: "montantAnnuel",
      key: "montantAnnuel",
      render: (montant) => (
        <span style={{ fontWeight: "bold", color: "#52c41a" }}>{Number.parseInt(montant).toLocaleString()} €</span>
      ),
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (statut) => {
        const colors = {
          Actif: "#52c41a",
          "En attente signature": "#faad14",
          Expiré: "#f5222d",
          Suspendu: "#d9d9d9",
          "En renouvellement": "#1890ff",
        }
        return <Tag color={colors[statut]}>{statut}</Tag>
      },
    },
    {
      title: "Renouvellement",
      dataIndex: "prochainRenouvellement",
      key: "prochainRenouvellement",
      render: (date) => (
        <div style={{ fontSize: "12px" }}>
          <CalendarOutlined style={{ marginRight: 4 }} />
          {date}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" title="Voir détails" />
          <Button icon={<EditOutlined />} size="small" title="Modifier" />
          <Button icon={<FileTextOutlined />} size="small" type="primary" title="Générer PDF" />
          <Button icon={<DownloadOutlined />} size="small" title="Télécharger" />
        </Space>
      ),
    },
  ]

  // Statistiques des contrats
  const statsData = [
    {
      title: "Contrats Actifs",
      value: contratsData.filter((c) => c.statut === "Actif").length,
      color: "#52c41a",
      icon: <FileTextOutlined />,
    },
    {
      title: "CA Annuel Total",
      value: `${contratsData
        .filter((c) => c.statut === "Actif")
        .reduce((sum, c) => sum + Number.parseInt(c.montantAnnuel), 0)
        .toLocaleString()} €`,
      color: "#1890ff",
      icon: <DollarOutlined />,
    },
    {
      title: "Utilisateurs Total",
      value: contratsData.filter((c) => c.statut === "Actif").reduce((sum, c) => sum + c.nombreUtilisateurs, 0),
      color: "#faad14",
      icon: <CalendarOutlined />,
    },
    {
      title: "Renouvellements à venir",
      value: contratsData.filter((c) => {
        const renewalDate = new Date(c.prochainRenouvellement)
        const now = new Date()
        const threeMonthsFromNow = new Date()
        threeMonthsFromNow.setMonth(now.getMonth() + 3)
        return renewalDate <= threeMonthsFromNow && renewalDate >= now
      }).length,
      color: "#f5222d",
      icon: <CalendarOutlined />,
    },
  ]

  return (
    <DashboardLayout userRole="superadmin">
      <div className="min-h-[100vh]">
        <PageHeader title="Gestion des Contrats" subtitle="Suivi et gestion des contrats clients" />

        <div style={{ padding: "24px" }}>
          <div style={{ marginBottom: "16px", padding: "8px", backgroundColor: "#e6f7ff", borderRadius: "4px" }}>
            <small>Debug: {contratsData.length} contrats chargés</small>
          </div>

          {/* Statistiques */}
          <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
            {statsData.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: "bold", color: stat.color }}>{stat.value}</div>
                      <div style={{ color: "#666", fontSize: "14px" }}>{stat.title}</div>
                    </div>
                    <div style={{ fontSize: "32px", color: stat.color }}>{stat.icon}</div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Filtres et actions */}
          <Card style={{ marginBottom: "16px" }}>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={8} md={6}>
                <Search placeholder="Rechercher un contrat..." />
              </Col>
              <Col xs={24} sm={8} md={4}>
                <Select defaultValue="tous" style={{ width: "100%" }}>
                  <Option value="tous">Tous les statuts</Option>
                  <Option value="actif">Actif</Option>
                  <Option value="attente">En attente</Option>
                  <Option value="expire">Expiré</Option>
                  <Option value="suspendu">Suspendu</Option>
                </Select>
              </Col>
              <Col xs={24} sm={8} md={4}>
                <Select defaultValue="tous" style={{ width: "100%" }}>
                  <Option value="tous">Tous les types</Option>
                  <Option value="continue">Formation Continue</Option>
                  <Option value="ponctuelle">Formation Ponctuelle</Option>
                  <Option value="premium">Formation Premium</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <RangePicker style={{ width: "100%" }} placeholder={["Date début", "Date fin"]} />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Space>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Nouveau Contrat
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>

          {/* Tableau des contrats */}
          <Card title="Liste des Contrats">
            <Table
              columns={contratsColumns}
              dataSource={contratsData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} contrats`,
              }}
              scroll={{ x: 1400 }}
              size="middle"
            />
          </Card>

          {/* Alertes de renouvellement */}
          <Card title="Alertes de Renouvellement" style={{ marginTop: "16px" }}>
            <div
              style={{ padding: "16px", backgroundColor: "#fff7e6", border: "1px solid #ffd591", borderRadius: "6px" }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "8px", color: "#fa8c16" }}>
                ⚠️ Contrats à renouveler dans les 3 prochains mois :
              </div>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {contratsData
                  .filter((c) => {
                    const renewalDate = new Date(c.prochainRenouvellement)
                    const now = new Date()
                    const threeMonthsFromNow = new Date()
                    threeMonthsFromNow.setMonth(now.getMonth() + 3)
                    return renewalDate <= threeMonthsFromNow && renewalDate >= now
                  })
                  .map((contrat) => (
                    <li key={contrat.key}>
                      <strong>{contrat.client}</strong> - {contrat.numero} (Renouvellement:{" "}
                      {contrat.prochainRenouvellement})
                    </li>
                  ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
