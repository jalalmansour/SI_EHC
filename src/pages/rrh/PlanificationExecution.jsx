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
  Divider,
  Typography,
  Tooltip,
  Progress,
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
} from "@ant-design/icons"

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input
const { RangePicker } = DatePicker

const PlanificationExecution = () => {
  const [form] = Form.useForm()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [selectedTraining, setSelectedTraining] = useState(null)

  // Sample data for training actions
  const trainingActions = [
    {
      key: "1",
      competence: "Compétence Support",
      typeCompetence: "Management",
      thematique: "Leadership",
      typeFormation: "Présentiel",
      duree: "2 jours",
      participants: "12 personnes",
      dates: "22 Mars 2024 - 23 Mars 2024",
      statut: "Planifiée",
      coutFormation: "2500 DH",
      cabinet: "Cabinet A",
      formateur: "M. Dupont",
      programme: "PDF Joint",
    },
    {
      key: "2",
      competence: "Compétence Support",
      typeCompetence: "Cybersécurité",
      thematique: "Sécurité Informatique",
      typeFormation: "Hybride",
      duree: "3 jours",
      participants: "8 personnes",
      dates: "25 Mars 2024 - 27 Mars 2024",
      statut: "En cours",
      coutFormation: "3000 DH",
      cabinet: "Cabinet B",
      formateur: "Mme Martin",
      programme: "Contenu intégré",
    },
    {
      key: "3",
      competence: "Compétence Support",
      typeCompetence: "Communication",
      thematique: "Communication interne",
      typeFormation: "Distanciel",
      duree: "1 jour",
      participants: "15 personnes",
      dates: "—",
      statut: "En attente",
      coutFormation: "—",
      cabinet: "—",
      formateur: "M. Dupont",
      programme: "PDF Joint",
    },
  ]

  const getStatusColor = (status) => {
    const colors = {
      Planifiée: "blue",
      "En cours": "green",
      "En attente": "orange",
      Terminée: "success",
      Reportée: "warning",
      Annulée: "error",
    }
    return colors[status] || "default"
  }

  const columns = [
    {
      title: "Compétence",
      dataIndex: "competence",
      key: "competence",
      width: 120,
    },
    {
      title: "Type Compétence",
      dataIndex: "typeCompetence",
      key: "typeCompetence",
      width: 120,
    },
    {
      title: "Thématique",
      dataIndex: "thematique",
      key: "thematique",
      width: 140,
    },
    {
      title: "Type Formation",
      dataIndex: "typeFormation",
      key: "typeFormation",
      width: 120,
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
      title: "Dates",
      dataIndex: "dates",
      key: "dates",
      width: 180,
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      width: 100,
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Coût Formation",
      dataIndex: "coutFormation",
      key: "coutFormation",
      width: 120,
    },
    {
      title: "Cabinet",
      dataIndex: "cabinet",
      key: "cabinet",
      width: 100,
    },
    {
      title: "Formateur Interne",
      dataIndex: "formateur",
      key: "formateur",
      width: 120,
    },
    {
      title: "Programme Formation (PDF / Intégré)",
      dataIndex: "programme",
      key: "programme",
      width: 180,
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

  const handleCreateTraining = (values) => {
    console.log("Creating training:", values)
    message.success("Formation créée avec succès!")
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
          <Text className="text-gray-600">Responsable RH - Gestion complète</Text>
        </div>

        {/* Action Buttons */}
        <Card className="mb-6 shadow-sm">
          <Title level={4} className="mb-4">
            Actions de Formation
          </Title>
          <Space wrap>
            <Button
              type="primary"
              icon={<CalendarOutlined />}
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-700 border-purple-600"
            >
              Programmer une formation de formation
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Créer une formation de formation
            </Button>
            <Button
              icon={<ImportOutlined />}
              onClick={() => setShowImportModal(true)}
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              Importer via Excel
            </Button>
            <Button
              icon={<ExportOutlined />}
              onClick={() => handleExport("Excel")}
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              Exporter
            </Button>
          </Space>
        </Card>

        {/* Training Actions Table */}
        <Card className="mb-6 shadow-sm">
          <Title level={4} className="mb-4">
            Programmer une Action de Formation
          </Title>
          <Table
            columns={columns}
            dataSource={trainingActions}
            scroll={{ x: 1800 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} formations`,
            }}
            className="border border-gray-200 rounded-lg"
          />
        </Card>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-l-4 border-l-blue-500">
              <Statistic
                title="Formations Programmées"
                value={8}
                valueStyle={{ color: "#1890ff", fontSize: "2rem", fontWeight: "bold" }}
              />
              <Text className="text-gray-500">Actions programmées</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-l-4 border-l-orange-500">
              <Statistic
                title="En Attente de Programmation"
                value={37}
                valueStyle={{ color: "#fa8c16", fontSize: "2rem", fontWeight: "bold" }}
              />
              <Text className="text-gray-500">Actions à programmer</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-l-4 border-l-green-500">
              <Statistic
                title="Participants Inscrits"
                value={127}
                valueStyle={{ color: "#52c41a", fontSize: "2rem", fontWeight: "bold" }}
              />
              <Text className="text-gray-500">Total participants</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="text-center shadow-sm border-l-4 border-l-purple-500">
              <Statistic
                title="Taux de Réalisation"
                value={75}
                suffix="%"
                valueStyle={{ color: "#722ed1", fontSize: "2rem", fontWeight: "bold" }}
              />
              <Progress percent={75} showInfo={false} strokeColor="#722ed1" />
            </Card>
          </Col>
        </Row>

        {/* Execution Tracking */}
        <Card className="shadow-sm">
          <Title level={4} className="mb-4">
            Suivi de l'Exécution
          </Title>
          <Row gutter={[16, 16]} className="mb-4">
            <Col xs={12} sm={6}>
              <Card className="text-center bg-blue-50 border-blue-200">
                <Statistic title="En cours" value={5} valueStyle={{ color: "#1890ff", fontSize: "1.5rem" }} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center bg-green-50 border-green-200">
                <Statistic title="Terminées" value={12} valueStyle={{ color: "#52c41a", fontSize: "1.5rem" }} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center bg-orange-50 border-orange-200">
                <Statistic title="Reportées" value={3} valueStyle={{ color: "#fa8c16", fontSize: "1.5rem" }} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center bg-red-50 border-red-200">
                <Statistic title="Annulées" value={1} valueStyle={{ color: "#ff4d4f", fontSize: "1.5rem" }} />
              </Card>
            </Col>
          </Row>
          <Divider />
          <Space>
            <Button
              icon={<FileTextOutlined />}
              onClick={() => handleExport("Rapport")}
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              Rapport d'exécution
            </Button>
            <Button
              icon={<DownloadOutlined />}
              onClick={() => handleExport("PDF")}
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              Exporter PDF
            </Button>
          </Space>
        </Card>

        {/* Create Training Modal */}
        <Modal
          title="Créer une Nouvelle Formation"
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
                  name="typeCompetence"
                  label="Type de compétence"
                  rules={[{ required: true, message: "Veuillez sélectionner le type" }]}
                >
                  <Select placeholder="Management ou type">
                    <Option value="management">Management</Option>
                    <Option value="technique">Technique</Option>
                    <Option value="communication">Communication</Option>
                    <Option value="cybersecurite">Cybersécurité</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="domaineCompetence"
                  label="Domaine de compétence"
                  rules={[{ required: true, message: "Veuillez sélectionner le domaine" }]}
                >
                  <Select placeholder="Sélectionner un domaine">
                    <Option value="leadership">Leadership</Option>
                    <Option value="gestion-projet">Gestion de projet</Option>
                    <Option value="communication">Communication</Option>
                    <Option value="informatique">Informatique</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="thematique"
                  label="Thématique"
                  rules={[{ required: true, message: "Veuillez saisir la thématique" }]}
                >
                  <Input placeholder="Sélectionner une thématique" />
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
                    <Option value="presentiel">Présentiel</Option>
                    <Option value="distanciel">Distanciel</Option>
                    <Option value="hybride">Hybride</Option>
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
                <Form.Item name="coutFormation" label="Coût de formation (DH)">
                  <InputNumber
                    className="w-full"
                    placeholder="Ex: 5000"
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="formateurInterne" label="Formateur interne">
                  <Select placeholder="Sélectionner un formateur">
                    <Option value="m-dupont">M. Dupont</Option>
                    <Option value="mme-martin">Mme Martin</Option>
                    <Option value="m-bernard">M. Bernard</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="organismeFormation" label="Organisme de formation">
              <Select placeholder="Sélectionner un organisme">
                <Option value="cabinet-a">Cabinet A</Option>
                <Option value="cabinet-b">Cabinet B</Option>
                <Option value="organisme-c">Organisme C</Option>
              </Select>
            </Form.Item>

            <Form.Item name="objectifFormation" label="Objectif de formation">
              <TextArea rows={3} placeholder="Saisir les objectifs et le contenu de la formation..." />
            </Form.Item>

            <Form.Item name="listeParticipants" label="Liste des participants/groupes">
              <Select mode="multiple" placeholder="Ajouter des participants...">
                <Option value="marie-martin">Marie Martin</Option>
                <Option value="jean-bernard">Jean Bernard</Option>
                <Option value="sophie-dubois">Sophie Dubois</Option>
                <Option value="paul-durand">Paul Durand</Option>
                <Option value="claire-moreau">Claire Moreau</Option>
              </Select>
            </Form.Item>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button onClick={() => setShowCreateModal(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit" className="bg-green-600 hover:bg-green-700">
                Créer Action
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
                <strong>Format requis:</strong> Le fichier Excel doit contenir les colonnes: Titre, Type, Domaine,
                Durée, Mode, Formateur, Coût
              </Text>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default PlanificationExecution
