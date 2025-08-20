import { Button } from "antd"
import { motion } from "framer-motion"

const Header = ({ onShowLogin, onShowSignup }) => {
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
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              type="text" 
              onClick={onShowLogin}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Connexion
            </Button>
            <Button 
              type="primary" 
              onClick={onShowSignup}
              className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Inscription
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
