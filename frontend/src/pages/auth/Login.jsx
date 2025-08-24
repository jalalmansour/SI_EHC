import { memo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Button, Card, Typography, message, Checkbox, Alert, Divider, Tag, Row, Col } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, RocketOutlined, StarOutlined, SafetyCertificateOutlined, BulbOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { login, selectAuthLoading, selectAuthError, selectIsAuthenticated } from '@/redux/slices/authSlice.js'
import AuthLayout from '@/components/layouts/auth-layout/index.jsx'

const { Title, Paragraph, Text } = Typography

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  rememberMe: z.boolean().optional(),
})

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

function Login() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  // Dev-only: allow query param login for test accounts
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const emailParam = params.get('email')
      const passwordParam = params.get('password')
      const enabled = (import.meta.env.VITE_ENABLE_QUERY_LOGIN ?? 'true') === 'true' && import.meta.env.DEV
      if (enabled && emailParam && passwordParam) {
        const emailVal = emailParam
        const passwordVal = passwordParam
        setValue('email', emailVal)
        setValue('password', passwordVal)
        dispatch(login({ email: emailVal, password: passwordVal }))
        // Clear query params from the URL history
        navigate('/login', { replace: true })
      }
    } catch (e) {
      // no-op
    }
  }, [dispatch, navigate, setValue])

  const onSubmit = async (values) => {
    dispatch(login(values))
  }

  const features = [
    {
      icon: <SafetyCertificateOutlined />,
      title: "Sécurité Avancée",
      description: "Authentification multi-facteurs et chiffrement de bout en bout",
      color: "#10b981"
    },
    {
      icon: <BulbOutlined />,
      title: "Performance Optimale",
      description: "Interface ultra-rapide avec chargement intelligent",
      color: "#f59e0b"
    },
    {
      icon: <StarOutlined />,
      title: "UX Premium",
      description: "Design intuitif et micro-interactions fluides",
      color: "#8b5cf6"
    }
  ]

  return (
    <AuthLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <motion.div
              className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full px-6 py-3 text-sm font-semibold mb-6 border border-blue-200"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <RocketOutlined className="mr-2" />
              Bienvenue sur EHC Formation
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Title level={1} className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Reconnectez-vous
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Accédez à votre espace de formation personnalisé et continuez votre apprentissage
            </Paragraph>
          </motion.div>
        </motion.div>

        <Row gutter={[32, 32]} justify="center">
          {/* Login Form */}
          <Col xs={24} md={12}>
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover="hover"
            >
              <Card 
                variant="borderless"
                className="shadow-2xl border-0 overflow-hidden"
                style={{ 
                  borderRadius: 24,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.1)'
                }}
              >
                {/* Form Header */}
                <div className="relative overflow-hidden mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50" />
                  <div className="relative z-10 p-6 text-center">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                      variants={floatingVariants}
                      animate="animate"
                    >
                      <UserOutlined className="text-2xl text-white" />
                    </motion.div>
                    <Title level={2} className="mb-2">Connexion</Title>
                    <Paragraph className="text-gray-600">
                      Connectez-vous à votre compte EHC Formation
                    </Paragraph>
                  </div>
                  
                  {/* Floating decorative elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.3, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-3 h-3 bg-indigo-400 rounded-full opacity-60"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                </div>

                {/* Enhanced Form */}
                <div className="px-6 pb-6">
                    <Form layout="vertical" size="large" onSubmitCapture={handleSubmit(onSubmit)} form={form}>
                    <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                      <Input
                            {...field}
                        prefix={<UserOutlined />}
                        placeholder="votre@email.com"
                        size="large"
                        className="rounded-lg border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                          />
                        )}
                      />
                    </Form.Item>

                    <Form.Item label="Mot de passe" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                      <Input.Password
                            {...field}
                        prefix={<LockOutlined />}
                        placeholder="Votre mot de passe"
                        size="large"
                        className="rounded-lg border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                          />
                        )}
                      />
                    </Form.Item>

                    <Form.Item>
                      <div className="flex justify-between items-center">
                        <Checkbox className="text-gray-600">
                          Se souvenir de moi
                        </Checkbox>
                        <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
                          Mot de passe oublié ?
                        </Link>
                      </div>
                    </Form.Item>

                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        size="large" 
                        loading={loading} 
                        block
                        className="h-12 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 border-0 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Se connecter
                      </Button>
                    </Form.Item>
                  </Form>

                  <Divider className="text-gray-400">ou</Divider>

                  <div className="text-center">
                    <Paragraph className="text-gray-600 mb-0">
                      Pas encore de compte ?{' '}
                      <Link to="/demande-devis" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                        Créer un compte
                      </Link>
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>

          {/* Features Section */}
          <Col xs={24} md={10}>
            <motion.div
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="space-y-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    variant="borderless"
                    className="shadow-lg border-0 hover:shadow-xl transition-all duration-300"
                    style={{ borderRadius: 16 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                        style={{ backgroundColor: feature.color }}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <Text strong className="text-gray-900">{feature.title}</Text>
                        <Paragraph className="text-gray-600 text-sm mb-0">
                          {feature.description}
                        </Paragraph>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* Quick Stats */}
              <motion.div
                variants={itemVariants}
                className="mt-8"
              >
                <Card 
                  variant="borderless"
                  className="shadow-lg border-0 text-center"
                  style={{ 
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    color: 'white'
                  }}
                >
                  <Title level={4} style={{ color: 'white', margin: 0 }}>Plateforme EHC</Title>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <div className="text-xl font-bold text-blue-400">500+</div>
                      <div className="text-xs text-gray-300">Formations</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-400">10K+</div>
                      <div className="text-xs text-gray-300">Utilisateurs</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-400">98%</div>
                      <div className="text-xs text-gray-300">Satisfaction</div>
                    </div>
                  </div>
                  <Tag color="blue" className="mt-3 text-xs">
                    Design 2025
                  </Tag>
                </Card>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </AuthLayout>
  )
}

export default memo(Login)
