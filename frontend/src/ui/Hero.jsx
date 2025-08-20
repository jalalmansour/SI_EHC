import { motion } from 'framer-motion'

const Hero = () => {
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
      </div>
    </div>
  )
}

export default Hero


