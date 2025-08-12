"use client"

import { useState, useEffect } from "react"
import { Form, Input, Button, Card, Typography, Alert, Divider } from "antd"
import { LockOutlined, KeyOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import PasswordStrengthIndicator from "./PasswordStrengthIndicator"
import PasswordPolicyInfo from "./PasswordPolicyInfo"
import { validatePassword, isPasswordExpired, isPasswordExpiringSoon } from "../../utils/passwordUtils"
import { changePasswordThunk } from "../../store/slices/authSlice"

const { Title, Text } = Typography

const ChangePasswordForm = ({ onSuccess, showPolicyInfo = true }) => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((state) => state.auth)
  const [form] = Form.useForm()
  const [newPassword, setNewPassword] = useState("")
  const [passwordValidation, setPasswordValidation] = useState(null)
  const [isExpired, setIsExpired] = useState(false)
  const [isExpiringSoon, setIsExpiringSoon] = useState(false)

  useEffect(() => {
    if (user?.lastPasswordChange) {
      setIsExpired(isPasswordExpired(user.lastPasswordChange))
      setIsExpiringSoon(isPasswordExpiringSoon(user.lastPasswordChange))
    }
  }, [user])

  useEffect(() => {
    if (newPassword) {
      const validation = validatePassword(
        newPassword,
        {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          username: user?.username,
        },
        user?.passwordHistory || [],
      )
      setPasswordValidation(validation)
    } else {
      setPasswordValidation(null)
    }
  }, [newPassword, user])

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const onFinish = async (values) => {
    try {
      if (!passwordValidation?.isValid) {
        return
      }

      const result = await dispatch(
        changePasswordThunk({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      )

      if (changePasswordThunk.fulfilled.match(result)) {
        form.resetFields()
        setNewPassword("")
        setPasswordValidation(null)
        onSuccess?.()
      }
    } catch (error) {
      console.error("Password change error:", error)
    }
  }

  const validateConfirmPassword = (_, value) => {
    if (!value || newPassword === value) {
      return Promise.resolve()
    }
    return Promise.reject(new Error("Les mots de passe ne correspondent pas"))
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* Alertes d'expiration */}
      {isExpired && (
        <Alert
          message="Mot de passe expiré"
          description="Votre mot de passe a expiré. Vous devez le changer immédiatement."
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {isExpiringSoon && !isExpired && (
        <Alert
          message="Mot de passe expire bientôt"
          description="Votre mot de passe expire dans moins de 14 jours. Nous vous recommandons de le changer maintenant."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Card>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <KeyOutlined style={{ fontSize: 48, color: "#1890ff", marginBottom: 16 }} />
          <Title level={3}>Changer le mot de passe</Title>
          <Text type="secondary">Assurez-vous que votre nouveau mot de passe respecte nos exigences de sécurité</Text>
        </div>

        <Form form={form} name="changePassword" onFinish={onFinish} layout="vertical" size="large" autoComplete="off">
          <Form.Item
            name="currentPassword"
            label="Mot de passe actuel"
            rules={[{ required: true, message: "Veuillez saisir votre mot de passe actuel" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Votre mot de passe actuel"
              autoComplete="current-password"
            />
          </Form.Item>

          <Divider />

          <Form.Item
            name="newPassword"
            label="Nouveau mot de passe"
            rules={[
              { required: true, message: "Veuillez saisir un nouveau mot de passe" },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve()

                  const validation = validatePassword(
                    value,
                    {
                      firstName: user?.firstName,
                      lastName: user?.lastName,
                      email: user?.email,
                      username: user?.username,
                    },
                    user?.passwordHistory || [],
                  )

                  if (!validation.isValid) {
                    return Promise.reject(new Error("Le mot de passe ne respecte pas les exigences de sécurité"))
                  }

                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input.Password
              prefix={<KeyOutlined />}
              placeholder="Votre nouveau mot de passe"
              autoComplete="new-password"
              onChange={handlePasswordChange}
            />
          </Form.Item>

          <PasswordStrengthIndicator
            password={newPassword}
            validation={passwordValidation}
            showDetails={true}
            showSuggestions={true}
          />

          <Form.Item
            name="confirmPassword"
            label="Confirmer le nouveau mot de passe"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Veuillez confirmer votre nouveau mot de passe" },
              { validator: validateConfirmPassword },
            ]}
            style={{ marginTop: 16 }}
          >
            <Input.Password
              prefix={<CheckCircleOutlined />}
              placeholder="Confirmez votre nouveau mot de passe"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={!passwordValidation?.isValid}
              block
              size="large"
              style={{
                height: 48,
                backgroundColor: passwordValidation?.isValid ? "#238D94" : undefined,
                borderColor: passwordValidation?.isValid ? "#238D94" : undefined,
              }}
            >
              {isLoading ? "Changement en cours..." : "Changer le mot de passe"}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {showPolicyInfo && (
        <div style={{ marginTop: 24 }}>
          <PasswordPolicyInfo compact={true} />
        </div>
      )}
    </div>
  )
}

export default ChangePasswordForm
