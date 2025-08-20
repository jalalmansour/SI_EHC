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
  UserOutlined,
  BookOutlined,
  TrophyOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons"
import moment from "moment"

const { Title, Text } = Typography
const { Option } = Select
const { TabPane } = Tabs

const Recensement = () => {
  const [loading, setLoading] = useState(false)
  const [skillsData, setSkillsData] = useState([])
  const [employeesData, setEmployeesData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    // Initialize skills data (RF perspective - read-only with recommendations)
    setSkillsData([
      {
        key: "1",
        competence: "Leadership",
        niveau: "Intermédiaire",
        employes: 45,
        besoin: "Élevé",
        priorite: "Haute",
        formations: 8,
        status: "Formation recommandée",
        rfRecommendation: "Formation leadership avancé nécessaire",
      },
      {
        key: "2",
        competence: "Gestion de projet",
        niveau: "Débutant",
        employes: 32,
        besoin: "Très élevé",
        priorite: "Critique",
        formations: 5,
        status: "Action requise",
        rfRecommendation: "Formation urgente en méthodologies agiles",
      },
      {
        key: "3",
        competence: "Communication",
        niveau: "Débutant",
        employes: 78,
        besoin: "Très élevé",
        priorite: "Critique",
        formations: 12,
        status: "En cours",
        rfRecommendation: "Programme de communication interpersonnelle",
      },
      {
        key: "4",
        competence: "Cybersécurité",
        niveau: "Avancé",
        employes: 25,
        besoin: "Moyen",
        priorite: "Moyenne",
        formations: 6,
        status: "Satisfaisant",
        rfRecommendation: "Mise à jour des connaissances",
      },
    ])

    // Initialize employees data (RF view with training focus)
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
        prochainePlanifiee: "Formation Leadership - 25/02/2024",
        besoins: ["Communication", "Management d'équipe"],
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
        prochainePlanifiee: "Gestion des conflits - 15/03/2024",
        besoins: ["Leadership", "Gestion du stress"],
      },
      {
        key: "3",
        nom: "Pierre Martin",
        poste: "Développeur Senior",
        departement: "IT",
        competences: ["Technique", "Cybersécurité"],
        niveau: "Expert",
        formations: 2,
        derniereEval: "2024-01-20",
        prochainePlanifiee: "Aucune planifiée",
        besoins: ["Management", "Formation de formateur"],
      },
    ])
  }, [])

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee)
    setModalVisible(true)
  }

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
      title: "Employés Concernés",
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
      title: "Besoin Identifié",
      dataIndex: "besoin",
      key: "besoin",
      render: (besoin) => (
        <Tag color={besoin === "Très élevé" ? "red" : besoin === "Élevé" ? "orange" : "blue"}>{besoin}</Tag>
      ),
    },
    {
      title: "Priorité Formation",
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
      title: "Formations Disponibles",
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
      title: "Recommandation RF",
      dataIndex: "rfRecommendation",
      key: "rfRecommendation",
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis style={{ maxWidth: 200 }}>
            {text}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Planifier formation">
            <Button type="text" icon={<PlusOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Voir détails">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const employeesColumns = [
    {
      title: "Employé",
      dataIndex: "nom",
      key: "nom",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text className="text-gray-500 text-sm">{record.poste}</Text>
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
      title: "Compétences Actuelles",
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
      title: "Besoins Identifiés",
      dataIndex: "besoins",
      key: "besoins",
      render: (besoins) => (
        <Space wrap>
          {besoins.map((besoin, index) => (
            <Tag key={index} color="orange" size="small">
              {besoin}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Formations Suivies",
      dataIndex: "formations",
      key: "formations",
      render: (count) => <Badge count={count} color="blue" />,
    },
    {
      title: "Prochaine Formation",
      dataIndex: "prochainePlanifiee",
      key: "prochainePlanifiee",
      render: (text) => <Text style={{ color: text === "Aucune planifiée" ? "#ff4d4f" : "#52c41a" }}>{text}</Text>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir profil">
            <Button type="text" icon={<UserOutlined />} size="small" onClick={() => handleViewEmployee(record)} />
          </Tooltip>
          <Tooltip title="Planifier formation">
            <Button type="text" icon={<BookOutlined />} size="small" />
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
            <Text className="text-gray-600">Responsable Formation - Analyse des besoins et planification</Text>
          </div>
          <Space>
            <Button icon={<DownloadOutlined />}>Exporter Analyse</Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Planifier Formation
            </Button>
          </Space>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-500 to-blue-600">
            <Statistic
              title={<span className="text-white opacity-90">Employés Analysés</span>}
              value={156}
              valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              prefix={<UserOutlined />}
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
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-500 to-green-600">
            <Statistic
              title={<span className="text-white opacity-90">Formations Planifiées</span>}
              value={28}
              valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-500 to-purple-600">
            <Statistic
              title={<span className="text-white opacity-90">Taux de Couverture</span>}
              value={78}
              suffix="%"
              valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Alert for critical needs */}
      <Alert
        message="Actions Prioritaires Identifiées"
        description="12 compétences nécessitent une formation urgente. Consultez l'onglet 'Analyse des Compétences' pour planifier les actions."
        type="warning"
        showIcon
        className="mb-6"
        action={
          <Button size="small" type="primary">
            Planifier Formations
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
                    <Option value="commercial">Commercial</Option>
                  </Select>
                </Col>
                <Col span={6}>
                  <Select placeholder="Priorité" className="w-full">
                    <Option value="all">Toutes les priorités</Option>
                    <Option value="critique">Critique</Option>
                    <Option value="haute">Haute</Option>
                    <Option value="moyenne">Moyenne</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <Button type="primary" icon={<SearchOutlined />} className="w-full">
                    Filtrer
                  </Button>
                </Col>
              </Row>
            </div>

            <Table columns={skillsColumns} dataSource={skillsData} pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />
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
                  <Select placeholder="Besoins" className="w-full">
                    <Option value="all">Tous les besoins</Option>
                    <Option value="leadership">Leadership</Option>
                    <Option value="communication">Communication</Option>
                    <Option value="technique">Technique</Option>
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
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="Planification Formations" key="3">
            <div className="text-center py-12">
              <BookOutlined style={{ fontSize: "48px", color: "#ccc" }} />
              <Title level={4} className="mt-4 text-gray-500">
                Planification des Formations
              </Title>
              <Text className="text-gray-400">Planifiez les formations basées sur l'analyse des compétences</Text>
              <br />
              <Button type="primary" icon={<PlusOutlined />} className="mt-4">
                Créer Plan de Formation
              </Button>
            </div>
          </TabPane>

          <TabPane tab="Rapports d'Analyse" key="4">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card title="Compétences par Priorité" className="h-full">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Text>Critique</Text>
                      <div className="flex items-center">
                        <Progress percent={25} size="small" className="w-32 mr-2" status="exception" />
                        <Text>12 compétences</Text>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Haute</Text>
                      <div className="flex items-center">
                        <Progress percent={35} size="small" className="w-32 mr-2" />
                        <Text>18 compétences</Text>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Moyenne</Text>
                      <div className="flex items-center">
                        <Progress percent={40} size="small" className="w-32 mr-2" />
                        <Text>22 compétences</Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="Actions Recommandées" className="h-full">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Text>Formations à planifier</Text>
                      <Tag color="red">Urgent - 8 formations</Tag>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Évaluations à programmer</Text>
                      <Tag color="orange">15 évaluations</Tag>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Suivis individuels</Text>
                      <Tag color="blue">25 employés</Tag>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Employee Detail Modal */}
      <Modal
        title="Profil Employé - Plan de Formation"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Fermer
          </Button>,
          <Button key="plan" type="primary">
            Planifier Formation
          </Button>,
        ]}
      >
        {selectedEmployee && (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <div className="mb-4">
                  <strong>Nom:</strong>
                  <div>{selectedEmployee.nom}</div>
                </div>
                <div className="mb-4">
                  <strong>Poste:</strong>
                  <div>{selectedEmployee.poste}</div>
                </div>
                <div className="mb-4">
                  <strong>Département:</strong>
                  <div>{selectedEmployee.departement}</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="mb-4">
                  <strong>Niveau:</strong>
                  <div>{selectedEmployee.niveau}</div>
                </div>
                <div className="mb-4">
                  <strong>Formations suivies:</strong>
                  <div>{selectedEmployee.formations}</div>
                </div>
                <div className="mb-4">
                  <strong>Dernière évaluation:</strong>
                  <div>{moment(selectedEmployee.derniereEval).format("DD/MM/YYYY")}</div>
                </div>
              </Col>
            </Row>

            <div className="mb-4">
              <strong>Compétences actuelles:</strong>
              <div className="mt-2">
                {selectedEmployee.competences.map((comp, index) => (
                  <Tag key={index} color="green" className="mb-1">
                    {comp}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <strong>Besoins de formation identifiés:</strong>
              <div className="mt-2">
                {selectedEmployee.besoins.map((besoin, index) => (
                  <Tag key={index} color="orange" className="mb-1">
                    {besoin}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <strong>Prochaine formation planifiée:</strong>
              <div className="mt-2 p-3 bg-blue-50 rounded">{selectedEmployee.prochainePlanifiee}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Recensement
