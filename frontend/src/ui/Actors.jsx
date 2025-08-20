import { Typography, Card } from 'antd'
import { UserOutlined, TeamOutlined, SettingOutlined, BookOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Paragraph, Text } = Typography

const ACTORS = [
  { icon: <UserOutlined className="text-2xl" />, title: 'Employés', body: 'Accédez à vos formations, suivez vos objectifs et gérez votre développement professionnel.', cover: '/placeholder.jpg', color: 'from-blue-500 to-blue-600' },
  { icon: <TeamOutlined className="text-2xl" />, title: 'Managers', body: 'Supervisez vos équipes, planifiez les formations et évaluez les performances.', cover: '/placeholder.jpg', color: 'from-green-500 to-green-600' },
  { icon: <SettingOutlined className="text-2xl" />, title: 'RH', body: 'Gérez le budget formation, planifiez les sessions et optimisez les ressources.', cover: '/placeholder.jpg', color: 'from-purple-500 to-purple-600' },
  { icon: <BookOutlined className="text-2xl" />, title: 'Formateurs', body: 'Créez des contenus, animez des sessions et suivez les progrès des participants.', cover: '/placeholder.jpg', color: 'from-orange-500 to-orange-600' },
]

const Actors = () => (
  <div className="relative">
    <img src="/placeholder.svg" alt="" aria-hidden className="pointer-events-none select-none absolute left-[-80px] bottom-[-80px] w-[300px] opacity-10 hidden md:block" />
    <motion.div className="text-center mb-12" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <Title level={2} className="text-4xl font-bold text-gray-900 mb-4">Pour tous les acteurs de l'entreprise</Title>
      <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">EHC SIRH s'adapte aux besoins de chaque utilisateur</Paragraph>
    </motion.div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {ACTORS.map((a, i) => (
        <motion.div key={i} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true }}>
          <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105" cover={<img src={a.cover} alt="" className="h-28 w-full object-cover" />}>
            <div className={`w-16 h-16 bg-gradient-to-r ${a.color} rounded-full flex items-center justify-center mx-auto -mt-10 shadow-lg`}>
              <span className="text-white">{a.icon}</span>
            </div>
            <div className="text-center p-6">
              <Title level={3} className="text-xl font-semibold text-gray-900 mb-3">{a.title}</Title>
              <Text className="text-gray-600">{a.body}</Text>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
)

export default Actors


