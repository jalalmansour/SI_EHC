"use client"

import { useState, useEffect } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Input,
  Upload,
  Typography,
  Space,
  Collapse,
  Switch,
  Tag,
  Modal,
  Alert,
  Divider,
  Tooltip,
  message,
} from "antd"
import {
  PlusOutlined,
  UploadOutlined,
  EyeOutlined,
  SendOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  FileExcelOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons"

// Import the new components
import CatalogVisualizationModal from "../components/catalog/CatalogVisualizationModal"
import PredefinedCatalog from "../components/catalog/PredefinedCatalog"
import {
  FinalDistributionModal,
  HRDistributionModal,
  EmployeeDistributionModal,
} from "../components/catalog/DistributionModals"
import EmployeeValidationInterface from "../components/catalog/EmployeeValidationInterface"

const { Title, Text } = Typography
const { Panel } = Collapse
const { Dragger } = Upload

const RecensementBesoin = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [catalogueMode, setCatalogueMode] = useState("nouveau")
  const [importModalVisible, setImportModalVisible] = useState(false)
  const [previewData, setPreviewData] = useState(null)
  const [competencyDomains, setCompetencyDomains] = useState([])

  // Modal states
  const [catalogVisualizationVisible, setCatalogVisualizationVisible] = useState(false)
  const [predefinedCatalogVisible, setPredefinedCatalogVisible] = useState(false)
  const [finalDistributionVisible, setFinalDistributionVisible] = useState(false)
  const [hrDistributionVisible, setHrDistributionVisible] = useState(false)
  const [employeeDistributionVisible, setEmployeeDistributionVisible] = useState(false)
  const [employeeValidationVisible, setEmployeeValidationVisible] = useState(false)

  useEffect(() => {
    // Initialize competency domains
    setCompetencyDomains([
      {
        key: "leadership",
        title: "Leadership",
        items: [
          { key: "management-equipe", title: "Management d'équipe", selected: false },
          { key: "communication-manageriale", title: "Communication managériale", selected: false },
          { key: "prise-decision", title: "Prise de décision", selected: false },
        ],
      },
      {
        key: "communication",
        title: "Communication",
        items: [
          { key: "communication-interpersonnelle", title: "Communication interpersonnelle", selected: false },
          { key: "presentation-orale", title: "Présentation orale", selected: false },
          { key: "negociation", title: "Négociation", selected: false },
        ],
      },
      {
        key: "informatique",
        title: "Informatique",
        items: [
          { key: "bureautique", title: "Bureautique", selected: false },
          { key: "outils-collaboratifs", title: "Outils collaboratifs", selected: false },
          { key: "securite-informatique", title: "Sécurité informatique", selected: false },
        ],
      },
    ])
  }, [])

  const handleFileUpload = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        // Simulate Excel parsing
        const mockData = [
          { domaine: "Leadership", competence: "Management d'équipe", niveau: "Avancé" },
          { domaine: "Communication", competence: "Présentation orale", niveau: "Intermédiaire" },
          { domaine: "Informatique", competence: "Bureautique", niveau: "Débutant" },
        ]
        setPreviewData(mockData)
        setImportModalVisible(true)
        message.success("Fichier analysé avec succès")
      } catch (error) {
        message.error("Erreur lors de l'analyse du fichier")
      }
    }
    reader.readAsArrayBuffer(file)
    return false
  }

  const handleCompetencyToggle = (domainKey, itemKey) => {
    setCompetencyDomains((prev) =>
      prev.map((domain) =>
        domain.key === domainKey
          ? {
              ...domain,
              items: domain.items.map((item) => (item.key === itemKey ? { ...item, selected: !item.selected } : item)),
            }
          : domain,
      ),
    )
  }

  const handleAddCompetency = (domainKey) => {
    const newCompetency = prompt("Nom de la nouvelle compétence:")
    if (newCompetency) {
      setCompetencyDomains((prev) =>
        prev.map((domain) =>
          domain.key === domainKey
            ? {
                ...domain,
                items: [
                  ...domain.items,
                  {
                    key: `${domainKey}-${Date.now()}`,
                    title: newCompetency,
                    selected: false,
                  },
                ],
              }
            : domain,
        ),
      )
      message.success("Compétence ajoutée avec succès")
    }
  }

  const actionButtons = [
    {
      title: "Créer & Importer",
      icon: <PlusOutlined />,
      color: "from-blue-500 to-blue-600",
      action: () => message.info("Création/Import du catalogue"),
    },
    {
      title: "Visualiser Catalogue",
      icon: <EyeOutlined />,
      color: "from-green-500 to-green-600",
      action: () => setCatalogVisualizationVisible(true),
    },
    {
      title: "Diffuser aux RRH",
      icon: <SendOutlined />,
      color: "from-purple-500 to-purple-600",
      action: () => setHrDistributionVisible(true),
    },
    {
      title: "Catalogue Prédéfini",
      icon: <CheckCircleOutlined />,
      color: "from-orange-500 to-orange-600",
      action: () => setPredefinedCatalogVisible(true),
    },
    {
      title: "Diffuser aux Employés et au Manager n+1",
      icon: <TeamOutlined />,
      color: "from-teal-500 to-teal-600",
      action: () => setEmployeeDistributionVisible(true),
    },
    {
      title: "Validation & historique",
      icon: <CheckCircleOutlined />,
      color: "from-indigo-500 to-indigo-600",
      action: () => setEmployeeValidationVisible(true),
    },
    {
      title: "Diffusion du catalogue finale",
      icon: <SendOutlined />,
      color: "from-red-500 to-red-600",
      action: () => setFinalDistributionVisible(true),
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2} className="mb-2 text-gray-800">
              Recensement de besoin
            </Title>
            <Text className="text-gray-600">Responsable RH - Accès complet</Text>
          </div>
          <Space>
            <Button icon={<DownloadOutlined />}>Exporter Template</Button>
            <Button type="primary" icon={<FileExcelOutlined />}>
              Guide d'utilisation
            </Button>
          </Space>
        </div>
      </div>

      {/* Action Buttons Section */}
      <Card className="mb-6 shadow-lg border-0">
        <Title level={4} className="mb-4">
          Paramétrer le catalogue de formation
        </Title>
        <Row gutter={[16, 16]}>
          {actionButtons.map((button, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
              <Button
                type="primary"
                size="large"
                icon={button.icon}
                onClick={button.action}
                className={`w-full h-16 bg-gradient-to-r ${button.color} border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-medium`}
              >
                <div className="text-center">
                  <div className="text-sm leading-tight">{button.title}</div>
                </div>
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Create New Catalogue */}
        <Col xs={24} lg={14}>
          <Card title="Créer un Nouveau Catalogue" className="shadow-lg border-0 h-full">
            <div className="mb-6">
              <Space size="large">
                <Button
                  type={catalogueMode === "nouveau" ? "primary" : "default"}
                  onClick={() => setCatalogueMode("nouveau")}
                  className={catalogueMode === "nouveau" ? "bg-gray-800 border-gray-800" : ""}
                >
                  Nouveau
                </Button>
                <Button
                  type={catalogueMode === "mettre" ? "primary" : "default"}
                  onClick={() => setCatalogueMode("mettre")}
                  className={catalogueMode === "mettre" ? "bg-gray-800 border-gray-800" : ""}
                >
                  Mettre à jour
                </Button>
              </Space>
            </div>

            <div className="mb-4">
              <Text strong className="text-lg">
                Domaines de compétence Support
              </Text>
            </div>

            <Collapse defaultActiveKey={["leadership", "communication", "informatique"]} className="bg-white border-0">
              {competencyDomains.map((domain) => (
                <Panel
                  header={
                    <div className="flex justify-between items-center">
                      <Text strong className="text-base">
                        {domain.title}
                      </Text>
                      <Space>
                        <Button
                          type="text"
                          size="small"
                          icon={<EditOutlined />}
                          onClick={(e) => {
                            e.stopPropagation()
                            message.info(`Modifier ${domain.title}`)
                          }}
                        />
                        <Button
                          type="text"
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            e.stopPropagation()
                            message.info(`Supprimer ${domain.title}`)
                          }}
                        />
                      </Space>
                    </div>
                  }
                  key={domain.key}
                  className="mb-2"
                >
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600 mb-3">
                      <Text>Thématiques associées:</Text>
                      <Button
                        type="link"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => handleAddCompetency(domain.key)}
                        className="ml-2 text-blue-600"
                      >
                        Ajouter Thématique
                      </Button>
                    </div>

                    {domain.items.map((item) => (
                      <div key={item.key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Switch
                            size="small"
                            checked={item.selected}
                            onChange={() => handleCompetencyToggle(domain.key, item.key)}
                          />
                          <Text className={item.selected ? "font-medium text-blue-600" : ""}>{item.title}</Text>
                        </div>
                        <Space>
                          <Tooltip title="Dupliquer">
                            <Button type="text" size="small" icon={<CopyOutlined />} />
                          </Tooltip>
                          <Tooltip title="Modifier">
                            <Button type="text" size="small" icon={<EditOutlined />} />
                          </Tooltip>
                          <Tooltip title="Supprimer">
                            <Button type="text" size="small" icon={<DeleteOutlined />} />
                          </Tooltip>
                        </Space>
                      </div>
                    ))}
                  </div>
                </Panel>
              ))}
            </Collapse>

            <div className="mt-6">
              <Button type="dashed" icon={<PlusOutlined />} className="w-full h-12 text-blue-600 border-blue-300">
                Ajouter un Domaine
              </Button>
            </div>
          </Card>
        </Col>

        {/* Import Existing Catalogue */}
        <Col xs={24} lg={10}>
          <Card title="Ou Importer un Catalogue Existant" className="shadow-lg border-0 h-full">
            <div className="space-y-6">
              <div>
                <Text className="block mb-3">Sélectionner un fichier de catalogue</Text>
                <Dragger
                  accept=".xlsx,.xls,.csv"
                  beforeUpload={handleFileUpload}
                  showUploadList={false}
                  className="border-2 border-dashed border-blue-300 bg-blue-50 hover:border-blue-400 transition-colors"
                >
                  <p className="ant-upload-drag-icon">
                    <FileExcelOutlined className="text-4xl text-blue-500" />
                  </p>
                  <p className="ant-upload-text text-gray-700">Cliquez ou glissez un fichier Excel ici</p>
                  <p className="ant-upload-hint text-gray-500">Formats supportés: .xlsx, .xls, .csv</p>
                </Dragger>
              </div>

              <Divider />

              <div>
                <Text className="block mb-3">Description du catalogue importé</Text>
                <Input.TextArea
                  rows={4}
                  placeholder="Décrivez le contenu du catalogue importé..."
                  className="resize-none"
                />
              </div>

              <div className="space-y-4">
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  size="large"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 border-0 h-12"
                  loading={loading}
                >
                  Importer le Catalogue
                </Button>

                <Button
                  icon={<EyeOutlined />}
                  size="large"
                  className="w-full h-12"
                  onClick={() => setImportModalVisible(true)}
                >
                  Aperçu avant import
                </Button>
              </div>

              <Alert
                message="Format de fichier"
                description="Utilisez le template Excel fourni pour garantir une importation correcte. Le fichier doit contenir les colonnes: Domaine, Compétence, Niveau, Description."
                type="info"
                showIcon
                className="mt-4"
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      <CatalogVisualizationModal
        visible={catalogVisualizationVisible}
        onClose={() => setCatalogVisualizationVisible(false)}
      />

      <Modal
        title="Catalogue de Formation Prédéfini"
        open={predefinedCatalogVisible}
        onCancel={() => setPredefinedCatalogVisible(false)}
        footer={null}
        width={800}
      >
        <PredefinedCatalog
          onUse={() => {
            message.success("Catalogue prédéfini sélectionné!")
            setPredefinedCatalogVisible(false)
          }}
          onCustomize={() => {
            message.info("Mode personnalisation activé")
            setPredefinedCatalogVisible(false)
          }}
          onClose={() => setPredefinedCatalogVisible(false)}
        />
      </Modal>

      <FinalDistributionModal visible={finalDistributionVisible} onClose={() => setFinalDistributionVisible(false)} />

      <HRDistributionModal visible={hrDistributionVisible} onClose={() => setHrDistributionVisible(false)} />

      <EmployeeDistributionModal
        visible={employeeDistributionVisible}
        onClose={() => setEmployeeDistributionVisible(false)}
      />

      <Modal
        title="Validation des Demandes Employés"
        open={employeeValidationVisible}
        onCancel={() => setEmployeeValidationVisible(false)}
        width="90%"
        footer={null}
        style={{ top: 20 }}
      >
        <EmployeeValidationInterface />
      </Modal>

      {/* Import Preview Modal */}
      <Modal
        title="Aperçu du Catalogue à Importer"
        open={importModalVisible}
        onCancel={() => setImportModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setImportModalVisible(false)}>
            Annuler
          </Button>,
          <Button
            key="import"
            type="primary"
            onClick={() => {
              message.success("Catalogue importé avec succès")
              setImportModalVisible(false)
            }}
          >
            Confirmer l'Import
          </Button>,
        ]}
      >
        {previewData && (
          <div className="space-y-4">
            <Alert
              message="Données détectées"
              description={`${previewData.length} compétences trouvées dans le fichier`}
              type="success"
              showIcon
            />

            <div className="max-h-96 overflow-y-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-2 text-left">Domaine</th>
                    <th className="border border-gray-300 p-2 text-left">Compétence</th>
                    <th className="border border-gray-300 p-2 text-left">Niveau</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{row.domaine}</td>
                      <td className="border border-gray-300 p-2">{row.competence}</td>
                      <td className="border border-gray-300 p-2">
                        <Tag
                          color={row.niveau === "Avancé" ? "green" : row.niveau === "Intermédiaire" ? "orange" : "blue"}
                        >
                          {row.niveau}
                        </Tag>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default RecensementBesoin
