"use client"

import { useEffect } from "react"

import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
  Space,
  Timeline,
  Tooltip,
} from "antd"
import {
  DollarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DownloadOutlined,
  UploadOutlined,
  BellOutlined,
  ExportOutlined,
} from "@ant-design/icons"

const { Option } = Select
const { TextArea } = Input

const FinancementRemboursement = () => {
  const [completedTrainings, setCompletedTrainings] = useState([])
  const [reimbursementRequests, setReimbursementRequests] = useState([])
  const [financingSources, setFinancingSources] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState("") // 'source', 'request', 'process'
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [addSourceModalVisible, setAddSourceModalVisible] = useState(false)
  const [addRequestModalVisible, setAddRequestModalVisible] = useState(false)

  // Sample data for completed trainings
  const sampleCompletedTrainings = [
    {
      id: 1,
      formation: "Leadership Avancé\nCompétence support - Management",
      participants: 12,
      dateFin: "2024-03-17",
      cout: 25000,
      organisme: "Cabinet A",
      statutRemboursement: "Dossier non instruit",
      statutColor: "orange",
      actions: ["Valider"],
    },
    {
      id: 2,
      formation: "Cybersécurité Avancée\nCompétence support - Informatique",
      participants: 8,
      dateFin: "2024-04-23",
      cout: 18000,
      organisme: "Cabinet B",
      statutRemboursement: "Dossier instruit et déposé",
      statutColor: "green",
      actions: ["Validé"],
    },
    {
      id: 3,
      formation: "Communication Digitale\nCompétence support - Communication",
      participants: 15,
      dateFin: "2024-04-28",
      cout: 12000,
      organisme: "M. Dupont (interne)",
      statutRemboursement: "Formation remboursée",
      statutColor: "blue",
      actions: ["Validé"],
    },
    {
      id: 4,
      formation: "Gestion de Projet Agile\nCompétence métier - Management",
      participants: 10,
      dateFin: "2024-05-15",
      cout: 22000,
      organisme: "FormaPro",
      statutRemboursement: "Formation non remboursée",
      statutColor: "red",
      actions: ["Validé"],
    },
  ]

  // Financing sources data
  const sampleFinancingSources = [
    { name: "Budget interne", amount: 35000, color: "#52c41a" },
    { name: "Subventions publiques", amount: 15000, color: "#1890ff" },
    { name: "Partenariats", amount: 8500, color: "#722ed1" },
  ]

  // Reimbursement requests data
  const sampleReimbursementRequests = [
    {
      id: 1,
      formation: "Formation Leadership - Marie Dubois",
      amount: 2500,
      date: "15/03/2024",
      statut: "en-attente",
      statutColor: "orange",
      statutText: "En attente",
    },
    {
      id: 2,
      formation: "Formation Excel - Ahmed Benali",
      amount: 1200,
      date: "12/03/2024",
      statut: "approuve",
      statutColor: "green",
      statutText: "Approuvé",
    },
  ]

  useEffect(() => {
    setCompletedTrainings(sampleCompletedTrainings)
    setReimbursementRequests(sampleReimbursementRequests)
    setFinancingSources(sampleFinancingSources)
  }, [])

  const showModal = (type, record = null) => {
    setModalType(type)
    setIsModalVisible(true)
    if (record) {
      form.setFieldsValue(record)
    } else {
      form.resetFields()
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setModalType("")
    form.resetFields()
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      if (modalType === "source") {
        const newSource = {
          id: Date.now(),
          ...values,
          color: "green",
        }
        setFinancingSources((prev) => [...prev, newSource])
        message.success("Source de financement ajoutée avec succès")
      } else if (modalType === "request") {
        const newRequest = {
          id: Date.now(),
          ...values,
          statut: "En attente",
          statutColor: "orange",
        }
        setReimbursementRequests((prev) => [...prev, newRequest])
        message.success("Demande de remboursement créée avec succès")
      }

      setIsModalVisible(false)
      form.resetFields()
      setModalType("")
    } catch (error) {
      message.error("Erreur lors de l'enregistrement")
    } finally {
      setLoading(false)
    }
  }

  const handleValidateTraining = (id) => {
    setCompletedTrainings((prev) =>
      prev.map((training) =>
        training.id === id
          ? { ...training, statutRemboursement: "Dossier instruit et déposé", statutColor: "green" }
          : training,
      ),
    )
    message.success("Formation validée avec succès")
  }

  const getStatutTag = (statut, color) => {
    const colors = {
      orange: "orange",
      green: "green",
      blue: "blue",
      red: "red",
    }
    return <Tag color={colors[color]}>{statut}</Tag>
  }

  const getStatistics = () => {
    const dossiersInstruits = completedTrainings.filter((t) => t.statutRemboursement.includes("instruit")).length
    const nonInstruits = completedTrainings.filter((t) => t.statutRemboursement.includes("non instruit")).length
    const rembourses = completedTrainings.filter((t) => t.statutRemboursement.includes("remboursée"))
    const nonRembourses = completedTrainings.filter((t) => t.statutRemboursement.includes("non remboursée"))

    const montantRembourse = rembourses.reduce((sum, t) => sum + t.cout, 0)
    const montantNonRembourse = nonRembourses.reduce((sum, t) => sum + t.cout, 0)

    const enAttente = reimbursementRequests.filter((r) => r.statut === "en-attente").length
    const approuves = reimbursementRequests.filter((r) => r.statut === "approuve").length
    const rejetes = reimbursementRequests.filter((r) => r.statut === "rejeté").length

    return {
      dossiersInstruits,
      nonInstruits,
      rembourses: rembourses.length,
      nonRembourses: nonRembourses.length,
      montantRembourse,
      montantNonRembourse,
      enAttente,
      approuves,
      rejetes,
    }
  }

  const stats = getStatistics()
  const totalFinancing = financingSources.reduce((sum, source) => sum + source.amount, 0)

  const completedTrainingsColumns = [
    {
      title: "Formation",
      dataIndex: "formation",
      key: "formation",
      render: (text) => (
        <div>
          {text.split("\n").map((line, index) => (
            <div key={index} className={index === 0 ? "font-medium" : "text-sm text-gray-500"}>
              {line}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
      render: (count) => (
        <div className="flex items-center">
          <span className="text-blue-600 mr-1">👥</span>
          <span>{count} participants</span>
        </div>
      ),
    },
    {
      title: "Date de fin",
      dataIndex: "dateFin",
      key: "dateFin",
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        const isRealized = new Date(date) <= new Date()
        return (
          <div>
            <div>{formattedDate}</div>
            {isRealized && (
              <Tag color="green" className="text-xs mt-1">
                Réalisée
              </Tag>
            )}
          </div>
        )
      },
    },
    {
      title: "Coût (DHS)",
      dataIndex: "cout",
      key: "cout",
      render: (cout) => <span className="font-medium">💰 {cout.toLocaleString()}</span>,
    },
    {
      title: "Organisme/Formateur",
      dataIndex: "organisme",
      key: "organisme",
    },
    {
      title: "Statut Remboursement",
      dataIndex: "statutRemboursement",
      key: "statutRemboursement",
      render: (statut, record) => getStatutTag(statut, record.statutColor),
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
            <Button icon={<EditOutlined />} size="small" />
          </Tooltip>
          {record.statutRemboursement.includes("non instruit") && (
            <Button
              type="primary"
              size="small"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleValidateTraining(record.id)}
            >
              Valider
            </Button>
          )}
          {!record.statutRemboursement.includes("non instruit") && (
            <Tag color="green" className="cursor-default">
              Validé
            </Tag>
          )}
        </Space>
      ),
    },
  ]

  const handleAddSource = (values) => {
    console.log("Add source:", values)
    message.success("Source de financement ajoutée avec succès!")
    setAddSourceModalVisible(false)
    form.resetFields()
  }

  const handleAddRequest = (values) => {
    console.log("Add request:", values)
    message.success("Demande de remboursement créée avec succès!")
    setAddRequestModalVisible(false)
    form.resetFields()
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-teal-600">Financement & Remboursement des formations</h1>
            <p className="text-gray-600">Responsable RH - Traitement des remboursements</p>
          </div>
        </div>

        {/* Top Statistics */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card className="text-center border-l-4 border-l-green-500">
              <div className="flex items-center justify-center mb-2">
                <CheckCircleOutlined className="text-2xl text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Dossiers Instruits</span>
              </div>
              <div className="text-3xl font-bold text-green-600">{stats.dossiersInstruits}</div>
              <div className="text-sm text-gray-500">Dossiers déposés</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center border-l-4 border-l-orange-500">
              <div className="flex items-center justify-center mb-2">
                <ExclamationCircleOutlined className="text-2xl text-orange-500 mr-2" />
                <span className="text-sm text-gray-600">Non Instruits</span>
              </div>
              <div className="text-3xl font-bold text-orange-600">{stats.nonInstruits}</div>
              <div className="text-sm text-gray-500">À traiter</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center border-l-4 border-l-blue-500">
              <div className="flex items-center justify-center mb-2">
                <DollarOutlined className="text-2xl text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">Remboursées</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">{stats.rembourses}</div>
              <div className="text-sm text-gray-500">{stats.montantRembourse.toLocaleString()} DHS</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center border-l-4 border-l-red-500">
              <div className="flex items-center justify-center mb-2">
                <CloseCircleOutlined className="text-2xl text-red-500 mr-2" />
                <span className="text-sm text-gray-600">Non Remboursées</span>
              </div>
              <div className="text-3xl font-bold text-red-600">{stats.nonRembourses}</div>
              <div className="text-sm text-gray-500">{stats.montantNonRembourse.toLocaleString()} DHS</div>
            </Card>
          </Col>
        </Row>

        {/* Main Content Row */}
        <Row gutter={[24, 24]} className="mb-6">
          {/* Sources de Financement */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex items-center">
                  <DollarOutlined className="text-green-500 mr-2" />
                  <span>Sources de Financement</span>
                </div>
              }
              className="shadow-sm h-full"
            >
              <div className="space-y-4 mb-4">
                {financingSources.map((source, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{source.name}</span>
                    <span className="font-bold" style={{ color: source.color }}>
                      {source.amount.toLocaleString()} DHS
                    </span>
                  </div>
                ))}
              </div>
              <Button
                type="primary"
                block
                icon={<PlusOutlined />}
                onClick={() => setAddSourceModalVisible(true)}
                className="bg-green-500 border-green-500 hover:bg-green-600"
              >
                Ajouter une source de financement
              </Button>
            </Card>
          </Col>

          {/* Demandes de Remboursement */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex items-center">
                  <FileTextOutlined className="text-blue-500 mr-2" />
                  <span>Demandes de Remboursement</span>
                </div>
              }
              className="shadow-sm h-full"
            >
              <div className="space-y-4 mb-4">
                {reimbursementRequests.map((request) => (
                  <div key={request.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{request.formation}</div>
                      <Tag color={request.statutColor}>{request.statutText}</Tag>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Montant: {request.amount.toLocaleString()} DHS</div>
                      <div>Date: {new Date(request.date).toLocaleDateString("fr-FR")}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                type="primary"
                block
                icon={<EyeOutlined />}
                className="bg-blue-500 border-blue-500 hover:bg-blue-600"
              >
                Voir toutes les demandes
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Suivi des Remboursements */}
        <Row gutter={16} className="mb-6">
          <Col span={24}>
            <Card title="Suivi des Remboursements">
              <Row gutter={16} className="mb-4">
                <Col span={8}>
                  <Card className="text-center bg-yellow-50 border-yellow-200">
                    <div className="text-4xl font-bold text-yellow-600">{stats.enAttente}</div>
                    <div className="text-sm text-gray-600">En attente</div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="text-center bg-green-50 border-green-200">
                    <div className="text-4xl font-bold text-green-600">{stats.approuves}</div>
                    <div className="text-sm text-gray-600">Approuvés</div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="text-center bg-red-50 border-red-200">
                    <div className="text-4xl font-bold text-red-600">{stats.rejetes}</div>
                    <div className="text-sm text-gray-600">Rejetés</div>
                  </Card>
                </Col>
              </Row>
              <div className="flex justify-center space-x-4">
                <Button icon={<ExportOutlined />}>Exporter le rapport</Button>
                <Button type="primary" icon={<FileTextOutlined />}>
                  Traiter les demandes
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Processus de Remboursement */}
        <Row gutter={[24, 24]} className="mb-6">
          <Col xs={24} lg={12}>
            <Card title="Processus de Remboursement">
              <Timeline
                items={[
                  {
                    dot: <CheckCircleOutlined className="text-green-500" />,
                    color: "green",
                    children: (
                      <>
                        <div className="font-medium">1. Formation réalisée</div>
                        <div className="text-sm text-gray-500">Affichage automatique au lendemain</div>
                      </>
                    )
                  },
                  {
                    dot: <FileTextOutlined className="text-blue-500" />,
                    color: "blue",
                    children: (
                      <>
                        <div className="font-medium">2. Instruction du dossier</div>
                        <div className="text-sm text-gray-500">Qualification par le RRH</div>
                      </>
                    )
                  },
                  {
                    dot: <DollarOutlined className="text-purple-500" />,
                    color: "purple",
                    children: (
                      <>
                        <div className="font-medium">3. Dépôt et suivi</div>
                        <div className="text-sm text-gray-500">Traitement final</div>
                      </>
                    )
                  }
                ]}
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Actions Rapides">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Button
                    block
                    icon={<DownloadOutlined />}
                    className="h-12 flex items-center justify-center"
                    onClick={() => message.info("Export en cours...")}
                  >
                    Exporter rapport remboursements
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    block
                    icon={<FileTextOutlined />}
                    className="h-12 flex items-center justify-center"
                    onClick={() => showModal("request")}
                  >
                    Générer dossier de remboursement
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    block
                    icon={<UploadOutlined />}
                    className="h-12 flex items-center justify-center"
                    onClick={() => message.info("Import en cours...")}
                  >
                    Importer justificatifs
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    block
                    icon={<BellOutlined />}
                    className="h-12 flex items-center justify-center"
                    onClick={() => message.info("Notifications envoyées")}
                  >
                    Notifier les organismes
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Completed Trainings Table */}
        <Card
          title={
            <div className="flex items-center">
              <CheckCircleOutlined className="text-green-500 mr-2" />
              <span>Formations Réalisées - Traitement des Remboursements</span>
            </div>
          }
          extra={
            <div className="text-sm text-gray-600">
              Les formations avec le statut "Réalisée" s'affichent automatiquement au lendemain de leur date de fin.
            </div>
          }
          className="shadow-sm"
        >
          <Table
            columns={completedTrainingsColumns}
            dataSource={completedTrainings}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} formations`,
            }}
          />
        </Card>

        {/* Modals */}
        <Modal
          title={
            modalType === "source"
              ? "Ajouter une source de financement"
              : modalType === "request"
                ? "Créer une demande de remboursement"
                : "Voir les demandes"
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          {modalType === "source" && (
            <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
              <Form.Item name="type" label="Type de financement" rules={[{ required: true, message: "Type requis" }]}>
                <Select placeholder="Sélectionner le type">
                  <Option value="Budget interne">Budget interne</Option>
                  <Option value="Subventions publiques">Subventions publiques</Option>
                  <Option value="Partenariats">Partenariats</Option>
                  <Option value="Fonds européens">Fonds européens</Option>
                </Select>
              </Form.Item>
              <Form.Item name="montant" label="Montant (DHS)" rules={[{ required: true, message: "Montant requis" }]}>
                <Input type="number" placeholder="35000" />
              </Form.Item>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button onClick={handleCancel}>Annuler</Button>
                <Button type="primary" htmlType="submit" loading={loading} className="bg-green-600 hover:bg-green-700">
                  Ajouter
                </Button>
              </div>
            </Form>
          )}

          {modalType === "request" && (
            <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
              <Form.Item name="formation" label="Formation" rules={[{ required: true, message: "Formation requise" }]}>
                <Input placeholder="Formation Leadership - Marie Dubois" />
              </Form.Item>
              <Form.Item name="montant" label="Montant (DHS)" rules={[{ required: true, message: "Montant requis" }]}>
                <Input type="number" placeholder="2500" />
              </Form.Item>
              <Form.Item name="date" label="Date de demande" rules={[{ required: true, message: "Date requise" }]}>
                <Input placeholder="15/03/2024" />
              </Form.Item>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button onClick={handleCancel}>Annuler</Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Créer la demande
                </Button>
              </div>
            </Form>
          )}

          {modalType === "requests" && (
            <div className="mt-4">
              <div className="space-y-4">
                {reimbursementRequests.map((request) => (
                  <Card key={request.id} size="small">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{request.formation}</span>
                        <br />
                        <span className="text-gray-500">
                          {request.amount.toLocaleString()} DHS - {new Date(request.date).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <Tag color={request.statutColor}>{request.statutText}</Tag>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Modal>

        {/* Add Source Modal */}
        <Modal
          title="Ajouter une source de financement"
          open={addSourceModalVisible}
          onCancel={() => setAddSourceModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={form} onFinish={handleAddSource} layout="vertical">
            <Form.Item
              name="name"
              label="Nom de la source"
              rules={[{ required: true, message: "Veuillez saisir le nom de la source" }]}
            >
              <Input placeholder="Ex: Budget formation 2024" />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type de financement"
              rules={[{ required: true, message: "Veuillez sélectionner le type" }]}
            >
              <Select placeholder="Sélectionner le type">
                <Option value="budget-interne">Budget interne</Option>
                <Option value="subvention">Subvention publique</Option>
                <Option value="partenariat">Partenariat</Option>
                <Option value="autre">Autre</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Montant (DHS)"
              rules={[{ required: true, message: "Veuillez saisir le montant" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="0"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <TextArea rows={3} placeholder="Description de la source de financement (optionnel)" />
            </Form.Item>

            <Form.Item className="mb-0 text-right">
              <Space>
                <Button onClick={() => setAddSourceModalVisible(false)}>Annuler</Button>
                <Button type="primary" htmlType="submit">
                  Ajouter
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Add Request Modal */}
        <Modal
          title="Créer une demande de remboursement"
          open={addRequestModalVisible}
          onCancel={() => setAddRequestModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={form} onFinish={handleAddRequest} layout="vertical">
            <Form.Item
              name="formation"
              label="Formation"
              rules={[{ required: true, message: "Veuillez sélectionner la formation" }]}
            >
              <Select placeholder="Sélectionner la formation">
                <Option value="leadership">Formation Leadership - Marie Dubois</Option>
                <Option value="excel">Formation Excel - Ahmed Benali</Option>
                <Option value="management">Formation Management - Sophie Martin</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="participant"
              label="Participant"
              rules={[{ required: true, message: "Veuillez saisir le nom du participant" }]}
            >
              <Input placeholder="Nom du participant" />
            </Form.Item>

            <Form.Item
              name="amount"
              label="Montant à rembourser (DHS)"
              rules={[{ required: true, message: "Veuillez saisir le montant" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="0"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item
              name="justification"
              label="Justification"
              rules={[{ required: true, message: "Veuillez saisir la justification" }]}
            >
              <TextArea rows={3} placeholder="Justification de la demande de remboursement" />
            </Form.Item>

            <Form.Item className="mb-0 text-right">
              <Space>
                <Button onClick={() => setAddRequestModalVisible(false)}>Annuler</Button>
                <Button type="primary" htmlType="submit">
                  Créer la demande
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default FinancementRemboursement
