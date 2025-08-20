import { Typography, Row, Col, Divider } from "antd"
import { motion } from "framer-motion"

const { Title, Text } = Typography

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer 
      className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <div className="text-center md:text-left">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-6">
                <span className="text-white font-bold text-2xl">EHC</span>
              </div>
              <Title level={3} className="text-2xl font-bold text-white mb-4">
                EHC SIRH
              </Title>
              <Text className="text-gray-400 mb-6 block">
                Système RH Intégré - Transformez votre gestion des ressources humaines
              </Text>
            </div>
          </Col>
          
          <Col xs={24} md={8}>
            <div className="text-center md:text-left">
              <Title level={4} className="text-lg font-semibold text-white mb-4">
                Produit
              </Title>
              <div className="space-y-2">
                <Text className="text-gray-400 block hover:text-white transition-colors cursor-pointer">
                  Fonctionnalités
                </Text>
                <Text className="text-gray-400 block hover:text-white transition-colors cursor-pointer">
                  Tarifs
                </Text>
                <Text className="text-gray-400 block hover:text-white transition-colors cursor-pointer">
                  Intégrations
                </Text>
                <Text className="text-gray-400 block hover:text-white transition-colors cursor-pointer">
                  API
                </Text>
              </div>
            </div>
          </Col>
          
          <Col xs={24} md={8}>
            <div className="text-center md:text-left">
              <Title level={4} className="text-lg font-semibold text-white mb-4">
                Support
              </Title>
              <div className="space-y-2">
                <Text className="text-gray-400 block hover:text-white transition-colors cursor-pointer">
                  Centre d'aide
                </Text>
                <Text className="text-gray-400 block hover:text-white transition-colors cursor-pointer">
                  Contact
                </Text>
                <Text className="text-gray-400 block hover:text-white transition-colors cursor-pointer">
                  Formation
                </Text>
                <Text className="text-gray-400 block hover:text-white transition-colors cursor-pointer">
                  Communauté
                </Text>
              </div>
            </div>
          </Col>
        </Row>
        
        <Divider className="border-gray-700 my-8" />
        
        <div className="text-center">
          <Text className="text-gray-500 text-sm">
            © {currentYear} EHC SIRH. Tous droits réservés.
          </Text>
          <div className="flex justify-center space-x-6 mt-4">
            <Text className="text-gray-500 text-sm hover:text-white transition-colors cursor-pointer">
              Confidentialité
            </Text>
            <Text className="text-gray-500 text-sm hover:text-white transition-colors cursor-pointer">
              Conditions d'utilisation
            </Text>
            <Text className="text-gray-500 text-sm hover:text-white transition-colors cursor-pointer">
              Cookies
            </Text>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
