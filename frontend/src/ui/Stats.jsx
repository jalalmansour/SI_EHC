import { motion } from 'framer-motion'

const Stat = ({ value, label, className }) => (
  <div className={`text-center ${className || ''}`}>
    <div className="text-3xl font-bold mb-2">{value}</div>
    <div className="text-gray-600">{label}</div>
  </div>
)

const Stats = () => {
  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
      <Stat value={<span className="text-blue-600">500+</span>} label="Entreprises utilisatrices" />
      <Stat value={<span className="text-green-600">50K+</span>} label="Utilisateurs actifs" />
      <Stat value={<span className="text-purple-600">99.9%</span>} label="Disponibilité garantie" />
    </motion.div>
  )
}

export default Stats


