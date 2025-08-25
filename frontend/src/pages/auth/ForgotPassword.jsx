import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Button, Card, Typography, message, Alert, Divider, Tag, Row, Col } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MailOutlined, ArrowLeftOutlined, CheckCircleOutlined, RocketOutlined, SafetyCertificateOutlined, BulbOutlined, StarOutlined } from '@ant-design/icons'
import AuthLayout from '@/components/layouts/auth-layout/AuthLayout.jsx'

const { Title, Paragraph, Text } = Typography

const schema = z.object({
  email: z.string().email('Email invalide'),
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

function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [success, setSuccess] = useState(false)

  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
      message.success('Un email de réinitialisation a été envoyé')
      form.reset()
    } catch (err) {
      message.error('Erreur lors de l\'envoi de l\'email')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: <SafetyCertificateOutlined />,
      title: "Sécurité Renforcée",
      description: "Processus de récupération sécurisé et vérifié",
      color: "#10b981"
    },
    {
      icon: <BulbOutlined />,
      title: "Récupération Rapide",
      description: "Email envoyé en quelques secondes",
      color: "#f59e0b"
    },
    {
      icon: <StarOutlined />,
      title: "Support 24/7",
      description: "Assistance technique disponible",
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
              Récupération de compte
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Title level={1} className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Mot de passe oublié ?
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pas de panique ! Nous vous aiderons à récupérer l'accès à votre compte en toute sécurité
            </Paragraph>
          </motion.div>
        </motion.div>

        <Row gutter={[32, 32]} justify="center">
          {/* Reset Form */}
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
                      <MailOutlined className="text-2xl text-white" />
                    </motion.div>
                    <Title level={2} className="mb-2">Réinitialisation</Title>
                    <Paragraph className="text-gray-600">
                      Entrez votre email pour recevoir un lien de réinitialisation
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
                  <AnimatePresence>
                    {success ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-8"
                      >
                        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                          <CheckCircleOutlined className="text-4xl text-green-600" />
                        </div>
                        <Title level={3} className="text-green-800 mb-2">Email envoyé !</Title>
                        <Paragraph className="text-gray-600 mb-6">
                          Vérifiez votre boîte de réception et suivez les instructions
                        </Paragraph>
                        <Link to="/login">
                          <Button type="primary" size="large" className="bg-green-600 hover:bg-green-700">
                            Retour à la connexion
                          </Button>
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} form={form} size="large">
                          <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                            <Input
                              prefix={<MailOutlined />}
                              placeholder="votre@email.com"
                              size="large"
                              className="rounded-lg border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                              {...control.register('email')}
                            />
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
                              Envoyer le lien
                            </Button>
                          </Form.Item>
                        </Form>

                        <Divider className="text-gray-400">ou</Divider>

                        <div className="text-center">
                          <Link to="/login" style={{ color: '#1890ff', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <ArrowLeftOutlined /> Retour à la connexion
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

              {/* Security Info */}
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
                  <Title level={4} style={{ color: 'white', margin: 0 }}>Sécurité EHC</Title>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <SafetyCertificateOutlined className="text-green-400" />
                      <Text style={{ color: '#cbd5e1', fontSize: '12px' }}>Chiffrement SSL/TLS</Text>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <SafetyCertificateOutlined className="text-green-400" />
                      <Text style={{ color: '#cbd5e1', fontSize: '12px' }}>Authentification sécurisée</Text>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <SafetyCertificateOutlined className="text-green-400" />
                      <Text style={{ color: '#cbd5e1', fontSize: '12px' }}>Protection des données</Text>
                    </div>
                  </div>
                  <Tag color="green" className="mt-3 text-xs">
                    Sécurisé
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

export default memo(ForgotPassword)
