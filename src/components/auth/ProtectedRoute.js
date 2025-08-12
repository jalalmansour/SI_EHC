"use client"

import { useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Result, Button, Spin } from "antd"
import { getCurrentUserThunk, refreshTokenThunk } from "../../store/slices/authSlice"
import { authService } from "../../services/authService"

const ProtectedRoute = ({ children, requiredRoles = [], requiredPermissions = [], fallbackPath = "/login" }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { isAuthenticated, user, token, permissions, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token")

      if (storedToken && !authService.isTokenExpired(storedToken)) {
        if (!user) {
          // Token valide mais pas d'utilisateur, récupérer les infos
          dispatch(getCurrentUserThunk())
        }
      } else if (storedToken && authService.isTokenExpired(storedToken)) {
        // Token expiré, essayer de le rafraîchir
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
          try {
            await dispatch(refreshTokenThunk()).unwrap()
            dispatch(getCurrentUserThunk())
          } catch (error) {
            console.error("Token refresh failed:", error)
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
          }
        }
      }
    }

    initializeAuth()
  }, [dispatch, user, token])

  // Afficher le spinner pendant le chargement
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  // Rediriger vers la page de connexion si non authentifié
  if (!isAuthenticated || !user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />
  }

  // Vérifier les rôles requis
  if (requiredRoles.length > 0) {
    const hasRequiredRole = authService.hasRole(user.role, requiredRoles)
    if (!hasRequiredRole) {
      return (
        <Result
          status="403"
          title="403 - Accès refusé"
          subTitle={`Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette page. Rôles requis: ${requiredRoles.join(", ")}`}
          extra={
            <Button type="primary" onClick={() => window.history.back()}>
              Retour
            </Button>
          }
        />
      )
    }
  }

  // Vérifier les permissions requises
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every((permission) =>
      authService.hasPermission(permissions, permission),
    )

    if (!hasAllPermissions) {
      return (
        <Result
          status="403"
          title="403 - Permissions insuffisantes"
          subTitle="Vous n'avez pas les permissions nécessaires pour effectuer cette action."
          extra={
            <Button type="primary" onClick={() => window.history.back()}>
              Retour
            </Button>
          }
        />
      )
    }
  }

  return children
}

export default ProtectedRoute
