"use client"

import { useState, useEffect } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Tag,
  Space,
  Statistic,
  message,
  Tooltip,
  Typography,
  DatePicker,
  Progress,
  Alert,
  Tabs,
  List,
  Avatar,
} from "antd"
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"

const { Option } = Select
const { Title, Text } = Typography
const { RangePicker } = DatePicker
const { TabPane } = Tabs

const Facturation = () => {
  const [billings, setBillings] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingBilling, setEditingBilling] = useState(null)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Sample data for RF billing view
  const sampleBillings = [
    {
      id: 1,
      thematique: "Leadership",
      cout: 2500,
      participants: 12,
      numeroFacture: "INV-2024-001",
      numeroBC: "BC-2024-001",
      numeroConvention: "CONV-2024-001",
      datePaiement: "2024-03-15",
      statut: "Validée RRH",
      fichierFacture: "facture_001.pdf",
      prestataire: "Cabinet Excellence",
      departement: "IT",
      dateFormation: "2024-03-22",
      rfValidation: "Approuvée",
    },
    {
      id: 2,
      thematique: "Communication",
      cout: 1800,
      participants: 15,
      numeroFacture: "INV-2024-002",
      numeroBC: "BC-2024-002",
      numeroConvention: "CONV-2024-002",
      datePaiement: "2024-03-22",
      statut: "En attente paiement",
      fichierFacture: "facture_002.pdf",
      prestataire: "FormaCom",
      departement: "Commercial",
      dateFormation: "2024-03-25",
      rfValidation: "Approuvée",
    },
    {
      id: 3,
      thematique: "Gestion de projet",
      cout: 3200,
      participants: 8,
      numeroFacture: "INV-2024-003",
      numeroBC: "BC-2024-003",
      numeroConvention: "CONV-2024-003",
      datePaiement: null,
      statut: "En attente validation RF",
      fichierFacture: null,
      prestataire: "Agile Academy",
      departement: "IT",
      dateFormation: "2024-04-10",
      rfValidation: "En attente",
    },
  ]

  // Training themes for RF
  const themesFormation = [
    "Leadership",
    "Management",
    "Communication",
    "Gestion de Projet",
    "Soft Skills",
    "Développement Personnel",
    "Team Building",
    "Négociation",
    "Présentation",
    "Coaching",
  ]

  useEffect(() => {
    setBillings(sampleBillings)
  }, [])

  const showModal = (billing = null) => {
    setEditingBilling(billing)
    setIsModalVisible(true)
    if (billing) {
      form.setFieldsValue({
        ...billing,
        datePaiement: billing.datePaiement ? new Date(billing.datePaiement) : null,
      })
    } else {
      form.resetFields()
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingBilling(null)
    form.resetFields()
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const billingData = {
        ...values,
        id: editingBilling ? editingBilling.id : Date.now(),
        datePaiement: values.datePaiement ? values.datePaiement.format("YYYY-MM-DD") : null,
        statut: "En attente validation RF",
        rfValidation: "En attente",
      }

      if (editingBilling) {
        setBillings((prev) => prev.map((b) => (b.id === editingBilling.id ? billingData : b)))
        message.success("Facturation modifiée avec succès")
      } else {
        setBillings((prev) => [...prev, billingData])
        message.success("Facturation soumise pour validation")
      }

      setIsModalVisible(false)
      form.resetFields()
      setEditingBilling(null)
    } catch (error) {
      message.error("Erreur lors de l'enregistrement")
    } finally {
      setLoading(false)
    }
  }

  const handleValidate = (id, action) => {
    setBillings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              rfValidation: action === "approve" ? "Approuvée" : "Rejetée",
              statut: action === "approve" ? "Validée RF" : "Rejetée RF",
            }
          : b,
      ),
    )
    message.success(`Facturation ${action === "approve" ? "approuvée" : "rejetée"}`)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Confirmer la suppression",
      content: "Êtes-vous sûr de vouloir supprimer cette facturation ?",
      okText: "Supprimer",
      cancelText: "Annuler",
      okType: "danger",
      onOk: () => {
        setBillings((prev) => prev.filter((b) => b.id !== id))
        message.success("Facturation supprimée avec succès")
      },
    })
  }

  const getStatutColor = (statut) => {
    switch (statut) {
      case "Validée RRH":
        return "green"
      case "Validée RF":
        return "blue"
      case "En attente validation RF":
        return "orange"
      case "En attente paiement":
        return "purple"
      case "Rejetée RF":
        return "red"
      default:
        return "default"
    }
  }

  const getValidationColor = (validation) => {
    switch (validation) {
      case "Approuvée":
        return "green"
      case "En attente":
        return "orange"
      case "Rejetée":
        return "red"
      default:
        return "default"
    }
  }

  const getStatistics = () => {
    const totalFacture = billings.reduce((sum, b) => sum + (b.cout || 0), 0)
    const facturesEnAttente = billings.filter((b) => b.rfValidation === "En attente").length
    const facturesApprouvees = billings.filter((b) => b.rfValidation === "Approuvée").length
    const tauxValidation = billings.length > 0 ? Math.round((facturesApprouvees / billings.length) * 100) : 0

    return { totalFacture, facturesEnAttente, tauxValidation, facturesApprouvees }
  }

  const stats = getStatistics()

  const columns = [
    {
      title: "Formation",
      dataIndex: "thematique",
      key: "thematique",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text className="text-gray-500 text-xs">{record.prestataire}</Text>
        </div>
      ),
    },
    {
      title: "Département",
      dataIndex: "departement",
      key: "departement",
      render: (dept) => <Tag color="blue">{dept}</Tag>,
    },
    {
      title: "Coût (€)",
      dataIndex: "cout",
      key: "cout",
      render: (cout) => <Text className="text-green-600 font-semibold">{cout?.toLocaleString()} €</Text>,
      sorter: (a, b) => a.cout - b.cout,
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
      render: (participants) => `${participants} personnes`,
    },
    {
      title: "N° Facture",
      dataIndex: "numeroFacture",
      key: "numeroFacture",
    },
    {
      title: "Date Formation",
      dataIndex: "dateFormation",
      key: "dateFormation",
      render: (date) => (date ? new Date(date).toLocaleDateString("fr-FR") : "-"),
    },
    {
      title: "Validation RF",
      dataIndex: "rfValidation",
      key: "rfValidation",
      render: (validation) => <Tag color={getValidationColor(validation)}>{validation}</Tag>,
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (statut) => <Tag color={getStatutColor(statut)}>{statut}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir les détails">
            <Button icon={<EyeOutlined />} size="small" />
          </Tooltip>
          {record.rfValidation === "En attente" && (
            <>
              <Tooltip title="Approuver">
                <Button
                  icon={<CheckCircleOutlined />}
                  size="small"
                  type="primary"
                  onClick={() => handleValidate(record.id, "approve")}
                />
              </Tooltip>
              <Tooltip title="Rejeter">
                <Button
                  icon={<ExclamationCircleOutlined />}
                  size="small"
                  danger
                  onClick={() => handleValidate(record.id, "reject")}
                />
              </Tooltip>
            </>
          )}
          <Tooltip title="Modifier">
            <Button icon={<EditOutlined />} size="small" onClick={() => showModal(record)} />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Button icon={<DeleteOutlined />} size="small" danger onClick={() => handleDelete(record.id)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const uploadProps = {
    beforeUpload: (file) => {
      const isValidType = file.type === "application/pdf" || file.type.includes("document")
      if (!isValidType) {
        message.error("Seuls les fichiers PDF et DOC sont autorisés!")
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        message.error("Le fichier doit faire moins de 10MB!")
      }
      return false // Prevent automatic upload
    },
    showUploadList: {
      showRemoveIcon: true,
      showDownloadIcon: true,
    },
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2} className="mb-2">
              Gestion de la Facturation
            </Title>
            <Text className="text-gray-600">Responsable Formation - Validation et suivi des facturations</Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            size="large"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Nouvelle Facturation
          </Button>
        </div>

        {/* Alerts */}
        {stats.facturesEnAttente > 0 && (
          <Alert
            message="Facturations en attente"
            description={`${stats.facturesEnAttente} facturation(s) nécessitent votre validation avant transmission aux RRH.`}
            type="warning"
            showIcon
            className="mb-6"
            closable
          />
        )}

        {/* Statistics */}
        <Row gutter={[24, 16]} className="mb-6">
          <Col xs={24} sm={8}>
            <Card className="text-center bg-blue-50 border-blue-200 shadow-sm">
              <Statistic
                title="Total Facturations"
                value={stats.totalFacture}
                suffix="€ ce mois"
                valueStyle={{ color: "#1890ff", fontSize: "1.8rem", fontWeight: "bold" }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center bg-orange-50 border-orange-200 shadow-sm">
              <Statistic
                title="En attente validation"
                value={stats.facturesEnAttente}
                suffix="À traiter"
                valueStyle={{ color: "#fa8c16", fontSize: "1.8rem", fontWeight: "bold" }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center bg-green-50 border-green-200 shadow-sm">
              <div className="mb-2">
                <Text className="text-gray-600">Taux de validation</Text>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.tauxValidation}%</div>
              <Progress percent={stats.tauxValidation} showInfo={false} strokeColor="#52c41a" className="mb-2" />
              <Text className="text-gray-500 text-sm">Facturations approuvées</Text>
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="facturations" type="card">
          {/* Onglet Facturations */}
          <TabPane
            tab={
              <span>
                <FileTextOutlined />
                Facturations
              </span>
            }
            key="facturations"
          >
            <Card
              title="Facturations des Formations"
              extra={
                <Space>
                  <Button icon={<DownloadOutlined />}>Exporter</Button>
                  <RangePicker />
                </Space>
              }
            >
              <Table
                columns={columns}
                dataSource={billings}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} facturations`,
                }}
                className="shadow-sm"
              />
            </Card>
          </TabPane>

          {/* Onglet En Attente */}
          <TabPane
            tab={
              <span>
                <ExclamationCircleOutlined />
                En Attente ({stats.facturesEnAttente})
              </span>
            }
            key="pending"
          >
            <Card title="Facturations en Attente de Validation">
              <List
                dataSource={billings.filter((b) => b.rfValidation === "En attente")}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        key="approve"
                        type="primary"
                        size="small"
                        icon={<CheckCircleOutlined />}
                        onClick={() => handleValidate(item.id, "approve")}
                      >
                        Approuver
                      </Button>,
                      <Button
                        key="reject"
                        danger
                        size="small"
                        icon={<ExclamationCircleOutlined />}
                        onClick={() => handleValidate(item.id, "reject")}
                      >
                        Rejeter
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar style={{ backgroundColor: "#faad14" }}>
                          <FileTextOutlined />
                        </Avatar>
                      }
                      title={
                        <div>
                          <span style={{ fontWeight: "bold" }}>{item.thematique}</span>
                          <Tag color="blue" style={{ marginLeft: "8px" }}>
                            {item.departement}
                          </Tag>
                        </div>
                      }
                      description={
                        <div>
                          <div>
                            <strong>Prestataire:</strong> {item.prestataire}
                          </div>
                          <div>
                            <strong>Montant:</strong> {item.cout.toLocaleString()}€ | <strong>Participants:</strong>{" "}
                            {item.participants}
                          </div>
                          <div>
                            <strong>N° Facture:</strong> {item.numeroFacture}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          {/* Onglet Historique */}
          <TabPane
            tab={
              <span>
                <CheckCircleOutlined />
                Historique
              </span>
            }
            key="history"
          >
            <Card title="Historique des Validations">
              <List
                dataSource={billings.filter((b) => b.rfValidation !== "En attente")}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: item.rfValidation === "Approuvée" ? "#52c41a" : "#ff4d4f",
                          }}
                        >
                          {item.rfValidation === "Approuvée" ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
                        </Avatar>
                      }
                      title={
                        <div>
                          <span style={{ fontWeight: "bold" }}>{item.thematique}</span>
                          <Tag color={getValidationColor(item.rfValidation)} style={{ marginLeft: "8px" }}>
                            {item.rfValidation}
                          </Tag>
                        </div>
                      }
                      description={
                        <div>
                          <div>
                            <strong>Département:</strong> {item.departement} | <strong>Montant:</strong>{" "}
                            {item.cout.toLocaleString()}€
                          </div>
                          <div>
                            <strong>Statut actuel:</strong> {item.statut}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>
        </Tabs>

        {/* Add/Edit Modal */}
        <Modal
          title={
            <div className="flex items-center">
              <FileTextOutlined className="mr-2" />
              {editingBilling ? "Modifier la Facturation" : "Nouvelle Facturation"}
            </div>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={700}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="thematique"
                  label="Thématique de formation"
                  rules={[{ required: true, message: "Thématique requise" }]}
                >
                  <Select placeholder="Sélectionner une thématique">
                    {themesFormation.map((theme) => (
                      <Option key={theme} value={theme}>
                        {theme}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="departement"
                  label="Département"
                  rules={[{ required: true, message: "Département requis" }]}
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
                <Form.Item name="cout" label="Coût (€)" rules={[{ required: true, message: "Coût requis" }]}>
                  <Input type="number" placeholder="2500" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="participants"
                  label="Nombre de participants"
                  rules={[{ required: true, message: "Nombre de participants requis" }]}
                >
                  <Input type="number" placeholder="12" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="prestataire"
                  label="Prestataire"
                  rules={[{ required: true, message: "Prestataire requis" }]}
                >
                  <Input placeholder="Cabinet Excellence" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="dateFormation" label="Date de formation">
                  <DatePicker className="w-full" format="DD/MM/YYYY" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="numeroFacture"
                  label="Numéro de facture"
                  rules={[{ required: true, message: "Numéro de facture requis" }]}
                >
                  <Input placeholder="INV-2024-001" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="numeroBC" label="Numéro BC" rules={[{ required: true, message: "Numéro BC requis" }]}>
                  <Input placeholder="BC-2024-001" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="numeroConvention" label="Numéro Convention/Consultation/Marché">
              <Input placeholder="CONV-2024-001" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Fichier Facture (PDF)">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />} className="w-full">
                      Choisir fichier
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Fichier BC (PDF)">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />} className="w-full">
                      Choisir fichier
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Fichier Convention (PDF)">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />} className="w-full">
                      Choisir fichier
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button onClick={handleCancel}>Annuler</Button>
              <Button type="primary" htmlType="submit" loading={loading} className="bg-blue-600 hover:bg-blue-700">
                {editingBilling ? "Modifier" : "Soumettre"} la Facturation
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default Facturation
