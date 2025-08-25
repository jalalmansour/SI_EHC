import { Typography, Card, Avatar } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Paragraph, Text } = Typography

const DATA = [
  { name: 'Marie Dubois', role: 'DRH', company: 'TechCorp France', avatar: 'MD', rating: 5, content: "EHC SIRH a révolutionné notre gestion RH." },
  { name: 'Pierre Martin', role: 'Manager Formation', company: 'InnovSoft', avatar: 'PM', rating: 5, content: "La gestion des formations est maintenant un jeu d'enfant." },
  { name: 'Sophie Bernard', role: 'Responsable RH', company: 'GreenEnergy', avatar: 'SB', rating: 5, content: "Excellent support client et une plateforme qui évolue constamment." },
]

const Testimonials = () => (
  <div>
    <motion.div className="text-center mb-12" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <Title level={2} className="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</Title>
      <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">Découvrez les témoignages de nos utilisateurs satisfaits</Paragraph>
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {DATA.map((t, i) => (
        <motion.div key={i} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: i * 0.2 }} viewport={{ once: true }}>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105" cover={<img src="/placeholder-user.jpg" alt="Avis client" className="h-40 w-full object-cover" />}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(t.rating)].map((_, i) => (<StarFilled key={i} className="text-yellow-400 text-lg" />))}
              </div>
              <Paragraph className="text-gray-700 mb-6 italic text-lg">"{t.content}"</Paragraph>
              <div className="flex items-center">
                <Avatar size={48} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold mr-3">{t.avatar}</Avatar>
                <div>
                  <Text className="font-semibold text-gray-900 block">{t.name}</Text>
                  <Text className="text-gray-600 text-sm">{t.role} chez {t.company}</Text>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
)

export default Testimonials


