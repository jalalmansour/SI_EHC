"use client"

import { useState } from "react"
import { Button, Card, Typography, Divider, Alert, Space, message } from "antd"
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
import AuthLayout from "../layouts/AuthLayout.jsx"
import AuthBranding from "../components/auth/AuthBranding.jsx"
import LoginForm from "../components/auth/LoginForm.jsx"
import { useAuth } from "../contexts/AuthContext"

const { Title, Text } = Typography

export default function LoginPage({ onBackToLanding, onShowSignup, onLoginSuccess }) {
  // Fallback to router navigation if props are not provided
  const navigateBack = () => (onBackToLanding ? onBackToLanding() : window.history.length ? window.history.back() : (window.location.href = "/"))
  const goSignup = () => (onShowSignup ? onShowSignup() : (window.location.href = "/signup"))
  const afterLogin = () => (onLoginSuccess ? onLoginSuccess() : (window.location.href = "/dashboard"))
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
    setEmail(account.email)
    setPassword(account.password)
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
      const currentEmail = email
      if (!currentEmail) {
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
    <AuthLayout
      left={<AuthBranding title="Créez votre compte" subtitle="Accédez à une suite RH moderne, rapide et accessible." />}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={navigateBack} style={{ marginBottom: 16 }}>Retour à l'accueil</Button>
        <Card className="shadow-xl border-0" styles={{ body: { padding: 24 } }}>
          <div className="text-center" style={{ marginBottom: 16 }}>
            <Title level={2} style={{ marginBottom: 4 }}>Connexion</Title>
            <Text type="secondary">Accédez à votre espace EHC SIRH</Text>
          </div>
          <LoginForm
            loading={loading}
            onSubmit={handleLogin}
            onForgot={() => setForgotOpen(true)}
            onSignupLink={goSignup}
          />

          <Divider />
          <div className="text-center">
            <Button type="text" onClick={() => setShowTestAccounts(!showTestAccounts)}>
              {showTestAccounts ? "Masquer" : "Afficher"} les comptes de test
            </Button>
            {showTestAccounts && (
              <div className="mt-4 space-y-3">
                <Alert message="Comptes de démonstration" description="Utilisez ces comptes pour tester l'application" type="info" showIcon className="mb-4" />
                {testAccounts.map((account) => (
                  <Card key={account.email} size="small" className="border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1"><CheckCircleOutlined className="text-green-500 mr-2" /><Text strong className="text-gray-900">{account.name}</Text></div>
                        <Text className="text-gray-600 text-sm">{account.description}</Text>
                        <Text className="text-gray-500 text-xs block mt-1">{account.email}</Text>
                      </div>
                      <Space>
                        <Button size="small" onClick={() => handleTestLogin(account)}>Remplir</Button>
                        <Button size="small" type="primary" onClick={() => handleQuickLogin(account)}>Connexion rapide</Button>
                      </Space>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card>
        <div className="text-center" style={{ marginTop: 12 }}>
          <Text type="secondary">© {new Date().getFullYear()} EHC SIRH. Tous droits réservés.</Text>
        </div>
      </div>

      <ForgotPasswordModal
        open={forgotOpen}
        onOk={handleForgotSubmit}
        onCancel={() => setForgotOpen(false)}
        defaultEmail={email}
        onEmailChange={(value) => setEmail(value)}
      />
    </AuthLayout>
  )
}
