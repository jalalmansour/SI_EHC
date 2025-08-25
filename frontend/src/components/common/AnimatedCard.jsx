import React from 'react'
import { motion } from 'framer-motion'
import { Card } from 'antd'
import { cn } from '../../utils/theme'

const AnimatedCard = ({
  children,
  title,
  subtitle,
  icon,
  variant = 'default',
  hoverable = true,
  loading = false,
  className,
  style,
  onClick,
  ...props
}) => {
  const baseClasses = cn(
    'relative overflow-hidden transition-all duration-300',
    'border-0 shadow-sm hover:shadow-lg',
    'bg-white rounded-xl',
    'transform transition-transform duration-300',
    className
  )

  const variants = {
    default: cn(baseClasses, 'hover:shadow-xl hover:-translate-y-1'),
    elevated: cn(baseClasses, 'shadow-lg hover:shadow-2xl hover:-translate-y-2'),
    gradient: cn(baseClasses, 'bg-gradient-to-br from-blue-50 to-indigo-50'),
  }

  const cardClasses = cn(
    variants[variant],
    !hoverable && 'hover:shadow-sm hover:-translate-y-0'
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={hoverable ? { y: -4 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cardClasses}
        loading={loading}
        onClick={onClick}
        style={style}
        {...props}
      >
        {title && (
          <div className="flex items-center space-x-3 mb-4">
            {icon && <div className="text-blue-500">{icon}</div>}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
          </div>
        )}
        {children}
      </Card>
    </motion.div>
  )
}

export default AnimatedCard
