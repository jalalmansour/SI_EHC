import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

const Hero = ({ onShowSignup, onShowLogin }) => {
  return (
    <div className="relative overflow-hidden">
      <img src="/modern-training-dashboard.png" alt="" aria-hidden className="pointer-events-none select-none absolute -right-20 top-0 w-[720px] opacity-10 hidden lg:block" />
      <div className="text-center">
        <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Transformez votre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gestion RH</span>
        </motion.h1>
        <motion.p initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          EHC SIRH modernise vos processus RH avec une plateforme élégante, performante et facile à adopter.
        </motion.p>
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="large" type="primary" onClick={onShowSignup} className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 h-12 px-8 text-lg">
            Commencer gratuitement
            <ArrowRightOutlined className="ml-2" />
          </Button>
          <Button size="large" onClick={onShowLogin} className="h-12 px-8 text-lg border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600">
            Se connecter
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero


