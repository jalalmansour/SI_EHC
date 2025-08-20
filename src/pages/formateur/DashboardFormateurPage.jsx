"use client"

import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Tabs,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Rate,
  Select,
  Divider,
  Tag,
  Alert,
} from "antd"
import {
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
  StarOutlined,
  DownloadOutlined,
  EyeOutlined,
  InboxOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
} from "@ant-design/icons"
import moment from "moment"
import "moment/locale/fr"
import DashboardLayout from "../../layouts/DashboardLayout"

const { TabPane } = Tabs
const { TextArea } = Input
const { Option } = Select
const { Dragger } = Upload

moment.locale("fr")

const DashboardFormateurPage = () => {
  const [loading, setLoading] = useState(false)
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false)
  const [trainingModalVisible, setTrainingModalVisible] = useState(false)
  const [selectedTraining, setSelectedTraining] = useState(null)
  const [form] = Form.useForm()

  // Données simulées
  const dashboardData = {
    stats: {
      upcomingTrainings: 2,
      trainedParticipants: 10,
      pendingEvaluations: 1,
    },
  }

  const assignedTrainings = [
    {
      id: 1,
      title: "Gestion de Projet Agile",
      date: "2024-04-10",
      participants: 15,
      location: "Salle Alpha",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Communication Efficace",
      date: "2024-03-25",
      participants: 10,
      location: "En ligne",
      status: "completed",
    },
    {
      id: 3,
      title: "Leadership et Motivation",
      date: "2024-05-01",
      participants: 12,
      location: "Salle Beta",
      status: "upcoming",
    },
  ]

  const documents = [
    {
      id: 1,
      name: "Programme - Gestion de Projet Agile",
      version: "1.2",
      type: "pdf",
      size: "2.5 MB",
      downloads: 45,
      lastModified: "2024-03-15",
    },
    {
      id: 2,
      name: "Support - Communication Efficace",
      version: "2.0",
      type: "pdf",
      size: "5.1 MB",
      downloads: 32,
      lastModified: "2024-03-10",
    },
    {
      id: 3,
      name: "Exercices - Leadership et Motivation",
      version: "1.0",
      type: "docx",
      size: "1.8 MB",
      downloads: 28,
      lastModified: "2024-03-08",
    },
    {
      id: 4,
      name: "Quiz - Communication Interpersonnelle",
      version: "1.1",
      type: "pdf",
      size: "0.9 MB",
      downloads: 15,
      lastModified: "2024-03-05",
    },
  ]

  const pendingEvaluations = [
    {
      id: 1,
      training: "Communication Efficace",
      type: "Évaluation à hot",
      deadline: "2024-03-26",
    },
  ]

  const completedEvaluations = [
    {
      id: 1,
      training: "Gestion de Projet Agile",
      type: "Évaluation à froid",
      averageRating: 4.2,
      completedDate: "2024-03-20",
    },
    {
      id: 2,
      training: "Leadership Avancé",
      type: "Évaluation à hot",
      averageRating: 4.5,
      completedDate: "2024-03-18",
    },
  ]

  const handleViewTraining = (training) => {
    setSelectedTraining(training)
    setTrainingModalVisible(true)
  }

  const handleEvaluationSubmit = (values) => {
    console.log("Evaluation submitted:", values)
    setEvaluationModalVisible(false)
    message.success("Évaluation soumise avec succès")
  }

  const handleDownload = (document) => {
    message.success(`Téléchargement de ${document.name} démarré`)
  }

  const uploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file
      if (status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (status === "done") {
        message.success(`${info.file.name} téléchargé avec succès.`)
      } else if (status === "error") {
        message.error(`${info.file.name} échec du téléchargement.`)
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files)
    },
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FilePdfOutlined style={{ color: "#ff4d4f", fontSize: "24px" }} />
      case "docx":
        return <FileWordOutlined style={{ color: "#1890ff", fontSize: "24px" }} />
      case "xlsx":
        return <FileExcelOutlined style={{ color: "#52c41a", fontSize: "24px" }} />
      default:
        return <FileTextOutlined style={{ color: "#666", fontSize: "24px" }} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "blue"
      case "completed":
        return "green"
      case "cancelled":
        return "red"
      default:
        return "default"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "upcoming":
        return "À venir"
      case "completed":
        return "Terminée"
      case "cancelled":
        return "Annulée"
      default:
        return "Inconnu"
    }
  }

  return (
    <DashboardLayout>
      <div style={{ padding: "24px" }}>
        {/* En-tête */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>Dashboard Formateur</h1>
          <p style={{ margin: "4px 0 0 0", color: "#666" }}>Gérez vos formations et évaluations</p>
        </div>

        {/* Statistiques */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={8}>
            <Card className="gradient-card-blue">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white text-sm opacity-90">Formations à venir</div>
                  <div className="text-white text-3xl font-bold">{dashboardData.stats.upcomingTrainings}</div>
                </div>
                <CalendarOutlined className="text-white text-2xl opacity-75" />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="gradient-card-green">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white text-sm opacity-90">Participants formés</div>
                  <div className="text-white text-3xl font-bold">{dashboardData.stats.trainedParticipants}</div>
                </div>
                <TeamOutlined className="text-white text-2xl opacity-75" />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="gradient-card-purple">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white text-sm opacity-90">Évaluations à remplir</div>
                  <div className="text-white text-3xl font-bold">{dashboardData.stats.pendingEvaluations}</div>
                </div>
                <FileTextOutlined className="text-white text-2xl opacity-75" />
              </div>
            </Card>
          </Col>
        </Row>

        <Tabs defaultActiveKey="formations" type="card">
          {/* Onglet Mes Formations */}
          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                Mes Formations
              </span>
            }
            key="formations"
          >
            <Card title="Mes Formations Assignées">
              <Row gutter={[16, 16]}>
                {assignedTrainings.map((training) => (
                  <Col xs={24} key={training.id}>
                    <Card
                      size="small"
                      style={{
                        borderLeft: `4px solid ${training.status === "upcoming" ? "#1890ff" : "#52c41a"}`,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h4 style={{ margin: 0, marginBottom: "8px" }}>{training.title}</h4>
                          <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                            <strong>Date:</strong> {moment(training.date).format("DD/MM/YYYY")}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                            <strong>Participants:</strong> {training.participants}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666" }}>
                            <strong>Lieu:</strong> {training.location}
                          </div>
                          <div style={{ marginTop: "8px" }}>
                            <Tag color={getStatusColor(training.status)}>{getStatusText(training.status)}</Tag>
                          </div>
                        </div>
                        <div>
                          {training.status === "upcoming" ? (
                            <Button type="primary" onClick={() => handleViewTraining(training)}>
                              Préparer
                            </Button>
                          ) : (
                            <Button onClick={() => handleViewTraining(training)}>Voir Détails</Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </TabPane>

          {/* Onglet Documents */}
          <TabPane
            tab={
              <span>
                <FileTextOutlined />
                Documents
              </span>
            }
            key="documents"
          >
            <Card title="Documents de Formation">
              <div style={{ marginBottom: "24px" }}>
                <h3>Programmes et Supports</h3>
                <Row gutter={[16, 16]}>
                  {documents.map((doc) => (
                    <Col xs={24} lg={12} key={doc.id}>
                      <Card size="small" hoverable>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          {getFileIcon(doc.type)}
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "500", marginBottom: "4px" }}>{doc.name}</div>
                            <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                              Version {doc.version} • {doc.size}
                            </div>
                            <div style={{ fontSize: "11px", color: "#999" }}>
                              {doc.downloads} téléchargements • Modifié le{" "}
                              {moment(doc.lastModified).format("DD/MM/YYYY")}
                            </div>
                          </div>
                          <Button
                            type="primary"
                            size="small"
                            icon={<DownloadOutlined />}
                            onClick={() => handleDownload(doc)}
                          >
                            Télécharger
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              <Divider />

              <div>
                <h3>Ajouter de nouveaux documents</h3>
                <Dragger {...uploadProps} style={{ marginBottom: "16px" }}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Cliquez ou glissez-déposez vos fichiers ici</p>
                  <p className="ant-upload-hint">Formats supportés: PDF, DOC, DOCX, PPT, PPTX. Taille maximale: 10MB</p>
                </Dragger>
                <Alert
                  message="Formats recommandés"
                  description="PDF pour les supports de cours, DOCX pour les exercices, PPTX pour les présentations"
                  type="info"
                  showIcon
                />
              </div>
            </Card>
          </TabPane>

          {/* Onglet Évaluations */}
          <TabPane
            tab={
              <span>
                <StarOutlined />
                Évaluations
              </span>
            }
            key="evaluations"
          >
            <div>
              <h2 style={{ marginBottom: "16px" }}>Évaluations à Remplir</h2>
              {pendingEvaluations.length > 0 ? (
                <Row gutter={[16, 16]} style={{ marginBottom: "32px" }}>
                  {pendingEvaluations.map((evaluation) => (
                    <Col xs={24} key={evaluation.id}>
                      <Card
                        size="small"
                        style={{ borderLeft: "4px solid #fa8c16" }}
                        actions={[
                          <Button
                            key="fill-evaluation"
                            type="primary"
                            icon={<StarOutlined />}
                            onClick={() => setEvaluationModalVisible(true)}
                          >
                            Remplir l'évaluation
                          </Button>,
                        ]}
                      >
                        <div>
                          <h4 style={{ margin: 0, marginBottom: "8px" }}>{evaluation.training}</h4>
                          <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                            <strong>Type:</strong> {evaluation.type}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666" }}>
                            <strong>Date limite:</strong> {moment(evaluation.deadline).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Alert
                  message="Aucune évaluation en attente"
                  description="Toutes vos évaluations sont à jour"
                  type="success"
                  showIcon
                  style={{ marginBottom: "32px" }}
                />
              )}

              <h2 style={{ marginBottom: "16px" }}>Historique des Évaluations Remplies</h2>
              {completedEvaluations.length > 0 ? (
                <Row gutter={[16, 16]}>
                  {completedEvaluations.map((evaluation) => (
                    <Col xs={24} lg={12} key={evaluation.id}>
                      <Card size="small" style={{ borderLeft: "4px solid #52c41a" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <h4 style={{ margin: 0, marginBottom: "8px" }}>{evaluation.training}</h4>
                            <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                              <strong>Type:</strong> {evaluation.type}
                            </div>
                            <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                              <strong>Complété le:</strong> {moment(evaluation.completedDate).format("DD/MM/YYYY")}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <Rate disabled defaultValue={evaluation.averageRating} style={{ fontSize: "14px" }} />
                              <span style={{ fontSize: "12px", color: "#666" }}>{evaluation.averageRating}/5</span>
                            </div>
                          </div>
                          <Button type="text" icon={<EyeOutlined />} size="small">
                            Voir détails
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Alert
                  message="Aucune évaluation remplie"
                  description="Vos évaluations complétées apparaîtront ici"
                  type="info"
                  showIcon
                />
              )}
            </div>
          </TabPane>
        </Tabs>

        {/* Modal détails formation */}
        <Modal
          title="Détails de la Formation"
          open={trainingModalVisible}
          onCancel={() => {
            setTrainingModalVisible(false)
            setSelectedTraining(null)
          }}
          footer={null}
          width={800}
        >
          {selectedTraining && (
            <div>
              <h3>{selectedTraining.title}</h3>
              <Row gutter={16} style={{ marginBottom: "16px" }}>
                <Col span={12}>
                  <p>
                    <strong>Date:</strong> {moment(selectedTraining.date).format("DD/MM/YYYY")}
                  </p>
                  <p>
                    <strong>Participants:</strong> {selectedTraining.participants}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <strong>Lieu:</strong> {selectedTraining.location}
                  </p>
                  <p>
                    <strong>Statut:</strong>{" "}
                    <Tag color={getStatusColor(selectedTraining.status)}>{getStatusText(selectedTraining.status)}</Tag>
                  </p>
                </Col>
              </Row>

              <Divider />

              <h4>Matériel pédagogique</h4>
              <div style={{ marginBottom: "16px" }}>
                <Tag color="blue">Support de cours</Tag>
                <Tag color="green">Exercices pratiques</Tag>
                <Tag color="orange">Quiz d'évaluation</Tag>
              </div>

              <h4>Préparation recommandée</h4>
              <ul>
                <li>Réviser le support de cours</li>
                <li>Préparer les exercices pratiques</li>
                <li>Vérifier le matériel technique</li>
                <li>Contacter les participants si nécessaire</li>
              </ul>
            </div>
          )}
        </Modal>

        {/* Modal d'évaluation */}
        <Modal
          title="Évaluation de Formation"
          open={evaluationModalVisible}
          onCancel={() => {
            setEvaluationModalVisible(false)
          }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleEvaluationSubmit}>
            <div style={{ backgroundColor: "#f5f5f5", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
              <h4>Communication Efficace</h4>
              <p>Évaluation à hot - À remplir immédiatement après la formation</p>
            </div>

            <Form.Item
              label="Satisfaction globale de la formation"
              name="globalSatisfaction"
              rules={[{ required: true, message: "Note obligatoire" }]}
            >
              <Rate />
            </Form.Item>

            <Form.Item
              label="Qualité du contenu pédagogique"
              name="contentQuality"
              rules={[{ required: true, message: "Note obligatoire" }]}
            >
              <Rate />
            </Form.Item>

            <Form.Item
              label="Interaction avec les participants"
              name="interaction"
              rules={[{ required: true, message: "Note obligatoire" }]}
            >
              <Rate />
            </Form.Item>

            <Form.Item
              label="Atteinte des objectifs pédagogiques"
              name="objectives"
              rules={[{ required: true, message: "Note obligatoire" }]}
            >
              <Rate />
            </Form.Item>

            <Form.Item label="Points forts de la formation" name="strengths">
              <TextArea rows={3} placeholder="Quels sont les points forts de cette formation ?" />
            </Form.Item>

            <Form.Item label="Points d'amélioration" name="improvements">
              <TextArea rows={3} placeholder="Quels aspects pourraient être améliorés ?" />
            </Form.Item>

            <Form.Item label="Commentaires additionnels" name="comments">
              <TextArea rows={2} placeholder="Autres commentaires..." />
            </Form.Item>

            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button onClick={() => setEvaluationModalVisible(false)}>Annuler</Button>
                <Button type="primary" htmlType="submit">
                  Soumettre Évaluation
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default DashboardFormateurPage
