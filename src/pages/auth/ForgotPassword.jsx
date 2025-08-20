import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    try {
      setLoading(true)
      // TODO: Implement password reset logic
      message.success('Un email de réinitialisation a été envoyé à votre adresse email!')
    } catch (error) {
      message.error('Erreur lors de l\'envoi de l\'email de réinitialisation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card style={{ width: 400, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ color: '#1890ff', marginBottom: 8 }}>
            Mot de passe oublié
          </Title>
          <Text type="secondary">
            Entrez votre adresse email pour recevoir un lien de réinitialisation
          </Text>
        </div>

        <Form
          name="forgotPassword"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Veuillez saisir votre email!' },
              { type: 'email', message: 'Email invalide!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ width: '100%', height: 45 }}
            >
              Envoyer le lien de réinitialisation
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Link to="/auth/login" style={{ color: '#1890ff', display: 'inline-flex', alignItems: 'center' }}>
              <ArrowLeftOutlined style={{ marginRight: 4 }} />
              Retour à la connexion
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default ForgotPassword
