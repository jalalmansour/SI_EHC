"use client"

import { Tooltip } from "@/components/ui/tooltip"

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
  Alert,
  Statistic,
} from "antd"
import {
  ApartmentOutlined,
  EyeOutlined,
  TeamOutlined,
  DownloadOutlined,
  UserOutlined,
  BookOutlined,
  TrophyOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography
const { TabPane } = Tabs
const { Option } = Select

const Organisation = () => {
  const [activeTab, setActiveTab] = useState("structure")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState("") // 'viewEntity', 'planTraining'
  const [selectedEntity, setSelectedEntity] = useState(null)
  const [form] = Form.useForm()

  // Organization tree data (RF read-only view)
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
          children: [
            {
              title: "Pôle Développement Stratégique",
              key: "0-0-0-0",
              icon: <ApartmentOutlined />,
            },
            {
              title: "Direction Formation",
              key: "0-0-0-1",
              icon: <ApartmentOutlined />,
            },
          ],
        },
        {
          title: "FEORHAMAC Conseil",
          key: "0-0-1",
          icon: <ApartmentOutlined />,
        },
      ],
    },
  ]

  // Personnel distribution data with training focus
  const personnelData = [
    {
      key: "1",
      entity: "FEORHAMAC INGÉNIA",
      type: "Groupe / Holding",
      employees: 1250,
      responsible: "Ahmed Benali",
      code: "FEO-001",
      status: "Actif",
      formationsEnCours: 15,
      formationsPlanifiees: 8,
      budgetFormation: 45000,
      tauxParticipation: 78,
    },
    {
      key: "2",
      entity: "FEORHAMAC Formation",
      type: "Filiale",
      employees: 450,
      responsible: "Marie Dubois",
      code: "FEO-FOR-001",
      status: "Actif",
      formationsEnCours: 8,
      formationsPlanifiees: 5,
      budgetFormation: 25000,
      tauxParticipation: 85,
    },
    {
      key: "3",
      entity: "Pôle Développement Stratégique",
      type: "Pôle",
      employees: 85,
      responsible: "Pierre Martin",
      code: "FEO-FOR-DEV-001",
      status: "Actif",
      formationsEnCours: 3,
      formationsPlanifiees: 2,
      budgetFormation: 12000,
      tauxParticipation: 92,
    },
    {
      key: "4",
      entity: "Direction Formation",
      type: "Direction",
      employees: 25,
      responsible: "Sophie Laurent",
      code: "FEO-FOR-DIR-001",
      status: "Actif",
      formationsEnCours: 2,
      formationsPlanifiees: 3,
      budgetFormation: 8000,
      tauxParticipation: 88,
    },
  ]

  // Training needs by entity
  const trainingNeeds = [
    {
      entity: "IT",
      besoins: ["Cybersécurité", "Cloud Computing", "Gestion de projet"],
      priorite: "Haute",
      participants: 45,
      budget: 15000,
    },
    {
      entity: "Commercial",
      besoins: ["Négociation", "Communication client", "Digital marketing"],
      priorite: "Moyenne",
      participants: 32,
      budget: 12000,
    },
    {
      entity: "RH",
      besoins: ["Gestion des conflits", "Recrutement", "Droit du travail"],
      priorite: "Haute",
      participants: 18,
      budget: 8000,
    },
  ]

  const handleViewEntity = (record) => {
    setModalType("viewEntity")
    setSelectedEntity(record)
    setIsModalVisible(true)
  }

  const handlePlanTraining = (record) => {
    setModalType("planTraining")
    setSelectedEntity(record)
    form.setFieldsValue({
      entity: record.entity,
      participants: record.employees,
    })
    setIsModalVisible(true)
  }

  const handleModalSubmit = async (values) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (modalType === "planTraining") {
        message.success("Formation planifiée avec succès!")
      }

      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error("Erreur lors de l'opération")
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
          Direction: "red",
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
      title: "Formations",
      key: "formations",
      render: (_, record) => (
        <div>
          <div className="text-sm">
            <Text>En cours: </Text>
            <Text strong className="text-blue-600">
              {record.formationsEnCours}
            </Text>
          </div>
          <div className="text-sm">
            <Text>Planifiées: </Text>
            <Text strong className="text-green-600">
              {record.formationsPlanifiees}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Budget Formation",
      dataIndex: "budgetFormation",
      key: "budgetFormation",
      render: (budget) => <Text className="text-purple-600 font-semibold">{budget?.toLocaleString()} €</Text>,
    },
    {
      title: "Taux Participation",
      dataIndex: "tauxParticipation",
      key: "tauxParticipation",
      render: (taux) => (
        <div>
          <Text strong>{taux}%</Text>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${taux}%` }}></div>
          </div>
        </div>
      ),
    },
    {
      title: "Responsable",
      dataIndex: "responsible",
      key: "responsible",
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
              onClick={() => handleViewEntity(record)}
              className="text-blue-600"
            />
          </Tooltip>
          <Tooltip title="Planifier formation">
            <Button
              type="text"
              icon={<BookOutlined />}
              onClick={() => handlePlanTraining(record)}
              className="text-green-600"
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const needsColumns = [
    {
      title: "Entité",
      dataIndex: "entity",
      key: "entity",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Besoins Identifiés",
      dataIndex: "besoins",
      key: "besoins",
      render: (besoins) => (
        <Space wrap>
          {besoins.map((besoin, index) => (
            <Tag key={index} color="orange">
              {besoin}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Priorité",
      dataIndex: "priorite",
      key: "priorite",
      render: (priorite) => <Tag color={priorite === "Haute" ? "red" : "blue"}>{priorite}</Tag>,
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
      render: (count) => (
        <Space>
          <UserOutlined />
          {count}
        </Space>
      ),
    },
    {
      title: "Budget Estimé",
      dataIndex: "budget",
      key: "budget",
      render: (budget) => `${budget.toLocaleString()} €`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" size="small">
            Planifier
          </Button>
          <Button size="small">Analyser</Button>
        </Space>
      ),
    },
  ]

  const renderModalContent = () => {
    switch (modalType) {
      case "viewEntity":
        return selectedEntity ? (
          <div className="space-y-4">
            <Row gutter={16}>
              <Col span={12}>
                <div>
                  <Text strong>Entité:</Text>
                  <br />
                  <Text>{selectedEntity.entity}</Text>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong>Type:</Text>
                  <br />
                  <Tag color="blue">{selectedEntity.type}</Tag>
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <div>
                  <Text strong>Employés:</Text>
                  <br />
                  <Text>{selectedEntity.employees} employés</Text>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong>Responsable:</Text>
                  <br />
                  <Text>{selectedEntity.responsible}</Text>
                </div>
              </Col>
            </Row>

            <Divider />

            <Title level={5}>Activité Formation</Title>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Formations en cours"
                  value={selectedEntity.formationsEnCours}
                  prefix={<BookOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Formations planifiées"
                  value={selectedEntity.formationsPlanifiees}
                  prefix={<TrophyOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Taux participation"
                  value={selectedEntity.tauxParticipation}
                  suffix="%"
                  prefix={<TeamOutlined />}
                />
              </Col>
            </Row>

            <div className="flex justify-between mt-6">
              <Button onClick={() => setIsModalVisible(false)}>Fermer</Button>
              <Space>
                <Button type="primary" onClick={() => handlePlanTraining(selectedEntity)}>
                  Planifier Formation
                </Button>
                <Button icon={<DownloadOutlined />}>Rapport</Button>
              </Space>
            </div>
          </div>
        ) : null

      case "planTraining":
        return (
          <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
            <Alert
              message="Planification de Formation"
              description="Planifiez une nouvelle formation pour cette entité organisationnelle."
              type="info"
              className="mb-4"
            />

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="entity" label="Entité" rules={[{ required: true, message: "Entité requise" }]}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="typeFormation"
                  label="Type de Formation"
                  rules={[{ required: true, message: "Type requis" }]}
                >
                  <Select placeholder="Sélectionner le type">
                    <Option value="Leadership">Leadership</Option>
                    <Option value="Management">Management</Option>
                    <Option value="Technique">Technique</Option>
                    <Option value="Soft Skills">Soft Skills</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="thematique"
                  label="Thématique"
                  rules={[{ required: true, message: "Thématique requise" }]}
                >
                  <Input placeholder="Ex: Communication interpersonnelle" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="participants"
                  label="Nombre de Participants"
                  rules={[{ required: true, message: "Nombre requis" }]}
                >
                  <Input type="number" placeholder="Ex: 15" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="objectifs"
              label="Objectifs de Formation"
              rules={[{ required: true, message: "Objectifs requis" }]}
            >
              <Input.TextArea rows={3} placeholder="Décrivez les objectifs et résultats attendus..." />
            </Form.Item>

            <Form.Item name="priorite" label="Priorité" rules={[{ required: true, message: "Priorité requise" }]}>
              <Select placeholder="Niveau de priorité">
                <Option value="Haute">Haute</Option>
                <Option value="Moyenne">Moyenne</Option>
                <Option value="Faible">Faible</Option>
              </Select>
            </Form.Item>

            <Form.Item className="mb-0 text-right">
              <Space>
                <Button onClick={() => setIsModalVisible(false)}>Annuler</Button>
                <Button type="primary" htmlType="submit">
                  Planifier Formation
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )

      default:
        return null
    }
  }

  const getModalTitle = () => {
    switch (modalType) {
      case "viewEntity":
        return "Détails de l'Entité - Vue Formation"
      case "planTraining":
        return "Planifier une Formation"
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
              Organisation et Formation
            </Title>
            <Text className="text-gray-600">Responsable Formation - Vue organisationnelle et besoins formation</Text>
          </div>
          <Space>
            <Button icon={<DownloadOutlined />}>Export Analyse</Button>
          </Space>
        </div>

        {/* Alert */}
        <Alert
          message="Vue Responsable Formation"
          description="Vous avez accès en lecture à la structure organisationnelle avec focus sur les besoins et activités de formation."
          type="info"
          showIcon
          className="mb-6"
          closable
        />

        {/* Statistics */}
        <Row gutter={[24, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-500 to-blue-600">
              <Statistic
                title={<span className="text-white opacity-90">Entités Gérées</span>}
                value={4}
                valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
                prefix={<ApartmentOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-500 to-green-600">
              <Statistic
                title={<span className="text-white opacity-90">Formations Actives</span>}
                value={28}
                valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-500 to-orange-600">
              <Statistic
                title={<span className="text-white opacity-90">Participants</span>}
                value={1810}
                valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-500 to-purple-600">
              <Statistic
                title={<span className="text-white opacity-90">Budget Formation</span>}
                value={90000}
                suffix="€"
                valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Tabs */}
        <Card className="shadow-sm">
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Structure Organisationnelle" key="structure">
              <div className="space-y-6">
                <Card title="Arborescence - Vue Formation" className="shadow-sm">
                  <Tree showIcon defaultExpandAll treeData={treeData} className="bg-gray-50 p-4 rounded-lg" />
                </Card>
              </div>
            </TabPane>

            <TabPane tab="Entités et Formation" key="entites">
              <div className="space-y-6">
                <Card title="Activité Formation par Entité" className="shadow-sm">
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

            <TabPane tab="Besoins Formation" key="besoins">
              <div className="space-y-6">
                <Card title="Besoins de Formation Identifiés" className="shadow-sm">
                  <Table columns={needsColumns} dataSource={trainingNeeds} pagination={false} />
                </Card>
              </div>
            </TabPane>
          </Tabs>
        </Card>

        {/* Modal */}
        <Modal
          title={getModalTitle()}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={modalType === "planTraining" ? 700 : 800}
        >
          {renderModalContent()}
        </Modal>
      </div>
    </div>
  )
}

export default Organisation
