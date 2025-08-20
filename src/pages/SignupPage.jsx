"use client"

import { useState } from "react"
import { Form, Input, Button, Card, Typography, Divider, Steps, Select, Row, Col, Space, message, Checkbox } from "antd"
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  BankOutlined,
  EnvironmentOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined as ArrowLeft,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { Step } = Steps

export default function SignupPage({ onBackToLanding, onShowLogin, onSignupSuccess }) {
  const navigateBack = () => (onBackToLanding ? onBackToLanding() : window.history.length ? window.history.back() : (window.location.href = "/"))
  const goLogin = () => (onShowLogin ? onShowLogin() : (window.location.href = "/login"))
  const afterSignup = () => (onSignupSuccess ? onSignupSuccess() : (window.location.href = "/login"))
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const userTypes = [
    {
      value: "admin",
      label: "Administrateur",
      description: "Gestion complète de la plateforme",
      icon: "👑",
      features: ["Accès complet", "Gestion utilisateurs", "Configuration système"]
    },
    {
      value: "formateur",
      label: "Formateur",
      description: "Création et animation de formations",
      icon: "👨‍🏫",
      features: ["Création de formations", "Gestion des participants", "Suivi des progrès"]
    },
    {
      value: "rrh",
      label: "Responsable RH",
      description: "Gestion des ressources humaines",
      icon: "👥",
      features: ["Gestion des employés", "Planification des formations", "Rapports RH"]
    },
    {
      value: "manager",
      label: "Manager",
      description: "Gestion des équipes et formations",
      icon: "👨‍💼",
      features: ["Gestion d'équipe", "Planification", "Suivi des objectifs"]
    },
    {
      value: "employee",
      label: "Employé",
      description: "Participation aux formations",
      icon: "👨‍💻",
      features: ["Accès aux formations", "Suivi personnel", "Certifications"]
    }
  ]

  const steps = [
    {
      title: "Type d'utilisateur",
      description: "Choisissez votre profil",
      icon: <UserOutlined />
    },
    {
      title: "Informations personnelles",
      description: "Vos coordonnées",
      icon: <MailOutlined />
    },
    {
      title: "Informations professionnelles",
      description: "Votre entreprise",
      icon: <BankOutlined />
    },
    {
      title: "Sécurité",
      description: "Votre mot de passe",
      icon: <LockOutlined />
    }
  ]

  const handleNext = async () => {
    try {
      const values = await form.validateFields()
      setFormData({ ...formData, ...values })
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        await handleSubmit()
      }
    } catch (error) {
      console.log("Validation failed:", error)
    }
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const finalData = { ...formData, ...values }
      
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      message.success("Compte créé avec succès ! Vous pouvez maintenant vous connecter.")
      
      // Store user data (in real app, this would be handled by the backend)
      localStorage.setItem('signupData', JSON.stringify(finalData))
      
      afterSignup()
    } catch (error) {
      message.error("Erreur lors de la création du compte")
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Title level={3} className="text-xl font-semibold text-gray-900 mb-2">
                Quel type d'utilisateur êtes-vous ?
              </Title>
              <Text className="text-gray-600">
                Sélectionnez le profil qui correspond le mieux à votre rôle
              </Text>
            </div>

            <Row gutter={[16, 16]}>
              {userTypes.map((type, index) => (
                <Col xs={24} sm={12} key={index}>
                  <Card
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      formData.userType === type.value
                        ? "ring-2 ring-blue-500 border-blue-300 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => {
                      form.setFieldsValue({ userType: type.value })
                      setFormData({ ...formData, userType: type.value })
                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{type.icon}</div>
                      <Title level={4} className="text-lg font-semibold text-gray-900 mb-2">
                        {type.label}
                      </Title>
                      <Text className="text-gray-600 text-sm block mb-3">
                        {type.description}
                      </Text>
                      <div className="space-y-1">
                        {type.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-500">
                            <CheckCircleOutlined className="text-green-500 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Title level={3} className="text-xl font-semibold text-gray-900 mb-2">
                Informations personnelles
              </Title>
              <Text className="text-gray-600">
                Renseignez vos coordonnées personnelles
              </Text>
            </div>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="firstName"
                  label="Prénom"
                  rules={[{ required: true, message: "Le prénom est requis" }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Votre prénom"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="lastName"
                  label="Nom"
                  rules={[{ required: true, message: "Le nom est requis" }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Votre nom"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="email"
              label="Email professionnel"
              rules={[
                { required: true, message: "L'email est requis" },
                { type: "email", message: "Format d'email invalide" }
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="votre.email@entreprise.com"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Téléphone"
              rules={[{ required: true, message: "Le téléphone est requis" }]}
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400" />}
                placeholder="+33 1 23 45 67 89"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Title level={3} className="text-xl font-semibold text-gray-900 mb-2">
                Informations professionnelles
              </Title>
              <Text className="text-gray-600">
                Renseignez les informations de votre entreprise
              </Text>
            </div>

            <Form.Item
              name="companyName"
              label="Nom de l'entreprise"
              rules={[{ required: true, message: "Le nom de l'entreprise est requis" }]}
            >
              <Input
                prefix={<BankOutlined className="text-gray-400" />}
                placeholder="Nom de votre entreprise"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="position"
              label="Poste actuel"
              rules={[{ required: true, message: "Le poste est requis" }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Votre poste actuel"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="department"
              label="Département"
              rules={[{ required: true, message: "Le département est requis" }]}
            >
              <Select
                placeholder="Sélectionnez votre département"
                size="large"
                className="rounded-lg"
              >
                <Option value="rh">Ressources Humaines</Option>
                <Option value="formation">Formation</Option>
                <Option value="it">Informatique</Option>
                <Option value="finance">Finance</Option>
                <Option value="commercial">Commercial</Option>
                <Option value="marketing">Marketing</Option>
                <Option value="production">Production</Option>
                <Option value="autre">Autre</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="companySize"
              label="Taille de l'entreprise"
              rules={[{ required: true, message: "La taille de l'entreprise est requise" }]}
            >
              <Select
                placeholder="Sélectionnez la taille de votre entreprise"
                size="large"
                className="rounded-lg"
              >
                <Option value="1-10">1-10 employés</Option>
                <Option value="11-50">11-50 employés</Option>
                <Option value="51-200">51-200 employés</Option>
                <Option value="201-500">201-500 employés</Option>
                <Option value="500+">Plus de 500 employés</Option>
              </Select>
            </Form.Item>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Title level={3} className="text-xl font-semibold text-gray-900 mb-2">
                Sécurité de votre compte
              </Title>
              <Text className="text-gray-600">
                Créez un mot de passe sécurisé pour votre compte
              </Text>
            </div>

            <Form.Item
              name="password"
              label="Mot de passe"
              rules={[
                { required: true, message: "Le mot de passe est requis" },
                { min: 8, message: "Le mot de passe doit contenir au moins 8 caractères" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Votre mot de passe"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirmer le mot de passe"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Veuillez confirmer votre mot de passe" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error("Les mots de passe ne correspondent pas"))
                  }
                })
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirmez votre mot de passe"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item name="terms" valuePropName="checked" rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error("Vous devez accepter les conditions d'utilisation"))
              }
            ]}>
              <Checkbox>
                <Text className="text-sm">
                  J'accepte les{" "}
                  <Button type="link" className="text-blue-600 p-0 h-auto">
                    conditions d'utilisation
                  </Button>{" "}
                  et la{" "}
                  <Button type="link" className="text-blue-600 p-0 h-auto">
                    politique de confidentialité
                  </Button>
                </Text>
              </Checkbox>
            </Form.Item>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-stretch p-0 lg:p-4">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-none lg:rounded-2xl shadow-none lg:shadow-2xl border-0 lg:border">
        {/* Visual side */}
        <div className="hidden lg:flex relative items-center justify-center p-8 bg-gradient-to-br from-purple-600 to-blue-500">
          <img
            src="/training-dashboard-analytics.png"
            alt="Analytique des formations"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            aria-hidden="true"
          />
          <div className="relative z-10 text-center text-white max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-4">EHC</div>
            <h2 className="text-3xl font-semibold mb-2">Créez votre compte</h2>
            <p className="text-white/90">Accédez à une suite RH moderne, rapide et accessible.</p>
          </div>
        </div>

        {/* Form side */}
        <div className="flex items-center justify-center p-6 sm:p-10 bg-white/60 backdrop-blur">
          <div className="w-full max-w-2xl">
        {/* Back Button */}
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
              onClick={navigateBack}
          className="mb-6 text-gray-600 hover:text-blue-600"
        >
          Retour à l'accueil
        </Button>

        {/* Signup Card */}
            <Card className="shadow-xl border-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">EHC</span>
            </div>
            <Title level={2} className="text-2xl font-bold text-gray-900 mb-2">
              Créer votre compte
            </Title>
            <Text className="text-gray-600">
              Rejoignez EHC SIRH et transformez votre gestion RH
            </Text>
          </div>

          {/* Steps */}
          <Steps current={currentStep} className="mb-8">
            {steps.map((step, index) => (
              <Step
                key={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </Steps>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            initialValues={formData}
            className="max-w-2xl mx-auto"
          >
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrev}
                disabled={currentStep === 0}
                icon={<ArrowLeft />}
                size="large"
                className="px-8"
              >
                Précédent
              </Button>

              <Button
                type="primary"
                onClick={handleNext}
                loading={loading}
                size="large"
                className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700"
              >
                {currentStep === steps.length - 1 ? (
                  "Créer mon compte"
                ) : (
                  <>
                    Suivant
                    <ArrowRightOutlined className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </Form>

          <Divider className="my-8">
            <Text className="text-gray-500">ou</Text>
          </Divider>

          <div className="text-center">
            <Text className="text-gray-600">
              Vous avez déjà un compte ?{" "}
              <Button
                type="link"
                  onClick={goLogin}
                className="text-blue-600 p-0 h-auto font-medium"
              >
                Se connecter
              </Button>
            </Text>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <Text className="text-gray-500 text-sm">
              © {new Date().getFullYear()} EHC SIRH. Tous droits réservés.
          </Text>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
