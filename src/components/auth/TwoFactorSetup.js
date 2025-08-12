"use client"

import { useState, useEffect } from "react"
import { Card, Button, Steps, Typography, Space, Input, Alert, QRCode, Divider } from "antd"
import { SafetyOutlined, CheckCircleOutlined, CopyOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { enable2FAThunk, verify2FAThunk, disable2FAThunk } from "../../store/slices/authSlice"

const { Title, Text, Paragraph } = Typography
const { Step } = Steps

const TwoFactorSetup = () => {
  const dispatch = useDispatch()
  const { user, twoFactorSetup } = useSelector((state) => state.auth)
  const [currentStep, setCurrentStep] = useState(0)
  const [verificationCode, setVerificationCode] = useState("")
  const [disablePassword, setDisablePassword] = useState("")
  const [showDisableForm, setShowDisableForm] = useState(false)

  useEffect(() => {
    if (user?.twoFactorEnabled) {
      setCurrentStep(3) // Already enabled
    }
  }, [user])

  const handleEnable2FA = async () => {
    try {
      await dispatch(enable2FAThunk()).unwrap()
      setCurrentStep(1)
    } catch (error) {
      console.error("Error enabling 2FA:", error)
    }
  }

  const handleVerify2FA = async () => {
    try {
      await dispatch(verify2FAThunk({ token: verificationCode })).unwrap()
      setCurrentStep(3)
      setVerificationCode("")
    } catch (error) {
      console.error("Error verifying 2FA:", error)
    }
  }

  const handleDisable2FA = async () => {
    try {
      await dispatch(disable2FAThunk({ password: disablePassword })).unwrap()
      setCurrentStep(0)
      setShowDisableForm(false)
      setDisablePassword("")
    } catch (error) {
      console.error("Error disabling 2FA:", error)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const steps = [
    {
      title: "Activation",
      description: "Activer l'authentification à deux facteurs",
    },
    {
      title: "Configuration",
      description: "Scanner le QR code avec votre application",
    },
    {
      title: "Vérification",
      description: "Vérifier avec un code de test",
    },
    {
      title: "Terminé",
      description: "2FA activé avec succès",
    },
  ]

  return (
    <Card
      title={
        <Space>
          <SafetyOutlined style={{ color: "#238D94" }} />
          <span>Authentification à deux facteurs (2FA)</span>
        </Space>
      }
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <Steps current={currentStep} style={{ marginBottom: 32 }}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} description={step.description} />
        ))}
      </Steps>

      {currentStep === 0 && (
        <div style={{ textAlign: "center" }}>
          <SafetyOutlined style={{ fontSize: 64, color: "#238D94", marginBottom: 16 }} />
          <Title level={4}>Sécurisez votre compte</Title>
          <Paragraph>
            L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte en demandant
            un code de vérification depuis votre téléphone.
          </Paragraph>

          <Alert
            message="Recommandation de sécurité"
            description="Nous recommandons fortement d'activer la 2FA pour protéger votre compte contre les accès non autorisés."
            type="info"
            showIcon
            style={{ marginBottom: 24, textAlign: "left" }}
          />

          <Button
            type="primary"
            size="large"
            onClick={handleEnable2FA}
            loading={twoFactorSetup.isLoading}
            style={{ backgroundColor: "#238D94", borderColor: "#238D94" }}
          >
            Activer la 2FA
          </Button>
        </div>
      )}

      {currentStep === 1 && twoFactorSetup.qrCode && (
        <div style={{ textAlign: "center" }}>
          <Title level={4}>Scanner le QR Code</Title>
          <Paragraph>
            Utilisez une application d'authentification comme Google Authenticator, Authy ou Microsoft Authenticator
            pour scanner ce QR code.
          </Paragraph>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 24,
              padding: 16,
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
            }}
          >
            <QRCode value={twoFactorSetup.qrCode} size={200} />
          </div>

          <Divider>ou</Divider>

          <div style={{ marginBottom: 24 }}>
            <Text strong>Clé secrète manuelle:</Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 8,
              }}
            >
              <Input value={twoFactorSetup.secret} readOnly style={{ fontFamily: "monospace", textAlign: "center" }} />
              <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(twoFactorSetup.secret)}>
                Copier
              </Button>
            </div>
          </div>

          <Button
            type="primary"
            onClick={() => setCurrentStep(2)}
            style={{ backgroundColor: "#238D94", borderColor: "#238D94" }}
          >
            J'ai configuré l'application
          </Button>
        </div>
      )}

      {currentStep === 2 && (
        <div style={{ textAlign: "center" }}>
          <Title level={4}>Vérification</Title>
          <Paragraph>Saisissez le code à 6 chiffres affiché dans votre application d'authentification.</Paragraph>

          <Space direction="vertical" style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}>
            <Input
              placeholder="000000"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              style={{
                textAlign: "center",
                fontSize: 18,
                letterSpacing: 4,
                fontFamily: "monospace",
              }}
              maxLength={6}
            />

            <Button
              type="primary"
              block
              onClick={handleVerify2FA}
              disabled={verificationCode.length !== 6}
              style={{ backgroundColor: "#238D94", borderColor: "#238D94" }}
            >
              Vérifier et activer
            </Button>
          </Space>
        </div>
      )}

      {currentStep === 3 && (
        <div style={{ textAlign: "center" }}>
          <CheckCircleOutlined style={{ fontSize: 64, color: "#52c41a", marginBottom: 16 }} />
          <Title level={4}>2FA activé avec succès!</Title>
          <Paragraph>
            Votre compte est maintenant protégé par l'authentification à deux facteurs. Vous devrez saisir un code de
            vérification à chaque connexion.
          </Paragraph>

          <Alert
            message="Important"
            description="Assurez-vous de conserver l'accès à votre application d'authentification. En cas de perte, contactez l'administrateur système."
            type="warning"
            showIcon
            style={{ marginBottom: 24, textAlign: "left" }}
          />

          {!showDisableForm ? (
            <Button type="default" danger onClick={() => setShowDisableForm(true)}>
              Désactiver la 2FA
            </Button>
          ) : (
            <Space direction="vertical" style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}>
              <Text strong>Saisissez votre mot de passe pour désactiver:</Text>
              <Input.Password
                placeholder="Mot de passe"
                value={disablePassword}
                onChange={(e) => setDisablePassword(e.target.value)}
              />
              <Space>
                <Button onClick={() => setShowDisableForm(false)}>Annuler</Button>
                <Button type="primary" danger onClick={handleDisable2FA} disabled={!disablePassword}>
                  Désactiver
                </Button>
              </Space>
            </Space>
          )}
        </div>
      )}
    </Card>
  )
}

export default TwoFactorSetup
