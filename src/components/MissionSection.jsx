import { Row, Col, Typography } from "antd"

const { Title, Paragraph, Text } = Typography

const MissionSection = () => {
  return (
    <section id="mission" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className="text-center lg:text-left">
              <Title level={2} className="text-4xl font-bold text-gray-900 mb-6">
                Notre mission
              </Title>
              <Paragraph className="text-xl text-gray-600 mb-6">
                Démocratiser l'accès à la formation professionnelle en offrant une plateforme intuitive, complète et
                accessible à tous.
              </Paragraph>
              <Paragraph className="text-lg text-gray-600">
                Nous croyons que chaque individu mérite d'avoir accès aux meilleures opportunités de développement
                professionnel, et nous nous engageons à rendre cela possible grâce à la technologie et à l'innovation.
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="text-center">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-12 text-white">
                <div className="text-6xl mb-6">🎯</div>
                <Title level={3} className="text-white mb-4">
                  Vision 2025
                </Title>
                <Paragraph className="text-blue-100 text-lg">
                  Devenir la référence européenne en matière d'ingénierie de formation digitale
                </Paragraph>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default MissionSection
