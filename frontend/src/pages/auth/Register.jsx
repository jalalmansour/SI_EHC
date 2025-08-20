import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Col, Form, Row, Typography, message, Progress, Alert, Divider, Space, Tag, Button } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { submitDevisRequest, fetchDevisSummary } from '@/redux/slices/devisSlice.js'
import AuthLayout from '@/components/layouts/auth-layout/index.jsx'
import DevisForm from '@/components/common/form/DevisForm.jsx'
import DevisCTA from '@/components/devis/DevisCTA.jsx'
import DevisA11yNote from '@/components/devis/DevisA11yNote.jsx'
import DevisResponsiveTips from '@/components/devis/DevisResponsiveTips.jsx'
import {
  RocketOutlined,
  CheckCircleOutlined,
  StarOutlined,
  TrophyOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  GlobalOutlined,
  BulbOutlined,
  ArrowUpOutlined
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const schema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  trainingTopic: z.string().min(2),
  participants: z.coerce.number().int().positive(),
  preferredMode: z.enum(['presentiel', 'distanciel', 'hybride']),
  targetStart: z.coerce.date(),
  notes: z.string().optional(),
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

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { submitting, lastSubmission, submitError } = useSelector((s) => s.devis)
  const [currentStep, setCurrentStep] = useState(0)
  const [formProgress, setFormProgress] = useState(0)
  const [isFormValid, setIsFormValid] = useState(false)
  
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({ resolver: zodResolver(schema), mode: 'onChange' })

  const watchedFields = watch()

  useEffect(() => {
    dispatch(fetchDevisSummary())
  }, [dispatch])

  useEffect(() => {
    if (lastSubmission) {
      message.success('Votre demande a été envoyée avec succès')
      reset()
      navigate('/demande-devis/success')
    }
  }, [lastSubmission, reset, navigate])

  useEffect(() => {
    if (submitError) message.error(submitError)
  }, [submitError])

  // Calculate form progress
  useEffect(() => {
    const filledFields = Object.values(watchedFields).filter(value => 
      value && (typeof value === 'string' ? value.length > 0 : true)
    ).length
    const totalFields = Object.keys(schema.shape).length
    const progress = Math.round((filledFields / totalFields) * 100)
    setFormProgress(progress)
    setIsFormValid(isValid)
  }, [watchedFields, isValid])

  const onSubmit = (values) => {
    const payload = { ...values, targetStart: moment(values.targetStart).format('YYYY-MM-DD') }
    dispatch(submitDevisRequest(payload))
  }

  const benefits = [
    {
      icon: <SafetyCertificateOutlined />,
      title: "Certification ISO",
      description: "Formations certifiées et reconnues internationalement",
      color: "#10b981"
    },
    {
      icon: <TeamOutlined />,
      title: "Formateurs Experts",
      description: "Plus de 45 formateurs certifiés et expérimentés",
      color: "#3b82f6"
    },
    {
      icon: <GlobalOutlined />,
      title: "Multi-Modalités",
      description: "Présentiel, distanciel et hybride selon vos besoins",
      color: "#8b5cf6"
    },
    {
      icon: <BulbOutlined />,
      title: "Innovation Continue",
      description: "Technologies et méthodes pédagogiques de pointe",
      color: "#f59e0b"
    }
  ]

  return (
    <AuthLayout>
       {/* Floating Glass Morphism Progress Bar */}
       <motion.div
         className="fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-auto max-w-md"
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5, duration: 0.6 }}
         whileHover={{ scale: 1.02 }}
         whileTap={{ scale: 0.98 }}
       >
         <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 glass-progress-bar">
           <div className="flex items-center space-x-2 md:space-x-4">
             <div className="flex items-center space-x-2">
               <motion.div 
                 className="w-2 md:w-3 h-2 md:h-3 bg-blue-500 rounded-full"
                 animate={{ 
                   scale: [1, 1.2, 1],
                   opacity: [0.7, 1, 0.7]
                 }}
                 transition={{ 
                   duration: 2, 
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
               ></motion.div>
               <span className="text-xs md:text-sm font-medium text-gray-700">Progression</span>
             </div>
             <div className="flex-1 w-24 md:w-32">
               <Progress 
                 percent={formProgress} 
                 strokeColor={{
                   '0%': '#3b82f6',
                   '100%': '#8b5cf6',
                 }}
                 size={[4, 4]}
                 showInfo={false}
                 className="mb-0"
               />
             </div>
             <motion.div 
               className="text-xs md:text-sm font-bold text-blue-600 min-w-[2.5rem] md:min-w-[3rem] text-right"
               animate={{ 
                 color: ['#3b82f6', '#8b5cf6', '#3b82f6']
               }}
               transition={{ 
                 duration: 3, 
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             >
               {formProgress}%
             </motion.div>
           </div>
           
           {/* Progress Indicators */}
           <div className="flex items-center justify-center space-x-1 mt-2">
             {formProgress >= 25 && (
               <motion.div
                 initial={{ scale: 0, rotate: -180 }}
                 animate={{ scale: 1, rotate: 0 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <CheckCircleOutlined className="text-green-500 text-xs" />
               </motion.div>
             )}
             {formProgress >= 50 && (
               <motion.div
                 initial={{ scale: 0, rotate: -180 }}
                 animate={{ scale: 1, rotate: 0 }}
                 transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
               >
                 <CheckCircleOutlined className="text-green-500 text-xs" />
               </motion.div>
             )}
             {formProgress >= 75 && (
               <motion.div
                 initial={{ scale: 0, rotate: -180 }}
                 animate={{ scale: 1, rotate: 0 }}
                 transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
               >
                 <CheckCircleOutlined className="text-green-500 text-xs" />
               </motion.div>
             )}
             {formProgress >= 100 && (
               <motion.div
                 initial={{ scale: 0, rotate: -180 }}
                 animate={{ scale: 1, rotate: 0 }}
                 transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
               >
                 <CheckCircleOutlined className="text-green-500 text-xs" />
               </motion.div>
             )}
           </div>
         </div>
       </motion.div>

       <div style={{ maxWidth: 1400, margin: '0 auto' }}>
         {/* Hero Section with Advanced Animations */}
         <motion.div
           ref={heroRef}
           initial="hidden"
           animate={heroInView ? "visible" : "hidden"}
           variants={containerVariants}
           className="text-center mb-16"
         >
           <motion.div
             variants={itemVariants}
             className="mb-8"
           >
             <motion.div
               className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full px-6 py-3 text-sm font-semibold mb-6 border border-blue-200"
               whileHover={{ scale: 1.05 }}
               transition={{ type: "spring", stiffness: 300 }}
             >
               <RocketOutlined className="mr-2" />
               Nouvelle génération de formation
             </motion.div>
           </motion.div>

           <motion.div variants={itemVariants}>
             <Title level={1} className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
               Créez votre avenir
             </Title>
             <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
               Rejoignez la révolution de la formation en entreprise avec une plateforme conçue pour 
               <Text strong className="text-blue-600"> l'excellence</Text> et 
               <Text strong className="text-indigo-600"> l'innovation</Text>
             </Paragraph>
           </motion.div>
         </motion.div>

        <Row gutter={[32, 32]} className="mb-16">
          {/* Main Form Section */}
          <Col xs={24} lg={16}>
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
                {/* Form Header with Visual Elements */}
                <div className="relative overflow-hidden mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50" />
                  <div className="relative z-10 p-8 text-center">
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                      variants={floatingVariants}
                      animate="animate"
                    >
                      <StarOutlined className="text-3xl text-white" />
                    </motion.div>
                    <Title level={2} className="mb-2">Demande de devis personnalisée</Title>
                    <Paragraph className="text-gray-600 text-lg">
                      Un conseiller expert vous contactera sous 24h pour finaliser votre projet
                    </Paragraph>
                  </div>
                  
                  {/* Floating decorative elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-60"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.3, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-2 h-2 bg-indigo-400 rounded-full opacity-60"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                </div>

                {/* Enhanced Form */}
                <div className="px-8 pb-8">
                  <DevisForm control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />
                  
                  {/* Enhanced CTA Section */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <DevisCTA loading={submitting} />
                    
                    {/* Form Validation Status */}
                    <AnimatePresence>
                      {isFormValid && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-4"
                        >
                          <Alert
                            message="Formulaire prêt à être envoyé"
                            description="Tous les champs requis sont remplis correctement"
                            type="success"
                            showIcon
                            className="border-green-200 bg-green-50"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>

          {/* Enhanced Benefits Section */}
          <Col xs={24} lg={8}>
            <motion.div
              ref={benefitsRef}
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {/* Why Choose EHC Card */}
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                variants={cardVariants}
                className="mb-6"
              >
                <Card 
                  variant="borderless"
                  className="shadow-xl border-0 overflow-hidden"
                  style={{ 
                    borderRadius: 20,
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    color: 'white',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}
                >
                  <div className="text-center mb-6">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <TrophyOutlined className="text-2xl text-white" />
                    </motion.div>
                    <Title level={3} style={{ color: 'white', margin: 0 }}>Pourquoi EHC Formation ?</Title>
                  </div>

                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit.title}
                        variants={itemVariants}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                          style={{ backgroundColor: benefit.color }}
                        >
                          {benefit.icon}
                        </div>
                        <div>
                          <Text strong style={{ color: 'white' }}>{benefit.title}</Text>
                          <Paragraph style={{ color: '#cbd5e1', margin: 0, fontSize: '13px' }}>
                            {benefit.description}
                          </Paragraph>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                  
                  <div className="text-center">
                    <Tag color="blue" className="text-xs px-3 py-1">
                      Design 2025
                    </Tag>
                    <Text style={{ color: '#94a3b8', fontSize: '12px', display: 'block', marginTop: 8 }}>
                      Micro-interactions, bords adoucis, contrastes maîtrisés
                    </Text>
                  </div>
                </Card>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                variants={cardVariants}
              >
                <Card 
                  variant="borderless"
                  className="shadow-lg border-0"
                  style={{ borderRadius: 20, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
                >
                  <div className="text-center">
                    <Title level={4} className="mb-4">Chiffres clés</Title>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">500+</div>
                        <div className="text-sm text-gray-600">Formations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">10K+</div>
                        <div className="text-sm text-gray-600">Participants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">98%</div>
                        <div className="text-sm text-gray-600">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">45+</div>
                        <div className="text-sm text-gray-600">Formateurs</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </Col>
        </Row>

        {/* Enhanced Accessibility and Tips */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mb-8">
          <DevisA11yNote />
          <DevisResponsiveTips />
        </motion.div>
      </div>

      {/* Floating "Retour en haut" Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<ArrowUpOutlined />}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="shadow-2xl border-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          style={{
            width: '56px',
            height: '56px',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
          }}
        />
      </motion.div>
    </AuthLayout>
  )
}

export default memo(Register)
