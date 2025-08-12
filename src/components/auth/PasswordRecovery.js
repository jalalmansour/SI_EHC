"use client"

import { useState } from "react"
import { Form, Input, Button, Steps, Card, Typography, Alert, Space } from "antd"
import { MailOutlined, SafetyOutlined, LockOutlined, CheckCircleOutlined, MobileOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { requestPasswordResetThunk, verifyResetCodeThunk, resetPasswordThunk } from "../../store/slices/authSlice"

const { Title, Text } = Typography
const { Step } = Steps

const PasswordRecovery = () => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)
  const [currentStep, setCurrentStep] = useState(0)
  const [email, setEmail] = useState("")
  const [resetToken, setResetToken] = useState("")
  const [verificationMethod, setVerificationMethod] = useState("email") // email, sms, security_questions

  const handleEmailSubmit = async (values) => {
    try {
      const result = await dispatch(
        requestPasswordResetThunk({
          email: values.email,
          method: verificationMethod,
        }),
      )

      if (requestPasswordResetThunk.fulfilled.match(result)) {
        setEmail(values.email)
        setCurrentStep(1)
      }
    } catch (error) {
      console.error("Password reset request failed:", error)
    }
  }

  const handleCodeVerification = async (values) => {
    try {
      const result = await dispatch(
        verifyResetCodeThunk({
          email,
          code: values.verificationCode,
          method: verificationMethod,
        }),
      )

      if (verifyResetCodeThunk.fulfilled.match(result)) {
        setResetToken(result.payload.resetToken)
        setCurrentStep(2)
      }
    } catch (error) {
      console.error("Code verification failed:", error)
    }
  }

  const handlePasswordReset = async (values) => {
    try {
      const result = await dispatch(
        resetPasswordThunk({
          resetToken,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }),
      )

      if (resetPasswordThunk.fulfilled.match(result)) {
        setCurrentStep(3)
      }
    } catch (error) {
      console.error("Password reset failed:", error)
    }
  }

  const steps = [
    {
      title: "Identification",
      icon: <MailOutlined />,
      content: (
        <Form onFinish={handleEmailSubmit} layout="vertical" size="large">
          <Alert
            message="Récupération sécurisée de mot de passe"
            description="Nous utilisons plusieurs méthodes de vérification pour protéger votre compte."
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          <Form.Item
            name="email"
            label="Adresse email"
            rules={[
              { required: true, message: "Veuillez saisir votre email" },
              { type: "email", message: "Format email invalide" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="votre.email@entreprise.com" size="large" />
          </Form.Item>

          <Form.Item label="Méthode de vérification">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                type={verificationMethod === "email" ? "primary" : "default"}
                block
                onClick={() => setVerificationMethod("email")}
                icon={<MailOutlined />}
              >
                Code par email
              </Button>
              <Button
                type={verificationMethod === "sms" ? "primary" : "default"}
                block
                onClick={() => setVerificationMethod("sms")}
                icon={<MobileOutlined />}
              >
                Code par SMS
              </Button>
              <Button
                type={verificationMethod === "security_questions" ? "primary" : "default"}
                block
                onClick={() => setVerificationMethod("security_questions")}
                icon={<SafetyOutlined />}
              >
                Questions de sécurité
              </Button>
            </Space>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              size="large"
              style={{
                backgroundColor: "#238D94",
                borderColor: "#238D94",
                height: 48,
              }}
            >
              Envoyer le code de vérification
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Vérification",
      icon: <SafetyOutlined />,
      content: (
        <Form onFinish={handleCodeVerification} layout="vertical" size="large">
          <Alert
            message={`Code envoyé ${verificationMethod === "email" ? "par email" : verificationMethod === "sms" ? "par SMS" : "questions de sécurité"}`}
            description={`Vérifiez ${verificationMethod === "email" ? "votre boîte email" : verificationMethod === "sms" ? "vos messages" : "vos réponses"} et saisissez le code reçu.`}
            type="success"
            showIcon
            style={{ marginBottom: 24 }}
          />

          <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
            Code envoyé à : <Text strong>{email}</Text>
          </Text>

          {verificationMethod === "security_questions" ? (
            <>
              <Form.Item
                name="question1"
                label="Quel est le nom de votre premier animal de compagnie ?"
                rules={[{ required: true, message: "Réponse requise" }]}
              >
                <Input placeholder="Votre réponse" size="large" />
              </Form.Item>

              <Form.Item
                name="question2"
                label="Dans quelle ville êtes-vous né(e) ?"
                rules={[{ required: true, message: "Réponse requise" }]}
              >
                <Input placeholder="Votre réponse" size="large" />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              name="verificationCode"
              label="Code de vérification"
              rules={[
                { required: true, message: "Veuillez saisir le code" },
                { len: 6, message: "Le code doit contenir 6 caractères" },
              ]}
            >
              <Input
                placeholder="123456"
                maxLength={6}
                size="large"
                style={{ textAlign: "center", fontSize: 18, letterSpacing: 4 }}
              />
            </Form.Item>
          )}

          <Form.Item>
            <Space style={{ width: "100%" }} direction="vertical">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                size="large"
                style={{
                  backgroundColor: "#238D94",
                  borderColor: "#238D94",
                  height: 48,
                }}
              >
                Vérifier le code
              </Button>

              <Button type="link" onClick={() => setCurrentStep(0)} block>
                Retour à l'identification
              </Button>
            </Space>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Nouveau mot de passe",
      icon: <LockOutlined />,
      content: (
        <Form onFinish={handlePasswordReset} layout="vertical" size="large">
          <Alert
            message="Créez un mot de passe sécurisé"
            description="Votre nouveau mot de passe doit respecter nos politiques de sécurité."
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          <Form.Item
            name="newPassword"
            label="Nouveau mot de passe"
            rules={[
              { required: true, message: "Mot de passe requis" },
              { min: 12, message: "Minimum 12 caractères" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: "Doit contenir majuscules, minuscules, chiffres et caractères spéciaux",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Votre nouveau mot de passe" size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirmer le mot de passe"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Confirmation requise" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("Les mots de passe ne correspondent pas"))
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirmez votre mot de passe" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              size="large"
              style={{
                backgroundColor: "#238D94",
                borderColor: "#238D94",
                height: 48,
              }}
            >
              Réinitialiser le mot de passe
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Terminé",
      icon: <CheckCircleOutlined />,
      content: (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <CheckCircleOutlined style={{ fontSize: 64, color: "#52c41a", marginBottom: 24 }} />

          <Title level={3} style={{ color: "#52c41a" }}>
            Mot de passe réinitialisé avec succès !
          </Title>

          <Text type="secondary" style={{ display: "block", marginBottom: 32 }}>
            Votre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter avec vos nouveaux identifiants.
          </Text>

          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              type="primary"
              size="large"
              href="/login"
              style={{
                backgroundColor: "#238D94",
                borderColor: "#238D94",
                height: 48,
                width: 200,
              }}
            >
              Se connecter
            </Button>

            <Alert
              message="Conseils de sécurité"
              description={
                <ul style={{ margin: 0, paddingLeft: 20, textAlign: "left" }}>
                  <li>Activez l'authentification à deux facteurs</li>
                  <li>Ne partagez jamais votre mot de passe</li>
                  <li>Utilisez un gestionnaire de mots de passe</li>
                  <li>Changez régulièrement vos mots de passe</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </Space>
        </div>
      ),
    },
  ]

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
      <Card
        style={{
          width: 600,
          maxWidth: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          borderRadius: "12px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Title level={2} style={{ margin: 0, color: "#0F141E" }}>
            Récupération de mot de passe
          </Title>
          <Text type="secondary">Processus sécurisé de réinitialisation</Text>
        </div>

        <Steps current={currentStep} style={{ marginBottom: 32 }}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} icon={step.icon} />
          ))}
        </Steps>

        {error && (
          <Alert message="Erreur" description={error} type="error" showIcon closable style={{ marginBottom: 24 }} />
        )}

        {steps[currentStep].content}
      </Card>
    </div>
  )
}

export default PasswordRecovery
