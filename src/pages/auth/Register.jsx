import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message, Select } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/slices/authSlice.js'

const { Title, Text } = Typography
const { Option } = Select

const Register = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      setLoading(true)
      const result = await dispatch(register(values)).unwrap()
      message.success('Inscription réussie!')
      navigate('/auth/login')
    } catch (error) {
      message.error(error.message || 'Erreur lors de l\'inscription')
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
            EHC Formation
          </Title>
          <Text type="secondary">Créer votre compte</Text>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Veuillez saisir votre prénom!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Prénom" 
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Veuillez saisir votre nom!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Nom" 
            />
          </Form.Item>

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

          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Veuillez saisir votre téléphone!' }]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="Téléphone" 
            />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: 'Veuillez sélectionner votre rôle!' }]}
          >
            <Select placeholder="Sélectionner votre rôle">
              <Option value="EMPLOYEE">Employé</Option>
              <Option value="MANAGER">Manager</Option>
              <Option value="TRAINER">Formateur</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Veuillez saisir votre mot de passe!' },
              { min: 6, message: 'Le mot de passe doit contenir au moins 6 caractères!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Mot de passe" 
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Veuillez confirmer votre mot de passe!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Les mots de passe ne correspondent pas!'))
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Confirmer le mot de passe" 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ width: '100%', height: 45 }}
            >
              S'inscrire
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Déjà un compte?{' '}
              <Link to="/auth/login" style={{ color: '#1890ff' }}>
                Se connecter
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Register
