import { Card, Row, Col, Typography } from "antd"
import { BookOutlined, UserOutlined, BarChartOutlined, CalendarOutlined } from "@ant-design/icons"

const { Title, Paragraph } = Typography

const FeaturesSection = () => {
  const features = [
    {
      icon: <BookOutlined className="text-4xl text-indigo-600" />,
      title: "Catalogue de formations",
      description: "Accédez à un large catalogue de formations professionnelles adaptées à vos besoins.",
    },
    {
      icon: <UserOutlined className="text-4xl text-green-600" />,
      title: "Gestion des utilisateurs",
      description: "Gérez facilement les profils, rôles et permissions de tous vos utilisateurs.",
    },
    {
      icon: <CalendarOutlined className="text-4xl text-blue-600" />,
      title: "Planification intelligente",
      description: "Planifiez et organisez vos sessions de formation avec notre système intelligent.",
    },
    {
      icon: <BarChartOutlined className="text-4xl text-purple-600" />,
      title: "Analytics avancés",
      description: "Suivez les performances et l'engagement avec des rapports détaillés.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Title level={2} className="text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités puissantes
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les outils qui font d'INGÉNIA la plateforme de référence pour l'ingénierie de formation.
          </Paragraph>
        </div>

        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <div className="mb-4">{feature.icon}</div>
                <Title level={4} className="mb-3">
                  {feature.title}
                </Title>
                <Paragraph className="text-gray-600">{feature.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default FeaturesSection
