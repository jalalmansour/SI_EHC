"use client"

import { useState, useEffect } from "react"
import { Modal, Button, Space, Typography, Alert, Spin } from "antd"
import { FingerprintOutlined, EyeOutlined, MobileOutlined, CheckCircleOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

const BiometricAuth = ({ visible, onClose, onSuccess }) => {
  const [authStep, setAuthStep] = useState("detecting") // detecting, authenticating, success, error
  const [biometricType, setBiometricType] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (visible) {
      detectBiometricCapabilities()
    }
  }, [visible])

  const detectBiometricCapabilities = async () => {
    try {
      // Vérifier si l'API WebAuthn est disponible
      if (!window.PublicKeyCredential) {
        setAuthStep("error")
        setErrorMessage("Authentification biométrique non supportée sur ce navigateur")
        return
      }

      // Vérifier les capacités biométriques
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()

      if (available) {
        // Détecter le type de biométrie disponible
        const userAgent = navigator.userAgent.toLowerCase()
        if (userAgent.includes("mobile") || userAgent.includes("android") || userAgent.includes("iphone")) {
          setBiometricType("fingerprint")
        } else {
          setBiometricType("face")
        }
        setAuthStep("ready")
      } else {
        setAuthStep("error")
        setErrorMessage("Aucun authentificateur biométrique détecté")
      }
    } catch (error) {
      setAuthStep("error")
      setErrorMessage("Erreur lors de la détection biométrique")
    }
  }

  const startBiometricAuth = async () => {
    setAuthStep("authenticating")

    try {
      // Simuler l'authentification biométrique
      // En production, utiliser l'API WebAuthn réelle
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simuler une authentification réussie (80% de chance)
      const success = Math.random() > 0.2

      if (success) {
        setAuthStep("success")
        setTimeout(() => {
          onSuccess && onSuccess()
          onClose()
        }, 1500)
      } else {
        setAuthStep("error")
        setErrorMessage("Authentification biométrique échouée. Veuillez réessayer.")
      }
    } catch (error) {
      setAuthStep("error")
      setErrorMessage("Erreur lors de l'authentification biométrique")
    }
  }

  const getBiometricIcon = () => {
    switch (biometricType) {
      case "fingerprint":
        return <FingerprintOutlined style={{ fontSize: 64, color: "#238D94" }} />
      case "face":
        return <EyeOutlined style={{ fontSize: 64, color: "#238D94" }} />
      default:
        return <MobileOutlined style={{ fontSize: 64, color: "#238D94" }} />
    }
  }

  const getBiometricText = () => {
    switch (biometricType) {
      case "fingerprint":
        return "Placez votre doigt sur le capteur d'empreintes"
      case "face":
        return "Regardez la caméra pour la reconnaissance faciale"
      default:
        return "Utilisez votre méthode d'authentification biométrique"
    }
  }

  const renderContent = () => {
    switch (authStep) {
      case "detecting":
        return (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <Spin size="large" />
            <Title level={4} style={{ marginTop: 20 }}>
              Détection des capacités biométriques...
            </Title>
            <Text type="secondary">Vérification des authentificateurs disponibles</Text>
          </div>
        )

      case "ready":
        return (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            {getBiometricIcon()}
            <Title level={4} style={{ marginTop: 20 }}>
              Authentification Biométrique
            </Title>
            <Text type="secondary" style={{ display: "block", marginBottom: 30 }}>
              {getBiometricText()}
            </Text>
            <Button
              type="primary"
              size="large"
              onClick={startBiometricAuth}
              style={{
                backgroundColor: "#238D94",
                borderColor: "#238D94",
                height: 48,
                paddingLeft: 32,
                paddingRight: 32,
              }}
            >
              Commencer l'authentification
            </Button>
          </div>
        )

      case "authenticating":
        return (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              {getBiometricIcon()}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Spin size="large" />
              </div>
            </div>
            <Title level={4} style={{ marginTop: 20 }}>
              Authentification en cours...
            </Title>
            <Text type="secondary">Veuillez suivre les instructions de votre appareil</Text>
          </div>
        )

      case "success":
        return (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <CheckCircleOutlined style={{ fontSize: 64, color: "#52c41a" }} />
            <Title level={4} style={{ marginTop: 20, color: "#52c41a" }}>
              Authentification réussie !
            </Title>
            <Text type="secondary">Connexion en cours...</Text>
          </div>
        )

      case "error":
        return (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <Alert
              message="Erreur d'authentification"
              description={errorMessage}
              type="error"
              showIcon
              style={{ marginBottom: 20 }}
            />
            <Space>
              <Button onClick={onClose}>Annuler</Button>
              <Button
                type="primary"
                onClick={detectBiometricCapabilities}
                style={{
                  backgroundColor: "#238D94",
                  borderColor: "#238D94",
                }}
              >
                Réessayer
              </Button>
            </Space>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Modal
      title="Authentification Biométrique"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
      maskClosable={false}
    >
      {renderContent()}
    </Modal>
  )
}

export default BiometricAuth
