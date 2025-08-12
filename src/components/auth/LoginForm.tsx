"use client"

import type React from "react"
import { Form, Input, Button, Checkbox, Alert, Card, Typography } from "antd"
import { UserOutlined, LockOutlined, RocketOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { login, clearError } from "../../store/slices/authSlice"
import type { RootState, AppDispatch } from "../../store"
import type { LoginForm as LoginFormType } from "../../types"

const { Title, Text } = Typography

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)
  const [form] = Form.useForm()

  const onFinish = async (values: LoginFormType) => {
    try {
      const result = await dispatch(login(values))
      if (login.fulfilled.match(result)) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const handleFormChange = () => {
    if (error) {
      dispatch(clearError())
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #238D94 0%, #0F141E 100%)",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          borderRadius: "12px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <RocketOutlined style={{ fontSize: 48, color: "#238D94", marginBottom: 16 }} />
          <Title level={2} style={{ margin: 0, color: "#0F141E" }}>
            INGÉNIA
          </Title>
          <Text type="secondary">Plateforme de gestion de formation</Text>
        </div>

        {error && (
          <Alert
            message="Erreur de connexion"
            description={error}
            type="error"
            showIcon
            closable
            style={{ marginBottom: 24 }}
            onClose={() => dispatch(clearError())}
          />
        )}

        <Form form={form} name="login" onFinish={onFinish} onChange={handleFormChange} size="large">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Veuillez saisir votre email!" },
              { type: "email", message: "Format d'email invalide!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" autoComplete="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Veuillez saisir votre mot de passe!" },
              { min: 6, message: "Le mot de passe doit contenir au moins 6 caractères!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mot de passe" autoComplete="current-password" />
          </Form.Item>

          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox>Se souvenir de moi</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              style={{
                height: 48,
                backgroundColor: "#238D94",
                borderColor: "#238D94",
              }}
            >
              Se connecter
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Text type="secondary">
              Mot de passe oublié ? <a href="/forgot-password">Cliquez ici</a>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default LoginForm
