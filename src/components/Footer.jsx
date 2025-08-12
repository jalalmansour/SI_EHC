import { Typography, Row, Col, Space } from "antd"
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons"

const { Title, Text, Link } = Typography

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Row gutter={[48, 48]}>
          <Col xs={24} sm={12} lg={6}>
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <Title level={3} className="text-white mb-0">
                  INGÉNIA
                </Title>
              </div>
              <Text className="text-gray-400">
                La plateforme de référence pour l'ingénierie de formation professionnelle.
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Title level={4} className="text-white mb-4">
              Produit
            </Title>
            <Space direction="vertical">
              <Link className="text-gray-400 hover:text-white">Fonctionnalités</Link>
              <Link className="text-gray-400 hover:text-white">Tarifs</Link>
              <Link className="text-gray-400 hover:text-white">Intégrations</Link>
              <Link className="text-gray-400 hover:text-white">API</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Title level={4} className="text-white mb-4">
              Support
            </Title>
            <Space direction="vertical">
              <Link className="text-gray-400 hover:text-white">Centre d'aide</Link>
              <Link className="text-gray-400 hover:text-white">Documentation</Link>
              <Link className="text-gray-400 hover:text-white">Formation</Link>
              <Link className="text-gray-400 hover:text-white">Communauté</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Title level={4} className="text-white mb-4">
              Contact
            </Title>
            <Space direction="vertical">
              <div className="flex items-center space-x-2">
                <MailOutlined className="text-indigo-400" />
                <Text className="text-gray-400">contact@ingenia.fr</Text>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneOutlined className="text-indigo-400" />
                <Text className="text-gray-400">+33 1 23 45 67 89</Text>
              </div>
              <div className="flex items-center space-x-2">
                <EnvironmentOutlined className="text-indigo-400" />
                <Text className="text-gray-400">Paris, France</Text>
              </div>
            </Space>
          </Col>
        </Row>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <Text className="text-gray-400">
            © 2024 INGÉNIA. Tous droits réservés. |
            <Link className="text-gray-400 hover:text-white ml-2">Politique de confidentialité</Link> |
            <Link className="text-gray-400 hover:text-white ml-2">Conditions d'utilisation</Link>
          </Text>
        </div>
      </div>
    </footer>
  )
}

export default Footer
