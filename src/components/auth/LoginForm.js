"use client"

import { useState, useEffect } from "react"
import { Form, Input, Button, Checkbox, Alert, Card, Typography, Space, Divider, Tag, Row, Col } from "antd"
import {
  UserOutlined,
  LockOutlined,
  RocketOutlined,
  SafetyOutlined,
  FingerprintOutlined,
  CopyOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginThunk, clearError, biometricLoginThunk } from "../../store/slices/authSlice"
import TwoFactorInput from "./TwoFactorInput"
import BiometricAuth from "./BiometricAuth"
import { message } from "antd"

const { Title, Text, Link } = Typography

// Comptes de test avec différents rôles
const TEST_ACCOUNTS = [
  {
    role: "Super Admin RRH",
    email: "admin@sirh-ehc.com",
    password: "Admin2024!@#",
    description: "Accès complet - Gestion budgets, validation, audit",
    color: "#ff4d4f",
  },
  {
    role: "Responsable Formation",
    email: "rf@sirh-ehc.com",
    password: "Formation2024!",
    description: "Planification, validations, évaluations",
    color: "#1890ff",
  },
  {
    role: "Manager N+1",
    email: "manager@sirh-ehc.com",
    password: "Manager2024!",
    description: "Gestion équipe, validations, gaps analysis",
    color: "#52c41a",
  },
  {
    role: "Employé",
    email: "employe@sirh-ehc.com",
    password: "Employe2024!",
    description: "Parcours personnel, catalogue, certifications",
    color: "#722ed1",
  },
  {
    role: "Organisme Formation",
    email: "organisme@sirh-ehc.com",
    password: "Organisme2024!",
    description: "Gestion offres, sessions, formateurs",
    color: "#fa8c16",
  },
]

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error, twoFactorRequired, isAuthenticated, accountLocked, lockoutExpiry } = useSelector(
    (state) => state.auth,
  )
  const [form] = Form.useForm()
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [showBiometric, setShowBiometric] = useState(false)
  const [loginData, setLoginData] = useState(null)
  const [showTestAccounts, setShowTestAccounts] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (twoFactorRequired) {
      setShowTwoFactor(true)
    }
  }, [twoFactorRequired])

  const onFinish = async (values) => {
    try {
      if (showTwoFactor) {
        const result = await dispatch(
          loginThunk({
            ...loginData,
            totpCode: values.totpCode,
          }),
        )

        if (loginThunk.fulfilled.match(result)) {
          navigate("/dashboard")
        }
      } else {
        setLoginData({ email: values.email, password: values.password })
        const result = await dispatch(
          loginThunk({
            email: values.email,
            password: values.password,
          }),
        )

        if (loginThunk.fulfilled.match(result)) {
          navigate("/dashboard")
        }
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const handleBiometricLogin = async () => {
    try {
      setShowBiometric(true)
      const result = await dispatch(biometricLoginThunk())

      if (biometricLoginThunk.fulfilled.match(result)) {
        message.success("Connexion biométrique réussie!")
        navigate("/dashboard")
      }
    } catch (error) {
      message.error("Échec de l'authentification biométrique")
    } finally {
      setShowBiometric(false)
    }
  }

  const handleFormChange = () => {
    if (error) {
      dispatch(clearError())
    }
  }

  const handleBackToLogin = () => {
    setShowTwoFactor(false)
    setLoginData(null)
    form.resetFields()
    dispatch(clearError())
  }

  const copyCredentials = (email, password) => {
    form.setFieldsValue({ email, password })
    message.success("Identifiants copiés!")
  }

  const getRemainingLockoutTime = () => {
    if (!lockoutExpiry) return 0
    return Math.max(0, Math.ceil((lockoutExpiry - Date.now()) / 1000 / 60))
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #238D94 0%, #0F141E 100%)",
        padding: "20px",
      }}
    >
      <Row gutter={[24, 24]} style={{ width: "100%", maxWidth: 1200 }}>
        {/* Formulaire de connexion */}
        <Col xs={24} lg={12}>
          <Card
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              borderRadius: "12px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <RocketOutlined style={{ fontSize: 48, color: "#238D94", marginBottom: 16 }} />
              <Title level={2} style={{ margin: 0, color: "#0F141E" }}>
                SIRH EHC
              </Title>
              <Text type="secondary">
                {showTwoFactor ? "Authentification à deux facteurs" : "Système de gestion de formation"}
              </Text>
            </div>

            {accountLocked && (
              <Alert
                message="Compte temporairement verrouillé"
                description={`Trop de tentatives de connexion. Réessayez dans ${getRemainingLockoutTime()} minutes.`}
                type="warning"
                showIcon
                style={{ marginBottom: 24 }}
              />
            )}

            {error && (
              <Alert
                message={showTwoFactor ? "Code 2FA invalide" : "Erreur de connexion"}
                description={error === "2FA_REQUIRED" ? "Veuillez saisir votre code 2FA" : error}
                type="error"
                showIcon
                closable
                style={{ marginBottom: 24 }}
                onClose={() => dispatch(clearError())}
              />
            )}

            {showTwoFactor ? (
              <TwoFactorInput
                onSubmit={onFinish}
                onBack={handleBackToLogin}
                loading={isLoading}
                email={loginData?.email}
              />
            ) : (
              <>
                <Form
                  form={form}
                  name="login"
                  onFinish={onFinish}
                  onChange={handleFormChange}
                  size="large"
                  layout="vertical"
                >
                  <Form.Item
                    name="email"
                    label="Adresse email"
                    rules={[
                      { required: true, message: "Veuillez saisir votre email!" },
                      { type: "email", message: "Format d'email invalide!" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="votre.email@entreprise.com"
                      autoComplete="email"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Mot de passe"
                    rules={[
                      { required: true, message: "Veuillez saisir votre mot de passe!" },
                      { min: 6, message: "Le mot de passe doit contenir au moins 6 caractères!" },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Votre mot de passe"
                      autoComplete="current-password"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item name="rememberMe" valuePropName="checked">
                    <Checkbox>Se souvenir de moi pendant 30 jours</Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      disabled={accountLocked}
                      block
                      size="large"
                      style={{
                        height: 48,
                        backgroundColor: "#238D94",
                        borderColor: "#238D94",
                        fontWeight: 600,
                        marginBottom: 12,
                      }}
                    >
                      {isLoading ? "Connexion en cours..." : "Se connecter"}
                    </Button>

                    <Button
                      type="default"
                      icon={<FingerprintOutlined />}
                      onClick={handleBiometricLogin}
                      loading={showBiometric}
                      disabled={accountLocked}
                      block
                      size="large"
                      style={{
                        height: 48,
                        borderColor: "#238D94",
                        color: "#238D94",
                      }}
                    >
                      {showBiometric ? "Authentification..." : "Connexion biométrique"}
                    </Button>
                  </Form.Item>

                  <Divider />

                  <Space direction="vertical" style={{ width: "100%", textAlign: "center" }}>
                    <Text type="secondary">
                      <SafetyOutlined style={{ marginRight: 8, color: "#238D94" }} />
                      Connexion sécurisée avec chiffrement SSL
                    </Text>

                    <div>
                      <Link href="/forgot-password">Mot de passe oublié ?</Link>
                      <Divider type="vertical" />
                      <Link href="/support">Besoin d'aide ?</Link>
                    </div>
                  </Space>
                </Form>

                <BiometricAuth visible={showBiometric} onClose={() => setShowBiometric(false)} />
              </>
            )}
          </Card>
        </Col>

        {/* Comptes de test */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <InfoCircleOutlined style={{ color: "#238D94" }} />
                <span>Comptes de Test - Démo</span>
              </Space>
            }
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              borderRadius: "12px",
            }}
            extra={
              <Button type="link" size="small" onClick={() => setShowTestAccounts(!showTestAccounts)}>
                {showTestAccounts ? "Masquer" : "Afficher"}
              </Button>
            }
          >
            {showTestAccounts && (
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <Alert
                  message="Environnement de démonstration"
                  description="Utilisez ces comptes pour tester les différents rôles et fonctionnalités de la plateforme."
                  type="info"
                  showIcon
                  style={{ marginBottom: 16 }}
                />

                {TEST_ACCOUNTS.map((account, index) => (
                  <Card
                    key={index}
                    size="small"
                    style={{
                      border: `1px solid ${account.color}`,
                      borderRadius: 8,
                    }}
                    bodyStyle={{ padding: 12 }}
                  >
                    <Row align="middle" justify="space-between">
                      <Col span={18}>
                        <Space direction="vertical" size="small" style={{ width: "100%" }}>
                          <div>
                            <Tag color={account.color} style={{ marginBottom: 4 }}>
                              {account.role}
                            </Tag>
                          </div>
                          <Text strong style={{ fontSize: 13 }}>
                            📧 {account.email}
                          </Text>
                          <Text code style={{ fontSize: 12 }}>
                            🔑 {account.password}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            {account.description}
                          </Text>
                        </Space>
                      </Col>
                      <Col span={6} style={{ textAlign: "right" }}>
                        <Button
                          type="primary"
                          size="small"
                          icon={<CopyOutlined />}
                          onClick={() => copyCredentials(account.email, account.password)}
                          style={{
                            backgroundColor: account.color,
                            borderColor: account.color,
                          }}
                        >
                          Utiliser
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}

                <Divider />

                <Alert
                  message="Fonctionnalités disponibles"
                  description={
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      <li>🔐 Authentification 2FA (Google Authenticator)</li>
                      <li>👆 Connexion biométrique (empreinte/visage)</li>
                      <li>🔄 Récupération de mot de passe sécurisée</li>
                      <li>🛡️ Protection contre les attaques par force brute</li>
                      <li>📊 Tableau de bord sécurité personnalisé</li>
                      <li>📋 Rapports de conformité automatisés</li>
                    </ul>
                  }
                  type="success"
                  showIcon
                />
              </Space>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LoginForm
