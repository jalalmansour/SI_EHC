import React, { createContext, useContext, useState, useCallback } from 'react'
import { notification } from 'antd'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = 'info', description = '', duration = 4.5) => {
    const id = Date.now()
    const newNotification = {
      id,
      message,
      type,
      description,
      duration
    }

    setNotifications(prev => [...prev, newNotification])

    // Show Ant Design notification
    notification[type]({
      message,
      description,
      duration,
      placement: 'topRight'
    })

    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const success = useCallback((message, description = '') => {
    return addNotification(message, 'success', description)
  }, [addNotification])

  const error = useCallback((message, description = '') => {
    return addNotification(message, 'error', description)
  }, [addNotification])

  const warning = useCallback((message, description = '') => {
    return addNotification(message, 'warning', description)
  }, [addNotification])

  const info = useCallback((message, description = '') => {
    return addNotification(message, 'info', description)
  }, [addNotification])

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export default NotificationContext
