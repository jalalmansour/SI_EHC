import { Card, Row, Col, Typography } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"

const { Title, Paragraph } = Typography

const BenefitsSection = () => {
  const benefits = [
    "Réduction de 60% du temps de gestion administrative",
    "Amélioration de 40% de l'engagement des apprenants",
    "ROI formation multiplié par 3 en moyenne",
    "Conformité réglementaire garantie",
    "Support client 24/7 en français",
    "Intégration avec vos outils existants",
  ]

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Title level={2} className="text-4xl font-bold text-gray-900 mb-4">
            Les avantages INGÉNIA
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez pourquoi plus de 500 entreprises nous font confiance pour leur formation.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {benefits.map((benefit, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card className="h-full border-0 shadow-lg rounded-xl">
                <div className="flex items-center space-x-4">
                  <CheckCircleOutlined className="text-2xl text-green-500 flex-shrink-0" />
                  <Paragraph className="text-lg text-gray-700 mb-0">{benefit}</Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default BenefitsSection
