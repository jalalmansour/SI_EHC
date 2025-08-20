import { Typography, Row, Col, Card } from "antd"
import { motion } from "framer-motion"

const { Title, Paragraph, Text } = Typography

const MissionSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[48, 32]} align="middle">
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Title level={2} className="text-4xl font-bold text-gray-900 mb-6">
                Notre Mission
              </Title>
              <Paragraph className="text-lg text-gray-700 mb-6">
                Chez EHC SIRH, nous croyons que chaque entreprise mérite une solution de gestion RH moderne, 
                intuitive et efficace. Notre mission est de démocratiser l'accès aux outils RH professionnels 
                pour permettre aux entreprises de toutes tailles de développer leur capital humain.
              </Paragraph>
              <Paragraph className="text-lg text-gray-700 mb-6">
                Nous nous engageons à fournir une plateforme qui respecte les normes françaises, 
                assure la conformité RGPD et s'adapte aux spécificités du marché français.
              </Paragraph>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <Text className="text-gray-700 font-medium">Conformité RGPD garantie</Text>
              </div>
            </motion.div>
          </Col>
          
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-2xl">🎯</span>
                    </div>
                    <Title level={3} className="text-2xl font-bold text-gray-900 mb-2">
                      Vision 2025
                    </Title>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <Text className="text-gray-700">
                        Devenir la référence en matière de solutions RH en France
                      </Text>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <Text className="text-gray-700">
                        Accompagner 1000+ entreprises dans leur transformation digitale
                      </Text>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <Text className="text-gray-700">
                        Contribuer à l'émergence d'une nouvelle génération de leaders RH
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default MissionSection
