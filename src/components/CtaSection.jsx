"use client"
import { useNavigate } from "react-router-dom"
import { Button, Typography, Space, Row, Col } from "antd"
import { ArrowRightOutlined, CheckCircleOutlined } from "@ant-design/icons"

const { Title, Paragraph } = Typography

const CtaSection = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate("/signup")
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const benefits = [
    "Essai gratuit de 30 jours",
    "Configuration en moins de 5 minutes",
    "Support client dédié 24/7",
    "Intégration avec vos outils existants",
    "Sécurité et conformité garanties",
  ]

  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-blue-600 overflow-hidden py-20" id="cta">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={14}>
            <div className="text-center lg:text-left">
              <Title level={2} className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Prêt à transformer votre <span className="text-yellow-300">formation professionnelle</span> ?
              </Title>

              <Paragraph className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto lg:mx-0">
                Rejoignez des milliers d'entreprises qui ont déjà choisi INGÉNIA pour optimiser leur gestion de la
                formation et développer les compétences de leurs équipes.
              </Paragraph>

              {/* Avantages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 text-blue-100">
                    <CheckCircleOutlined className="text-green-400 flex-shrink-0 text-lg" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Boutons d'action */}
              <Space size="large" wrap>
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  onClick={handleGetStarted}
                  className="bg-white text-indigo-600 hover:bg-gray-50 border-white h-14 px-10 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Démarrer maintenant
                </Button>

                <Button
                  size="large"
                  onClick={handleLogin}
                  className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 h-14 px-10 text-lg font-semibold transform hover:-translate-y-1 transition-all duration-200"
                >
                  Se connecter
                </Button>
              </Space>

              {/* Garantie */}
              <div className="mt-8 text-blue-200 text-sm">
                <p>✨ Essai gratuit de 30 jours • Aucune carte de crédit requise • Support inclus</p>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={10}>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-600">INGÉNIA Dashboard</div>
                </div>

                <div className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📈</div>
                      <div className="text-lg font-semibold text-indigo-600">Analytics Dashboard</div>
                      <div className="text-indigo-400 text-sm mt-2">Suivi en temps réel</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Formations actives</span>
                      <span className="font-semibold text-indigo-600">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Participants</span>
                      <span className="font-semibold text-green-600">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Taux de réussite</span>
                      <span className="font-semibold text-blue-600">94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default CtaSection
