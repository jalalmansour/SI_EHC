"use client"

import { useState } from "react"
import {
  Card,
  Tabs,
  Tree,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Table,
  Space,
  Tag,
  message,
  Row,
  Col,
  Typography,
  Avatar,
  Divider,
  Radio,
} from "antd"
import {
  ApartmentOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  TeamOutlined,
  DownloadOutlined,
  SettingOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography
const { TabPane } = Tabs
const { Option } = Select

const Organisation = () => {
  const [activeTab, setActiveTab] = useState("structure")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isNomenclatureModalVisible, setIsNomenclatureModalVisible] = useState(false)
  const [modalType, setModalType] = useState("") // 'addCollaborator', 'addEntity', 'editEntity', 'viewEntity'
  const [form] = Form.useForm()
  const [nomenclatureForm] = Form.useForm()
  const [selectedEntity, setSelectedEntity] = useState(null)

  // Nomenclature configuration data
  const [nomenclatureConfig, setNomenclatureConfig] = useState([
    {
      key: "niveau1",
      type: "Groupe / Holding",
      name: "Groupe / Holding",
      description: "Niveau le plus élevé de l'organisation, représentant plusieurs filiales",
      examples: ["Groupe", "Holding"],
      selected: true,
    },
    {
      key: "niveau2",
      type: "Filiale",
      name: "Filiale",
      description: "Société contrôlée par le groupe, avec une activité spécifique",
      examples: ["Filiale", "Société", "Entreprise"],
      selected: false,
    },
    {
      key: "niveau3",
      type: "Pôle",
      name: "Pôle",
      description: "Regroupement d'activités ou de compétences stratégiques",
      examples: ["Pôle", "Division", "Service", "Branche"],
      selected: false,
    },
    {
      key: "niveau4",
      type: "Business Unit",
      name: "Business Unit",
      description: "Unité d'affaires autonome avec ses propres objectifs",
      examples: ["Business Unit", "Unité", "Centre"],
      selected: false,
    },
    {
      key: "niveau5",
      type: "Direction",
      name: "Direction",
      description: "Direction fonctionnelle ou opérationnelle",
      examples: ["Direction", "Département", "Division"],
      selected: false,
    },
    {
      key: "niveau6",
      type: "Département",
      name: "Département",
      description: "Unité organisationnelle spécialisée dans un domaine",
      examples: ["Département", "Bureau", "Section"],
      selected: false,
    },
    {
      key: "niveau7",
      type: "Service",
      name: "Service",
      description: "Unité opérationnelle dédiée à une fonction précise",
      examples: ["Service", "Unité", "Groupe"],
      selected: false,
    },
    {
      key: "niveau8",
      type: "Cellule",
      name: "Cellule",
      description: "Plus petite unité organisationnelle, équipe de travail",
      examples: ["Cellule", "Bureau", "Groupe"],
      selected: false,
    },
  ])

  // Organization tree data
  const treeData = [
    {
      title: "FEORHAMAC INGÉNIA",
      key: "0-0",
      icon: <ApartmentOutlined />,
      children: [
        {
          title: "FEORHAMAC Formation",
          key: "0-0-0",
          icon: <ApartmentOutlined />,
        },
        {
          title: "FEORHAMAC Conseil",
          key: "0-0-1",
          icon: <ApartmentOutlined />,
        },
      ],
    },
  ]

  // Personnel distribution data
  const personnelData = [
    {
      key: "1",
      entity: "FEORHAMAC INGÉNIA",
      type: "Groupe / Holding",
      employees: 1250,
      responsible: "Ahmed Benali",
      code: "FEO-001",
      status: "Actif",
    },
    {
      key: "2",
      entity: "FEORHAMAC Formation",
      type: "Filiale",
      employees: 450,
      responsible: "Marie Dubois",
      code: "FEO-FOR-001",
      status: "Actif",
    },
    {
      key: "3",
      entity: "FEORHAMAC Conseil",
      type: "Filiale",
      employees: 280,
      responsible: "Hassan Idrissi",
      code: "FEO-CON-001",
      status: "Actif",
    },
    {
      key: "4",
      entity: "Pôle Développement Stratégique",
      type: "Pôle",
      employees: 85,
      responsible: "Pierre Martin",
      code: "FEO-FOR-DEV-001",
      status: "Actif",
    },
    {
      key: "5",
      entity: "BU Transformation Digitale",
      type: "Business Unit",
      employees: 35,
      responsible: "Sarah Alami",
      code: "FEO-FOR-DEV-TD-001",
      status: "Actif",
    },
    {
      key: "6",
      entity: "Direction Projets SI",
      type: "Direction",
      employees: 25,
      responsible: "Youssef Tazi",
      code: "FEO-FOR-DEV-TD-SI-001",
      status: "Actif",
    },
    {
      key: "7",
      entity: "Département Développement",
      type: "Département",
      employees: 15,
      responsible: "Fatima Zahra",
      code: "FEO-FOR-DEV-TD-SI-DEV-001",
      status: "Actif",
    },
    {
      key: "8",
      entity: "Service Frontend",
      type: "Service",
      employees: 6,
      responsible: "Omar Benjelloun",
      code: "FEO-FOR-DEV-TD-SI-DEV-FE-001",
      status: "Actif",
    },
    {
      key: "9",
      entity: "Cellule UI/UX",
      type: "Cellule",
      employees: 4,
      responsible: "Laila Bennani",
      code: "FEO-FOR-DEV-TD-SI-DEV-FE-UX-001",
      status: "Actif",
    },
    {
      key: "10",
      entity: "Service Backend",
      type: "Service",
      employees: 7,
      responsible: "Rachid Amrani",
      code: "FEO-FOR-DEV-TD-SI-DEV-BE-001",
      status: "Actif",
    },
  ]

  // Sample collaborators data
  const collaboratorsData = [
    {
      key: "1",
      matricule: "FEO-001",
      nom: "Benali",
      prenom: "Ahmed",
      fonction: "Directeur Général",
      grade: "Cadre Dirigeant",
      anneeNaissance: 1975,
      dateRecrutement: "15/01/2010",
    },
  ]

  const handleAddCollaborator = () => {
    setModalType("addCollaborator")
    setIsModalVisible(true)
    form.resetFields()
  }

  const handleAddEntity = () => {
    setModalType("addEntity")
    setIsModalVisible(true)
    form.resetFields()
  }

  const handleEditEntity = (record) => {
    setModalType("editEntity")
    setSelectedEntity(record)
    setIsModalVisible(true)
    form.setFieldsValue(record)
  }

  const handleViewEntity = (record) => {
    setModalType("viewEntity")
    setSelectedEntity(record)
    setIsModalVisible(true)
  }

  const handleNomenclature = () => {
    setIsNomenclatureModalVisible(true)
    nomenclatureForm.setFieldsValue({
      nomenclature: nomenclatureConfig.reduce((acc, item) => {
        acc[item.key] = item.name
        return acc
      }, {}),
    })
  }

  const handleModalSubmit = async (values) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (modalType === "addCollaborator") {
        message.success("Collaborateur ajouté avec succès!")
      } else if (modalType === "addEntity") {
        message.success("Entité ajoutée avec succès!")
      } else if (modalType === "editEntity") {
        message.success("Entité modifiée avec succès!")
      }

      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error("Erreur lors de l'opération")
    }
  }

  const handleNomenclatureSubmit = async (values) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      message.success("Nomenclature sauvegardée avec succès!")
      setIsNomenclatureModalVisible(false)
    } catch (error) {
      message.error("Erreur lors de la sauvegarde")
    }
  }

  const personnelColumns = [
    {
      title: "Entité",
      dataIndex: "entity",
      key: "entity",
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar size="small" style={{ backgroundColor: "#1890ff", marginRight: 8 }}>
            {text.charAt(0)}
          </Avatar>
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text className="text-gray-500 text-xs">{record.code}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        const colors = {
          "Groupe / Holding": "purple",
          Filiale: "blue",
          Pôle: "green",
          "Business Unit": "orange",
          Direction: "red",
          Département: "cyan",
          Service: "magenta",
          Cellule: "lime",
        }
        return <Tag color={colors[type]}>{type}</Tag>
      },
    },
    {
      title: "Employés",
      dataIndex: "employees",
      key: "employees",
      render: (count) => (
        <div className="flex items-center">
          <TeamOutlined className="mr-1" />
          <Text strong>{count}</Text>
        </div>
      ),
    },
    {
      title: "Responsable",
      dataIndex: "responsible",
      key: "responsible",
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "Actif" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewEntity(record)}
            className="text-blue-600"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditEntity(record)}
            className="text-green-600"
          />
          <Button type="text" icon={<DeleteOutlined />} className="text-red-600" />
        </Space>
      ),
    },
  ]

  const collaboratorColumns = [
    {
      title: "Matricule",
      dataIndex: "matricule",
      key: "matricule",
      render: (text) => <Text code>{text}</Text>,
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Fonction",
      dataIndex: "fonction",
      key: "fonction",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "Année Naissance",
      dataIndex: "anneeNaissance",
      key: "anneeNaissance",
    },
    {
      title: "Date Recrutement",
      dataIndex: "dateRecrutement",
      key: "dateRecrutement",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} className="text-blue-600" />
          <Button type="text" icon={<EditOutlined />} className="text-green-600" />
          <Button type="text" icon={<DeleteOutlined />} className="text-red-600" />
        </Space>
      ),
    },
  ]

  const renderModalContent = () => {
    switch (modalType) {
      case "addCollaborator":
        return (
          <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Matricule/ID"
                  name="matricule"
                  rules={[{ required: true, message: "Veuillez saisir le matricule" }]}
                >
                  <Input placeholder="Ex: FEO-001" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Nom" name="nom" rules={[{ required: true, message: "Veuillez saisir le nom" }]}>
                  <Input placeholder="Ex: Benali" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Prénom"
                  name="prenom"
                  rules={[{ required: true, message: "Veuillez saisir le prénom" }]}
                >
                  <Input placeholder="Ex: Ahmed" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Date de naissance"
                  name="dateNaissance"
                  rules={[{ required: true, message: "Veuillez saisir la date de naissance" }]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Date de recrutement"
                  name="dateRecrutement"
                  rules={[{ required: true, message: "Veuillez saisir la date de recrutement" }]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Niveau d'étude/Diplôme"
                  name="niveauEtude"
                  rules={[{ required: true, message: "Veuillez sélectionner le niveau d'étude" }]}
                >
                  <Select placeholder="Sélectionner le niveau d'étude">
                    <Option value="bac">Baccalauréat</Option>
                    <Option value="bac+2">Bac+2</Option>
                    <Option value="bac+3">Bac+3</Option>
                    <Option value="bac+5">Bac+5</Option>
                    <Option value="doctorat">Doctorat</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Fonction"
                  name="fonction"
                  rules={[{ required: true, message: "Veuillez sélectionner la fonction" }]}
                >
                  <Select placeholder="Sélectionner la fonction">
                    <Option value="directeur">Directeur</Option>
                    <Option value="manager">Manager</Option>
                    <Option value="chef-projet">Chef de Projet</Option>
                    <Option value="developpeur">Développeur</Option>
                    <Option value="consultant">Consultant</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Poste/Grade"
                  name="grade"
                  rules={[{ required: true, message: "Veuillez sélectionner le grade" }]}
                >
                  <Select placeholder="Sélectionner le grade">
                    <Option value="cadre-dirigeant">Cadre Dirigeant</Option>
                    <Option value="cadre-superieur">Cadre Supérieur</Option>
                    <Option value="cadre">Cadre</Option>
                    <Option value="technicien">Technicien</Option>
                    <Option value="employe">Employé</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Entité de rattachement hiérarchique"
                  name="entiteRattachement"
                  rules={[{ required: true, message: "Veuillez sélectionner l'entité de rattachement" }]}
                >
                  <Select placeholder="Sélectionner l'entité">
                    <Option value="feorhamac-ingenia">FEORHAMAC INGÉNIA</Option>
                    <Option value="feorhamac-formation">FEORHAMAC Formation</Option>
                    <Option value="feorhamac-conseil">FEORHAMAC Conseil</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Email professionnel"
                  name="email"
                  rules={[
                    { required: true, message: "Veuillez saisir l'email" },
                    { type: "email", message: "Format d'email invalide" },
                  ]}
                >
                  <Input placeholder="Ex: ahmed.benali@feorhamac.com" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Téléphone"
                  name="telephone"
                  rules={[{ required: true, message: "Veuillez saisir le téléphone" }]}
                >
                  <Input placeholder="Ex: +212 6 12 34 56 78" />
                </Form.Item>
              </Col>
            </Row>
            <div className="flex justify-end space-x-3 mt-6">
              <Button onClick={() => setIsModalVisible(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit">
                Ajouter le Collaborateur
              </Button>
            </div>
          </Form>
        )

      case "viewEntity":
        return selectedEntity ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text strong>Entité:</Text>
                <br />
                <Text>{selectedEntity.entity}</Text>
              </div>
              <div>
                <Text strong>Type:</Text>
                <br />
                <Tag color="blue">{selectedEntity.type}</Tag>
              </div>
              <div>
                <Text strong>Code:</Text>
                <br />
                <Text code>{selectedEntity.code}</Text>
              </div>
              <div>
                <Text strong>Employés:</Text>
                <br />
                <Text>{selectedEntity.employees} employés</Text>
              </div>
              <div>
                <Text strong>Responsable:</Text>
                <br />
                <Text>{selectedEntity.responsible}</Text>
              </div>
              <div>
                <Text strong>Statut:</Text>
                <br />
                <Tag color={selectedEntity.status === "Actif" ? "green" : "red"}>{selectedEntity.status}</Tag>
              </div>
            </div>
            <Divider />
            <div className="flex justify-between">
              <Button onClick={() => setIsModalVisible(false)}>Fermer</Button>
              <Button type="primary" icon={<DownloadOutlined />}>
                Exporter
              </Button>
            </div>
          </div>
        ) : null

      default:
        return null
    }
  }

  const getModalTitle = () => {
    switch (modalType) {
      case "addCollaborator":
        return "Ajouter un Collaborateur - FEORHAMAC INGÉNIA"
      case "viewEntity":
        return "Détails de l'Entité"
      case "editEntity":
        return "Modifier l'Entité"
      default:
        return ""
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2} className="mb-2">
              Gestion de l'Organisation
            </Title>
            <Text className="text-gray-600">Créez et structurez votre organigramme selon vos spécificités</Text>
          </div>
          <Space>
            <Button icon={<SettingOutlined />} onClick={handleNomenclature}>
              Nomenclature
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEntity}>
              Nouvelle Entité
            </Button>
          </Space>
        </div>

        {/* Tabs */}
        <Card className="shadow-sm">
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Structure" key="structure">
              <div className="space-y-6">
                <Card title="Arborescence Organisationnelle" className="shadow-sm">
                  <Tree showIcon defaultExpandAll treeData={treeData} className="bg-gray-50 p-4 rounded-lg" />
                </Card>
              </div>
            </TabPane>

            <TabPane tab="Entités" key="entites">
              <div className="space-y-6">
                <Card title="Répartition du Personnel" className="shadow-sm">
                  <Table
                    columns={personnelColumns}
                    dataSource={personnelData}
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} entités`,
                    }}
                  />
                </Card>
              </div>
            </TabPane>

            <TabPane tab="Personnel" key="personnel">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Title level={4}>Liste des Collaborateurs - FEORHAMAC INGÉNIA</Title>
                  <Space>
                    <Button icon={<PlusOutlined />} onClick={handleAddCollaborator}>
                      Ajouter
                    </Button>
                    <Button icon={<UploadOutlined />}>Importer</Button>
                  </Space>
                </div>
                <Card className="shadow-sm">
                  <Table
                    columns={collaboratorColumns}
                    dataSource={collaboratorsData}
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} collaborateurs`,
                    }}
                  />
                </Card>
              </div>
            </TabPane>
          </Tabs>
        </Card>

        {/* Regular Modal */}
        <Modal
          title={getModalTitle()}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={modalType === "addCollaborator" ? 800 : 600}
        >
          {renderModalContent()}
        </Modal>

        {/* Nomenclature Modal */}
        <Modal
          title="Personnaliser la Nomenclature Organisationnelle"
          open={isNomenclatureModalVisible}
          onCancel={() => setIsNomenclatureModalVisible(false)}
          footer={null}
          width={900}
          className="nomenclature-modal"
        >
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <Text className="text-gray-700">
                <strong>Personnalisez les termes</strong> utilisés dans votre organisation pour classifier et nommer vos
                entités. Vous pouvez modifier les termes des types d'entités selon votre terminologie interne.
              </Text>
            </div>

            <div>
              <Title level={4} className="mb-4">
                Configuration des Types d'Entités
              </Title>

              <Form form={nomenclatureForm} layout="vertical" onFinish={handleNomenclatureSubmit}>
                <div className="space-y-4">
                  {nomenclatureConfig.map((item, index) => (
                    <Card key={item.key} className="border border-gray-200">
                      <Row gutter={[24, 16]} align="middle">
                        <Col span={1}>
                          <Radio checked={item.selected} />
                        </Col>
                        <Col span={1}>
                          <Text strong className="text-blue-600">
                            NIVEAU {index + 1}
                          </Text>
                        </Col>
                        <Col span={6}>
                          <Form.Item name={["nomenclature", item.key]} label="Nom personnalisé" className="mb-0">
                            <Input defaultValue={item.name} />
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          <div>
                            <Text strong>Description</Text>
                            <br />
                            <Text className="text-gray-600">{item.description}</Text>
                            <br />
                            <div className="mt-2">
                              <Text className="text-xs text-gray-500">Exemples d'usage :</Text>
                              <div className="mt-1">
                                {item.examples.map((example, idx) => (
                                  <Tag key={idx} className="mb-1">
                                    {example}
                                  </Tag>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </div>

                <Divider />

                <div>
                  <Title level={5} className="mb-4">
                    Aperçu de la hiérarchie personnalisée
                  </Title>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                        <Text>Groupe / Holding</Text>
                      </div>
                      <div className="ml-6 flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                        <Text>Filiale</Text>
                      </div>
                      <div className="ml-12 flex items-center">
                        <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                        <Text>Pôle</Text>
                      </div>
                      <div className="ml-18 flex items-center">
                        <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                        <Text>Business Unit</Text>
                      </div>
                      <div className="ml-24 flex items-center">
                        <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                        <Text>Direction</Text>
                      </div>
                      <div className="ml-30 flex items-center">
                        <div className="w-4 h-4 bg-cyan-500 rounded mr-2"></div>
                        <Text>Département</Text>
                      </div>
                      <div className="ml-36 flex items-center">
                        <div className="w-4 h-4 bg-pink-500 rounded mr-2"></div>
                        <Text>Service</Text>
                      </div>
                      <div className="ml-42 flex items-center">
                        <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                        <Text>Cellule</Text>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <Button onClick={() => setIsNomenclatureModalVisible(false)}>Annuler</Button>
                  <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700">
                    Sauvegarder la Nomenclature
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Organisation
