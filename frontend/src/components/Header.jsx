import { motion } from "framer-motion"

const Header = () => {
  return (
    <motion.header 
      className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src="/frontend/public/logo.png" alt="EHC" className="h-10 w-auto mr-3 select-none" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">EHC SIRH</h1>
              <p className="text-sm text-gray-500">Système RH Intégré</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
