"use client"

import { useState } from "react"
import {
  Card,
  Button,
  Modal,
  Input,
  Select,
  Table,
  Space,
  Tag,
  message,
  Row,
  Col,
  Typography,
  Progress,
  Upload,
  Form,
} from "antd"
import {
  CloudUploadOutlined,
  FolderAddOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  ShareAltOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FilePptOutlined,
  FileImageOutlined,
  PlayCircleOutlined,
  FolderOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography
const { Option } = Select
const { Dragger } = Upload

const BibliothequeEnLigne = () => {
  const [viewMode, setViewMode] = useState("list") // 'list' or 'grid'
  const [selectedCategory, setSelectedCategory] = useState("tous")
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false)
  const [isCreateFolderModalVisible, setIsCreateFolderModalVisible] = useState(false)
  const [isStatsModalVisible, setIsStatsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [folderForm] = Form.useForm()

  // Sample files data
  const filesData = [
    {
      key: "1",
      name: "Guide_Formation_Leadership.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "02/12/2024",
      uploader: "Marie Dubois",
      description: "Guide complet sur les techniques de leadership moderne et la gestion d'équipe.",
      category: "rapports",
      views: 156,
    },
    {
      key: "2",
      name: "Webinaire_Cybersecurite_2024.mp4",
      type: "MP4",
      size: "156.7 MB",
      uploadDate: "04/12/2024",
      uploader: "Ahmed Benali",
      description: "Webinaire sur les dernières menaces en cybersécurité et les bonnes pratiques.",
      category: "videos",
      views: 134,
    },
    {
      key: "3",
      name: "Evaluation_Formation_Q4.xlsx",
      type: "XLSX",
      size: "847 KB",
      uploadDate: "03/12/2024",
      uploader: "Pierre Martin",
      description: "Tableau d'évaluation des formations du quatrième trimestre 2024.",
      category: "evaluations",
      views: 98,
    },
    {
      key: "4",
      name: "Organigramme_Formation_2024.png",
      type: "PNG",
      size: "1.2 MB",
      uploadDate: "02/12/2024",
      uploader: "Sarah Alami",
      description: "Organigramme détaillé du département formation pour l'année 2024.",
      category: "presentations",
      views: 87,
    },
    {
      key: "5",
      name: "Presentation_Budget_Formation.pptx",
      type: "PPTX",
      size: "5.6 MB",
      uploadDate: "01/12/2024",
      uploader: "Fatima Zahra",
      description: "Présentation détaillée du budget formation 2024 et projections 2025.",
      category: "presentations",
      views: 76,
    },
    {
      key: "6",
      name: "Procedure_Inscription_Formation.docx",
      type: "DOCX",
      size: "1.9 MB",
      uploadDate: "30/11/2024",
      uploader: "Jean Dupont",
      description: "Procédure complète d'inscription aux formations internes et externes.",
      category: "procedures",
      views: 65,
    },
    {
      key: "7",
      name: "Certificat_Formation_Excel.pdf",
      type: "PDF",
      size: "850 KB",
      uploadDate: "28/11/2024",
      uploader: "Marie Leblanc",
      description: "Modèle de certificat pour les formations Excel avancé.",
      category: "certifications",
      views: 54,
    },
    {
      key: "8",
      name: "Tutorial_Plateforme_Formation.mp4",
      type: "MP4",
      size: "85.3 MB",
      uploadDate: "25/11/2024",
      uploader: "Lucie Petit",
      description: "Tutoriel d'utilisation de la plateforme de formation en ligne.",
      category: "videos",
      views: 43,
    },
  ]

  // Categories data
  const categories = [
    { key: "tous", label: "Tous les fichiers", count: 86, icon: <FolderOutlined /> },
    { key: "rapports", label: "Rapports de formation", count: 15, icon: <FileTextOutlined /> },
    { key: "videos", label: "Vidéos formation", count: 8, icon: <PlayCircleOutlined /> },
    { key: "evaluations", label: "Évaluations", count: 29, icon: <FileExcelOutlined /> },
    { key: "certifications", label: "Certifications", count: 6, icon: <FilePdfOutlined /> },
    { key: "procedures", label: "Procédures", count: 9, icon: <FileWordOutlined /> },
    { key: "presentations", label: "Présentations", count: 11, icon: <FilePptOutlined /> },
    { key: "ressources", label: "Ressources partagées", count: 7, icon: <ShareAltOutlined /> },
  ]

  const getFileIcon = (type) => {
    const iconProps = { style: { fontSize: "24px" } }
    switch (type) {
      case "PDF":
        return <FilePdfOutlined {...iconProps} style={{ ...iconProps.style, color: "#ff4d4f" }} />
      case "XLSX":
        return <FileExcelOutlined {...iconProps} style={{ ...iconProps.style, color: "#52c41a" }} />
      case "DOCX":
        return <FileWordOutlined {...iconProps} style={{ ...iconProps.style, color: "#1890ff" }} />
      case "PPTX":
        return <FilePptOutlined {...iconProps} style={{ ...iconProps.style, color: "#fa8c16" }} />
      case "PNG":
        return <FileImageOutlined {...iconProps} style={{ ...iconProps.style, color: "#722ed1" }} />
      case "MP4":
        return <PlayCircleOutlined {...iconProps} style={{ ...iconProps.style, color: "#1890ff" }} />
      default:
        return <FileTextOutlined {...iconProps} />
    }
  }

  const getFileTypeColor = (type) => {
    const colors = {
      PDF: "red",
      XLSX: "green",
      DOCX: "blue",
      PPTX: "orange",
      PNG: "purple",
      MP4: "blue",
    }
    return colors[type] || "default"
  }

  const filteredFiles = filesData.filter((file) => {
    const matchesCategory = selectedCategory === "tous" || file.category === selectedCategory
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleUpload = async (values) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      message.success("Fichier téléchargé avec succès!")
      setIsUploadModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error("Erreur lors du téléchargement")
    }
  }

  const handleCreateFolder = async (values) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      message.success("Dossier créé avec succès!")
      setIsCreateFolderModalVisible(false)
      folderForm.resetFields()
    } catch (error) {
      message.error("Erreur lors de la création du dossier")
    }
  }

  const columns = [
    {
      title: "Fichier",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          {getFileIcon(record.type)}
          <div>
            <Text strong className="block">
              {text}
            </Text>
            <Text className="text-gray-500 text-xs">{record.description}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color={getFileTypeColor(type)}>{type}</Tag>,
    },
    {
      title: "Taille",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Modifié le",
      dataIndex: "uploadDate",
      key: "uploadDate",
    },
    {
      title: "Par",
      dataIndex: "uploader",
      key: "uploader",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} className="text-blue-600" />
          <Button type="text" icon={<DownloadOutlined />} className="text-green-600" />
          <Button type="text" icon={<ShareAltOutlined />} className="text-purple-600" />
        </Space>
      ),
    },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2} className="mb-2">
              La bibliothèque en ligne
            </Title>
            <Text className="text-gray-600">Responsable RH - Accès complet</Text>
          </div>
          <div className="flex items-center space-x-2">
            <Button type="text" className="text-gray-600">
              Statistiques
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            size="large"
            className="h-12 bg-blue-500 hover:bg-blue-600"
            onClick={() => setIsUploadModalVisible(true)}
          >
            Télécharger fichier
          </Button>
          <Button
            type="primary"
            icon={<FolderAddOutlined />}
            size="large"
            className="h-12 bg-green-500 hover:bg-green-600"
            onClick={() => setIsCreateFolderModalVisible(true)}
          >
            Créer dossier
          </Button>
          <Button
            type="primary"
            icon={<AppstoreOutlined />}
            size="large"
            className="h-12 bg-purple-500 hover:bg-purple-600"
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
          >
            Vue Grille
          </Button>
          <Button
            type="primary"
            icon={<BarChartOutlined />}
            size="large"
            className="h-12 bg-orange-500 hover:bg-orange-600"
            onClick={() => setIsStatsModalVisible(true)}
          >
            Statistiques usage
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-sm">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={8}>
              <Input
                placeholder="Rechercher par nom de fichier ou contenu..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="large"
              />
            </Col>
            <Col xs={24} md={4}>
              <Select defaultValue="tous" size="large" className="w-full">
                <Option value="tous">Tous types</Option>
                <Option value="pdf">PDF</Option>
                <Option value="video">Vidéo</Option>
                <Option value="document">Document</Option>
              </Select>
            </Col>
            <Col xs={24} md={4}>
              <Select defaultValue="toutes" size="large" className="w-full">
                <Option value="toutes">Toutes catégories</Option>
                <Option value="formation">Formation</Option>
                <Option value="evaluation">Évaluation</Option>
              </Select>
            </Col>
            <Col xs={24} md={4}>
              <Select defaultValue="toute" size="large" className="w-full">
                <Option value="toute">Toute</Option>
                <Option value="recent">Récent</Option>
                <Option value="ancien">Ancien</Option>
              </Select>
            </Col>
          </Row>
        </Card>

        <Row gutter={[24, 24]}>
          {/* Sidebar - Navigation by Folders */}
          <Col xs={24} lg={6}>
            <Card title="📁 Navigation par dossiers" className="shadow-sm">
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.key}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === category.key ? "bg-gray-900 text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedCategory(category.key)}
                  >
                    <div className="flex items-center space-x-2">
                      {category.icon}
                      <Text className={selectedCategory === category.key ? "text-white" : ""}>{category.label}</Text>
                    </div>
                    <Text
                      className={`text-xs ${selectedCategory === category.key ? "text-gray-300" : "text-gray-500"}`}
                    >
                      ({category.count})
                    </Text>
                  </div>
                ))}
              </div>
            </Card>

            {/* Storage Usage */}
            <Card title="📊 Utilisation de l'espace de stockage" className="shadow-sm mt-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <Text>Espace utilisé</Text>
                  <Text strong>2.8 GB / 10 GB</Text>
                </div>
                <Progress percent={28} strokeColor="#1890ff" />
              </div>
              <Row gutter={[8, 8]}>
                <Col span={12} className="text-center">
                  <div className="text-blue-600 text-2xl font-bold">156</div>
                  <div className="text-xs text-gray-500">Fichiers PDF</div>
                </Col>
                <Col span={12} className="text-center">
                  <div className="text-green-600 text-2xl font-bold">89</div>
                  <div className="text-xs text-gray-500">Vidéos</div>
                </Col>
                <Col span={12} className="text-center">
                  <div className="text-purple-600 text-2xl font-bold">234</div>
                  <div className="text-xs text-gray-500">Documents</div>
                </Col>
                <Col span={12} className="text-center">
                  <div className="text-orange-600 text-2xl font-bold">67</div>
                  <div className="text-xs text-gray-500">Images</div>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Main Content */}
          <Col xs={24} lg={18}>
            <Card title={`Tous les fichiers (${filteredFiles.length} fichiers)`} className="shadow-sm">
              <Table
                columns={columns}
                dataSource={filteredFiles}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} fichiers`,
                }}
              />
            </Card>
          </Col>
        </Row>

        {/* Upload Modal */}
        <Modal
          title="Télécharger un fichier"
          open={isUploadModalVisible}
          onCancel={() => setIsUploadModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleUpload}>
            <Form.Item name="file" label="Fichier">
              <Dragger>
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined />
                </p>
                <p className="ant-upload-text">Cliquez ou glissez un fichier dans cette zone pour le télécharger</p>
                <p className="ant-upload-hint">
                  Support pour un seul téléchargement. Formats acceptés: PDF, DOC, XLS, PPT, IMG, MP4
                </p>
              </Dragger>
            </Form.Item>
            <Form.Item
              name="category"
              label="Catégorie"
              rules={[{ required: true, message: "Veuillez sélectionner une catégorie" }]}
            >
              <Select placeholder="Sélectionner une catégorie">
                <Option value="rapports">Rapports de formation</Option>
                <Option value="videos">Vidéos formation</Option>
                <Option value="evaluations">Évaluations</Option>
                <Option value="certifications">Certifications</Option>
                <Option value="procedures">Procédures</Option>
                <Option value="presentations">Présentations</Option>
              </Select>
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={3} placeholder="Description du fichier..." />
            </Form.Item>
            <div className="flex justify-end space-x-3">
              <Button onClick={() => setIsUploadModalVisible(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit">
                Télécharger
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Create Folder Modal */}
        <Modal
          title="Créer un nouveau dossier"
          open={isCreateFolderModalVisible}
          onCancel={() => setIsCreateFolderModalVisible(false)}
          footer={null}
          width={400}
        >
          <Form form={folderForm} layout="vertical" onFinish={handleCreateFolder}>
            <Form.Item
              name="folderName"
              label="Nom du dossier"
              rules={[{ required: true, message: "Veuillez saisir le nom du dossier" }]}
            >
              <Input placeholder="Nom du nouveau dossier" />
            </Form.Item>
            <div className="flex justify-end space-x-3 mt-6">
              <Button onClick={() => setIsCreateFolderModalVisible(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit" className="bg-gray-800 hover:bg-gray-900">
                Créer
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Statistics Modal */}
        <Modal
          title="Statistiques d'utilisation de la bibliothèque"
          open={isStatsModalVisible}
          onCancel={() => setIsStatsModalVisible(false)}
          footer={
            <div className="flex justify-end">
              <Button onClick={() => setIsStatsModalVisible(false)}>Fermer</Button>
            </div>
          }
          width={700}
        >
          <div className="space-y-6">
            {/* Statistics Cards */}
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card className="text-center border-l-4 border-l-blue-500">
                  <div className="text-blue-600 text-3xl font-bold">546</div>
                  <div className="text-gray-600 text-sm">Fichiers totaux</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="text-center border-l-4 border-l-green-500">
                  <div className="text-green-600 text-3xl font-bold">1,247</div>
                  <div className="text-gray-600 text-sm">Téléchargements</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="text-center border-l-4 border-l-purple-500">
                  <div className="text-purple-600 text-3xl font-bold">89</div>
                  <div className="text-gray-600 text-sm">Partages</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card className="text-center border-l-4 border-l-orange-500">
                  <div className="text-orange-600 text-3xl font-bold">2.8 GB</div>
                  <div className="text-gray-600 text-sm">Espace utilisé</div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              {/* Most Consulted Files */}
              <Col span={12}>
                <div>
                  <Title level={5} className="mb-4">
                    Fichiers les plus consultés
                  </Title>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Text>Guide_Formation_Leadership.pdf</Text>
                      <Text strong>156 vues</Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Webinaire_Cybersecurite_2024.mp4</Text>
                      <Text strong>134 vues</Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Evaluation_Formation_Q4.xlsx</Text>
                      <Text strong>98 vues</Text>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Monthly Activity */}
              <Col span={12}>
                <div>
                  <Title level={5} className="mb-4">
                    Activité par mois
                  </Title>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Text>Décembre 2024</Text>
                      <Text strong>89 actions</Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Novembre 2024</Text>
                      <Text strong>156 actions</Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Octobre 2024</Text>
                      <Text strong>134 actions</Text>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default BibliothequeEnLigne
