import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuthenticated } from '@/redux/slices/authSlice.js'

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default memo(ProtectedRoute)
