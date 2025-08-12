"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Steps,
  message,
  Checkbox,
  Row,
  Col,
  Typography,
  Divider,
  Space,
  Alert,
} from "antd"
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  BankOutlined,
  EnvironmentOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"
import { clearError } from "../redux/slices/authSlice"

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { Step } = Steps

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userTypes = [
    {
      value: "admin",
      label: "Administrateur",
      description: "Gestion complète de la plateforme",
      icon: "👑",
    },
    {
      value: "manager",
      label: "Manager",
      description: "Gestion des équipes et formations",
      icon: "👨‍💼",
    },
    {
      value: "trainer",
      label: "Formateur",
      description: "Création et animation de formations",
      icon: "👨‍🏫",
    },
    {
      value: "hr",
      label: "Ressources Humaines",
      description: "Gestion des ressources humaines",
      icon: "👥",
    },
    {
      value: "employee",
      label: "Employé",
      description: "Participation aux formations",
      icon: "👨‍💻",
    },
    {
      value: "consultant",
      label: "Consultant",
      description: "Conseil en formation professionnelle",
      icon: "🎯",
    },
  ]

  const steps = [
    {
      title: "Profil",
      description: "Type d'utilisateur",
      icon: <UserOutlined />,
    },
    {
      title: "Personnel",
      description: "Informations personnelles",
      icon: <MailOutlined />,
    },
    {
      title: "Professionnel",
      description: "Informations professionnelles",
      icon: <BankOutlined />,
    },
    {
      title: "Finalisation",
      description: "Confirmation",
      icon: <CheckCircleOutlined />,
    },
  ]

  const handleNext = async () => {
    try {
      const values = await form.validateFields()
      setFormData({ ...formData, ...values })
      setCurrentStep(currentStep + 1)
    } catch (error) {
      console.error("Validation failed:", error)
    }
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const finalData = { ...formData, ...values }

      // dispatch(clearError())
      // const result = await dispatch(registerUser(finalData))

      // if (result.success) {
      //   message.success("Inscription réussie ! Bienvenue sur INGÉNIA !")
      //   navigate("/welcome")
      // } else {
      //   message.error(result.error)
      // }
    } catch (error) {
      message.error("Erreur lors de l'inscription")
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserOutlined className="text-white text-2xl" />
              </div>
              <Title level={3} className="text-gray-800 mb-2">
                Quel est votre profil ?
              </Title>
              <Text className="text-gray-600">Sélectionnez le type de compte qui correspond à votre rôle</Text>
            </div>

            <Form.Item name="userType" rules={[{ required: true, message: "Veuillez sélectionner votre profil" }]}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userTypes.map((type) => (
                  <Card
                    key={type.value}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-indigo-300"
                    onClick={() => form.setFieldsValue({ userType: type.value })}
                  >
                    <div className="text-center p-4">
                      <div className="text-3xl mb-3">{type.icon}</div>
                      <Title level={5} className="mb-2">
                        {type.label}
                      </Title>
                      <Text className="text-gray-600 text-sm">{type.description}</Text>
                    </div>
                  </Card>
                ))}
              </div>
            </Form.Item>
          </div>
        )

      case 1:
        return (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MailOutlined className="text-white text-2xl" />
              </div>
              <Title level={3} className="text-gray-800 mb-2">
                Informations personnelles
              </Title>
              <Text className="text-gray-600">Renseignez vos informations personnelles et de connexion</Text>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="firstName" label="Prénom" rules={[{ required: true, message: "Prénom requis" }]}>
                  <Input prefix={<UserOutlined />} placeholder="Votre prénom" size="large" className="rounded-lg" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lastName" label="Nom" rules={[{ required: true, message: "Nom requis" }]}>
                  <Input prefix={<UserOutlined />} placeholder="Votre nom" size="large" className="rounded-lg" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="email"
              label="Email professionnel"
              rules={[
                { required: true, message: "Email requis" },
                { type: "email", message: "Email invalide" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="votre.email@entreprise.com"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item name="phone" label="Téléphone" rules={[{ required: true, message: "Téléphone requis" }]}>
              <Input prefix={<PhoneOutlined />} placeholder="06 12 34 56 78" size="large" className="rounded-lg" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Mot de passe"
                  rules={[
                    { required: true, message: "Mot de passe requis" },
                    { min: 8, message: "Minimum 8 caractères" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Minimum 8 caractères"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="confirmPassword"
                  label="Confirmer le mot de passe"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Confirmez votre mot de passe" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error("Les mots de passe ne correspondent pas"))
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Répétez le mot de passe"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        )

      case 2:
        return (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BankOutlined className="text-white text-2xl" />
              </div>
              <Title level={3} className="text-gray-800 mb-2">
                Informations professionnelles
              </Title>
              <Text className="text-gray-600">Complétez vos informations professionnelles</Text>
            </div>

            <Form.Item name="company" label="Entreprise" rules={[{ required: true, message: "Entreprise requise" }]}>
              <Input
                prefix={<BankOutlined />}
                placeholder="Nom de votre entreprise"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="department"
                  label="Département"
                  rules={[{ required: true, message: "Département requis" }]}
                >
                  <Input placeholder="RH, IT, Commercial..." size="large" className="rounded-lg" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="position" label="Poste" rules={[{ required: true, message: "Poste requis" }]}>
                  <Input placeholder="Votre fonction" size="large" className="rounded-lg" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="employeeId" label="ID Employé (optionnel)">
              <Input placeholder="Identifiant interne" size="large" className="rounded-lg" />
            </Form.Item>

            <Form.Item name="experience" label="Expérience en formation (optionnel)">
              <Input.TextArea
                placeholder="Décrivez votre expérience dans le domaine de la formation..."
                rows={3}
                className="rounded-lg"
              />
            </Form.Item>

            <Divider orientation="left">
              <Space>
                <EnvironmentOutlined />
                <Text strong>Adresse</Text>
              </Space>
            </Divider>

            <Form.Item name="address" label="Adresse complète">
              <Input.TextArea placeholder="Numéro, rue, ville, code postal" rows={2} className="rounded-lg" />
            </Form.Item>
          </div>
        )

      case 3:
        const selectedUserType = userTypes.find((type) => type.value === formData.userType)

        return (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircleOutlined className="text-white text-2xl" />
              </div>
              <Title level={3} className="text-gray-800 mb-2">
                Finalisation de votre inscription
              </Title>
              <Text className="text-gray-600">Vérifiez vos informations et finalisez votre compte</Text>
            </div>

            <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
              <Title level={4} className="text-indigo-800 mb-4">
                Récapitulatif de votre inscription
              </Title>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Text className="text-gray-600">Type de compte :</Text>
                  <Space>
                    <span className="text-2xl">{selectedUserType?.icon}</span>
                    <Text strong className="text-indigo-600">
                      {selectedUserType?.label}
                    </Text>
                  </Space>
                </div>
                <div className="flex justify-between items-center">
                  <Text className="text-gray-600">Nom complet :</Text>
                  <Text strong>
                    {formData.firstName} {formData.lastName}
                  </Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text className="text-gray-600">Email :</Text>
                  <Text strong>{formData.email}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text className="text-gray-600">Entreprise :</Text>
                  <Text strong>{formData.company}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text className="text-gray-600">Poste :</Text>
                  <Text strong>{formData.position}</Text>
                </div>
              </div>
            </Card>

            <Card className="mb-6">
              <Title level={5} className="mb-4">
                Préférences de communication
              </Title>
              <Space direction="vertical" className="w-full">
                <Form.Item name="notifications" valuePropName="checked" noStyle>
                  <Checkbox defaultChecked>
                    Recevoir les notifications importantes (formations, évaluations, etc.)
                  </Checkbox>
                </Form.Item>
                <Form.Item name="newsletter" valuePropName="checked" noStyle>
                  <Checkbox>S'abonner à la newsletter INGÉNIA (conseils, nouveautés)</Checkbox>
                </Form.Item>
                <Form.Item name="marketing" valuePropName="checked" noStyle>
                  <Checkbox>Recevoir des informations sur nos nouveaux services</Checkbox>
                </Form.Item>
              </Space>
            </Card>

            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error("Vous devez accepter les conditions")),
                },
              ]}
            >
              <Checkbox>
                J'accepte les{" "}
                <a href="/terms" target="_blank" rel="noreferrer" className="text-indigo-600">
                  conditions d'utilisation
                </a>{" "}
                et la{" "}
                <a href="/privacy" target="_blank" rel="noreferrer" className="text-indigo-600">
                  politique de confidentialité
                </a>{" "}
                d'INGÉNIA
              </Checkbox>
            </Form.Item>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/")}
              className="absolute top-4 left-4 text-white hover:text-gray-200"
            >
              Retour
            </Button>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">I</span>
              </div>
              <Title level={2} className="text-white mb-2">
                Rejoignez INGÉNIA
              </Title>
              <Text className="text-blue-100">Créez votre compte en quelques étapes simples</Text>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="p-6 bg-gray-50 border-b">
            <Steps current={currentStep} className="max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <Step key={index} title={step.title} description={step.description} icon={step.icon} />
              ))}
            </Steps>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-6 pb-0">
              <Alert
                message="Erreur d'inscription"
                description={error}
                type="error"
                showIcon
                closable
                onClose={() => dispatch(clearError())}
              />
            </div>
          )}

          {/* Form Content */}
          <div className="p-8">
            <Form form={form} layout="vertical" className="max-w-3xl mx-auto">
              {renderStepContent()}
            </Form>
          </div>

          {/* Navigation Buttons */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex justify-between items-center max-w-3xl mx-auto">
              <div>
                {currentStep > 0 && (
                  <Button onClick={handlePrev} size="large" className="px-6">
                    Précédent
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <Text className="text-gray-500">
                  Étape {currentStep + 1} sur {steps.length}
                </Text>

                {currentStep < steps.length - 1 ? (
                  <Button
                    type="primary"
                    onClick={handleNext}
                    size="large"
                    className="bg-indigo-600 hover:bg-indigo-700 border-0 px-8"
                  >
                    Suivant
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}
                    size="large"
                    className="bg-green-600 hover:bg-green-700 border-0 px-8"
                  >
                    Créer mon compte
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 text-center bg-white">
            <Text className="text-gray-600">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                Se connecter
              </Link>
            </Text>
            <div className="mt-4">
              <Text className="text-sm text-gray-500">
                Besoin d'aide ? Contactez notre support à{" "}
                <a href="mailto:support@ingenia.fr" className="text-indigo-600">
                  support@ingenia.fr
                </a>
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SignupPage
