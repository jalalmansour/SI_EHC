import { authService } from "../services/authService"

// Constantes pour les rôles
export const ROLES = {
  ADMIN: "ADMIN",
  RRH: "RRH",
  RF: "RF",
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
  TRAINER: "TRAINER",
}

// Constantes pour les permissions
export const PERMISSIONS = {
  BUDGET: {
    CREATE: { resource: "budget", action: "CREATE" },
    READ: { resource: "budget", action: "READ" },
    UPDATE: { resource: "budget", action: "UPDATE" },
    DELETE: { resource: "budget", action: "DELETE" },
  },
  TRAINING: {
    CREATE: { resource: "training", action: "CREATE" },
    READ: { resource: "training", action: "READ" },
    UPDATE: { resource: "training", action: "UPDATE" },
    DELETE: { resource: "training", action: "DELETE" },
  },
  USER: {
    CREATE: { resource: "user", action: "CREATE" },
    READ: { resource: "user", action: "READ" },
    UPDATE: { resource: "user", action: "UPDATE" },
    DELETE: { resource: "user", action: "DELETE" },
  },
  REPORT: {
    CREATE: { resource: "report", action: "CREATE" },
    READ: { resource: "report", action: "READ" },
    EXPORT: { resource: "report", action: "EXPORT" },
  },
}

// Hiérarchie des rôles (du plus élevé au plus bas)
export const ROLE_HIERARCHY = [ROLES.ADMIN, ROLES.RRH, ROLES.RF, ROLES.MANAGER, ROLES.EMPLOYEE, ROLES.TRAINER]

// Utilitaires d'authentification
export const authUtils = {
  // Vérifier si l'utilisateur a un rôle spécifique
  hasRole: (user, role) => {
    if (!user || !user.role) return false
    return user.role.name === role
  },

  // Vérifier si l'utilisateur a l'un des rôles spécifiés
  hasAnyRole: (user, roles) => {
    if (!user || !user.role || !Array.isArray(roles)) return false
    return roles.includes(user.role.name)
  },

  // Vérifier si l'utilisateur a un rôle supérieur ou égal
  hasRoleOrHigher: (user, role) => {
    if (!user || !user.role) return false
    const userRoleIndex = ROLE_HIERARCHY.indexOf(user.role.name)
    const requiredRoleIndex = ROLE_HIERARCHY.indexOf(role)
    return userRoleIndex !== -1 && requiredRoleIndex !== -1 && userRoleIndex <= requiredRoleIndex
  },

  // Vérifier si l'utilisateur a une permission spécifique
  hasPermission: (user, permission) => {
    if (!user || !user.role || !user.role.permissions) return false
    return authService.hasPermission(user.role.permissions, permission)
  },

  // Vérifier si l'utilisateur a toutes les permissions spécifiées
  hasAllPermissions: (user, permissions) => {
    if (!user || !user.role || !user.role.permissions || !Array.isArray(permissions)) return false
    return permissions.every((permission) => authService.hasPermission(user.role.permissions, permission))
  },

  // Vérifier si l'utilisateur a au moins une des permissions spécifiées
  hasAnyPermission: (user, permissions) => {
    if (!user || !user.role || !user.role.permissions || !Array.isArray(permissions)) return false
    return permissions.some((permission) => authService.hasPermission(user.role.permissions, permission))
  },

  // Vérifier si l'utilisateur peut accéder à une ressource
  canAccess: (user, resource, action) => {
    return authUtils.hasPermission(user, { resource, action })
  },

  // Vérifier si l'utilisateur peut modifier une ressource qui lui appartient
  canModifyOwn: (user, resourceOwnerId) => {
    return user && user.id === resourceOwnerId
  },

  // Vérifier si l'utilisateur peut voir les données d'un département
  canViewDepartment: (user, departmentId) => {
    if (!user) return false

    // Admin et RRH peuvent voir tous les départements
    if (authUtils.hasAnyRole(user, [ROLES.ADMIN, ROLES.RRH])) return true

    // RF peut voir tous les départements pour la formation
    if (authUtils.hasRole(user, ROLES.RF)) return true

    // Manager peut voir son département
    if (authUtils.hasRole(user, ROLES.MANAGER)) {
      return user.departmentId === departmentId
    }

    // Employee peut voir son département
    if (authUtils.hasRole(user, ROLES.EMPLOYEE)) {
      return user.departmentId === departmentId
    }

    return false
  },

  // Obtenir les actions autorisées pour une ressource
  getAllowedActions: (user, resource) => {
    if (!user || !user.role || !user.role.permissions) return []

    return user.role.permissions
      .filter((permission) => permission.resource === resource)
      .map((permission) => permission.action)
  },

  // Vérifier si le token est proche de l'expiration (dans les 5 minutes)
  isTokenNearExpiry: (token) => {
    if (!token) return true

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const expiryTime = payload.exp * 1000
      const currentTime = Date.now()
      const fiveMinutes = 5 * 60 * 1000

      return expiryTime - currentTime < fiveMinutes
    } catch (error) {
      return true
    }
  },

  // Formater le nom complet de l'utilisateur
  getFullName: (user) => {
    if (!user) return "Utilisateur inconnu"
    return `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
  },

  // Obtenir le libellé du rôle en français
  getRoleLabel: (role) => {
    const roleLabels = {
      [ROLES.ADMIN]: "Administrateur",
      [ROLES.RRH]: "Responsable RH",
      [ROLES.RF]: "Responsable Formation",
      [ROLES.MANAGER]: "Manager",
      [ROLES.EMPLOYEE]: "Employé",
      [ROLES.TRAINER]: "Formateur",
    }
    return roleLabels[role] || role
  },

  // Vérifier si l'utilisateur peut valider une demande
  canValidateRequest: (user, request) => {
    if (!user || !request) return false

    // Admin peut tout valider
    if (authUtils.hasRole(user, ROLES.ADMIN)) return true

    // RRH peut valider toutes les demandes
    if (authUtils.hasRole(user, ROLES.RRH)) return true

    // RF peut valider les demandes de formation
    if (authUtils.hasRole(user, ROLES.RF) && request.type === "TRAINING") return true

    // Manager peut valider les demandes de son équipe
    if (authUtils.hasRole(user, ROLES.MANAGER)) {
      return request.requester && request.requester.managerId === user.id
    }

    return false
  },
}

export default authUtils
