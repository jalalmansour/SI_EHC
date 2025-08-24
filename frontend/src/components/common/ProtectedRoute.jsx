import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuthenticated, selectUser } from '@/redux/slices/authSlice.js'

function ProtectedRoute({ children, allowedRoles }) {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    const userRole = user?.role
    const isAllowed = allowedRoles.includes(userRole)
    if (!isAllowed) {
      // Send to a safe default based on role
      const roleToPath = {
        admin: '/dashboard',
        superadmin: '/dashboard',
        rrh: '/dashboard',
        rf: '/dashboard',
        manager: '/dashboard',
        formateur: '/dashboard',
        employee: '/dashboard',
      }
      return <Navigate to={roleToPath[userRole] || '/'} replace />
    }
  }

  return children
}

export default memo(ProtectedRoute)
