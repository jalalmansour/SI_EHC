"use client"

import { useState, useEffect } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Input,
  Select,
  Table,
  Typography,
  Space,
  Tag,
  Progress,
  Statistic,
  Modal,
  Tabs,
  Alert,
  Tooltip,
  Badge,
} from "antd"
import {
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  UserOutlined,
  BookOutlined,
  TrophyOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography
const { Option } = Select
const { TabPane } = Tabs

const Recensement = () => {
  const [loading, setLoading] = useState(false)
  const [skillsData, setSkillsData] = useState([])
  const [employeesData, setEmployeesData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    // Initialize skills data
    setSkillsData([
      {
        key: "1",
        competence: "Leadership",
        niveau: "Avancé",
        employes: 45,
        besoin: "Élevé",
        priorite: "Haute",
        formations: 8,
        status: "En cours",
      },
      {
        key: "2",
        competence: "Gestion de projet",
        niveau: "Intermédiaire",
        employes: 32,
        besoin: "Moyen",
        priorite: "Moyenne",
        formations: 5,
        status: "Planifié",
      },
      {
        key: "3",
        competence: "Communication",
        niveau: "Débutant",
        employes: 78,
        besoin: "Très élevé",
        priorite: "Critique",
        formations: 12,
        status: "Urgent",
      },
    ])

    // Initialize employees data
    setEmployeesData([
      {
        key: "1",
        nom: "Ahmed Benali",
        poste: "Manager IT",
        departement: "Informatique",
        competences: ["Leadership", "Gestion projet"],
        niveau: "Senior",
        formations: 3,
        derniereEval: "2024-01-15",
      },
      {
        key: "2",
        nom: "Fatima Zahra",
        poste: "RH Specialist",
        departement: "RH",
        competences: ["Communication", "Recrutement"],
        niveau: "Intermédiaire",
        formations: 5,
        derniereEval: "2024-02-10",
      },
    ])
  }, [])

  const skillsColumns = [
    {
      title: "Compétence",
      dataIndex: "competence",
      key: "competence",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Niveau Moyen",
      dataIndex: "niveau",
      key: "niveau",
      render: (niveau) => (
        <Tag color={niveau === "Avancé" ? "green" : niveau === "Intermédiaire" ? "orange" : "red"}>{niveau}</Tag>
      ),
    },
    {
      title: "Employés",
      dataIndex: "employes",
      key: "employes",
      render: (count) => (
        <Space>
          <UserOutlined />
          {count}
        </Space>
      ),
    },
    {
      title: "Besoin",
      dataIndex: "besoin",
      key: "besoin",
      render: (besoin) => (
        <Tag color={besoin === "Très élevé" ? "red" : besoin === "Élevé" ? "orange" : "blue"}>{besoin}</Tag>
      ),
    },
    {
      title: "Priorité",
      dataIndex: "priorite",
      key: "priorite",
      render: (priorite) => (
        <Badge
          status={priorite === "Critique" ? "error" : priorite === "Haute" ? "warning" : "processing"}
          text={priorite}
        />
      ),
    },
    {
      title: "Formations",
      dataIndex: "formations",
      key: "formations",
      render: (count) => (
        <Space>
          <BookOutlined />
          {count}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Tooltip title="Consulter">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const employeesColumns = [
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Poste",
      dataIndex: "poste",
      key: "poste",
    },
    {
      title: "Département",
      dataIndex: "departement",
      key: "departement",
      render: (dept) => <Tag color="blue">{dept}</Tag>,
    },
    {
      title: "Compétences",
      dataIndex: "competences",
      key: "competences",
      render: (competences) => (
        <Space wrap>
          {competences.map((comp, index) => (
            <Tag key={index} color="green" size="small">
              {comp}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Niveau",
      dataIndex: "niveau",
      key: "niveau",
      render: (niveau) => (
        <Tag color={niveau === "Senior" ? "gold" : niveau === "Intermédiaire" ? "orange" : "blue"}>{niveau}</Tag>
      ),
    },
    {
      title: "Formations",
      dataIndex: "formations",
      key: "formations",
      render: (count) => <Badge count={count} color="blue" />,
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Tooltip title="Profil">
            <Button type="text" icon={<UserOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Évaluer">
            <Button type="text" icon={<TrophyOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2} className="mb-2 text-gray-800">
              Recensement des Compétences
            </Title>
            <Text className="text-gray-600">Analysez et gérez les compétences de votre organisation</Text>
          </div>
          <Space>
            <Button icon={<UploadOutlined />}>Importer</Button>
            <Button icon={<DownloadOutlined />}>Exporter</Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 border-0"
            >
              Nouvelle Évaluation
            </Button>
          </Space>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-500 to-blue-600">
            <Statistic
              title={<span className="text-white opacity-90">Total Employés</span>}
              value={156}
              valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-500 to-green-600">
            <Statistic
              title={<span className="text-white opacity-90">Compétences Identifiées</span>}
              value={48}
              valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-500 to-orange-600">
            <Statistic
              title={<span className="text-white opacity-90">Besoins Critiques</span>}
              value={12}
              valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-500 to-purple-600">
            <Statistic
              title={<span className="text-white opacity-90">Évaluations Complètes</span>}
              value={89}
              suffix="%"
              valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Alert for critical needs */}
      <Alert
        message="Besoins Critiques Identifiés"
        description="12 compétences nécessitent une attention immédiate. Consultez l'onglet 'Analyse des Compétences' pour plus de détails."
        type="warning"
        showIcon
        className="mb-6"
        action={
          <Button size="small" type="text">
            Voir détails
          </Button>
        }
      />

      {/* Main Content Tabs */}
      <Card className="shadow-lg border-0">
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Analyse des Compétences" key="1">
            <div className="mb-4">
              <Row gutter={16}>
                <Col span={8}>
                  <Input placeholder="Rechercher une compétence..." prefix={<SearchOutlined />} />
                </Col>
                <Col span={6}>
                  <Select placeholder="Département" className="w-full">
                    <Option value="all">Tous les départements</Option>
                    <Option value="it">Informatique</Option>
                    <Option value="rh">Ressources Humaines</Option>
                    <Option value="finance">Finance</Option>
                  </Select>
                </Col>
                <Col span={6}>
                  <Select placeholder="Niveau" className="w-full">
                    <Option value="all">Tous les niveaux</Option>
                    <Option value="debutant">Débutant</Option>
                    <Option value="intermediaire">Intermédiaire</Option>
                    <Option value="avance">Avancé</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <Button type="primary" icon={<SearchOutlined />} className="w-full">
                    Filtrer
                  </Button>
                </Col>
              </Row>
            </div>

            <Table columns={skillsColumns} dataSource={skillsData} pagination={{ pageSize: 10 }} scroll={{ x: 1000 }} />
          </TabPane>

          <TabPane tab="Profils Employés" key="2">
            <div className="mb-4">
              <Row gutter={16}>
                <Col span={8}>
                  <Input placeholder="Rechercher un employé..." prefix={<SearchOutlined />} />
                </Col>
                <Col span={6}>
                  <Select placeholder="Département" className="w-full">
                    <Option value="all">Tous les départements</Option>
                    <Option value="it">Informatique</Option>
                    <Option value="rh">Ressources Humaines</Option>
                  </Select>
                </Col>
                <Col span={6}>
                  <Select placeholder="Niveau" className="w-full">
                    <Option value="all">Tous les niveaux</Option>
                    <Option value="junior">Junior</Option>
                    <Option value="intermediaire">Intermédiaire</Option>
                    <Option value="senior">Senior</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <Button type="primary" icon={<SearchOutlined />} className="w-full">
                    Filtrer
                  </Button>
                </Col>
              </Row>
            </div>

            <Table
              columns={employeesColumns}
              dataSource={employeesData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1000 }}
            />
          </TabPane>

          <TabPane tab="Matrice des Compétences" key="3">
            <div className="text-center py-12">
              <BookOutlined style={{ fontSize: "48px", color: "#ccc" }} />
              <Title level={4} className="mt-4 text-gray-500">
                Matrice des Compétences
              </Title>
              <Text className="text-gray-400">Visualisation graphique des compétences par département et niveau</Text>
            </div>
          </TabPane>

          <TabPane tab="Rapports" key="4">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card title="Rapport de Compétences" className="h-full">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Text>Leadership</Text>
                      <Progress percent={75} size="small" className="w-32" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Communication</Text>
                      <Progress percent={45} size="small" className="w-32" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Gestion de projet</Text>
                      <Progress percent={60} size="small" className="w-32" />
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="Besoins de Formation" className="h-full">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Text>Communication</Text>
                      <Tag color="red">Critique</Tag>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Leadership</Text>
                      <Tag color="orange">Élevé</Tag>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Gestion projet</Text>
                      <Tag color="blue">Moyen</Tag>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Modal for new evaluation */}
      <Modal
        title="Nouvelle Évaluation de Compétences"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" className="mt-6">
          <Form.Item
            name="employee"
            label="Employé"
            rules={[{ required: true, message: "Veuillez sélectionner un employé" }]}
          >
            <Select placeholder="Sélectionner un employé">
              <Option value="1">Ahmed Benali</Option>
              <Option value="2">Fatima Zahra</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="competence"
            label="Compétence"
            rules={[{ required: true, message: "Veuillez sélectionner une compétence" }]}
          >
            <Select placeholder="Sélectionner une compétence">
              <Option value="leadership">Leadership</Option>
              <Option value="communication">Communication</Option>
              <Option value="gestion">Gestion de projet</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="niveau"
            label="Niveau Actuel"
            rules={[{ required: true, message: "Veuillez évaluer le niveau" }]}
          >
            <Select placeholder="Évaluer le niveau">
              <Option value="debutant">Débutant</Option>
              <Option value="intermediaire">Intermédiaire</Option>
              <Option value="avance">Avancé</Option>
            </Select>
          </Form.Item>

          <Form.Item name="commentaires" label="Commentaires">
            <Input.TextArea rows={4} placeholder="Observations et recommandations..." />
          </Form.Item>

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button onClick={() => setModalVisible(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit">
                Enregistrer
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Recensement
