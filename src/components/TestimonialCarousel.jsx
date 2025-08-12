import { Card, Row, Col, Typography, Avatar } from "antd"
import { StarFilled } from "@ant-design/icons"

const { Title, Paragraph } = Typography

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "DRH chez TechCorp",
      content:
        "INGÉNIA a révolutionné notre approche de la formation. L'interface est intuitive et les résultats sont mesurables.",
      rating: 5,
      avatar: "M",
    },
    {
      name: "Pierre Martin",
      role: "Formateur indépendant",
      content:
        "Enfin une plateforme qui comprend les besoins des formateurs ! La création de contenu n'a jamais été aussi simple.",
      rating: 5,
      avatar: "P",
    },
    {
      name: "Sophie Bernard",
      role: "Manager chez InnovCorp",
      content: "Mes équipes sont plus engagées que jamais. Le suivi des progrès en temps réel est un vrai plus.",
      rating: 5,
      avatar: "S",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Title level={2} className="text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de ceux qui utilisent INGÉNIA au quotidien.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} lg={8} key={index}>
              <Card className="h-full border-0 shadow-lg rounded-xl">
                <div className="text-center mb-4">
                  <div className="flex justify-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarFilled key={i} className="text-yellow-400 text-lg" />
                    ))}
                  </div>
                  <Paragraph className="text-gray-600 italic text-lg">"{testimonial.content}"</Paragraph>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Avatar size={48} className="bg-indigo-600">
                    {testimonial.avatar}
                  </Avatar>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default TestimonialCarousel
