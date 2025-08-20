import { Typography } from 'antd'
import { motion } from 'framer-motion'

const { Title, Paragraph } = Typography

const CallToAction = () => (
  <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 text-center text-white shadow-xl">
    <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <Title level={2} className="text-4xl md:text-5xl font-bold text-white mb-4">Prêt à transformer votre Gestion RH ?</Title>
      <Paragraph className="text-blue-100 text-lg mb-8">Commencez votre essai gratuit aujourd'hui et découvrez la différence.</Paragraph>
      <img src="/training-dashboard-analytics.png" alt="Analytics" className="mt-10 rounded-xl w-full max-w-3xl mx-auto object-cover shadow-2xl ring-1 ring-white/20" />
    </motion.div>
  </div>
)

export default CallToAction


