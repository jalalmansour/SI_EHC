"use client"

import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Button,
  Input,
  Select,
  Space,
  Tabs,
  Tooltip,
  Modal,
  message,
  Badge,
} from "antd"
import {
  BuildingOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ExclamationTriangleOutlined,
  EyeOutlined,
  EditOutlined,
  PhoneOutlined,
  ReloadOutlined,
  DeleteOutlined,
  PlusOutlined,
  DownloadOutlined,
  UserOutlined,
  TrendingUpOutlined,
} from "@ant-design/icons"
import { Line, Doughnut } from "react-chartjs-2"
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

// Enregistrement des composants Chart.js
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

const { Search } = Input
const { Option } = Select
const { TabPane } = Tabs

const DashboardAdminPage = () => {
  const [activeTab, setActiveTab] = useState("suivi-commercial")
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedEnterprise, setSelectedEnterprise] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  // Données simulées
  const [adminData] = useState({
    metrics: {
      activeEnterprises: 2,
      totalRevenue: 530000,
      pendingPayments: 1,
      overduePayments: 1,
    },
    revenueEvolution: {
      total2024: 530000,
      monthlyAverage: 44167,
      growthRate: 15.2,
    },
    sectorDistribution: [
      { sector: "Technologie", percentage: 45, color: "#4F46E5" },
      { sector: "Industrie", percentage: 35, color: "#10B981" },
      { sector: "R&D", percentage: 20, color: "#8B5CF6" },
    ],
    clientPerformance: [
      {
        id: 1,
        name: "TechCorp Solutions",
        email: "admin@techcorp.com",
        sector: "Technologie",
        size: "250-500",
        totalRevenue: 125000,
        monthlyRevenue: 10417,
        servicesUsed: 57,
        lastActivity: "2024-03-01",
        status: "Actif",
        phone: "+33 1 23 45 67 89",
        address: "123 Rue de la Tech, 75001 Paris",
        registrationDate: "2023-01-15",
      },
      {
        id: 2,
        name: "InnovateLab",
        email: "contact@innovatelab.fr",
        sector: "R&D",
        size: "50-100",
        totalRevenue: 85000,
        monthlyRevenue: 7083,
        servicesUsed: 16,
        lastActivity: "2024-02-28",
        status: "Actif",
        phone: "+33 1 98 76 54 32",
        address: "456 Avenue Innovation, 69000 Lyon",
        registrationDate: "2023-03-22",
      },
      {
        id: 3,
        name: "GlobalManufacturing",
        email: "admin@globalmanuf.com",
        sector: "Industrie",
        size: "1000+",
        totalRevenue: 320000,
        monthlyRevenue: 26667,
        servicesUsed: 33,
        lastActivity: "2024-01-15",
        status: "Inactif",
        phone: "+33 4 11 22 33 44",
        address: "789 Zone Industrielle, 13000 Marseille",
        registrationDate: "2022-11-10",
      },
    ],
  })

  // Configuration des graphiques
  const revenueChartData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "CA Mensuel (€)",
        data: [35000, 42000, 38000, 45000, 52000, 48000, 55000, 49000, 46000, 51000, 47000, 44000],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const sectorChartData = {
    labels: adminData.sectorDistribution.map((item) => item.sector),
    datasets: [
      {
        data: adminData.sectorDistribution.map((item) => item.percentage),
        backgroundColor: adminData.sectorDistribution.map((item) => item.color),
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  }

  // Colonnes du tableau des entreprises
  const enterpriseColumns = [
    {
      title: "Entreprise",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-semibold text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Secteur",
      dataIndex: "sector",
      key: "sector",
      render: (sector) => (
        <Tag color={sector === "Technologie" ? "blue" : sector === "Industrie" ? "green" : "purple"}>{sector}</Tag>
      ),
    },
    {
      title: "Taille",
      dataIndex: "size",
      key: "size",
      render: (size) => <span className="text-gray-600">{size} employés</span>,
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Actif" ? "success" : "default"}>{status === "Actif" ? "Client Actif" : "Inactif"}</Tag>
      ),
    },
    {
      title: "Inscription",
      dataIndex: "registrationDate",
      key: "registrationDate",
      render: (date) => <span className="text-gray-600">{date}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir détails">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleViewEnterprise(record)}
              className="text-blue-600 hover:text-blue-800"
            />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditEnterprise(record)}
              className="text-green-600 hover:text-green-800"
            />
          </Tooltip>
          <Tooltip title="Appeler">
            <Button
              type="text"
              icon={<PhoneOutlined />}
              onClick={() => handleCallEnterprise(record)}
              className="text-orange-600 hover:text-orange-800"
            />
          </Tooltip>
          <Tooltip title="Actualiser">
            <Button
              type="text"
              icon={<ReloadOutlined />}
              onClick={() => handleRefreshEnterprise(record)}
              className="text-purple-600 hover:text-purple-800"
            />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteEnterprise(record)}
              className="text-red-600 hover:text-red-800"
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  // Colonnes du tableau de performance
  const performanceColumns = [
    {
      title: "Client",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-semibold text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "CA Total",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (amount) => <span className="font-semibold text-green-600">{amount.toLocaleString()}€</span>,
    },
    {
      title: "CA Mensuel",
      dataIndex: "monthlyRevenue",
      key: "monthlyRevenue",
      render: (amount) => <span className="text-gray-700">{amount.toLocaleString()}€</span>,
    },
    {
      title: "Services Utilisés",
      dataIndex: "servicesUsed",
      key: "servicesUsed",
      render: (count) => <Badge count={count} style={{ backgroundColor: "#4F46E5" }} />,
    },
    {
      title: "Dernière Activité",
      dataIndex: "lastActivity",
      key: "lastActivity",
      render: (date) => <span className="text-gray-600">{date}</span>,
    },
  ]

  // Gestionnaires d'événements
  const handleViewEnterprise = (record) => {
    setSelectedEnterprise(record)
    setIsModalVisible(true)
  }

  const handleEditEnterprise = (record) => {
    message.info(`Modification de ${record.name}`)
  }

  const handleCallEnterprise = (record) => {
    message.info(`Appel vers ${record.phone}`)
  }

  const handleRefreshEnterprise = (record) => {
    message.success(`Données de ${record.name} actualisées`)
  }

  const handleDeleteEnterprise = (record) => {
    Modal.confirm({
      title: "Confirmer la suppression",
      content: `Êtes-vous sûr de vouloir supprimer ${record.name} ?`,
      okText: "Supprimer",
      okType: "danger",
      cancelText: "Annuler",
      onOk() {
        message.success(`${record.name} supprimé avec succès`)
      },
    })
  }

  const filteredData = adminData.clientPerformance.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && item.status === "Actif") ||
      (statusFilter === "inactive" && item.status === "Inactif")
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* En-tête avec métriques */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <div className="flex items-center justify-between text-white">
                <div>
                  <div className="text-sm opacity-90 mb-1">Entreprises Actives</div>
                  <div className="text-3xl font-bold">{adminData.metrics.activeEnterprises}</div>
                </div>
                <BuildingOutlined className="text-4xl opacity-80" />
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600">
              <div className="flex items-center justify-between text-white">
                <div>
                  <div className="text-sm opacity-90 mb-1">CA Total</div>
                  <div className="text-3xl font-bold">{adminData.metrics.totalRevenue.toLocaleString()}€</div>
                </div>
                <DollarOutlined className="text-4xl opacity-80" />
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600">
              <div className="flex items-center justify-between text-white">
                <div>
                  <div className="text-sm opacity-90 mb-1">Paiements en attente</div>
                  <div className="text-3xl font-bold">{adminData.metrics.pendingPayments}</div>
                </div>
                <ClockCircleOutlined className="text-4xl opacity-80" />
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600">
              <div className="flex items-center justify-between text-white">
                <div>
                  <div className="text-sm opacity-90 mb-1">Paiements en retard</div>
                  <div className="text-3xl font-bold">{adminData.metrics.overduePayments}</div>
                </div>
                <ExclamationTriangleOutlined className="text-4xl opacity-80" />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Onglets de navigation */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={6}>
            <Button
              type={activeTab === "gestion-entreprises" ? "primary" : "default"}
              icon={<BuildingOutlined />}
              block
              size="large"
              onClick={() => setActiveTab("gestion-entreprises")}
              className="h-12 text-left"
            >
              Gestion Entreprises
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button
              type={activeTab === "informations-clients" ? "primary" : "default"}
              icon={<UserOutlined />}
              block
              size="large"
              onClick={() => setActiveTab("informations-clients")}
              className="h-12 text-left"
            >
              Informations Clients
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button
              type={activeTab === "suivi-commercial" ? "primary" : "default"}
              icon={<TrendingUpOutlined />}
              block
              size="large"
              onClick={() => setActiveTab("suivi-commercial")}
              className="h-12 text-left"
            >
              Suivi Commercial
            </Button>
          </Col>
          <Col xs={24} sm={6}>
            <Button
              type={activeTab === "gestion-paiements" ? "primary" : "default"}
              icon={<DollarOutlined />}
              block
              size="large"
              onClick={() => setActiveTab("gestion-paiements")}
              className="h-12 text-left"
            >
              Gestion Paiements
            </Button>
          </Col>
        </Row>

        {/* Contenu selon l'onglet actif */}
        {activeTab === "suivi-commercial" && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Suivi Commercial et Chiffre d'Affaires</h2>

              <Row gutter={[24, 24]}>
                {/* Évolution du CA */}
                <Col xs={24} lg={14}>
                  <Card title="📈 Évolution du CA" className="h-full shadow-lg border-0">
                    <div className="mb-4">
                      <Row gutter={[16, 16]}>
                        <Col span={8}>
                          <div className="text-center">
                            <div className="text-sm text-gray-500">CA Total 2024</div>
                            <div className="text-2xl font-bold text-gray-800">
                              {adminData.revenueEvolution.total2024.toLocaleString()}€
                            </div>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="text-center">
                            <div className="text-sm text-gray-500">CA Mensuel Moyen</div>
                            <div className="text-2xl font-bold text-gray-800">
                              {adminData.revenueEvolution.monthlyAverage.toLocaleString()}€
                            </div>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="text-center">
                            <div className="text-sm text-gray-500">Croissance vs 2023</div>
                            <div className="text-2xl font-bold text-green-600">
                              +{adminData.revenueEvolution.growthRate}%
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div style={{ height: "300px" }}>
                      <Line data={revenueChartData} options={chartOptions} />
                    </div>
                  </Card>
                </Col>

                {/* Répartition par secteur */}
                <Col xs={24} lg={10}>
                  <Card title="🎯 Répartition par Secteur" className="h-full shadow-lg border-0">
                    <div style={{ height: "200px", position: "relative" }}>
                      <Doughnut data={sectorChartData} options={doughnutOptions} />
                    </div>
                    <div className="mt-6 space-y-3">
                      {adminData.sectorDistribution.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                            <span className="text-gray-700">{item.sector}</span>
                          </div>
                          <span className="font-semibold text-gray-800">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>

            {/* Performance par client */}
            <Card title="📊 Performance par Client" className="shadow-lg border-0">
              <Table
                columns={performanceColumns}
                dataSource={adminData.clientPerformance}
                rowKey="id"
                pagination={false}
                className="custom-table"
              />
            </Card>
          </>
        )}

        {activeTab === "informations-clients" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Fiches Entreprises Détaillées</h2>

            <Row gutter={[24, 24]}>
              {adminData.clientPerformance.map((client) => (
                <Col xs={24} lg={8} key={client.id}>
                  <Card
                    className="h-full shadow-lg border-0 hover:shadow-xl transition-shadow duration-300"
                    actions={[
                      <Tooltip key="editTooltip" title="Modifier">
                        <EditOutlined key="edit" className="text-blue-600" />
                      </Tooltip>,
                      <Tooltip key="viewTooltip" title="Voir détails">
                        <EyeOutlined key="view" className="text-green-600" />
                      </Tooltip>,
                    ]}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <BuildingOutlined className="text-2xl text-blue-600 mr-3" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{client.name}</h3>
                          <Tag color={client.status === "Actif" ? "success" : "default"}>
                            {client.status === "Actif" ? "Client Actif" : "Inactif"}
                          </Tag>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Secteur d'activité</div>
                          <div className="font-semibold text-gray-800">{client.sector}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Taille (effectif)</div>
                          <div className="font-semibold text-gray-800">{client.size} employés</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Téléphone</div>
                          <div className="font-semibold text-gray-800">{client.phone}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="font-semibold text-gray-800">{client.email}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500">Adresse</div>
                        <div className="font-semibold text-gray-800">{client.address}</div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500">Date d'inscription</div>
                        <div className="font-semibold text-gray-800">{client.registrationDate}</div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {activeTab === "gestion-entreprises" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Gestion des Comptes Entreprises</h2>
              <Button type="primary" icon={<PlusOutlined />} size="large">
                Nouvelle Entreprise
              </Button>
            </div>

            {/* Filtres et recherche */}
            <Card className="mb-6 shadow-lg border-0">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={12} md={8}>
                  <Search
                    placeholder="Rechercher une entreprise..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full"
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Select
                    value={statusFilter}
                    onChange={setStatusFilter}
                    className="w-full"
                    placeholder="Tous les statuts"
                  >
                    <Option value="all">Tous les statuts</Option>
                    <Option value="active">Actifs</Option>
                    <Option value="inactive">Inactifs</Option>
                  </Select>
                </Col>
                <Col xs={24} sm={24} md={10}>
                  <div className="flex justify-end">
                    <Space>
                      <Button icon={<DownloadOutlined />}>Exporter</Button>
                      <Button icon={<ReloadOutlined />}>Actualiser</Button>
                    </Space>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Tableau des entreprises */}
            <Card className="shadow-lg border-0">
              <Table
                columns={enterpriseColumns}
                dataSource={filteredData}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} entreprises`,
                }}
                className="custom-table"
              />
            </Card>
          </div>
        )}

        {activeTab === "gestion-paiements" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Paiements</h2>

            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="💳 Paiements en Attente" className="h-full shadow-lg border-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-800">TechCorp Solutions</div>
                        <div className="text-sm text-gray-600">Facture #2024-001</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-orange-600">15 000€</div>
                        <div className="text-sm text-gray-500">Échéance: 15/03/2024</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card title="⚠️ Paiements en Retard" className="h-full shadow-lg border-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-800">GlobalManufacturing</div>
                        <div className="text-sm text-gray-600">Facture #2024-002</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">8 500€</div>
                        <div className="text-sm text-red-500">Retard: 5 jours</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        )}

        {/* Modal de détails d'entreprise */}
        <Modal
          title={`Détails - ${selectedEnterprise?.name}`}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsModalVisible(false)}>
              Fermer
            </Button>,
            <Button key="edit" type="primary" icon={<EditOutlined />}>
              Modifier
            </Button>,
          ]}
          width={800}
        >
          {selectedEnterprise && (
            <div className="space-y-6">
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Nom de l'entreprise</label>
                      <div className="text-lg font-bold text-gray-800">{selectedEnterprise.name}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Secteur d'activité</label>
                      <div className="text-gray-800">{selectedEnterprise.sector}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Taille</label>
                      <div className="text-gray-800">{selectedEnterprise.size} employés</div>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Email</label>
                      <div className="text-gray-800">{selectedEnterprise.email}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Téléphone</label>
                      <div className="text-gray-800">{selectedEnterprise.phone}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Date d'inscription</label>
                      <div className="text-gray-800">{selectedEnterprise.registrationDate}</div>
                    </div>
                  </div>
                </Col>
              </Row>

              <div>
                <label className="text-sm font-semibold text-gray-600">Adresse</label>
                <div className="text-gray-800">{selectedEnterprise.address}</div>
              </div>

              <Row gutter={[24, 24]}>
                <Col span={8}>
                  <Card className="text-center bg-blue-50">
                    <Statistic
                      title="CA Total"
                      value={selectedEnterprise.totalRevenue}
                      suffix="€"
                      valueStyle={{ color: "#1890ff" }}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="text-center bg-green-50">
                    <Statistic
                      title="CA Mensuel"
                      value={selectedEnterprise.monthlyRevenue}
                      suffix="€"
                      valueStyle={{ color: "#52c41a" }}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="text-center bg-purple-50">
                    <Statistic
                      title="Services Utilisés"
                      value={selectedEnterprise.servicesUsed}
                      valueStyle={{ color: "#722ed1" }}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}

export default DashboardAdminPage
