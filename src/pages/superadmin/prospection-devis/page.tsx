"use client"

import { useState } from "react"
import { Card, Row, Col, Table, Tag, Button, Space, Select, Input, Tabs } from "antd"
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import PageHeader from "@/components/common/page-header"

const { Search } = Input
const { Option } = Select
const { TabPane } = Tabs

export default function ProspectionDevisPage() {
  const [selectedProspect, setSelectedProspect] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState("") // 'prospect', 'interaction', 'devis'

  // Données des prospects
  const prospectsData = [
    {
      key: "1",
      nom: "TechCorp Solutions",
      contact: "Marie Dubois",
      email: "marie.dubois@techcorp.fr",
      telephone: "+33 1 23 45 67 89",
      source: "Site Web",
      statut: "Qualifié",
      dateCreation: "2024-01-15",
      secteur: "Technologie",
      taille: "50-100",
      budget: "25000",
    },
    {
      key: "2",
      nom: "Industrie Plus",
      contact: "Jean Martin",
      email: "j.martin@industrieplus.fr",
      telephone: "+33 1 98 76 54 32",
      source: "Salon Professionnel",
      statut: "Nouveau",
      dateCreation: "2024-01-14",
      secteur: "Industrie",
      taille: "100-500",
      budget: "50000",
    },
    {
      key: "3",
      nom: "Services Avenir",
      contact: "Sophie Laurent",
      email: "sophie.l@servicesavenir.fr",
      telephone: "+33 1 11 22 33 44",
      source: "Recommandation",
      statut: "En négociation",
      dateCreation: "2024-01-12",
      secteur: "Services",
      taille: "20-50",
      budget: "15000",
    },
  ]

  // Données des interactions
  const interactionsData = [
    {
      key: "1",
      prospectId: "1",
      prospect: "TechCorp Solutions",
      type: "Appel",
      date: "2024-01-16",
      duree: "30 min",
      responsable: "Pierre Formateur",
      notes: "Intérêt confirmé pour formation leadership",
      statut: "Terminé",
    },
    {
      key: "2",
      prospectId: "2",
      prospect: "Industrie Plus",
      type: "Email",
      date: "2024-01-15",
      duree: "-",
      responsable: "Marie Admin",
      notes: "Envoi de la brochure formations techniques",
      statut: "Envoyé",
    },
    {
      key: "3",
      prospectId: "1",
      prospect: "TechCorp Solutions",
      type: "Réunion",
      date: "2024-01-18",
      duree: "1h",
      responsable: "Pierre Formateur",
      notes: "Présentation détaillée du catalogue",
      statut: "Planifié",
    },
  ]

  // Données des devis
  const devisData = [
    {
      key: "1",
      numero: "DEV-2024-001",
      prospectId: "1",
      prospect: "TechCorp Solutions",
      dateCreation: "2024-01-16",
      dateValidite: "2024-02-16",
      montantHT: "20000",
      montantTTC: "24000",
      statut: "En attente",
      responsable: "Pierre Formateur",
    },
    {
      key: "2",
      numero: "DEV-2024-002",
      prospectId: "3",
      prospect: "Services Avenir",
      dateCreation: "2024-01-14",
      dateValidite: "2024-02-14",
      montantHT: "12000",
      montantTTC: "14400",
      statut: "Accepté",
      responsable: "Marie Admin",
    },
  ]

  // Données des lignes de devis
  const lignesDevisData = [
    {
      key: "1",
      devisId: "1",
      devis: "DEV-2024-001",
      formation: "Leadership et Management",
      quantite: 2,
      duree: "3 jours",
      prixUnitaire: "8000",
      remise: "10%",
      montantHT: "14400",
      description: "Formation leadership pour 15 participants",
    },
    {
      key: "2",
      devisId: "1",
      devis: "DEV-2024-001",
      formation: "Communication Efficace",
      quantite: 1,
      duree: "2 jours",
      prixUnitaire: "6000",
      remise: "5%",
      montantHT: "5700",
      description: "Formation communication pour 12 participants",
    },
    {
      key: "3",
      devisId: "2",
      devis: "DEV-2024-002",
      formation: "Excel Avancé",
      quantite: 3,
      duree: "1 jour",
      prixUnitaire: "4000",
      remise: "0%",
      montantHT: "12000",
      description: "Formation Excel pour 20 participants",
    },
  ]

  const prospectsColumns = [
    {
      title: "Entreprise",
      dataIndex: "nom",
      key: "nom",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{text}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{record.contact}</div>
        </div>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (record) => (
        <div>
          <div>{record.email}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{record.telephone}</div>
        </div>
      ),
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (source) => {
        const colors = {
          "Site Web": "#52c41a",
          "Salon Professionnel": "#1890ff",
          Recommandation: "#faad14",
        }
        return <Tag color={colors[source]}>{source}</Tag>
      },
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (statut) => {
        const colors = {
          Nouveau: "#faad14",
          Qualifié: "#52c41a",
          "En négociation": "#1890ff",
          Perdu: "#f5222d",
        }
        return <Tag color={colors[statut]}>{statut}</Tag>
      },
    },
    {
      title: "Secteur",
      dataIndex: "secteur",
      key: "secteur",
    },
    {
      title: "Budget (€)",
      dataIndex: "budget",
      key: "budget",
      render: (budget) => `${Number.parseInt(budget).toLocaleString()} €`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
          <Button icon={<PhoneOutlined />} size="small" type="primary" />
        </Space>
      ),
    },
  ]

  const interactionsColumns = [
    {
      title: "Prospect",
      dataIndex: "prospect",
      key: "prospect",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        const icons = {
          Appel: <PhoneOutlined />,
          Email: <MailOutlined />,
          Réunion: <CalendarOutlined />,
        }
        return (
          <span>
            {icons[type]} {type}
          </span>
        )
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Durée",
      dataIndex: "duree",
      key: "duree",
    },
    {
      title: "Responsable",
      dataIndex: "responsable",
      key: "responsable",
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (statut) => {
        const colors = {
          Terminé: "#52c41a",
          Planifié: "#1890ff",
          Envoyé: "#faad14",
        }
        return <Tag color={colors[statut]}>{statut}</Tag>
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ]

  const devisColumns = [
    {
      title: "N° Devis",
      dataIndex: "numero",
      key: "numero",
      render: (numero) => <span style={{ fontWeight: "bold", color: "#1890ff" }}>{numero}</span>,
    },
    {
      title: "Prospect",
      dataIndex: "prospect",
      key: "prospect",
    },
    {
      title: "Date Création",
      dataIndex: "dateCreation",
      key: "dateCreation",
    },
    {
      title: "Validité",
      dataIndex: "dateValidite",
      key: "dateValidite",
    },
    {
      title: "Montant HT",
      dataIndex: "montantHT",
      key: "montantHT",
      render: (montant) => `${Number.parseInt(montant).toLocaleString()} €`,
    },
    {
      title: "Montant TTC",
      dataIndex: "montantTTC",
      key: "montantTTC",
      render: (montant) => <span style={{ fontWeight: "bold" }}>{Number.parseInt(montant).toLocaleString()} €</span>,
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (statut) => {
        const colors = {
          "En attente": "#faad14",
          Accepté: "#52c41a",
          Refusé: "#f5222d",
          Expiré: "#d9d9d9",
        }
        return <Tag color={colors[statut]}>{statut}</Tag>
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
          <Button icon={<FileTextOutlined />} size="small" type="primary" />
        </Space>
      ),
    },
  ]

  const lignesDevisColumns = [
    {
      title: "N° Devis",
      dataIndex: "devis",
      key: "devis",
    },
    {
      title: "Formation",
      dataIndex: "formation",
      key: "formation",
      render: (formation, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{formation}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{record.description}</div>
        </div>
      ),
    },
    {
      title: "Quantité",
      dataIndex: "quantite",
      key: "quantite",
    },
    {
      title: "Durée",
      dataIndex: "duree",
      key: "duree",
    },
    {
      title: "Prix Unitaire",
      dataIndex: "prixUnitaire",
      key: "prixUnitaire",
      render: (prix) => `${Number.parseInt(prix).toLocaleString()} €`,
    },
    {
      title: "Remise",
      dataIndex: "remise",
      key: "remise",
    },
    {
      title: "Montant HT",
      dataIndex: "montantHT",
      key: "montantHT",
      render: (montant) => <span style={{ fontWeight: "bold" }}>{Number.parseInt(montant).toLocaleString()} €</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
          <Button icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ]

  return (
    <DashboardLayout userRole="superadmin">
      <PageHeader title="Prospection & Devis" subtitle="Gestion des prospects et des offres commerciales" />

      <div style={{ padding: "24px" }}>
        {/* Statistiques rapides */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#52c41a" }}>{prospectsData.length}</div>
                <div style={{ color: "#666" }}>Prospects Actifs</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1890ff" }}>{devisData.length}</div>
                <div style={{ color: "#666" }}>Devis en Cours</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#faad14" }}>
                  {devisData.reduce((sum, devis) => sum + Number.parseInt(devis.montantTTC), 0).toLocaleString()} €
                </div>
                <div style={{ color: "#666" }}>CA Potentiel</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#f5222d" }}>
                  {Math.round((devisData.filter((d) => d.statut === "Accepté").length / devisData.length) * 100)}%
                </div>
                <div style={{ color: "#666" }}>Taux de Conversion</div>
              </div>
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="prospects">
          <TabPane tab="Prospects" key="prospects">
            <Card
              title="Liste des Prospects"
              extra={
                <Space>
                  <Search placeholder="Rechercher un prospect..." style={{ width: 200 }} />
                  <Select defaultValue="tous" style={{ width: 120 }}>
                    <Option value="tous">Tous</Option>
                    <Option value="nouveau">Nouveau</Option>
                    <Option value="qualifie">Qualifié</Option>
                    <Option value="negociation">En négociation</Option>
                  </Select>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Nouveau Prospect
                  </Button>
                </Space>
              }
            >
              <Table
                columns={prospectsColumns}
                dataSource={prospectsData}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1000 }}
              />
            </Card>
          </TabPane>

          <TabPane tab="Interactions" key="interactions">
            <Card
              title="Historique des Interactions"
              extra={
                <Space>
                  <Select defaultValue="tous" style={{ width: 120 }}>
                    <Option value="tous">Tous Types</Option>
                    <Option value="appel">Appels</Option>
                    <Option value="email">Emails</Option>
                    <Option value="reunion">Réunions</Option>
                  </Select>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Nouvelle Interaction
                  </Button>
                </Space>
              }
            >
              <Table
                columns={interactionsColumns}
                dataSource={interactionsData}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1000 }}
              />
            </Card>
          </TabPane>

          <TabPane tab="Devis" key="devis">
            <Card
              title="Liste des Devis"
              extra={
                <Space>
                  <Search placeholder="Rechercher un devis..." style={{ width: 200 }} />
                  <Select defaultValue="tous" style={{ width: 120 }}>
                    <Option value="tous">Tous</Option>
                    <Option value="attente">En attente</Option>
                    <Option value="accepte">Accepté</Option>
                    <Option value="refuse">Refusé</Option>
                  </Select>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Nouveau Devis
                  </Button>
                </Space>
              }
            >
              <Table columns={devisColumns} dataSource={devisData} pagination={{ pageSize: 10 }} scroll={{ x: 1000 }} />
            </Card>
          </TabPane>

          <TabPane tab="Lignes de Devis" key="lignes">
            <Card
              title="Détails des Lignes de Devis"
              extra={
                <Space>
                  <Select defaultValue="tous" style={{ width: 150 }}>
                    <Option value="tous">Tous les Devis</Option>
                    <Option value="DEV-2024-001">DEV-2024-001</Option>
                    <Option value="DEV-2024-002">DEV-2024-002</Option>
                  </Select>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Ajouter Ligne
                  </Button>
                </Space>
              }
            >
              <Table
                columns={lignesDevisColumns}
                dataSource={lignesDevisData}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1200 }}
              />
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
