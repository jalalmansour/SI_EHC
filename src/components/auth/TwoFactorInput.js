"use client"

import { useState, useRef, useEffect } from "react"
import { Form, Input, Button, Space, Typography, Alert } from "antd"
import { ArrowLeftOutlined, SafetyOutlined, ClockCircleOutlined } from "@ant-design/icons"

const { Text, Title } = Typography

const TwoFactorInput = ({ onSubmit, onBack, loading, email }) => {
  const [form] = Form.useForm()
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const inputRefs = useRef([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleInputChange = (value, index) => {
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all 6 digits are entered
    const allInputs = inputRefs.current.map((ref) => ref?.input?.value || "").join("")
    if (allInputs.length === 6) {
      form.setFieldsValue({ totpCode: allInputs })
      setTimeout(() => {
        onSubmit({ totpCode: allInputs })
      }, 100)
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData("text")
    const digits = paste.replace(/\D/g, "").slice(0, 6)

    digits.split("").forEach((digit, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].input.value = digit
      }
    })

    if (digits.length === 6) {
      form.setFieldsValue({ totpCode: digits })
      onSubmit({ totpCode: digits })
    }
  }

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <SafetyOutlined style={{ fontSize: 32, color: "#238D94", marginBottom: 12 }} />
        <Title level={4} style={{ margin: 0 }}>
          Code d'authentification
        </Title>
        <Text type="secondary">Saisissez le code à 6 chiffres de votre application d'authentification</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          Connecté en tant que: {email}
        </Text>
      </div>

      {timeLeft === 0 && (
        <Alert
          message="Session expirée"
          description="Veuillez vous reconnecter"
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Form form={form} onFinish={onSubmit}>
        <Form.Item
          name="totpCode"
          rules={[
            { required: true, message: "Veuillez saisir le code 2FA" },
            { len: 6, message: "Le code doit contenir 6 chiffres" },
          ]}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Input
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                maxLength={1}
                style={{
                  width: 50,
                  height: 50,
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={timeLeft === 0}
              />
            ))}
          </div>
        </Form.Item>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Text type="secondary">
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            Temps restant: {formatTime(timeLeft)}
          </Text>
        </div>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            disabled={timeLeft === 0}
            style={{
              backgroundColor: "#238D94",
              borderColor: "#238D94",
              height: 48,
            }}
          >
            {loading ? "Vérification..." : "Vérifier le code"}
          </Button>

          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            block
            size="large"
            style={{ height: 48 }}
          >
            Retour à la connexion
          </Button>
        </Space>
      </Form>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Vous ne recevez pas le code ? Vérifiez l'heure de votre appareil
        </Text>
      </div>
    </div>
  )
}

export default TwoFactorInput
