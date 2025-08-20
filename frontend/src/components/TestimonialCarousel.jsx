import { Typography, Card, Avatar, Row, Col } from "antd"
import { StarFilled } from "@ant-design/icons"
import { motion } from "framer-motion"

const { Title, Paragraph, Text } = Typography

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "DRH",
      company: "TechCorp France",
      avatar: "MD",
      rating: 5,
      content: "EHC SIRH a révolutionné notre gestion RH. L'interface est intuitive et nos équipes l'ont adoptée immédiatement. Un gain de temps considérable !"
    },
    {
      name: "Pierre Martin",
      role: "Manager Formation",
      company: "InnovSoft",
      avatar: "PM",
      rating: 5,
      content: "La gestion des formations est maintenant un jeu d'enfant. Les rapports sont détaillés et nous permet de prendre de meilleures décisions."
    },
    {
      name: "Sophie Bernard",
      role: "Responsable RH",
      company: "GreenEnergy",
      avatar: "SB",
      rating: 5,
      content: "Excellent support client et une plateforme qui évolue constamment. EHC SIRH répond parfaitement à nos besoins."
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title level={2} className="text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos utilisateurs satisfaits
          </Paragraph>
        </motion.div>

        <Row gutter={[32, 32]}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} md={8} key={index}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  cover={<img src="/placeholder-user.jpg" alt="Avis client" className="h-40 w-full object-cover" />}
                >
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarFilled key={i} className="text-yellow-400 text-lg" />
                      ))}
                    </div>
                    
                    {/* Content */}
                    <Paragraph className="text-gray-700 mb-6 italic text-lg">
                      "{testimonial.content}"
                    </Paragraph>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <Avatar 
                        size={48} 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold mr-3"
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <div>
                        <Text className="font-semibold text-gray-900 block">
                          {testimonial.name}
                        </Text>
                        <Text className="text-gray-600 text-sm">
                          {testimonial.role} chez {testimonial.company}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default TestimonialCarousel
