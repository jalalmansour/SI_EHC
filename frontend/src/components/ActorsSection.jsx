import { Typography, Row, Col, Card, Avatar } from "antd"
import {
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  BookOutlined,
} from "@ant-design/icons"
import { motion } from "framer-motion"

const { Title, Paragraph, Text } = Typography

const ActorsSection = () => {
  const actors = [
    {
      icon: <UserOutlined className="text-2xl" />,
      title: "Employés",
      description: "Accédez à vos formations, suivez vos objectifs et gérez votre développement professionnel.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <TeamOutlined className="text-2xl" />,
      title: "Managers",
      description: "Supervisez vos équipes, planifiez les formations et évaluez les performances.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <SettingOutlined className="text-2xl" />,
      title: "RH",
      description: "Gérez le budget formation, planifiez les sessions et optimisez les ressources.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <BookOutlined className="text-2xl" />,
      title: "Formateurs",
      description: "Créez des contenus, animez des sessions et suivez les progrès des participants.",
      color: "from-orange-500 to-orange-600"
    }
  ]

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <img src="/placeholder.svg" alt="" aria-hidden="true" className="pointer-events-none select-none absolute left-[-80px] bottom-[-80px] w-[300px] opacity-10 hidden md:block" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title level={2} className="text-4xl font-bold text-gray-900 mb-4">
            Pour tous les acteurs de l'entreprise
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
            EHC SIRH s'adapte aux besoins de chaque utilisateur pour une expérience optimale
          </Paragraph>
        </motion.div>

        <Row gutter={[32, 32]}>
          {actors.map((actor, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:scale-105"
                  bodyStyle={{ padding: '2rem' }}
                  cover={<img src="/placeholder.jpg" alt="" className="h-28 w-full object-cover rounded-t-lg" />}
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${actor.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white">{actor.icon}</span>
                  </motion.div>
                  <Title level={3} className="text-xl font-semibold text-gray-900 mb-3">
                    {actor.title}
                  </Title>
                  <Text className="text-gray-600">{actor.description}</Text>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default ActorsSection
