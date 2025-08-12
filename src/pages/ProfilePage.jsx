"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  Row,
  Col,
  Statistic,
  Tag,
  Divider,
  message,
  Progress,
  Timeline,
} from "antd"
import {
  UserOutlined,
  CameraOutlined,
  SaveOutlined,
  TrophyOutlined,
  BookOutlined,
  StarOutlined,
} from "@ant-design/icons"
import { updateUserProfile } from "../redux/slices/authSlice"

const { TextArea } = Input

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)
  const [form] = Form.useForm()
  const [uploading, setUploading] = useState(false)

  // Mock competency data
  const competencies = [
    { name: "Leadership", level: 4, target: 5, lastEvaluation: "2024-01-15" },
    { name: "Communication", level: 5, target: 5, lastEvaluation: "2024-01-10" },
    { name: "Gestion de projet", level: 3, target: 4, lastEvaluation: "2024-01-05" },
    { name: "Analyse technique", level: 4, target: 5, lastEvaluation: "2023-12-20" },
  ]

  // Mock training history
  const trainingHistory = [
    {
      title: "Formation Leadership Avancé",
      date: "2024-01-15",
      status: "completed",
      score: 85,
      type: "hot",
    },
    {
      title: "Gestion de Projet Agile",
      date: "2024-01-10",
      status: "completed",
      score: 92,
      type: "hot",
    },
    {
      title: "Communication Interpersonnelle",
      date: "2023-12-15",
      status: "evaluated",
      score: 78,
      type: "cold",
    },
  ]

  const handleSubmit = async (values) => {
    try {
      await dispatch(updateUserProfile(values)).unwrap()
      message.success("Profil mis à jour avec succès")
    } catch (error) {
      message.error("Erreur lors de la mise à jour du profil")
    }
  }

  const handleAvatarUpload = ({ file }) => {
    setUploading(true)
    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      message.success("Photo de profil mise à jour")
    }, 1000)
  }

  const getRoleColor = (role) => {
    const colors = {
      RRH: "red",
      RF: "blue",
      MANAGER: "green",
      EMPLOYEE: "default",
    }
    return colors[role] || "default"
  }

  const getCompetencyColor = (level, target) => {
    if (level >= target) return "#52c41a"
    if (level >= target - 1) return "#faad14"
    return "#ff4d4f"
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles et suivez vos compétences</p>
      </div>

      <Row gutter={[24, 24]}>
        {/* Profile Information */}
        <Col xs={24} lg={16}>
          <Card title="Informations Personnelles" className="mb-6">
            <div className="flex items-center mb-6">
              <div className="relative">
                <Avatar size={100} src={user?.avatar} icon={<UserOutlined />} className="mr-6" />
                <Upload showUploadList={false} customRequest={handleAvatarUpload} accept="image/*">
                  <Button
                    icon={<CameraOutlined />}
                    size="small"
                    className="absolute bottom-0 right-6"
                    loading={uploading}
                  />
                </Upload>
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600">{user?.position}</p>
                <Tag color={getRoleColor(user?.role)} className="mt-2">
                  {user?.role}
                </Tag>
              </div>
            </div>

            <Form form={form} layout="vertical" initialValues={user} onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Prénom" name="firstName" rules={[{ required: true, message: "Prénom requis" }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Nom" name="lastName" rules={[{ required: true, message: "Nom requis" }]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Email requis" },
                      { type: "email", message: "Email invalide" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Téléphone" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Entreprise" name="company">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Département" name="department">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Poste" name="position">
                <Input />
              </Form.Item>

              <Form.Item label="Adresse" name="address">
                <Input />
              </Form.Item>

              <Form.Item label="Biographie" name="bio">
                <TextArea rows={4} placeholder="Parlez-nous de vous..." showCount maxLength={500} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading} size="large">
                  Sauvegarder les modifications
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Statistics and Competencies */}
        <Col xs={24} lg={8}>
          {/* Profile Statistics */}
          <Card title="Statistiques" className="mb-6">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Formations" value={trainingHistory.length} prefix={<BookOutlined />} />
              </Col>
              <Col span={12}>
                <Statistic title="Score Moyen" value={85} suffix="%" prefix={<TrophyOutlined />} />
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Compétences" value={competencies.length} prefix={<StarOutlined />} />
              </Col>
              <Col span={12}>
                <Statistic title="Niveau Moyen" value={4.0} suffix="/5" prefix={<TrophyOutlined />} />
              </Col>
            </Row>
          </Card>

          {/* Competencies */}
          <Card title="Mes Compétences" className="mb-6">
            <div className="space-y-4">
              {competencies.map((comp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{comp.name}</span>
                    <span className="text-sm text-gray-500">
                      {comp.level}/{comp.target}
                    </span>
                  </div>
                  <Progress
                    percent={(comp.level / 5) * 100}
                    strokeColor={getCompetencyColor(comp.level, comp.target)}
                    showInfo={false}
                    size="small"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Dernière évaluation: {new Date(comp.lastEvaluation).toLocaleDateString("fr-FR")}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Training History */}
      <Card title="Historique des Formations" className="mt-6">
        <Timeline>
          {trainingHistory.map((training, index) => (
            <Timeline.Item key={index} color={training.status === "completed" ? "green" : "blue"}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{training.title}</h4>
                  <p className="text-gray-600 text-sm">{new Date(training.date).toLocaleDateString("fr-FR")}</p>
                  <div className="mt-2">
                    <Tag color={training.type === "hot" ? "orange" : "blue"}>
                      {training.type === "hot" ? "Évaluation à chaud" : "Évaluation à froid"}
                    </Tag>
                    <Tag color={training.score >= 80 ? "green" : training.score >= 60 ? "orange" : "red"}>
                      Score: {training.score}%
                    </Tag>
                  </div>
                </div>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </div>
  )
}

export default ProfilePage
