import React from 'react'
import { motion } from 'framer-motion'
import { Button } from 'antd'
import { cn } from '../../utils/theme'

const AnimatedButton = ({
  children,
  variant = 'primary',
  size = 'middle',
  loading = false,
  disabled = false,
  icon,
  onClick,
  className,
  style,
  ...props
}) => {
  const baseClasses = cn(
    'relative overflow-hidden transition-all duration-300',
    'font-medium rounded-lg border-0',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'transform hover:scale-105 active:scale-95',
    className
  )

  const variants = {
    primary: cn(
      baseClasses,
      'bg-gradient-to-r from-blue-500 to-blue-600',
      'hover:from-blue-600 hover:to-blue-700',
      'text-white shadow-lg hover:shadow-xl',
      'focus:ring-blue-500'
    ),
    secondary: cn(
      baseClasses,
      'bg-gradient-to-r from-orange-500 to-orange-600',
      'hover:from-orange-600 hover:to-orange-700',
      'text-white shadow-lg hover:shadow-xl',
      'focus:ring-orange-500'
    ),
    success: cn(
      baseClasses,
      'bg-gradient-to-r from-green-500 to-green-600',
      'hover:from-green-600 hover:to-green-700',
      'text-white shadow-lg hover:shadow-xl',
      'focus:ring-green-500'
    ),
    danger: cn(
      baseClasses,
      'bg-gradient-to-r from-red-500 to-red-600',
      'hover:from-red-600 hover:to-red-700',
      'text-white shadow-lg hover:shadow-xl',
      'focus:ring-red-500'
    ),
    ghost: cn(
      baseClasses,
      'bg-transparent border border-gray-300',
      'hover:bg-gray-50 hover:border-gray-400',
      'text-gray-700 hover:text-gray-900',
      'focus:ring-gray-500'
    ),
    outline: cn(
      baseClasses,
      'bg-transparent border-2 border-blue-500',
      'hover:bg-blue-50 hover:border-blue-600',
      'text-blue-600 hover:text-blue-700',
      'focus:ring-blue-500'
    ),
  }

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    middle: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }

  const buttonClasses = cn(
    variants[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
  )

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <Button
        className={buttonClasses}
        loading={loading}
        disabled={disabled}
        icon={icon}
        onClick={onClick}
        style={style}
        {...props}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {children}
        </motion.span>
      </Button>
    </motion.div>
  )
}

export default AnimatedButton
