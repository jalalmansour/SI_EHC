import { Typography, Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Paragraph } = Typography

const CallToAction = ({ onShowSignup, onShowLogin }) => (
  <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 text-center text-white shadow-xl">
    <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <Title level={2} className="text-4xl md:text-5xl font-bold text-white mb-4">Prêt à transformer votre Gestion RH ?</Title>
      <Paragraph className="text-blue-100 text-lg mb-8">Commencez votre essai gratuit aujourd'hui et découvrez la différence.</Paragraph>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="large" type="primary" onClick={onShowSignup} className="bg-white text-blue-600 border-0 hover:bg-gray-100 h-12 px-8 text-lg font-semibold">
          Commencer gratuitement
          <ArrowRightOutlined className="ml-2" />
        </Button>
        <Button size="large" onClick={onShowLogin} className="h-12 px-8 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-600">Se connecter</Button>
      </div>
      <img src="/training-dashboard-analytics.png" alt="Analytics" className="mt-10 rounded-xl w-full max-w-3xl mx-auto object-cover shadow-2xl ring-1 ring-white/20" />
    </motion.div>
  </div>
)

export default CallToAction


