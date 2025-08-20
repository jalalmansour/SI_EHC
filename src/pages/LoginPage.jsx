"use client"

import { useState } from "react"
import { Form, Input, Button, Card, Typography, Divider, Alert, Space, message } from "antd"
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"
import LoginFeatures from "../components/auth/LoginFeatures.jsx"
import ForgotPasswordModal from "../components/auth/ForgotPasswordModal.jsx"
import { useAuth } from "../contexts/AuthContext"

const { Title, Text } = Typography

export default function LoginPage({ onBackToLanding, onShowSignup, onLoginSuccess }) {
  // Fallback to router navigation if props are not provided
  const navigateBack = () => (onBackToLanding ? onBackToLanding() : window.history.length ? window.history.back() : (window.location.href = "/"))
  const goSignup = () => (onShowSignup ? onShowSignup() : (window.location.href = "/signup"))
  const afterLogin = () => (onLoginSuccess ? onLoginSuccess() : (window.location.href = "/dashboard"))
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showTestAccounts, setShowTestAccounts] = useState(false)
  const { login } = useAuth()
  const [forgotOpen, setForgotOpen] = useState(false)

  const testAccounts = [
    {
      email: "admin@ehc.com",
      password: "admin123",
      role: "admin",
      name: "Administrateur",
      description: "Accès complet à toutes les fonctionnalités"
    },
    {
      email: "formateur@ehc.com",
      password: "formateur123",
      role: "formateur",
      name: "Formateur",
      description: "Gestion des formations et participants"
    },
    {
      email: "rrh@ehc.com",
      password: "rrh123",
      role: "rrh",
      name: "Responsable RH",
      description: "Gestion des ressources humaines"
    },
    {
      email: "manager@ehc.com",
      password: "manager123",
      role: "manager",
      name: "Manager",
      description: "Gestion des équipes et formations"
    }
  ]

  const handleLogin = async (values) => {
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if it's a test account
      const testAccount = testAccounts.find(acc => 
        acc.email === values.email && acc.password === values.password
      )
      
      if (testAccount) {
        message.success(`Connexion réussie en tant que ${testAccount.name}`)
        
        // Use AuthContext to login
        login({
          email: testAccount.email,
          role: testAccount.role,
          name: testAccount.name
        })
        afterLogin()
      } else {
        message.error("Email ou mot de passe incorrect")
      }
    } catch (error) {
      message.error("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  const handleTestLogin = (account) => {
    form.setFieldsValue({
      email: account.email,
      password: account.password,
      remember: true
    })
  }

  const handleQuickLogin = async (account) => {
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      message.success(`Connexion rapide réussie en tant que ${account.name}`)
      
      // Use AuthContext to login
      login({
        email: account.email,
        role: account.role,
        name: account.name
      })
      afterLogin()
    } catch (error) {
      message.error("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotSubmit = async () => {
    try {
      const email = form.getFieldValue('email')
      if (!email) {
        message.warning("Veuillez saisir votre email d'abord")
        return
      }
      await new Promise(resolve => setTimeout(resolve, 800))
      message.success("Un lien de réinitialisation a été envoyé à votre email")
      setForgotOpen(false)
    } catch (e) {
      setForgotOpen(false)
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-stretch p-0">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-none lg:rounded-2xl shadow-none lg:shadow-2xl border-0 lg:border bg-white/40 backdrop-blur h-full">
        {/* Left content (inspiration from MUI template) */}
        <div className="hidden lg:flex flex-col justify-center p-10 overflow-hidden">
          <div className="mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold text-xl">EHC</div>
          </div>
          <LoginFeatures />
        </div>

        {/* Right side - Sign in card */}
        <div className="flex items-center justify-center p-4 sm:p-8 h-full">
          <div className="w-full max-w-md h-full flex flex-col">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={navigateBack}
              className="mb-6 text-gray-600 hover:text-blue-600"
              aria-label="Retour à l'accueil"
            >
              Retour à l'accueil
            </Button>

            <Card className="shadow-xl border-0 bg-white/90 max-h-[86vh] overflow-auto">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold">EHC</div>
                <Title level={2} className="text-2xl font-bold text-gray-900 mb-2">Connexion</Title>
                <Text className="text-gray-600">Accédez à votre espace EHC SIRH</Text>
              </div>

              <Form form={form} layout="vertical" onFinish={handleLogin} initialValues={{ remember: true }}>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: "Veuillez saisir votre email" }, { type: "email", message: "Format d'email invalide" }]}>
                  <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="votre.email@ehc.com" size="large" className="rounded-lg" />
                </Form.Item>

                <Form.Item name="password" label="Mot de passe" rules={[{ required: true, message: "Veuillez saisir votre mot de passe" }, { min: 6, message: "Le mot de passe doit contenir au moins 6 caractères" }]}>
                  <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Votre mot de passe" size="large" className="rounded-lg" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-600 cursor-pointer"><input type="checkbox" className="mr-2" />Se souvenir de moi</label>
                    <Button type="link" className="text-blue-600 p-0 h-auto" onClick={() => setForgotOpen(true)}>Mot de passe oublié ?</Button>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} size="large" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 border-0 hover:from-blue-700 hover:to-indigo-700 h-12 rounded-lg font-medium">Se connecter</Button>
                </Form.Item>
              </Form>

              <Divider className="my-5"><Text className="text-gray-500">ou</Text></Divider>

              <div className="grid grid-cols-1 gap-3">
                <Button className="h-11" onClick={() => alert('Connexion Google')}>
                  <span className="mr-2">🔵</span> Se connecter avec Google
                </Button>
                <Button className="h-11" onClick={() => alert('Connexion Facebook')}>
                  <span className="mr-2">📘</span> Se connecter avec Facebook
                </Button>
              </div>

              <div className="text-center mt-4">
                <Text className="text-gray-600">Pas encore de compte ? <Button type="link" onClick={goSignup} className="text-blue-600 p-0 h-auto font-medium">Créer un compte</Button></Text>
              </div>

              {/* Test accounts (collapsible) */}
              <div className="mt-8">
                <Button type="text" onClick={() => setShowTestAccounts(!showTestAccounts)} className="w-full text-gray-500 hover:text-blue-600">{showTestAccounts ? "Masquer" : "Afficher"} les comptes de test</Button>
                {showTestAccounts && (
                  <div className="mt-4 space-y-3">
                    <Alert message="Comptes de démonstration" description="Utilisez ces comptes pour tester l'application" type="info" showIcon className="mb-4" />
                    {testAccounts.map((account, index) => (
                      <Card key={index} size="small" className="border border-gray-200 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1"><CheckCircleOutlined className="text-green-500 mr-2" /><Text strong className="text-gray-900">{account.name}</Text></div>
                            <Text className="text-gray-600 text-sm">{account.description}</Text>
                            <Text className="text-gray-500 text-xs block mt-1">{account.email}</Text>
                          </div>
                          <Space>
                            <Button size="small" onClick={() => handleTestLogin(account)} className="text-blue-600 border-blue-200 hover:border-blue-400">Remplir</Button>
                            <Button size="small" type="primary" onClick={() => handleQuickLogin(account)} className="bg-blue-500 border-0 hover:bg-blue-600">Connexion rapide</Button>
                          </Space>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            <div className="text-center mt-4">
              <Text className="text-gray-500 text-sm">© {new Date().getFullYear()} EHC SIRH. Tous droits réservés.</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot password modal */}
      <ForgotPasswordModal
        open={forgotOpen}
        onOk={handleForgotSubmit}
        onCancel={() => setForgotOpen(false)}
        defaultEmail={form.getFieldValue('email')}
        onEmailChange={(value) => form.setFieldsValue({ email: value })}
      />
    </div>
  )
}
