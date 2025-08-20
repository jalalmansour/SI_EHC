import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Alert, Typography, Divider, Row, Col, Card, Space, Avatar } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, ArrowLeftOutlined, TeamOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const { Title, Text } = Typography

const Login = () => {
  console.log('Login component is rendering...')
  
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showTestAccounts, setShowTestAccounts] = useState(false)
  const navigate = useNavigate()

  const testAccounts = [
    {
      email: "admin@ehc.fr",
      password: "admin123",
      role: "Administrateur",
      description: "Accès complet à toutes les fonctionnalités",
      color: "#ff4d4f"
    },
    {
      email: "rrh@ehc.fr",
      password: "rrh123",
      role: "RRH",
      description: "Gestion des ressources humaines",
      color: "#52c41a"
    },
    {
      email: "rf@ehc.fr",
      password: "rf123",
      role: "Responsable Formation",
      description: "Gestion des formations",
      color: "#1890ff"
    },
    {
      email: "manager@ehc.fr",
      password: "manager123",
      role: "Manager",
      description: "Gestion des équipes",
      color: "#faad14"
    },
    {
      email: "employee@ehc.fr",
      password: "employee123",
      role: "Employé",
      description: "Participation aux formations",
      color: "#722ed1"
    },
    {
      email: "formateur@ehc.fr",
      password: "formateur123",
      role: "Formateur",
      description: "Animation de formations",
      color: "#13c2c2"
    }
  ]

  const handleLogin = async (values) => {
    console.log('Login attempt with values:', values)
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Determine role based on email
      const role = values.email.includes('admin') ? 'admin' :
                   values.email.includes('rrh') ? 'rrh' :
                   values.email.includes('rf') ? 'rf' :
                   values.email.includes('manager') ? 'manager' :
                   values.email.includes('formateur') ? 'formateur' : 'employee'
      
      console.log('Determined role:', role)
      
      // Store user info in localStorage for demo
      localStorage.setItem('user', JSON.stringify({
        email: values.email,
        role: role,
        name: values.email.split('@')[0]
      }))
      
      console.log('User stored, navigating to:', `/${role}/dashboard`)
      navigate(`/${role}/dashboard`)
      
    } catch (err) {
      console.error('Login error:', err)
      setError('Erreur de connexion. Veuillez vérifier vos identifiants.')
    } finally {
      setLoading(false)
    }
  }

  const handleTestLogin = (account) => {
    console.log('Test login with account:', account)
    form.setFieldsValue({
      email: account.email,
      password: account.password,
      remember: true,
    })
  }

  const handleQuickLogin = async (account) => {
    console.log('Quick login with account:', account)
    setLoading(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const role = account.email.includes('admin') ? 'admin' :
                   account.email.includes('rrh') ? 'rrh' :
                   account.email.includes('rf') ? 'rf' :
                   account.email.includes('manager') ? 'manager' :
                   account.email.includes('formateur') ? 'formateur' : 'employee'
      
      console.log('Quick login role:', role)
      
      localStorage.setItem('user', JSON.stringify({
        email: account.email,
        role: role,
        name: account.role
      }))
      
      console.log('Quick login navigating to:', `/${role}/dashboard`)
      navigate(`/${role}/dashboard`)
      
    } catch (err) {
      console.error('Quick login error:', err)
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  console.log('Login component rendering JSX...')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl"
      >
        <Row gutter={[32, 32]} align="middle">
          {/* Left Side - Login Form */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <img src="/images/logo.png" alt="EHC Logo" className="w-12 h-12" />
                  </div>
                  <Title level={2} className="mb-2 text-gray-900">
                    EHC Formation Hub
                  </Title>
                  <Text className="text-gray-600 text-lg">
                    Connectez-vous à votre espace de formation
                  </Text>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <Alert
                      message="Erreur de connexion"
                      description={error}
                      type="error"
                      showIcon
                      closable
                      onClose={() => setError('')}
                    />
                  </motion.div>
                )}

                <Form
                  form={form}
                  name="login"
                  onFinish={handleLogin}
                  layout="vertical"
                  size="large"
                  initialValues={{ remember: true }}
                >
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Veuillez saisir votre email' },
                      { type: 'email', message: 'Email invalide' }
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="text-gray-400" />}
                      placeholder="votre.email@ehc.fr"
                      className="rounded-lg h-12"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Mot de passe"
                    rules={[
                      { required: true, message: 'Veuillez saisir votre mot de passe' },
                      { min: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' }
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="Votre mot de passe"
                      className="rounded-lg h-12"
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <div className="flex items-center justify-between">
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Se souvenir de moi</Checkbox>
                      </Form.Item>
                      <a
                        href="#forgot-password"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Mot de passe oublié ?
                      </a>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 border-0 rounded-lg text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Se connecter
                    </Button>
                  </Form.Item>
                </Form>

                <Divider>ou</Divider>

                <div className="text-center">
                  <Button
                    type="link"
                    onClick={() => setShowTestAccounts(!showTestAccounts)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {showTestAccounts ? 'Masquer' : 'Afficher'} les comptes de démonstration
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Col>

          {/* Right Side - Test Accounts & Info */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="shadow-xl border-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="text-center mb-6">
                  <TeamOutlined className="text-4xl text-blue-500 mb-4" />
                  <Title level={3} className="text-gray-900 mb-2">
                    Comptes de Démonstration
                  </Title>
                  <Text className="text-gray-600">
                    Testez les différentes fonctionnalités selon votre rôle
                  </Text>
                </div>

                {showTestAccounts && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5 }}
                    className="space-y-3"
                  >
                    {testAccounts.map((account, index) => (
                      <motion.div
                        key={account.email}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card
                          className="mb-3 cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4"
                          style={{ borderLeftColor: account.color }}
                          onClick={() => handleQuickLogin(account)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar
                                style={{ backgroundColor: account.color }}
                                icon={<UserOutlined />}
                              />
                              <div className="text-left">
                                <div className="font-medium text-gray-900">{account.role}</div>
                                <div className="text-sm text-gray-600">{account.description}</div>
                                <div className="text-xs text-gray-500">{account.email}</div>
                              </div>
                            </div>
                            <Button
                              type="primary"
                              size="small"
                              style={{ backgroundColor: account.color, borderColor: account.color }}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleTestLogin(account)
                              }}
                            >
                              Utiliser
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                <div className="mt-6 p-4 bg-white rounded-lg">
                  <Title level={4} className="text-gray-900 mb-3">
                    🚀 Fonctionnalités Principales
                  </Title>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>• Gestion complète des formations</li>
                    <li>• Suivi des budgets et rapports</li>
                    <li>• Évaluations et certifications</li>
                    <li>• Interface responsive et moderne</li>
                    <li>• Système de rôles et permissions</li>
                  </ul>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <Text className="text-sm text-gray-500">
            © 2024 EHC Group. Tous droits réservés. | 
            <a href="#privacy" className="text-blue-600 hover:text-blue-800 ml-2">Politique de confidentialité</a>
          </Text>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
