"use client"

import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Tag,
  Statistic,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  message,
  Space,
  Avatar,
  Tooltip,
} from "antd"
import {
  UserOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  StarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"

const { Option } = Select
const { TextArea } = Input

const FormateurInterne = () => {
  const [addTrainerModalVisible, setAddTrainerModalVisible] = useState(false)
  const [viewMode, setViewMode] = useState("cards")
  const [form] = Form.useForm()

  // Training specialties
  const specialties = [
    "Comptabilité",
    "Ressources Humaines",
    "Qualité",
    "Sécurité",
    "Design",
    "UI/UX",
    "Data Analysis",
    "Intelligence Artificielle",
    "Machine Learning",
    "DevOps",
    "Cloud Computing",
    "Cybersécurité",
  ]

  // Professional certifications
  const certifications = [
    "PMP",
    "Scrum Master",
    "PRINCE2",
    "AWS Certified",
    "React Certified",
    "CIPD",
    "Coach Certifié",
    "Microsoft Certified",
    "Google Cloud Certified",
    "Salesforce Certified",
    "Adobe Certified",
    "ITIL",
  ]

  // Sample trainers data
  const trainersData = [
    {
      key: "1",
      id: "FEO-FOR-001",
      name: "Marie Expertise",
      firstName: "Marie",
      lastName: "Expertise",
      role: "Manager",
      department: "Direction Projets SI",
      email: "marie.expertise@ehc.fr",
      phone: "06 12 34 56 78",
      grade: "Cadre Supérieur",
      experience: "8 ans",
      status: "disponible",
      specialties: ["Gestion de Projet", "Agile", "Leadership"],
      certifications: ["PMP", "Scrum Master", "PRINCE2"],
      description: "Experte en gestion de projet avec 8 ans d'expérience dans le secteur IT.",
      avatar: null,
    },
    {
      key: "2",
      id: "FEO-DEV-002",
      name: "Jean Formateur",
      firstName: "Jean",
      lastName: "Formateur",
      role: "Ingénieur développeur",
      department: "Service Frontend",
      email: "jean.formateur@ehc.fr",
      phone: "06 98 76 54 32",
      grade: "Senior",
      experience: "6 ans",
      status: "partiellement-disponible",
      specialties: ["Développement Web", "JavaScript", "React"],
      certifications: ["AWS Certified", "React Certified"],
      description: "Développeur senior spécialisé dans les technologies web modernes.",
      avatar: null,
    },
    {
      key: "3",
      id: "FEO-RH-003",
      name: "Sophie Mentor",
      firstName: "Sophie",
      lastName: "Mentor",
      role: "RH",
      department: "FEORHAMAC Formation",
      email: "sophie.mentor@ehc.fr",
      phone: "05 11 22 33 44",
      grade: "Cadre",
      experience: "10 ans",
      status: "disponible",
      specialties: ["Communication", "Management", "Recrutement"],
      certifications: ["CIPD", "Coach Certifié"],
      description: "Spécialiste RH avec une forte expertise en développement des compétences.",
      avatar: null,
    },
  ]

  const getStatusTag = (status) => {
    const statusConfig = {
      disponible: { color: "green", text: "Disponible" },
      "partiellement-disponible": { color: "orange", text: "Partiellement disponible" },
      indisponible: { color: "red", text: "Indisponible" },
    }
    const config = statusConfig[status] || statusConfig["disponible"]
    return <Tag color={config.color}>{config.text}</Tag>
  }

  const handleAddTrainer = (values) => {
    console.log("Add trainer:", values)
    message.success("Formateur interne ajouté avec succès!")
    setAddTrainerModalVisible(false)
    form.resetFields()
  }

  const TrainerCard = ({ trainer }) => (
    <Card
      className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-200"
      actions={[
        <Tooltip title="Voir" key="view">
          <EyeOutlined />
        </Tooltip>,
        <Tooltip title="Modifier" key="edit">
          <EditOutlined />
        </Tooltip>,
        <Tooltip title="Supprimer" key="delete">
          <DeleteOutlined />
        </Tooltip>,
      ]}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Avatar size={48} icon={<UserOutlined />} className="mr-3" />
          <div>
            <h3 className="font-bold text-lg text-blue-600">{trainer.name}</h3>
            <p className="text-gray-600">
              {trainer.id} • {trainer.role} • {trainer.department}
            </p>
          </div>
        </div>
        <div className="text-right">
          {getStatusTag(trainer.status)}
          <Tag color="blue" className="mt-1">
            Actif
          </Tag>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium mb-2">Contact:</h4>
          <div className="text-sm space-y-1">
            <div className="flex items-center">
              <MailOutlined className="mr-2 text-gray-500" />
              <span>{trainer.email}</span>
            </div>
            <div className="flex items-center">
              <PhoneOutlined className="mr-2 text-gray-500" />
              <span>{trainer.phone}</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Informations:</h4>
          <div className="text-sm space-y-1">
            <div>Grade: {trainer.grade}</div>
            <div>Expérience: {trainer.experience}</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Spécialités:</h4>
        <div className="flex flex-wrap gap-1">
          {trainer.specialties.map((specialty, index) => (
            <Tag key={index} color="orange">
              {specialty}
            </Tag>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Certifications:</h4>
        <div className="flex flex-wrap gap-1">
          {trainer.certifications.map((cert, index) => (
            <Tag key={index} color="green">
              {cert}
            </Tag>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600 italic">{trainer.description}</p>
      </div>
    </Card>
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Formateurs Internes</h1>
          <p className="text-gray-600">Gérez vos formateurs internes et leurs compétences</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setAddTrainerModalVisible(true)}
          className="bg-gray-800 border-gray-800 hover:bg-gray-700"
        >
          Ajouter un formateur
        </Button>
      </div>

      {/* Statistics */}
      <Card title="Statistiques des Formateurs Internes" className="mb-6">
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="Total formateurs" value={3} valueStyle={{ color: "#1890ff", fontSize: "32px" }} />
          </Col>
          <Col span={6}>
            <Statistic title="Disponibles" value={2} valueStyle={{ color: "#52c41a", fontSize: "32px" }} />
          </Col>
          <Col span={6}>
            <Statistic title="Partiellement dispo." value={1} valueStyle={{ color: "#fa8c16", fontSize: "32px" }} />
          </Col>
          <Col span={6}>
            <Statistic title="Spécialités totales" value={9} valueStyle={{ color: "#722ed1", fontSize: "32px" }} />
          </Col>
        </Row>
      </Card>

      {/* Trainers List */}
      <Card>
        <Row gutter={16}>
          {trainersData.map((trainer) => (
            <Col span={24} key={trainer.key}>
              <TrainerCard trainer={trainer} />
            </Col>
          ))}
        </Row>
      </Card>

      {/* Add Trainer Modal */}
      <Modal
        title={
          <div className="flex items-center">
            <UserOutlined className="mr-2" />
            <span>Ajouter un Formateur Interne</span>
          </div>
        }
        open={addTrainerModalVisible}
        onCancel={() => setAddTrainerModalVisible(false)}
        footer={null}
        width={800}
        className="top-4"
      >
        <Form form={form} onFinish={handleAddTrainer} layout="vertical">
          {/* Personal Information */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="flex items-center text-blue-700 font-medium mb-4">
              <UserOutlined className="mr-2" />
              Informations Personnelles
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Chercher un Formateur interne dans la liste des collaborateurs :
              </label>
              <Select
                placeholder="Ahmed Sefrioui"
                style={{ width: "100%" }}
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="ahmed">Ahmed Sefrioui</Option>
                <Option value="marie">Marie Dubois</Option>
                <Option value="jean">Jean Martin</Option>
              </Select>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="matricule"
                  label="Matricule/ID"
                  rules={[{ required: true, message: "Veuillez saisir le matricule" }]}
                >
                  <Input placeholder="Ex: FEO-FOR-001" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="nom" label="Nom" rules={[{ required: true, message: "Veuillez saisir le nom" }]}>
                  <Input placeholder="Ex: Expertise" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="prenom"
                  label="Prénom"
                  rules={[{ required: true, message: "Veuillez saisir le prénom" }]}
                >
                  <Input placeholder="Ex: Marie" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="anneeNaissance"
                  label="Année de naissance"
                  rules={[{ required: true, message: "Veuillez saisir l'année" }]}
                >
                  <Input placeholder="1995" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="dateRecrutement"
                  label="Date de recrutement"
                  rules={[{ required: true, message: "Veuillez sélectionner la date" }]}
                >
                  <DatePicker style={{ width: "100%" }} placeholder="jj/mm/aaaa" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="niveauEtude"
                  label="Niveau d'étude/Diplôme"
                  rules={[{ required: true, message: "Veuillez sélectionner le niveau" }]}
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
            </Row>
          </div>

          {/* Professional Information */}
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h3 className="flex items-center text-green-700 font-medium mb-4">
              <CheckCircleOutlined className="mr-2" />
              Informations Professionnelles
            </h3>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="fonction"
                  label="Fonction"
                  rules={[{ required: true, message: "Veuillez sélectionner la fonction" }]}
                >
                  <Select placeholder="Sélectionner la fonction">
                    <Option value="manager">Manager</Option>
                    <Option value="ingenieur">Ingénieur</Option>
                    <Option value="technicien">Technicien</Option>
                    <Option value="consultant">Consultant</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="grade"
                  label="Positionnement/Grade"
                  rules={[{ required: true, message: "Veuillez sélectionner le grade" }]}
                >
                  <Select placeholder="Sélectionner la grade">
                    <Option value="junior">Junior</Option>
                    <Option value="senior">Senior</Option>
                    <Option value="cadre">Cadre</Option>
                    <Option value="cadre-superieur">Cadre Supérieur</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="entite"
              label="Entité de rattachement hiérarchique"
              rules={[{ required: true, message: "Veuillez sélectionner l'entité" }]}
            >
              <Select placeholder="Sélectionner l'entité de rattachement">
                <Option value="direction-si">Direction Projets SI</Option>
                <Option value="service-frontend">Service Frontend</Option>
                <Option value="rh">Ressources Humaines</Option>
                <Option value="formation">FEORHAMAC Formation</Option>
              </Select>
            </Form.Item>

            <Form.Item name="experience" label="Années d'expérience">
              <Input placeholder="Ex: 8 ans" />
            </Form.Item>
          </div>

          {/* Contact Information */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h3 className="flex items-center text-purple-700 font-medium mb-4">
              <MailOutlined className="mr-2" />
              Informations de Contact
            </h3>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email professionnel"
                  rules={[
                    { required: true, message: "Veuillez saisir l'email" },
                    { type: "email", message: "Format email invalide" },
                  ]}
                >
                  <Input placeholder="Ex: marie.expertise@ehc.fr" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="telephone" label="Téléphone">
                  <Input placeholder="Ex: 06 12 34 56 78" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Training Specialties */}
          <div className="bg-orange-50 p-4 rounded-lg mb-6">
            <h3 className="flex items-center text-orange-700 font-medium mb-4">
              <StarOutlined className="mr-2" />
              Spécialités de Formation
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Sélectionnez les spécialités (cliquez pour sélectionner/désélectionner)
            </p>

            <Form.Item name="specialties">
              <Checkbox.Group>
                <Row gutter={[16, 8]}>
                  {specialties.map((specialty, index) => (
                    <Col span={6} key={index}>
                      <Checkbox value={specialty}>{specialty}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>

          {/* Professional Certifications */}
          <div className="bg-teal-50 p-4 rounded-lg mb-6">
            <h3 className="flex items-center text-teal-700 font-medium mb-4">
              <CheckCircleOutlined className="mr-2" />
              Certifications Professionnelles
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Sélectionnez les certifications (cliquez pour sélectionner/désélectionner)
            </p>

            <Form.Item name="certifications">
              <Checkbox.Group>
                <Row gutter={[16, 8]}>
                  {certifications.map((cert, index) => (
                    <Col span={6} key={index}>
                      <Checkbox value={cert}>{cert}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>

          {/* Biography */}
          <Form.Item name="biographie" label="Biographie / Présentation">
            <TextArea rows={4} placeholder="Décrivez l'expérience et les compétences du formateur..." />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button onClick={() => setAddTrainerModalVisible(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit" className="bg-gray-800 border-gray-800">
                Ajouter le Formateur
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default FormateurInterne
