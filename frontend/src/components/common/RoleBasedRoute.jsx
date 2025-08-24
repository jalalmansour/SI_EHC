import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser, selectIsAuthenticated } from '../../redux/slices/authSlice'
import { validateUserAccess, getRoleDashboard } from '../../utils/roleUtils'

const RoleBasedRoute = ({ children, requiredRole = null }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
      return
    }

    // If no user data, redirect to login
    if (!user) {
      navigate('/login', { replace: true })
      return
    }

    // Validate user access to current path
    const redirectPath = validateUserAccess(user, location.pathname)
    if (redirectPath) {
      navigate(redirectPath, { replace: true })
      return
    }

    // If specific role is required, check if user has that role
    if (requiredRole && user.role !== requiredRole) {
      const userDashboard = getRoleDashboard(user.role)
      navigate(userDashboard, { replace: true })
      return
    }
  }, [user, isAuthenticated, location.pathname, navigate, requiredRole])

  // Show loading while checking authentication
  if (!isAuthenticated || !user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div className="ant-spin ant-spin-lg ant-spin-spinning">
          <span className="ant-spin-dot ant-spin-dot-spin">
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
          </span>
        </div>
        <div>Vérification des permissions...</div>
      </div>
    )
  }

  return children
}

export default RoleBasedRoute
