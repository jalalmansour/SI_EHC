import React, { memo, useState } from "react"
import { Form, Input, Button, Typography, Steps } from "antd"
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"

const { Text } = Typography
const { Step } = Steps

const SignupForm = memo(function SignupForm({ loading, onSubmit, onLoginLink }) {
  const [step, setStep] = useState(0)
  const [form] = Form.useForm()

  const next = async () => {
    try {
      await form.validateFields()
      setStep((s) => Math.min(2, s + 1))
    } catch {}
  }

  const prev = () => setStep((s) => Math.max(0, s - 1))

  const finish = async () => {
    const values = await form.validateFields()
    onSubmit(values)
  }

  return (
    <div style={{ width: "100%", maxWidth: 520 }}>
      <Steps current={step} style={{ marginBottom: 24 }}>
        <Step title="Profil" />
        <Step title="Coordonnées" />
        <Step title="Sécurité" />
      </Steps>
      <Form form={form} layout="vertical">
        {step === 0 && (
          <Form.Item label="Nom complet" name="name" rules={[{ required: true, message: "Nom requis" }]}> 
            <Input size="large" prefix={<UserOutlined />} placeholder="Votre nom" />
          </Form.Item>
        )}
        {step === 1 && (
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email requis" }, { type: "email" }]}> 
            <Input size="large" prefix={<MailOutlined />} placeholder="email@entreprise.com" />
          </Form.Item>
        )}
        {step === 2 && (
          <>
            <Form.Item label="Mot de passe" name="password" rules={[{ required: true }, { min: 8 }]}>
              <Input.Password size="large" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item label="Confirmer le mot de passe" name="confirm" dependencies={["password"]} rules={[{ required: true }, ({ getFieldValue }) => ({ validator(_, v){ return !v || getFieldValue('password')===v ? Promise.resolve() : Promise.reject(new Error('Les mots de passe ne correspondent pas')) }})]}>
              <Input.Password size="large" prefix={<LockOutlined />} />
            </Form.Item>
          </>
        )}
      </Form>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {step > 0 && <Button onClick={prev}>Précédent</Button>}
        {step < 2 && <Button type="primary" onClick={next}>Suivant</Button>}
        {step === 2 && <Button type="primary" loading={loading} onClick={finish}>Créer mon compte</Button>}
      </div>
      <Text style={{ display: "block", marginTop: 12 }}>
        Déjà un compte ? <Button type="link" onClick={onLoginLink} style={{ padding: 0 }}>Se connecter</Button>
      </Text>
    </div>
  )
})

export default SignupForm


