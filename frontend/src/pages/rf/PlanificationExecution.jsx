"use client"

import { useState } from "react"
import {
  Card,
  Table,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Space,
  Tag,
  Modal,
  Upload,
  message,
  Row,
  Col,
  Statistic,
  Typography,
  Tooltip,
  Progress,
  Alert,
  Tabs,
  List,
  Avatar,
} from "antd"
import {
  PlusOutlined,
  ImportOutlined,
  ExportOutlined,
  CalendarOutlined,
  FileTextOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input
const { RangePicker } = DatePicker
const { TabPane } = Tabs

const PlanificationExecution = () => {
  const [form] = Form.useForm()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [selectedTraining, setSelectedTraining] = useState(null)

  // Sample data for training actions (RF perspective)
  const trainingActions = [
    {
      key: "1",
      competence: "Leadership",
      typeCompetence: "Management",
      thematique: "Leadership d'équipe",
      typeFormation: "Présentiel",
      duree: "2 jours",
      participants: "12 personnes",
      dates: "22 Mars 2024 - 23 Mars 2024",
      statut: "Confirmée",
      coutFormation: "2500 €",
      cabinet: "Cabinet Excellence",
      formateur: "M. Dupont",
      programme: "PDF Joint",
      departement: "IT",
      priorite: "Haute",
    },
    {
      key: "2",
      competence: "Communication",
      typeCompetence: "Soft Skills",
      thematique: "Communication interpersonnelle",
      typeFormation: "Hybride",
      duree: "3 jours",
      participants: "15 personnes",
      dates: "25 Mars 2024 - 27 Mars 2024",
      statut: "En cours",
      coutFormation: "1800 €",
      cabinet: "FormaCom",
      formateur: "Mme Martin",
      programme: "Contenu intégré",
      departement: "Commercial",
      priorite: "Moyenne",
    },
    {
      key: "3",
      competence: "Gestion de projet",
      typeCompetence: "Technique",
      thematique: "Méthodologies Agiles",
      typeFormation: "Distanciel",
      duree: "5 jours",
      participants: "8 personnes",
      dates: "—",
      statut: "Planifiée",
      coutFormation: "3200 €",
      cabinet: "Agile Academy",
      formateur: "M. Bernard",
      programme: "PDF Joint",
      departement: "IT",
      priorite: "Haute",
    },
    {
      key: "4",
      competence: "Cybersécurité",
      typeCompetence: "Technique",
      thematique: "Sécurité informatique",
      typeFormation: "Présentiel",
      duree: "1 jour",
      participants: "20 personnes",
      dates: "15 Avril 2024",
      statut: "En attente validation",
      coutFormation: "1200 €",
      cabinet: "SecureIT",
      formateur: "M. Dubois",
      programme: "PDF Joint",
      departement: "IT",
      priorite: "Critique",
    },
  ]

  // Pending requests from departments
  const pendingRequests = [
    {
      key: "1",
      departement: "Finance",
      formation: "Excel Avancé",
      participants: 10,
      budget: 1500,
      datedemande: "2024-01-10",
      priorite: "Moyenne",
      justification: "Améliorer l'efficacité des analyses financières",
      manager: "Claire Bernard",
    },
    {
      key: "2",
      departement: "RH",
      formation: "Gestion des conflits",
      participants: 6,
      budget: 2200,
      datedemande: "2024-01-12",
      priorite: "Haute",
      justification: "Besoin urgent suite aux évaluations",
      manager: "Marie Dubois",
    },
  ]

  const getStatusColor = (status) => {
    const colors = {
      Confirmée: "green",
      "En cours": "blue",
      Planifiée: "orange",
      "En attente validation": "red",
      Terminée: "success",
      Reportée: "warning",
      Annulée: "error",
    }
    return colors[status] || "default"
  }

  const getPriorityColor = (priority) => {
    const colors = {
      Critique: "red",
      Haute: "orange",
      Moyenne: "blue",
      Faible: "green",
    }
    return colors[priority] || "default"
  }

  const columns = [
    {
      title: "Formation",
      dataIndex: "thematique",
      key: "thematique",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text className="text-gray-500 text-xs">{record.competence}</Text>
        </div>
      ),
      width: 180,
    },
    {
      title: "Type",
      dataIndex: "typeFormation",
      key: "typeFormation",
      render: (type) => <Tag color="blue">{type}</Tag>,
      width: 100,
    },
    {
      title: "Durée",
      dataIndex: "duree",
      key: "duree",
      width: 80,
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
      width: 100,
    },
    {
      title: "Département",
      dataIndex: "departement",
      key: "departement",
      render: (dept) => <Tag color="purple">{dept}</Tag>,
      width: 100,
    },
    {
      title: "Dates",
      dataIndex: "dates",
      key: "dates",
      width: 180,
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
      width: 120,
    },
    {
      title: "Priorité",
      dataIndex: "priorite",
      key: "priorite",
      render: (priority) => <Tag color={getPriorityColor(priority)}>{priority}</Tag>,
      width: 100,
    },
    {
      title: "Coût",
      dataIndex: "coutFormation",
      key: "coutFormation",
      width: 100,
    },
    {
      title: "Prestataire",
      dataIndex: "cabinet",
      key: "cabinet",
      width: 120,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir détails">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const requestColumns = [
    {
      title: "Département",
      dataIndex: "departement",
      key: "departement",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text className="text-gray-500 text-xs">Manager: {record.manager}</Text>
        </div>
      ),
    },
    {
      title: "Formation Demandée",
      dataIndex: "formation",
      key: "formation",
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
      title: "Budget Estimé",
      dataIndex: "budget",
      key: "budget",
      render: (budget) => `${budget} €`,
    },
    {
      title: "Priorité",
      dataIndex: "priorite",
      key: "priorite",
      render: (priority) => <Tag color={getPriorityColor(priority)}>{priority}</Tag>,
    },
    {
      title: "Date Demande",
      dataIndex: "datedemande",
      key: "datedemande",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" size="small">
            Approuver
          </Button>
          <Button size="small">Négocier</Button>
          <Button danger size="small">
            Rejeter
          </Button>
        </Space>
      ),
    },
  ]

  const handleCreateTraining = (values) => {
    console.log("Creating training:", values)
    message.success("Formation planifiée avec succès!")
    setShowCreateModal(false)
    form.resetFields()
  }

  const handleImportExcel = (file) => {
    console.log("Importing Excel file:", file)
    message.success("Fichier Excel importé avec succès!")
    setShowImportModal(false)
    return false
  }

  const handleExport = (type) => {
    console.log("Exporting:", type)
    message.success(`Export ${type} en cours...`)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Title level={2} className="text-blue-600 mb-2">
            Planification et Exécution des Formations
          </Title>
          <Text className="text-gray-600">Responsable Formation - Gestion complète du plan de formation</Text>
        </div>

        {/* Alerts */}
        <Alert
          message="Demandes en attente"
          description="2 demandes de formation sont en attente de votre validation. Consultez l'onglet 'Demandes Départements'."
          type="info"
          showIcon
          className="mb-6"
          closable
        />

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-l-4 border-l-blue-500">
              <Statistic
                title="Formations Planifiées"
                value={15}
                valueStyle={{ color: "#1890ff", fontSize: "2rem", fontWeight: "bold" }}
                prefix={<CalendarOutlined />}
              />
              <Text className="text-gray-500">Actions programmées</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-l-4 border-l-orange-500">
              <Statistic
                title="En Attente Validation"
                value={4}
                valueStyle={{ color: "#fa8c16", fontSize: "2rem", fontWeight: "bold" }}
                prefix={<ExclamationCircleOutlined />}
              />
              <Text className="text-gray-500">Nécessitent validation</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-l-4 border-l-green-500">
              <Statistic
                title="Participants Inscrits"
                value={127}
                valueStyle={{ color: "#52c41a", fontSize: "2rem", fontWeight: "bold" }}
                prefix={<TeamOutlined />}
              />
              <Text className="text-gray-500">Total participants</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-l-4 border-l-purple-500">
              <Statistic
                title="Budget Engagé"
                value={18500}
                suffix="€"
                valueStyle={{ color: "#722ed1", fontSize: "2rem", fontWeight: "bold" }}
              />
              <Progress percent={74} showInfo={false} strokeColor="#722ed1" />
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="planning" type="card">
          {/* Onglet Planification */}
          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                Plan de Formation
              </span>
            }
            key="planning"
          >
            <Card
              title="Actions de Formation Planifiées"
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Nouvelle Formation
                  </Button>
                  <Button icon={<ImportOutlined />} onClick={() => setShowImportModal(true)}>
                    Import Excel
                  </Button>
                  <Button icon={<ExportOutlined />} onClick={() => handleExport("Excel")}>
                    Export
                  </Button>
                </Space>
              }
            >
              <Table
                columns={columns}
                dataSource={trainingActions}
                scroll={{ x: 1600 }}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} formations`,
                }}
                className="border border-gray-200 rounded-lg"
              />
            </Card>
          </TabPane>

          {/* Onglet Demandes */}
          <TabPane
            tab={
              <span>
                <ExclamationCircleOutlined />
                Demandes Départements ({pendingRequests.length})
              </span>
            }
            key="requests"
          >
            <Card title="Demandes de Formation des Départements">
              <Table columns={requestColumns} dataSource={pendingRequests} pagination={false} className="mb-4" />
            </Card>
          </TabPane>

          {/* Onglet Exécution */}
          <TabPane
            tab={
              <span>
                <CheckCircleOutlined />
                Suivi Exécution
              </span>
            }
            key="execution"
          >
            <Row gutter={[16, 16]} className="mb-6">
              <Col xs={12} sm={6}>
                <Card className="text-center bg-blue-50 border-blue-200">
                  <Statistic title="En cours" value={3} valueStyle={{ color: "#1890ff", fontSize: "1.5rem" }} />
                </Card>
              </Col>
              <Col xs={12} sm={6}>
                <Card className="text-center bg-green-50 border-green-200">
                  <Statistic title="Terminées" value={8} valueStyle={{ color: "#52c41a", fontSize: "1.5rem" }} />
                </Card>
              </Col>
              <Col xs={12} sm={6}>
                <Card className="text-center bg-orange-50 border-orange-200">
                  <Statistic title="Reportées" value={2} valueStyle={{ color: "#fa8c16", fontSize: "1.5rem" }} />
                </Card>
              </Col>
              <Col xs={12} sm={6}>
                <Card className="text-center bg-red-50 border-red-200">
                  <Statistic title="Annulées" value={1} valueStyle={{ color: "#ff4d4f", fontSize: "1.5rem" }} />
                </Card>
              </Col>
            </Row>

            <Card title="Formations en Cours d'Exécution">
              <List
                dataSource={trainingActions.filter((t) => t.statut === "En cours")}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button key="view" type="link">
                        Suivre
                      </Button>,
                      <Button key="report" type="link">
                        Rapport
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar style={{ backgroundColor: "#1890ff" }}>
                          <CalendarOutlined />
                        </Avatar>
                      }
                      title={item.thematique}
                      description={
                        <div>
                          <div>
                            Département: {item.departement} | Participants: {item.participants}
                          </div>
                          <div>
                            Dates: {item.dates} | Prestataire: {item.cabinet}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
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
                <Card title="Indicateurs de Performance">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-2">92%</div>
                        <div className="text-gray-600">Taux de Réalisation</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-2">4.3/5</div>
                        <div className="text-gray-600">Satisfaction Moyenne</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-2">15j</div>
                        <div className="text-gray-600">Délai Moyen</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-2">74%</div>
                        <div className="text-gray-600">Budget Utilisé</div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="Actions Rapides">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button block icon={<FileTextOutlined />} onClick={() => handleExport("Rapport")}>
                      Rapport Mensuel
                    </Button>
                    <Button block icon={<DownloadOutlined />} onClick={() => handleExport("PDF")}>
                      Export Planning PDF
                    </Button>
                    <Button block icon={<CalendarOutlined />}>
                      Calendrier Formations
                    </Button>
                    <Button block icon={<TeamOutlined />}>
                      Liste Participants
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        {/* Create Training Modal */}
        <Modal
          title="Planifier une Nouvelle Formation"
          open={showCreateModal}
          onCancel={() => setShowCreateModal(false)}
          footer={null}
          width={800}
          className="top-4"
        >
          <Form form={form} layout="vertical" onFinish={handleCreateTraining} className="mt-4">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="titreFormation"
                  label="Titre de la formation"
                  rules={[{ required: true, message: "Veuillez saisir le titre" }]}
                >
                  <Input placeholder="Ex: Formation Excel Avancé" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="departement"
                  label="Département bénéficiaire"
                  rules={[{ required: true, message: "Veuillez sélectionner le département" }]}
                >
                  <Select placeholder="Sélectionner un département">
                    <Option value="IT">IT</Option>
                    <Option value="Commercial">Commercial</Option>
                    <Option value="RH">RH</Option>
                    <Option value="Finance">Finance</Option>
                    <Option value="Production">Production</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="typeCompetence"
                  label="Type de compétence"
                  rules={[{ required: true, message: "Veuillez sélectionner le type" }]}
                >
                  <Select placeholder="Management ou type">
                    <Option value="Management">Management</Option>
                    <Option value="Technique">Technique</Option>
                    <Option value="Soft Skills">Soft Skills</Option>
                    <Option value="Réglementaire">Réglementaire</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="priorite"
                  label="Priorité"
                  rules={[{ required: true, message: "Veuillez sélectionner la priorité" }]}
                >
                  <Select placeholder="Niveau de priorité">
                    <Option value="Critique">Critique</Option>
                    <Option value="Haute">Haute</Option>
                    <Option value="Moyenne">Moyenne</Option>
                    <Option value="Faible">Faible</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="modeFormation"
                  label="Mode de formation"
                  rules={[{ required: true, message: "Veuillez sélectionner le mode" }]}
                >
                  <Select placeholder="Sélectionner le mode">
                    <Option value="Présentiel">Présentiel</Option>
                    <Option value="Distanciel">Distanciel</Option>
                    <Option value="Hybride">Hybride</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="duree" label="Durée" rules={[{ required: true, message: "Veuillez saisir la durée" }]}>
                  <Input placeholder="Ex: 2 jours" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="dateDebut" label="Date de début">
                  <DatePicker className="w-full" placeholder="JJ/MM/AAAA" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="dateFin" label="Date de fin">
                  <DatePicker className="w-full" placeholder="JJ/MM/AAAA" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="coutFormation" label="Coût de formation (€)">
                  <InputNumber
                    className="w-full"
                    placeholder="Ex: 5000"
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="nbParticipants" label="Nombre de participants">
                  <InputNumber className="w-full" placeholder="Ex: 12" min={1} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="organismeFormation" label="Organisme de formation">
              <Select placeholder="Sélectionner un organisme">
                <Option value="cabinet-a">Cabinet Excellence</Option>
                <Option value="cabinet-b">FormaCom</Option>
                <Option value="organisme-c">Agile Academy</Option>
              </Select>
            </Form.Item>

            <Form.Item name="objectifFormation" label="Objectif de formation">
              <TextArea rows={3} placeholder="Saisir les objectifs et le contenu de la formation..." />
            </Form.Item>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button onClick={() => setShowCreateModal(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit" className="bg-green-600 hover:bg-green-700">
                Planifier Formation
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Import Excel Modal */}
        <Modal
          title="Importer des Formations via Excel"
          open={showImportModal}
          onCancel={() => setShowImportModal(false)}
          footer={null}
          width={600}
        >
          <div className="py-4">
            <Upload.Dragger name="file" accept=".xlsx,.xls" beforeUpload={handleImportExcel} showUploadList={false}>
              <p className="ant-upload-drag-icon">
                <ImportOutlined className="text-4xl text-blue-500" />
              </p>
              <p className="ant-upload-text">Cliquez ou glissez un fichier Excel dans cette zone</p>
              <p className="ant-upload-hint">
                Formats supportés: .xlsx, .xls
                <br />
                Taille maximale: 10MB
              </p>
            </Upload.Dragger>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <Text className="text-blue-600">
                <strong>Format requis:</strong> Le fichier Excel doit contenir les colonnes: Titre, Département, Type,
                Durée, Mode, Participants, Budget
              </Text>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default PlanificationExecution
