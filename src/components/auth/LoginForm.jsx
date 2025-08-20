import React, { memo, useState } from "react"
import { Form, Input, Button, Checkbox, Typography, Space, Divider } from "antd"
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from "@ant-design/icons"

const { Text } = Typography

const LoginForm = memo(function LoginForm({ loading, onSubmit, onForgot, onSignupLink }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Form layout="vertical" onFinish={() => onSubmit({ email, password })} validateTrigger="onBlur" style={{ width: "100%", maxWidth: 420 }}>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: "Veuillez saisir votre email" }, { type: "email", message: "Email invalide" }]}>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} size="large" prefix={<UserOutlined className="text-gray-400" />} placeholder="votre.email@ehc.com" />
      </Form.Item>
      <Form.Item label="Mot de passe" name="password" rules={[{ required: true, message: "Veuillez saisir votre mot de passe" }, { min: 6, message: "6 caractères min." }]}>
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} size="large" prefix={<LockOutlined className="text-gray-400" />} iconRender={(v) => (v ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} placeholder="Votre mot de passe" />
      </Form.Item>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <Checkbox defaultChecked>Se souvenir de moi</Checkbox>
        <Button type="link" onClick={onForgot} style={{ padding: 0 }}>Mot de passe oublié ?</Button>
      </div>
      <Button type="primary" htmlType="submit" size="large" loading={loading} block>
        Se connecter
      </Button>
      <Text style={{ display: "block", textAlign: "center", marginTop: 12 }}>
        Pas de compte ? <Button type="link" onClick={onSignupLink} style={{ padding: 0 }}>Créer un compte</Button>
      </Text>
      <Divider plain>ou</Divider>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button icon={<GoogleOutlined />} block>Continuer avec Google</Button>
      </Space>
    </Form>
  )
})

export default LoginForm


