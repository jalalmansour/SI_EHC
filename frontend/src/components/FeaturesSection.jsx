import { Typography, Row, Col, Card } from "antd"
import {
  TeamOutlined,
  BookOutlined,
  BarChartOutlined,
  RocketOutlined,
} from "@ant-design/icons"
import { motion } from "framer-motion"

const { Title, Paragraph, Text } = Typography

const FeaturesSection = () => {
  const features = [
    {
      icon: <TeamOutlined className="text-3xl text-blue-500" />,
      title: "Gestion RH Complète",
      description: "Gérez vos ressources humaines de A à Z avec des outils intégrés et automatisés."
    },
    {
      icon: <BookOutlined className="text-3xl text-green-500" />,
      title: "Formation & Développement",
      description: "Planifiez, organisez et suivez les formations de vos équipes efficacement."
    },
    {
      icon: <BarChartOutlined className="text-3xl text-purple-500" />,
      title: "Analytics & Rapports",
      description: "Analysez les performances et générez des rapports détaillés en temps réel."
    },
    {
      icon: <RocketOutlined className="text-3xl text-orange-500" />,
      title: "Performance & Objectifs",
      description: "Définissez et suivez les objectifs individuels et d'équipe."
    }
  ]

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Decorative background */}
      <img src="/dots-pattern.png" alt="" aria-hidden="true" className="pointer-events-none select-none absolute -left-10 top-10 w-[300px] opacity-20 hidden md:block" />
      <img src="/abstract-geometric-pattern.png" alt="" aria-hidden="true" className="pointer-events-none select-none absolute -right-10 bottom-0 w-[280px] opacity-10 hidden lg:block" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title level={2} className="text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités principales
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez comment EHC SIRH peut transformer votre gestion des ressources humaines
          </Paragraph>
          <div className="mt-10 hidden lg:block">
            <img src="/images/catalog-interface.png" alt="Interface de gestion" className="mx-auto rounded-2xl shadow-2xl ring-1 ring-gray-900/10" />
          </div>
        </motion.div>

        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} lg={12} key={index}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  bodyStyle={{ padding: '2rem' }}
                >
                  <div className="text-center">
                    <motion.div 
                      className="mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <Title level={3} className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </Title>
                    <Text className="text-gray-600">{feature.description}</Text>
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

export default FeaturesSection
