import { Typography } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Paragraph, Text } = Typography

const items = [
  'Interface intuitive et moderne',
  'Sécurité des données certifiée',
  'Support technique 24/7',
  'Intégration facile avec vos outils existants',
  'Mise à jour automatique des fonctionnalités',
  'Conformité RGPD et normes françaises',
]

const Benefits = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="space-y-4">
      {items.map((t, i) => (
        <motion.div key={i} className="flex items-center" initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
          <CheckCircleOutlined className="text-green-500 text-xl mr-3" />
          <Text className="text-gray-700 text-lg">{t}</Text>
        </motion.div>
      ))}
    </div>
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8">
      <img src="/training-dashboard-analytics.png" alt="Analytics" className="rounded-xl w-full h-auto object-cover shadow-xl ring-1 ring-white/30" />
    </div>
  </div>
)

export default Benefits


