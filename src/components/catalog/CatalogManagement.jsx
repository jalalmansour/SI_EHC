"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  Modal,
  Space,
  Tag,
  message,
  InputNumber,
  Switch,
  Tabs,
  Alert,
  Upload,
  Row,
  Col,
  Tooltip,
  Popconfirm,
  Badge,
} from "antd"
import {
  PlusOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
  DownloadOutlined,
  EyeOutlined,
  DeleteOutlined,
  BookOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import moment from "moment"
import {
  fetchCatalogItems,
  createCatalogItem,
  updateCatalogItemThunk,
  approveCatalogItem,
  rejectCatalogItem,
} from "../../redux/thunks/catalogThunks"
import { exportToExcel, importFromExcel } from "../../utils/excelUtils"

const { Option } = Select
const { TextArea } = Input
const { TabPane } = Tabs

const CatalogManagement = React.memo(() => {
  const dispatch = useDispatch()
  const { catalogItems, categories, providers, loading, error, statistics, filters } = useSelector(
    (state) => state.catalog,
  )
  const { user } = useSelector((state) => state.auth)

  const [modalVisible, setModalVisible] = useState(false)
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState("planned")

  useEffect(() => {
    dispatch(fetchCatalogItems(filters))
  }, [dispatch, filters])

  const handleCreateItem = async (values) => {
    try {
      const itemData = {
        ...values,
        createdBy: user.id,
        createdAt: moment().toISOString(),
        status: "PENDING_APPROVAL",
      }

      await dispatch(createCatalogItem(itemData)).unwrap()
      setModalVisible(false)
      form.resetFields()
      message.success("Formation ajoutée au catalogue")
    } catch (error) {
      message.error("Erreur lors de l'ajout")
    }
  }

  const handleUpdateItem = async (values) => {
    try {
      await dispatch(
        updateCatalogItemThunk({
          id: selectedItem.id,
          data: values,
        }),
      ).unwrap()

      setModalVisible(false)
      setSelectedItem(null)
      form.resetFields()
      message.success("Formation modifiée")
    } catch (error) {
      message.error("Erreur lors de la modification")
    }
  }

  const handleApprove = async (itemId) => {
    try {
      await dispatch(approveCatalogItem(itemId)).unwrap()
      message.success("Formation approuvée")
    } catch (error) {
      message.error("Erreur lors de l'approbation")
    }
  }

  const handleReject = async (itemId, reason) => {
    try {
      await dispatch(rejectCatalogItem({ itemId, reason })).unwrap()
      message.success("Formation rejetée")
    } catch (error) {
      message.error("Erreur lors du rejet")
    }
  }

  const handleExcelImport = async (file) => {
    try {
      const result = await importFromExcel(file)
      // Process and validate imported data
      const validItems = result.data.filter((item) => item.Titre && item.Description)

      for (const item of validItems) {
        const catalogItem = {
          title: item.Titre,
          description: item.Description,
          category: item.Catégorie || "Général",
          type: item.Type === "PLANNED" ? "PLANNED" : "UNPLANNED",
          duration: Number.parseInt(item["Durée (heures)"]) || 8,
          maxParticipants: Number.parseInt(item["Participants max"]) || 10,
          cost: Number.parseFloat(item["Coût (DHS)"]) || 0,
          provider: item.Prestataire || "Interne",
          isExternal: item.Externe === "OUI",
          prerequisites: item.Prérequis ? item.Prérequis.split(",").map((p) => p.trim()) : [],
          objectives: item.Objectifs ? item.Objectifs.split(",").map((o) => o.trim()) : [],
          targetAudience: item["Public cible"] ? item["Public cible"].split(",").map((t) => t.trim()) : [],
          skills: item.Compétences ? item.Compétences.split(",").map((s) => s.trim()) : [],
          createdBy: user.id,
          status: "PENDING_APPROVAL",
        }

        await dispatch(createCatalogItem(catalogItem)).unwrap()
      }

      message.success(`${validItems.length} formations importées`)
    } catch (error) {
      message.error("Erreur lors de l'import")
    }
    return false
  }

  const handleExcelExport = () => {
    const exportData = catalogItems.map((item) => ({
      Titre: item.title,
      Description: item.description,
      Catégorie: item.category,
      Type: item.type === "PLANNED" ? "Planifiée" : "Non planifiée",
      "Durée (heures)": item.duration,
      "Participants max": item.maxParticipants,
      "Coût (DHS)": item.cost,
      Prestataire: item.provider,
      Externe: item.isExternal ? "OUI" : "NON",
      Prérequis: item.prerequisites?.join(", ") || "",
      Objectifs: item.objectives?.join(", ") || "",
      "Public cible": item.targetAudience?.join(", ") || "",
      Compétences: item.skills?.join(", ") || "",
      Statut: item.status,
      "Créé par": item.createdBy,
      "Date création": moment(item.createdAt).format("DD/MM/YYYY"),
    }))

    if (exportToExcel(exportData, `catalogue_formations_${moment().format("YYYY-MM-DD")}.xlsx`)) {
      message.success("Catalogue exporté avec succès")
    }
  }

  const getFilteredItems = useCallback(() => {
    let filtered = catalogItems

    switch (activeTab) {
      case "planned":
        filtered = catalogItems.filter((item) => item.type === "PLANNED")
        break
      case "unplanned":
        filtered = catalogItems.filter((item) => item.type === "UNPLANNED")
        break
      case "pending":
        filtered = catalogItems.filter((item) => item.status === "PENDING_APPROVAL")
        break
      case "approved":
        filtered = catalogItems.filter((item) => item.status === "APPROVED")
        break
      default:
        filtered = catalogItems
    }

    return filtered
  }, [catalogItems, activeTab])

  const columns = [
    {
      title: "Formation",
      key: "training",
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.title}</div>
          <div className="text-sm text-gray-500 mb-1">{record.description}</div>
          <div className="flex flex-wrap gap-1">
            <Tag color={record.type === "PLANNED" ? "blue" : "orange"}>
              {record.type === "PLANNED" ? "Planifiée" : "Non planifiée"}
            </Tag>
            <Tag color="purple">{record.category}</Tag>
            {record.isExternal && <Tag color="green">Externe</Tag>}
          </div>
        </div>
      ),
    },
    {
      title: "Détails",
      key: "details",
      render: (_, record) => (
        <div className="text-sm space-y-1">
          <div className="flex items-center">
            <BookOutlined className="mr-1" />
            {record.duration}h
          </div>
          <div className="flex items-center">
            <TeamOutlined className="mr-1" />
            Max: {record.maxParticipants}
          </div>
          <div className="font-medium">{record.cost.toLocaleString()} DHS</div>
          <div className="text-gray-500">{record.provider}</div>
        </div>
      ),
    },
    {
      title: "Compétences",
      dataIndex: "skills",
      key: "skills",
      render: (skills) => (
        <div>
          {skills?.slice(0, 2).map((skill) => (
            <Tag key={skill} size="small" color="cyan">
              {skill}
            </Tag>
          ))}
          {skills?.length > 2 && (
            <Tag size="small" color="default">
              +{skills.length - 2}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          DRAFT: "default",
          PENDING_APPROVAL: "orange",
          APPROVED: "green",
          REJECTED: "red",
        }
        const labels = {
          DRAFT: "Brouillon",
          PENDING_APPROVAL: "En attente",
          APPROVED: "Approuvée",
          REJECTED: "Rejetée",
        }
        return <Tag color={colors[status]}>{labels[status]}</Tag>
      },
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
              size="small"
              onClick={() => {
                setSelectedItem(record)
                setDetailModalVisible(true)
              }}
            />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                setSelectedItem(record)
                form.setFieldsValue({
                  title: record.title,
                  description: record.description,
                  category: record.category,
                  type: record.type,
                  duration: record.duration,
                  maxParticipants: record.maxParticipants,
                  cost: record.cost,
                  provider: record.provider,
                  isExternal: record.isExternal,
                  prerequisites: record.prerequisites,
                  objectives: record.objectives,
                  targetAudience: record.targetAudience,
                  skills: record.skills,
                })
                setModalVisible(true)
              }}
            />
          </Tooltip>
          {record.status === "PENDING_APPROVAL" && (
            <>
              <Tooltip title="Approuver">
                <Button type="text" icon={<CheckOutlined />} size="small" onClick={() => handleApprove(record.id)} />
              </Tooltip>
              <Tooltip title="Rejeter">
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  size="small"
                  danger
                  onClick={() => {
                    Modal.confirm({
                      title: "Rejeter cette formation",
                      content: (
                        <div>
                          <p>Êtes-vous sûr de vouloir rejeter cette formation ?</p>
                          <Input.TextArea
                            placeholder="Raison du rejet (optionnel)"
                            onChange={(e) => {
                              Modal.confirm.reason = e.target.value
                            }}
                          />
                        </div>
                      ),
                      onOk: () => handleReject(record.id, Modal.confirm.reason || "Aucune raison spécifiée"),
                    })
                  }}
                />
              </Tooltip>
            </>
          )}
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cette formation ?"
            onConfirm={() => {
              // Handle delete
              message.success("Formation supprimée")
            }}
          >
            <Tooltip title="Supprimer">
              <Button type="text" icon={<DeleteOutlined />} size="small" danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Catalogue de Formation</h1>
            <p className="text-gray-600">Gérez le catalogue des formations planifiées et non planifiées</p>
          </div>
          <Space>
            <Upload accept=".xlsx,.xls" beforeUpload={handleExcelImport} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Import Excel</Button>
            </Upload>
            <Button icon={<DownloadOutlined />} onClick={handleExcelExport}>
              Export Excel
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
              Nouvelle Formation
            </Button>
          </Space>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={12} sm={6}>
          <Card>
            <div className="flex items-center">
              <BookOutlined className="text-2xl text-blue-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{statistics.totalItems}</div>
                <div className="text-gray-500">Total Formations</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <div className="flex items-center">
              <CheckOutlined className="text-2xl text-green-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{statistics.approvedItems}</div>
                <div className="text-gray-500">Approuvées</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <div className="flex items-center">
              <CloseOutlined className="text-2xl text-orange-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{statistics.pendingApproval}</div>
                <div className="text-gray-500">En Attente</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <div className="flex items-center">
              <TeamOutlined className="text-2xl text-purple-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">
                  {catalogItems.reduce((sum, item) => sum + (item.maxParticipants || 0), 0)}
                </div>
                <div className="text-gray-500">Capacité Totale</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Pending Approvals Alert */}
      {statistics.pendingApproval > 0 && (
        <Alert
          message="Validations en attente"
          description={`${statistics.pendingApproval} formations en attente de validation`}
          type="warning"
          showIcon
          className="mb-6"
        />
      )}

      {/* Catalog Tabs */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Formations Planifiées" key="planned">
            <Table
              columns={columns}
              dataSource={getFilteredItems()}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </TabPane>
          <TabPane tab="Formations Non Planifiées" key="unplanned">
            <Table
              columns={columns}
              dataSource={getFilteredItems()}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </TabPane>
          <TabPane
            tab={
              <Badge count={statistics.pendingApproval} size="small">
                Validations
              </Badge>
            }
            key="pending"
          >
            <Alert
              message="Validations en attente"
              description="Ces formations nécessitent votre validation avant d'être ajoutées au catalogue."
              type="info"
              showIcon
              className="mb-4"
            />
            <Table
              columns={columns}
              dataSource={getFilteredItems()}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </TabPane>
          <TabPane tab="Approuvées" key="approved">
            <Table
              columns={columns}
              dataSource={getFilteredItems()}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={selectedItem ? "Modifier la Formation" : "Nouvelle Formation"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          setSelectedItem(null)
          form.resetFields()
        }}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={selectedItem ? handleUpdateItem : handleCreateItem}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Titre de la Formation"
                name="title"
                rules={[{ required: true, message: "Titre requis" }]}
              >
                <Input placeholder="Formation Leadership Avancé" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Type" name="type" rules={[{ required: true, message: "Type requis" }]}>
                <Select placeholder="Type de formation">
                  <Option value="PLANNED">Planifiée</Option>
                  <Option value="UNPLANNED">Non planifiée</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description requise" }]}
          >
            <TextArea rows={3} placeholder="Description détaillée de la formation..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Catégorie" name="category" rules={[{ required: true, message: "Catégorie requise" }]}>
                <Select placeholder="Catégorie">
                  <Option value="Technique">Technique</Option>
                  <Option value="Management">Management</Option>
                  <Option value="Soft Skills">Soft Skills</Option>
                  <Option value="Sécurité">Sécurité</Option>
                  <Option value="Réglementaire">Réglementaire</Option>
                  <Option value="Qualité">Qualité</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Durée (heures)" name="duration" rules={[{ required: true, message: "Durée requise" }]}>
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Participants Max"
                name="maxParticipants"
                rules={[{ required: true, message: "Nombre requis" }]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Prestataire"
                name="provider"
                rules={[{ required: true, message: "Prestataire requis" }]}
              >
                <Input placeholder="Nom du prestataire" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Coût (DHS)" name="cost" rules={[{ required: true, message: "Coût requis" }]}>
                <InputNumber min={0} className="w-full" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Externe" name="isExternal" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Prérequis" name="prerequisites">
            <Select mode="tags" placeholder="Ajouter les prérequis" />
          </Form.Item>

          <Form.Item label="Objectifs" name="objectives">
            <Select mode="tags" placeholder="Ajouter les objectifs" />
          </Form.Item>

          <Form.Item label="Public Cible" name="targetAudience">
            <Select mode="tags" placeholder="Ajouter le public cible" />
          </Form.Item>

          <Form.Item label="Compétences Développées" name="skills">
            <Select mode="tags" placeholder="Ajouter les compétences" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                onClick={() => {
                  setModalVisible(false)
                  setSelectedItem(null)
                  form.resetFields()
                }}
              >
                Annuler
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {selectedItem ? "Modifier" : "Créer"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Détails de la Formation"
        open={detailModalVisible}
        onCancel={() => {
          setDetailModalVisible(false)
          setSelectedItem(null)
        }}
        footer={null}
        width={600}
      >
        {selectedItem && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">{selectedItem.title}</h3>
              <p className="text-gray-600">{selectedItem.description}</p>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <div className="space-y-2">
                  <div>
                    <strong>Catégorie:</strong> {selectedItem.category}
                  </div>
                  <div>
                    <strong>Type:</strong> {selectedItem.type === "PLANNED" ? "Planifiée" : "Non planifiée"}
                  </div>
                  <div>
                    <strong>Durée:</strong> {selectedItem.duration} heures
                  </div>
                  <div>
                    <strong>Participants max:</strong> {selectedItem.maxParticipants}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="space-y-2">
                  <div>
                    <strong>Coût:</strong> {selectedItem.cost?.toLocaleString()} DHS
                  </div>
                  <div>
                    <strong>Prestataire:</strong> {selectedItem.provider}
                  </div>
                  <div>
                    <strong>Externe:</strong> {selectedItem.isExternal ? "Oui" : "Non"}
                  </div>
                  <div>
                    <strong>Statut:</strong>
                    <Tag color={selectedItem.status === "APPROVED" ? "green" : "orange"} className="ml-2">
                      {selectedItem.status === "APPROVED" ? "Approuvée" : "En attente"}
                    </Tag>
                  </div>
                </div>
              </Col>
            </Row>

            {selectedItem.prerequisites?.length > 0 && (
              <div>
                <strong>Prérequis:</strong>
                <div className="mt-1">
                  {selectedItem.prerequisites.map((prereq) => (
                    <Tag key={prereq} className="mb-1">
                      {prereq}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {selectedItem.objectives?.length > 0 && (
              <div>
                <strong>Objectifs:</strong>
                <div className="mt-1">
                  {selectedItem.objectives.map((objective) => (
                    <Tag key={objective} color="blue" className="mb-1">
                      {objective}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {selectedItem.targetAudience?.length > 0 && (
              <div>
                <strong>Public cible:</strong>
                <div className="mt-1">
                  {selectedItem.targetAudience.map((audience) => (
                    <Tag key={audience} color="green" className="mb-1">
                      {audience}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {selectedItem.skills?.length > 0 && (
              <div>
                <strong>Compétences développées:</strong>
                <div className="mt-1">
                  {selectedItem.skills.map((skill) => (
                    <Tag key={skill} color="purple" className="mb-1">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            <div className="text-sm text-gray-500">
              <div>Créé le: {moment(selectedItem.createdAt).format("DD/MM/YYYY à HH:mm")}</div>
              {selectedItem.approvedAt && (
                <div>Approuvé le: {moment(selectedItem.approvedAt).format("DD/MM/YYYY à HH:mm")}</div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
})

CatalogManagement.displayName = "CatalogManagement"

export default CatalogManagement
