import { Typography, Button, Row, Col } from "antd"
import { ArrowRightOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"

const { Title, Paragraph, Text } = Typography

const CtaSection = ({ onShowSignup, onShowLogin }) => {
  const features = [
    "Essai gratuit de 14 jours",
    "Aucune carte de crédit requise",
    "Support technique inclus",
    "Mise à jour automatique"
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[48, 32]} align="middle">
          <Col xs={24} lg={14}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Title level={2} className="text-4xl md:text-5xl font-bold text-white mb-6">
                Prêt à transformer votre{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Gestion RH ?
                </span>
              </Title>
              
              <Paragraph className="text-xl text-blue-100 mb-8">
                Rejoignez des centaines d'entreprises qui font déjà confiance à EHC SIRH. 
                Commencez votre essai gratuit aujourd'hui et découvrez la différence.
              </Paragraph>

              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center"
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircleOutlined className="text-green-300 text-xl mr-3 flex-shrink-0" />
                    <Text className="text-blue-100 text-lg">{feature}</Text>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="large" 
                  type="primary" 
                  onClick={onShowSignup}
                  className="bg-white text-blue-600 border-0 hover:bg-gray-100 h-12 px-8 text-lg font-semibold transition-all duration-300"
                >
                  Commencer gratuitement
                  <ArrowRightOutlined className="ml-2" />
                </Button>
                <Button 
                  size="large" 
                  onClick={onShowLogin}
                  className="h-12 px-8 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Se connecter
                </Button>
              </div>
            </motion.div>
          </Col>
          
          <Col xs={24} lg={10}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-white/20">
                <img src="/training-dashboard-analytics.png" alt="Analytics" className="rounded-xl w-full h-auto object-cover shadow-xl ring-1 ring-white/20" />
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default CtaSection
