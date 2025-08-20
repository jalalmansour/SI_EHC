import { Typography, Card } from 'antd'
import { TeamOutlined, BookOutlined, BarChartOutlined, RocketOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Paragraph, Text } = Typography

const cards = [
  { icon: <TeamOutlined className="text-3xl text-blue-500" />, title: 'Gestion RH Complète', body: 'Gérez vos ressources humaines de A à Z avec des outils intégrés et automatisés.' },
  { icon: <BookOutlined className="text-3xl text-green-500" />, title: 'Formation & Développement', body: 'Planifiez et suivez les formations de vos équipes.' },
  { icon: <BarChartOutlined className="text-3xl text-purple-500" />, title: 'Analytics & Rapports', body: 'Analysez les performances et générez des rapports détaillés.' },
  { icon: <RocketOutlined className="text-3xl text-orange-500" />, title: 'Performance & Objectifs', body: 'Définissez et suivez les objectifs individuels et d’équipe.' },
]

const FeatureGrid = () => (
  <div className="relative">
    <img src="/dots-pattern.png" alt="" aria-hidden className="pointer-events-none select-none absolute -left-10 top-10 w-[300px] opacity-20 hidden md:block" />
    <img src="/abstract-geometric-pattern.png" alt="" aria-hidden className="pointer-events-none select-none absolute -right-10 bottom-0 w-[280px] opacity-10 hidden lg:block" />
    <motion.div className="text-center mb-12" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <Title level={2} className="text-4xl font-bold text-gray-900 mb-4">Fonctionnalités principales</Title>
      <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">Découvrez comment EHC SIRH transforme votre gestion RH</Paragraph>
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {cards.map((c, i) => (
        <motion.div key={i} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true }}>
          <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <div className="text-center p-8">
              <div className="mb-4">{c.icon}</div>
              <Title level={3} className="text-xl font-semibold text-gray-900 mb-3">{c.title}</Title>
              <Text className="text-gray-600">{c.body}</Text>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
    <div className="mt-10 hidden lg:block">
      <img src="/images/catalog-interface.png" alt="Interface de gestion" className="mx-auto rounded-2xl shadow-2xl ring-1 ring-gray-900/10" />
    </div>
  </div>
)

export default FeatureGrid


