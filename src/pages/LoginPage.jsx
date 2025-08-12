"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Card, Form, Input, Button, Checkbox, message, Typography, Divider, Alert, Row, Col } from "antd"
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, ArrowLeftOutlined } from "@ant-design/icons"
import { loginThunk } from "../redux/slices/authSlice"

const { Title, Text } = Typography

const LoginPage = () => {
  const [form] = Form.useForm()
  const { loading, error } = useSelector((state) => state.auth)
  const [showTestAccounts, setShowTestAccounts] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const testAccounts = [
    {
      email: "admin@ingenia.fr",
      password: "admin123",
      role: "Administrateur",
      description: "Accès complet à toutes les fonctionnalités",
    },
    {
      email: "manager@ingenia.fr",
      password: "manager123",
      role: "Manager",
      description: "Gestion des équipes et formations",
    },
    {
      email: "trainer@ingenia.fr",
      password: "trainer123",
      role: "Formateur",
      description: "Création et animation de formations",
    },
    {
      email: "hr@ingenia.fr",
      password: "hr123",
      role: "RH",
      description: "Gestion des ressources humaines",
    },
    {
      email: "employee@ingenia.fr",
      password: "employee123",
      role: "Employé",
      description: "Participation aux formations",
    },
    {
      email: "consultant@ingenia.fr",
      password: "consultant123",
      role: "Consultant",
      description: "Conseil en formation",
    },
  ]

  const handleLogin = async (values) => {
    try {
      const result = await dispatch(loginThunk(values)).unwrap()
      message.success(`Connexion réussie ! Bienvenue ${result.user.firstName}`)
      navigate("/welcome")
    } catch (err) {
      message.error(err || "Erreur de connexion")
    }
  }

  const handleTestLogin = (account) => {
    form.setFieldsValue({
      email: account.email,
      password: account.password,
      remember: true,
    })
  }

  const handleQuickLogin = async (account) => {
    try {
      const result = await dispatch(
        loginThunk({
          email: account.email,
          password: account.password,
        }),
      ).unwrap()
      message.success(`Connexion rapide réussie en tant que ${account.role}`)
      navigate("/welcome")
    } catch (err) {
      message.error(err || "Erreur de connexion")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <Row gutter={[48, 48]} align="middle">
          {/* Formulaire de connexion */}
          <Col xs={24} lg={12}>
            <Card className="shadow-2xl border-0 rounded-2xl">
              <div className="text-center mb-8">
                <Button
                  type="text"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate("/")}
                  className="absolute top-4 left-4 text-gray-500 hover:text-indigo-600"
                >
                  Retour
                </Button>

                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-2xl">I</span>
                </div>

                <Title level={2} className="text-indigo-600 mb-2">
                  Connexion INGÉNIA
                </Title>
                <Text className="text-gray-600">Accédez à votre espace de formation</Text>
              </div>

              {error && (
                <Alert
                  message="Erreur de connexion"
                  description={error}
                  type="error"
                  showIcon
                  className="mb-6"
                  closable
                  onClose={() => dispatch(clearError())}
                />
              )}

              <Form form={form} name="login" onFinish={handleLogin} layout="vertical" size="large" autoComplete="off">
                <Form.Item
                  name="email"
                  label="Email professionnel"
                  rules={[
                    { required: true, message: "Veuillez saisir votre email" },
                    { type: "email", message: "Format d'email invalide" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="votre.email@entreprise.com"
                    className="rounded-lg h-12"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mot de passe"
                  rules={[{ required: true, message: "Veuillez saisir votre mot de passe" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Votre mot de passe"
                    className="rounded-lg h-12"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <div className="flex justify-between items-center mb-6">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Se souvenir de moi</Checkbox>
                  </Form.Item>
                  <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-800">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-12 text-lg font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Se connecter
                  </Button>
                </Form.Item>
              </Form>

              <Divider>ou</Divider>

              <div className="text-center">
                <Text className="text-gray-600">
                  Pas encore de compte ?{" "}
                  <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                    Créer un compte
                  </Link>
                </Text>
              </div>
            </Card>
          </Col>

          {/* Comptes de test */}
          <Col xs={24} lg={12}>
            <Card className="shadow-xl border-0 rounded-2xl">
              <div className="text-center mb-6">
                <Title level={3} className="text-gray-800 mb-2">
                  Comptes de démonstration
                </Title>
                <Text className="text-gray-600">Testez INGÉNIA avec différents profils utilisateur</Text>
              </div>

              <div className="space-y-3">
                {testAccounts.map((account, index) => (
                  <Card
                    key={index}
                    size="small"
                    className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-indigo-300"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{account.role.charAt(0)}</span>
                          </div>
                          <div>
                            <Text strong className="text-gray-800">
                              {account.role}
                            </Text>
                          </div>
                        </div>
                        <Text className="text-xs text-gray-500 block mb-2">{account.description}</Text>
                        <Text className="text-xs text-gray-400">{account.email}</Text>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button
                          size="small"
                          onClick={() => handleTestLogin(account)}
                          className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                        >
                          Remplir
                        </Button>
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => handleQuickLogin(account)}
                          className="bg-indigo-600 hover:bg-indigo-700 border-0"
                        >
                          Connexion rapide
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Alert
                message="Information"
                description="Ces comptes sont fournis pour tester les différentes fonctionnalités de la plateforme selon votre rôle."
                type="info"
                showIcon
                className="mt-6"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LoginPage
