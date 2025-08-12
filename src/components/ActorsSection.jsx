import { Card, Row, Col, Typography } from "antd"

const { Title, Paragraph } = Typography

const ActorsSection = () => {
  const actors = [
    {
      title: "Formateurs",
      description: "Créez et animez vos formations avec des outils intuitifs",
      emoji: "👨‍🏫",
    },
    {
      title: "Managers",
      description: "Pilotez le développement des compétences de vos équipes",
      emoji: "👨‍💼",
    },
    {
      title: "RH",
      description: "Gérez la formation à l'échelle de votre organisation",
      emoji: "👥",
    },
    {
      title: "Apprenants",
      description: "Développez vos compétences avec un parcours personnalisé",
      emoji: "👨‍💻",
    },
  ]

  return (
    <section id="actors" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Title level={2} className="text-4xl font-bold text-gray-900 mb-4">
            Pour tous les acteurs de la formation
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
            INGÉNIA s'adapte à tous les profils et accompagne chaque acteur dans sa mission.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {actors.map((actor, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl hover:-translate-y-2">
                <div className="text-6xl mb-4">{actor.emoji}</div>
                <Title level={4} className="mb-3">
                  {actor.title}
                </Title>
                <Paragraph className="text-gray-600">{actor.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default ActorsSection
