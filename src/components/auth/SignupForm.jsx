"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Card, Form, Input, Button, Select, Steps, message, Checkbox, Row, Col, Typography, Divider } from "antd"
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  BankOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons"
import { registerUser } from "../redux/slices/authSlice"

const { Title, Text } = Typography
const { Option } = Select
const { Step } = Steps

const SignupForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userTypes = [
    { value: "employee", label: "Employé", description: "Participer aux formations" },
    { value: "manager", label: "Manager", description: "Gérer les équipes et formations" },
    { value: "trainer", label: "Formateur", description: "Créer et animer des formations" },
    { value: "hr", label: "RH", description: "Administrer les ressources humaines" },
    { value: "admin", label: "Administrateur", description: "Gestion complète de la plateforme" },
    { value: "consultant", label: "Consultant", description: "Conseiller en formation" },
  ]

  const steps = [
    {
      title: "Profil",
      description: "Type d'utilisateur",
    },
    {
      title: "Personnel",
      description: "Informations personnelles",
    },
    {
      title: "Professionnel",
      description: "Informations professionnelles",
    },
    {
      title: "Finalisation",
      description: "Confirmation",
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
      setLoading(true)
      const values = await form.validateFields()
      const finalData = { ...formData, ...values }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      dispatch(registerUser(finalData))
      message.success("Inscription réussie ! Bienvenue sur INGÉNIA !")
      navigate("/dashboard/welcome")
    } catch (error) {
      message.error("Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <Title level={3} className="text-center mb-6">
              Quel est votre profil ?
            </Title>
            <Form.Item name="userType" rules={[{ required: true, message: "Veuillez sélectionner votre profil" }]}>
              <Select placeholder="Sélectionnez votre profil" size="large" className="w-full">
                {userTypes.map((type) => (
                  <Option key={type.value} value={type.value}>
                    <div>
                      <div className="font-semibold">{type.label}</div>
                      <div className="text-gray-500 text-sm">{type.description}</div>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        )

      case 1:
        return (
          <div className="step-content">
            <Title level={3} className="text-center mb-6">
              Informations personnelles
            </Title>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="firstName" rules={[{ required: true, message: "Prénom requis" }]}>
                  <Input prefix={<UserOutlined />} placeholder="Prénom" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lastName" rules={[{ required: true, message: "Nom requis" }]}>
                  <Input prefix={<UserOutlined />} placeholder="Nom" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email requis" },
                { type: "email", message: "Email invalide" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email professionnel" size="large" />
            </Form.Item>

            <Form.Item name="phone" rules={[{ required: true, message: "Téléphone requis" }]}>
              <Input prefix={<PhoneOutlined />} placeholder="Téléphone" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Mot de passe requis" },
                { min: 8, message: "Minimum 8 caractères" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Mot de passe" size="large" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
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
              <Input.Password prefix={<LockOutlined />} placeholder="Confirmer le mot de passe" size="large" />
            </Form.Item>
          </div>
        )

      case 2:
        return (
          <div className="step-content">
            <Title level={3} className="text-center mb-6">
              Informations professionnelles
            </Title>

            <Form.Item name="company" rules={[{ required: true, message: "Entreprise requise" }]}>
              <Input prefix={<BankOutlined />} placeholder="Nom de l'entreprise" size="large" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="department" rules={[{ required: true, message: "Département requis" }]}>
                  <Input placeholder="Département" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="position" rules={[{ required: true, message: "Poste requis" }]}>
                  <Input placeholder="Poste" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="address" rules={[{ required: true, message: "Adresse requise" }]}>
              <Input.TextArea prefix={<EnvironmentOutlined />} placeholder="Adresse complète" rows={3} size="large" />
            </Form.Item>
          </div>
        )

      case 3:
        return (
          <div className="step-content">
            <Title level={3} className="text-center mb-6">
              Finalisation
            </Title>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <Title level={4}>Récapitulatif</Title>
              <Text>
                <strong>Profil :</strong> {userTypes.find((t) => t.value === formData.userType)?.label}
              </Text>
              <br />
              <Text>
                <strong>Nom :</strong> {formData.firstName} {formData.lastName}
              </Text>
              <br />
              <Text>
                <strong>Email :</strong> {formData.email}
              </Text>
              <br />
              <Text>
                <strong>Entreprise :</strong> {formData.company}
              </Text>
            </div>

            <Form.Item name="notifications" valuePropName="checked">
              <Checkbox>Je souhaite recevoir les notifications par email</Checkbox>
            </Form.Item>

            <Form.Item name="newsletter" valuePropName="checked">
              <Checkbox>Je souhaite recevoir la newsletter INGÉNIA</Checkbox>
            </Form.Item>

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
                <a href="/terms" target="_blank" rel="noreferrer">
                  conditions d'utilisation
                </a>{" "}
                et la{" "}
                <a href="/privacy" target="_blank" rel="noreferrer">
                  politique de confidentialité
                </a>
              </Checkbox>
            </Form.Item>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <div className="text-center mb-8">
          <Title level={2} className="text-indigo-600">
            Rejoignez INGÉNIA
          </Title>
          <Text className="text-gray-600">Créez votre compte en quelques étapes</Text>
        </div>

        <Steps current={currentStep} className="mb-8">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} description={item.description} />
          ))}
        </Steps>

        <Form form={form} layout="vertical" className="signup-form">
          {renderStepContent()}

          <Divider />

          <div className="flex justify-between">
            {currentStep > 0 && <Button onClick={handlePrev}>Précédent</Button>}

            <div className="ml-auto">
              {currentStep < steps.length - 1 ? (
                <Button type="primary" onClick={handleNext}>
                  Suivant
                </Button>
              ) : (
                <Button type="primary" onClick={handleSubmit} loading={loading} size="large">
                  Créer mon compte
                </Button>
              )}
            </div>
          </div>
        </Form>

        <div className="text-center mt-6">
          <Text>
            Déjà un compte ?{" "}
            <a href="/login" className="text-indigo-600 hover:text-indigo-800">
              Se connecter
            </a>
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default SignupForm
