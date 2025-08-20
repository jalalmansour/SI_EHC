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
} from "@ant-design/icons"

const { Option } = Select
const { Title, Text } = Typography
const { RangePicker } = DatePicker

const Facturation = () => {
  const [billings, setBillings] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingBilling, setEditingBilling] = useState(null)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Sample data
  const sampleBillings = [
    {
      id: 1,
      thematique: "Leadership",
      cout: 25000,
      participants: 3,
      numeroFacture: "INV-2024-001",
      numeroBC: "BC-2024-001",
      numeroConvention: "CONV-2024-001",
      datePaiement: "2024-03-15",
      statut: "Payée",
      fichierFacture: null,
      fichierBC: null,
      fichierConvention: null,
    },
    {
      id: 2,
      thematique: "Cybersécurité",
      cout: 18000,
      participants: 3,
      numeroFacture: "INV-2024-002",
      numeroBC: "BC-2024-002",
      numeroConvention: "CONV-2024-002",
      datePaiement: "2024-03-22",
      statut: "En attente",
      fichierFacture: null,
      fichierBC: null,
      fichierConvention: null,
    },
  ]

  // Training themes
  const themesFormation = [
    "Leadership",
    "Management",
    "Cybersécurité",
    "Développement Web",
    "Gestion de Projet",
    "Communication",
    "Ressources Humaines",
    "Comptabilité",
    "Marketing Digital",
    "Intelligence Artificielle",
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
        statut: "En attente",
      }

      if (editingBilling) {
        setBillings((prev) => prev.map((b) => (b.id === editingBilling.id ? billingData : b)))
        message.success("Facturation modifiée avec succès")
      } else {
        setBillings((prev) => [...prev, billingData])
        message.success("Facturation enregistrée avec succès")
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
      case "Payée":
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
    const facturesEnAttente = billings.filter((b) => b.statut === "En attente").length
    const facturesPayees = billings.filter((b) => b.statut === "Payée").length
    const tauxPaiement = billings.length > 0 ? Math.round((facturesPayees / billings.length) * 100) : 0

    return { totalFacture, facturesEnAttente, tauxPaiement }
  }

  const stats = getStatistics()

  const columns = [
    {
      title: "Thématique",
      dataIndex: "thematique",
      key: "thematique",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Coût (DHS)",
      dataIndex: "cout",
      key: "cout",
      render: (cout) => <Text className="text-green-600 font-semibold">{cout?.toLocaleString()} DHS</Text>,
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
      title: "N° BC",
      dataIndex: "numeroBC",
      key: "numeroBC",
    },
    {
      title: "Date Paiement",
      dataIndex: "datePaiement",
      key: "datePaiement",
      render: (date) => (date ? new Date(date).toLocaleDateString("fr-FR") : "-"),
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
              Facturation
            </Title>
            <Text className="text-gray-600">Gérez les facturations des formations et suivez les paiements</Text>
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

        {/* Billing Form */}
        <Card className="mb-6 shadow-sm">
          <Title level={4} className="mb-4">
            Détails de la Facturation
          </Title>

          <Form layout="vertical" className="mb-4">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Thématique de formation">
                  <Select placeholder="Sélectionner une thématique" size="large">
                    {themesFormation.map((theme) => (
                      <Option key={theme} value={theme}>
                        {theme}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="N° BC (PDF)">
                  <div className="flex space-x-2">
                    <Upload {...uploadProps} className="flex-1">
                      <Button icon={<UploadOutlined />} className="w-full">
                        Choisir un fichier
                      </Button>
                    </Upload>
                    <Text className="text-gray-500 text-sm self-center">Aucun fichier choisi</Text>
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Coût de la thématique de formation HT (€)">
                  <Input placeholder="Ex: 1500" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="N° Convention/Consultation/Marché/... (PDF)">
                  <div className="flex space-x-2">
                    <Upload {...uploadProps} className="flex-1">
                      <Button icon={<UploadOutlined />} className="w-full">
                        Choisir un fichier
                      </Button>
                    </Upload>
                    <Text className="text-gray-500 text-sm self-center">Aucun fichier choisi</Text>
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="N° Facture (PDF)">
                  <div className="flex space-x-2">
                    <Upload {...uploadProps} className="flex-1">
                      <Button icon={<UploadOutlined />} className="w-full">
                        Choisir un fichier
                      </Button>
                    </Upload>
                    <Text className="text-gray-500 text-sm self-center">Aucun fichier choisi</Text>
                  </div>
                </Form.Item>
              </Col>
              <Col xs={24} md={12} className="flex items-end">
                <Button type="primary" size="large" className="bg-teal-600 hover:bg-teal-700 w-full">
                  Enregistrer la Facturation
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* Registered Billings Table */}
        <Card className="mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <Title level={4} className="mb-0">
              5. Facturations Enregistrées
            </Title>
            <Space>
              <Button icon={<DownloadOutlined />}>Exporter</Button>
              <RangePicker />
            </Space>
          </div>

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

        {/* Statistics */}
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={8}>
            <Card className="text-center bg-green-50 border-green-200 shadow-sm">
              <Statistic
                title="Total facturé"
                value={stats.totalFacture}
                suffix="DHS ce mois"
                valueStyle={{ color: "#52c41a", fontSize: "1.8rem", fontWeight: "bold" }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center bg-orange-50 border-orange-200 shadow-sm">
              <Statistic
                title="Factures en attente"
                value={stats.facturesEnAttente}
                suffix="À traiter"
                valueStyle={{ color: "#fa8c16", fontSize: "1.8rem", fontWeight: "bold" }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center bg-blue-50 border-blue-200 shadow-sm">
              <div className="mb-2">
                <Text className="text-gray-600">Taux de paiement</Text>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.tauxPaiement}%</div>
              <Progress percent={stats.tauxPaiement} showInfo={false} strokeColor="#1890ff" className="mb-2" />
              <Text className="text-gray-500 text-sm">Factures payées</Text>
            </Card>
          </Col>
        </Row>

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
                <Form.Item name="cout" label="Coût (DHS)" rules={[{ required: true, message: "Coût requis" }]}>
                  <Input type="number" placeholder="25000" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="participants"
                  label="Nombre de participants"
                  rules={[{ required: true, message: "Nombre de participants requis" }]}
                >
                  <Input type="number" placeholder="3" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="datePaiement" label="Date de paiement">
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
                {editingBilling ? "Modifier" : "Enregistrer"} la Facturation
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default Facturation
