"use client"

import { useState } from "react"
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Rate,
  Tag,
  Space,
  Row,
  Col,
  Typography,
  Statistic,
  message,
  Avatar,
  Divider,
} from "antd"
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  StarOutlined,
  CalendarOutlined,
  TeamOutlined,
  TrophyOutlined,
  BookOutlined,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { TextArea } = Input

const OrganismeFormation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [editingCabinet, setEditingCabinet] = useState(null)

  // Sample training cabinets data
  const [cabinets, setCabinets] = useState([
    {
      key: "1",
      nom: "FormaPro Excellence",
      ice: "123456789",
      cnss: "987654",
      contactPersonne: "Amina Jamil",
      contactFonction: "Auditeur",
      email: "contact@formapro.fr",
      telephone: "01 23 45 67 89",
      siteWeb: "www.formapro.fr",
      anneesExperience: 15,
      specialites: ["Management", "Leadership", "Gestion de Projet"],
      certifications: ["Qualiopi", "ISO 9001", "OPQF"],
      adresse: "123 Avenue de la Formation, 75001 Paris",
      description: "Organisme spécialisé dans la formation managériale et le développement des compétences.",
      rating: 4.5,
      formations: 25,
      dernierContrat: "2024-01-15",
      statut: "Actif",
      typeContrat: "Contrat Annuel",
    },
    {
      key: "2",
      nom: "DigitalSkills Academy",
      ice: "987654321",
      cnss: "456789",
      contactPersonne: "Ahmed Benali",
      contactFonction: "Responsable Partenariats",
      email: "info@digitalskills.fr",
      telephone: "01 98 76 54 32",
      siteWeb: "www.digitalskills.fr",
      anneesExperience: 8,
      specialites: ["Informatique", "Digital", "Cybersécurité"],
      certifications: ["Qualiopi", "Microsoft Partner"],
      adresse: "456 Rue du Digital, 69000 Lyon",
      description: "Spécialiste des formations digitales et technologiques.",
      rating: 4.2,
      formations: 12,
      dernierContrat: "2024-02-01",
      statut: "Actif",
      typeContrat: "Contrat Projet",
    },
    {
      key: "3",
      nom: "Business Skills Institute",
      ice: "456789123",
      cnss: "789123",
      contactPersonne: "Marie Dubois",
      contactFonction: "Directrice Pédagogique",
      email: "contact@bsi.fr",
      telephone: "01 11 22 33 44",
      siteWeb: "www.bsi.fr",
      anneesExperience: 12,
      specialites: ["Communication", "Vente", "Marketing"],
      certifications: ["Qualiopi", "ICPF & PSI"],
      adresse: "789 Boulevard Business, 33000 Bordeaux",
      description: "Formation aux compétences commerciales et marketing.",
      rating: 4.0,
      formations: 8,
      dernierContrat: "2023-12-15",
      statut: "Inactif",
      typeContrat: "Accord Cadre",
    },
  ])

  const specialiteOptions = [
    "Management",
    "Leadership",
    "Gestion de Projet",
    "Informatique",
    "Digital",
    "Cybersécurité",
    "Communication",
    "Vente",
    "Marketing",
    "Ressources Humaines",
    "Finance",
    "Qualité",
    "Sécurité",
    "Langues",
    "Développement Personnel",
  ]

  const certificationOptions = [
    "Qualiopi",
    "ISO 9001",
    "OPQF",
    "Microsoft Partner",
    "ICPF & PSI",
    "Datadock",
    "AFNOR",
    "Certification Voltaire",
  ]

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newCabinet = {
        key: Date.now().toString(),
        nom: values.nom,
        ice: values.ice,
        cnss: values.cnss,
        contactPersonne: values.contactPersonne,
        contactFonction: values.contactFonction,
        email: values.email,
        telephone: values.telephone,
        siteWeb: values.siteWeb,
        anneesExperience: values.anneesExperience,
        specialites: values.specialites || [],
        certifications: values.certifications || [],
        adresse: values.adresse,
        description: values.description,
        rating: 0,
        formations: 0,
        dernierContrat: new Date().toISOString().split("T")[0],
        statut: "Actif",
        typeContrat: "Nouveau",
      }

      if (editingCabinet) {
        setCabinets(
          cabinets.map((item) => (item.key === editingCabinet.key ? { ...newCabinet, key: editingCabinet.key } : item)),
        )
        message.success("Cabinet modifié avec succès!")
        setEditingCabinet(null)
      } else {
        setCabinets([...cabinets, newCabinet])
        message.success("Cabinet ajouté avec succès!")
      }

      form.resetFields()
      setIsModalVisible(false)
    } catch (error) {
      message.error("Erreur lors de l'enregistrement")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (cabinet) => {
    setEditingCabinet(cabinet)
    form.setFieldsValue(cabinet)
    setIsModalVisible(true)
  }

  const handleDelete = (cabinet) => {
    Modal.confirm({
      title: "Confirmer la suppression",
      content: "Êtes-vous sûr de vouloir supprimer ce cabinet de formation ?",
      okText: "Supprimer",
      cancelText: "Annuler",
      okType: "danger",
      onOk: () => {
        setCabinets(cabinets.filter((item) => item.key !== cabinet.key))
        message.success("Cabinet supprimé avec succès!")
      },
    })
  }

  const handleView = (cabinet) => {
    Modal.info({
      title: `Détails - ${cabinet.nom}`,
      width: 700,
      content: (
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text strong>ICE:</Text>
              <br />
              <Text>{cabinet.ice}</Text>
            </div>
            <div>
              <Text strong>CNSS:</Text>
              <br />
              <Text>{cabinet.cnss}</Text>
            </div>
            <div>
              <Text strong>Contact:</Text>
              <br />
              <Text>{cabinet.contactPersonne}</Text>
            </div>
            <div>
              <Text strong>Fonction:</Text>
              <br />
              <Text>{cabinet.contactFonction}</Text>
            </div>
            <div>
              <Text strong>Email:</Text>
              <br />
              <Text>{cabinet.email}</Text>
            </div>
            <div>
              <Text strong>Téléphone:</Text>
              <br />
              <Text>{cabinet.telephone}</Text>
            </div>
            <div>
              <Text strong>Expérience:</Text>
              <br />
              <Text>{cabinet.anneesExperience} ans</Text>
            </div>
            <div>
              <Text strong>Formations:</Text>
              <br />
              <Text>{cabinet.formations}</Text>
            </div>
          </div>
          <div>
            <Text strong>Spécialités:</Text>
            <br />
            <div className="mt-2">
              {cabinet.specialites.map((spec) => (
                <Tag key={spec} color="blue" className="mb-1">
                  {spec}
                </Tag>
              ))}
            </div>
          </div>
          <div>
            <Text strong>Certifications:</Text>
            <br />
            <div className="mt-2">
              {cabinet.certifications.map((cert) => (
                <Tag key={cert} color="green" className="mb-1">
                  {cert}
                </Tag>
              ))}
            </div>
          </div>
          <div>
            <Text strong>Description:</Text>
            <br />
            <Paragraph>{cabinet.description}</Paragraph>
          </div>
        </div>
      ),
    })
  }

  // Calculate statistics
  const totalCabinets = cabinets.length
  const activeCabinets = cabinets.filter((cabinet) => cabinet.statut === "Actif").length
  const totalFormations = cabinets.reduce((sum, cabinet) => sum + cabinet.formations, 0)
  const averageRating =
    cabinets.length > 0 ? (cabinets.reduce((sum, cabinet) => sum + cabinet.rating, 0) / cabinets.length).toFixed(1) : 0

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2} className="mb-2">
              Gestion des Cabinets de Formation
            </Title>
            <Text className="text-gray-600">Gérez vos partenaires de formation et leurs spécialités</Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingCabinet(null)
              form.resetFields()
              setIsModalVisible(true)
            }}
            size="large"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Ajouter un cabinet
          </Button>
        </div>

        {/* Training Cabinets Cards */}
        <div className="space-y-6 mb-8">
          {cabinets.map((cabinet) => (
            <Card key={cabinet.key} className="shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <Avatar size={64} style={{ backgroundColor: "#1890ff" }} className="flex-shrink-0">
                    {cabinet.nom.charAt(0)}
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Title level={4} className="mb-0">
                        {cabinet.nom}
                      </Title>
                      <Tag color={cabinet.statut === "Actif" ? "green" : "red"}>{cabinet.statut}</Tag>
                      <Tag color="blue">{cabinet.typeContrat}</Tag>
                    </div>
                    <Text className="text-gray-600 mb-2">{cabinet.contactFonction}</Text>
                    <div className="flex items-center space-x-1 mb-2">
                      <Rate disabled defaultValue={cabinet.rating} allowHalf />
                      <Text className="text-gray-500">({cabinet.rating}/5)</Text>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <Text strong>Contact:</Text>
                        <br />
                        <div className="flex items-center space-x-2 text-sm">
                          <MailOutlined />
                          <Text>{cabinet.email}</Text>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <PhoneOutlined />
                          <Text>{cabinet.telephone}</Text>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <GlobalOutlined />
                          <Text>{cabinet.siteWeb}</Text>
                        </div>
                      </div>
                      <div>
                        <Text strong>Informations:</Text>
                        <br />
                        <div className="flex items-center space-x-2 text-sm">
                          <CalendarOutlined />
                          <Text>Expérience: {cabinet.anneesExperience} ans</Text>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <BookOutlined />
                          <Text>Formations: {cabinet.formations}</Text>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <CalendarOutlined />
                          <Text>Dernier contrat: {cabinet.dernierContrat}</Text>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <EnvironmentOutlined />
                        <Text>{cabinet.adresse}</Text>
                      </div>
                    </div>
                    <div className="mb-3">
                      <Text strong>Spécialités:</Text>
                      <div className="mt-1">
                        {cabinet.specialites.map((specialite) => (
                          <Tag key={specialite} color="blue" className="mb-1">
                            {specialite}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <div className="mb-3">
                      <Text strong>Certifications:</Text>
                      <div className="mt-1">
                        {cabinet.certifications.map((certification) => (
                          <Tag key={certification} color="green" className="mb-1">
                            {certification}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <Paragraph className="text-gray-600 mb-0">{cabinet.description}</Paragraph>
                  </div>
                </div>
                <Space direction="vertical">
                  <Button
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={() => handleView(cabinet)}
                    className="text-blue-600"
                  />
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(cabinet)}
                    className="text-green-600"
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(cabinet)}
                    className="text-red-600"
                  />
                </Space>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <Card title="Statistiques des Cabinets" className="shadow-sm">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={6}>
              <Statistic
                title="Total cabinets"
                value={totalCabinets}
                prefix={<TeamOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Col>
            <Col xs={24} sm={6}>
              <Statistic
                title="Actifs"
                value={activeCabinets}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Col>
            <Col xs={24} sm={6}>
              <Statistic
                title="Formations totales"
                value={totalFormations}
                prefix={<BookOutlined />}
                valueStyle={{ color: "#fa8c16" }}
              />
            </Col>
            <Col xs={24} sm={6}>
              <Statistic
                title="Note moyenne"
                value={averageRating}
                prefix={<StarOutlined />}
                valueStyle={{ color: "#722ed1" }}
              />
            </Col>
          </Row>
        </Card>

        {/* Add/Edit Cabinet Modal */}
        <Modal
          title={editingCabinet ? "Modifier le Cabinet" : "Ajouter un Cabinet de Formation"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false)
            setEditingCabinet(null)
            form.resetFields()
          }}
          footer={null}
          width={800}
          className="top-4"
        >
          <Divider />
          <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Nom du cabinet"
                  name="nom"
                  rules={[{ required: true, message: "Veuillez saisir le nom du cabinet" }]}
                >
                  <Input placeholder="FormaPro Excellence" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="ICE"
                  name="ice"
                  rules={[{ required: true, message: "Veuillez saisir le numéro ICE" }]}
                >
                  <Input placeholder="123456789" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="N° CNSS"
                  name="cnss"
                  rules={[{ required: true, message: "Veuillez saisir le numéro CNSS" }]}
                >
                  <Input placeholder="987654" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Personne de contact"
                  name="contactPersonne"
                  rules={[{ required: true, message: "Veuillez saisir le nom du contact" }]}
                >
                  <Input placeholder="Amina Jamil" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Fonction de la personne de contact"
                  name="contactFonction"
                  rules={[{ required: true, message: "Veuillez saisir la fonction" }]}
                >
                  <Input placeholder="Auditeur" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Veuillez saisir l'email" },
                    { type: "email", message: "Format d'email invalide" },
                  ]}
                >
                  <Input placeholder="contact@formapro.fr" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Téléphone"
                  name="telephone"
                  rules={[{ required: true, message: "Veuillez saisir le téléphone" }]}
                >
                  <Input placeholder="01 23 45 67 89" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Site web" name="siteWeb">
                  <Input placeholder="www.formapro.fr" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Années d'expérience"
                  name="anneesExperience"
                  rules={[{ required: true, message: "Veuillez saisir les années d'expérience" }]}
                >
                  <Input placeholder="15 ans" size="large" type="number" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Spécialités (séparées par des virgules)"
              name="specialites"
              rules={[{ required: true, message: "Veuillez sélectionner les spécialités" }]}
            >
              <Select
                mode="multiple"
                placeholder="Management, Leadership, Gestion de Projet"
                size="large"
                options={specialiteOptions.map((option) => ({ label: option, value: option }))}
              />
            </Form.Item>

            <Form.Item
              label="Certifications (séparées par des virgules)"
              name="certifications"
              rules={[{ required: true, message: "Veuillez sélectionner les certifications" }]}
            >
              <Select
                mode="multiple"
                placeholder="Qualiopi, ISO 9001, OPQF"
                size="large"
                options={certificationOptions.map((option) => ({ label: option, value: option }))}
              />
            </Form.Item>

            <Form.Item
              label="Adresse complète"
              name="adresse"
              rules={[{ required: true, message: "Veuillez saisir l'adresse" }]}
            >
              <Input placeholder="123 Avenue de la Formation, 75001 Paris" size="large" />
            </Form.Item>

            <Form.Item
              label="Description / Présentation"
              name="description"
              rules={[{ required: true, message: "Veuillez saisir une description" }]}
            >
              <TextArea rows={4} placeholder="Décrivez les services et spécialités du cabinet..." size="large" />
            </Form.Item>

            <Divider />

            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => {
                  setIsModalVisible(false)
                  setEditingCabinet(null)
                  form.resetFields()
                }}
                size="large"
              >
                Annuler
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingCabinet ? "Modifier le Cabinet" : "Ajouter le cabinet"}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default OrganismeFormation
