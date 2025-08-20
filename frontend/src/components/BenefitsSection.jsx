import { Typography, Row, Col, Card } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"

const { Title, Paragraph, Text } = Typography

const BenefitsSection = () => {
  const benefits = [
    "Interface intuitive et moderne",
    "Sécurité des données certifiée",
    "Support technique 24/7",
    "Intégration facile avec vos outils existants",
    "Mise à jour automatique des fonctionnalités",
    "Conformité RGPD et normes françaises"
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title level={2} className="text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir EHC SIRH ?
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une solution conçue pour répondre aux besoins spécifiques des entreprises françaises
          </Paragraph>
        </motion.div>

        <Row gutter={[32, 16]}>
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center"
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircleOutlined className="text-green-500 text-xl mr-3 flex-shrink-0" />
                  <Text className="text-gray-700 text-lg">{benefit}</Text>
                </motion.div>
              ))}
            </motion.div>
          </Col>
          
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 h-full">
                <div className="text-center p-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white text-3xl">🚀</span>
                    </div>
                  </motion.div>
                  
                  <Title level={3} className="text-2xl font-bold text-gray-900 mb-4">
                    Prêt à commencer ?
                  </Title>
                  <Paragraph className="text-gray-600 mb-6">
                    Rejoignez des centaines d'entreprises qui font confiance à EHC SIRH
                  </Paragraph>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default BenefitsSection
