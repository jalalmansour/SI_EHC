import moment from "moment"

// Configuration des politiques de mot de passe
export const PASSWORD_POLICIES = {
  minLength: 12,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  maxConsecutiveChars: 3,
  maxRepeatingChars: 3,
  preventCommonPasswords: true,
  preventUserInfo: true,
  historyCount: 12, // Nombre de mots de passe précédents à retenir
  expirationDays: 90,
  warningDays: 14,
  maxFailedAttempts: 5,
  lockoutDuration: 30, // minutes
}

// Liste des mots de passe communs à éviter
const COMMON_PASSWORDS = [
  "password",
  "password123",
  "123456",
  "123456789",
  "qwerty",
  "abc123",
  "password1",
  "admin",
  "letmein",
  "welcome",
  "monkey",
  "1234567890",
  "azerty",
  "motdepasse",
  "admin123",
  "root",
  "toor",
  "pass",
  "test",
  "user",
  "guest",
  "demo",
  "temp",
  "temporary",
  "changeme",
]

// Caractères spéciaux autorisés
const SPECIAL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?"

export class PasswordValidator {
  constructor(policies = PASSWORD_POLICIES) {
    this.policies = policies
  }

  // Validation complète du mot de passe
  validatePassword(password, userInfo = {}, passwordHistory = []) {
    const results = {
      isValid: true,
      score: 0,
      strength: "weak",
      errors: [],
      warnings: [],
      suggestions: [],
    }

    if (!password) {
      results.isValid = false
      results.errors.push("Le mot de passe est requis")
      return results
    }

    // Vérification de la longueur
    if (password.length < this.policies.minLength) {
      results.isValid = false
      results.errors.push(`Le mot de passe doit contenir au moins ${this.policies.minLength} caractères`)
    }

    if (password.length > this.policies.maxLength) {
      results.isValid = false
      results.errors.push(`Le mot de passe ne peut pas dépasser ${this.policies.maxLength} caractères`)
    }

    // Vérification des caractères requis
    if (this.policies.requireUppercase && !/[A-Z]/.test(password)) {
      results.isValid = false
      results.errors.push("Le mot de passe doit contenir au moins une lettre majuscule")
    }

    if (this.policies.requireLowercase && !/[a-z]/.test(password)) {
      results.isValid = false
      results.errors.push("Le mot de passe doit contenir au moins une lettre minuscule")
    }

    if (this.policies.requireNumbers && !/\d/.test(password)) {
      results.isValid = false
      results.errors.push("Le mot de passe doit contenir au moins un chiffre")
    }

    if (
      this.policies.requireSpecialChars &&
      !new RegExp(`[${SPECIAL_CHARS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]`).test(password)
    ) {
      results.isValid = false
      results.errors.push("Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*...)")
    }

    // Vérification des caractères consécutifs
    if (this.hasConsecutiveChars(password, this.policies.maxConsecutiveChars)) {
      results.isValid = false
      results.errors.push(
        `Le mot de passe ne peut pas contenir plus de ${this.policies.maxConsecutiveChars} caractères consécutifs identiques`,
      )
    }

    // Vérification des caractères répétitifs
    if (this.hasRepeatingChars(password, this.policies.maxRepeatingChars)) {
      results.warnings.push(`Évitez les caractères qui se répètent plus de ${this.policies.maxRepeatingChars} fois`)
    }

    // Vérification des mots de passe communs
    if (this.policies.preventCommonPasswords && this.isCommonPassword(password)) {
      results.isValid = false
      results.errors.push("Ce mot de passe est trop commun et facilement devinable")
    }

    // Vérification des informations utilisateur
    if (this.policies.preventUserInfo && this.containsUserInfo(password, userInfo)) {
      results.isValid = false
      results.errors.push("Le mot de passe ne doit pas contenir vos informations personnelles")
    }

    // Vérification de l'historique
    if (this.isInHistory(password, passwordHistory)) {
      results.isValid = false
      results.errors.push(
        `Vous ne pouvez pas réutiliser l'un de vos ${this.policies.historyCount} derniers mots de passe`,
      )
    }

    // Calcul du score et de la force
    results.score = this.calculateScore(password)
    results.strength = this.getStrengthLevel(results.score)

    // Suggestions d'amélioration
    results.suggestions = this.generateSuggestions(password, results)

    return results
  }

  // Vérification des caractères consécutifs
  hasConsecutiveChars(password, maxConsecutive) {
    for (let i = 0; i <= password.length - maxConsecutive; i++) {
      const char = password[i]
      let consecutive = 1

      for (let j = i + 1; j < password.length && password[j] === char; j++) {
        consecutive++
        if (consecutive > maxConsecutive) {
          return true
        }
      }
    }
    return false
  }

  // Vérification des caractères répétitifs
  hasRepeatingChars(password, maxRepeating) {
    const charCount = {}
    for (const char of password) {
      charCount[char] = (charCount[char] || 0) + 1
      if (charCount[char] > maxRepeating) {
        return true
      }
    }
    return false
  }

  // Vérification des mots de passe communs
  isCommonPassword(password) {
    const lowerPassword = password.toLowerCase()
    return COMMON_PASSWORDS.some(
      (common) => lowerPassword.includes(common) || this.levenshteinDistance(lowerPassword, common) <= 2,
    )
  }

  // Vérification des informations utilisateur
  containsUserInfo(password, userInfo) {
    const lowerPassword = password.toLowerCase()
    const infoFields = [
      userInfo.firstName,
      userInfo.lastName,
      userInfo.email?.split("@")[0],
      userInfo.username,
      userInfo.birthDate,
      userInfo.phone,
    ].filter(Boolean)

    return infoFields.some((info) => {
      const lowerInfo = info.toString().toLowerCase()
      return lowerInfo.length >= 3 && lowerPassword.includes(lowerInfo)
    })
  }

  // Vérification de l'historique des mots de passe
  isInHistory(password, passwordHistory) {
    return passwordHistory.some((oldPassword) => this.comparePasswords(password, oldPassword))
  }

  // Comparaison sécurisée des mots de passe (simulation du hachage)
  comparePasswords(password1, password2) {
    // En production, ceci devrait comparer les hachages
    return password1 === password2
  }

  // Calcul du score de force du mot de passe
  calculateScore(password) {
    let score = 0

    // Longueur
    score += Math.min(password.length * 2, 50)

    // Variété de caractères
    if (/[a-z]/.test(password)) score += 5
    if (/[A-Z]/.test(password)) score += 5
    if (/\d/.test(password)) score += 5
    if (new RegExp(`[${SPECIAL_CHARS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]`).test(password)) score += 10

    // Bonus pour la complexité
    const uniqueChars = new Set(password).size
    score += uniqueChars * 2

    // Bonus pour les patterns complexes
    if (password.length >= 16) score += 10
    if (uniqueChars >= password.length * 0.7) score += 10

    // Pénalités
    if (this.hasRepeatingChars(password, 2)) score -= 10
    if (/(.)\1{2,}/.test(password)) score -= 15 // 3+ caractères identiques consécutifs
    if (/^[a-zA-Z]+$/.test(password)) score -= 10 // Que des lettres
    if (/^\d+$/.test(password)) score -= 20 // Que des chiffres

    return Math.max(0, Math.min(100, score))
  }

  // Détermination du niveau de force
  getStrengthLevel(score) {
    if (score >= 80) return "very-strong"
    if (score >= 60) return "strong"
    if (score >= 40) return "medium"
    if (score >= 20) return "weak"
    return "very-weak"
  }

  // Génération de suggestions d'amélioration
  generateSuggestions(password, results) {
    const suggestions = []

    if (password.length < 16) {
      suggestions.push("Utilisez au moins 16 caractères pour une sécurité optimale")
    }

    if (!/[A-Z]/.test(password)) {
      suggestions.push("Ajoutez des lettres majuscules")
    }

    if (!/[a-z]/.test(password)) {
      suggestions.push("Ajoutez des lettres minuscules")
    }

    if (!/\d/.test(password)) {
      suggestions.push("Ajoutez des chiffres")
    }

    if (!new RegExp(`[${SPECIAL_CHARS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]`).test(password)) {
      suggestions.push("Ajoutez des caractères spéciaux (!@#$%^&*...)")
    }

    if (results.score < 60) {
      suggestions.push("Mélangez différents types de caractères")
      suggestions.push("Évitez les mots du dictionnaire")
      suggestions.push("Utilisez une phrase de passe avec des espaces")
    }

    return suggestions
  }

  // Distance de Levenshtein pour comparer la similarité
  levenshteinDistance(str1, str2) {
    const matrix = []

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        }
      }
    }

    return matrix[str2.length][str1.length]
  }

  // Vérification de l'expiration du mot de passe
  isPasswordExpired(lastChangeDate) {
    if (!lastChangeDate || !this.policies.expirationDays) return false

    const daysSinceChange = moment().diff(moment(lastChangeDate), "days")
    return daysSinceChange >= this.policies.expirationDays
  }

  // Vérification si le mot de passe expire bientôt
  isPasswordExpiringSoon(lastChangeDate) {
    if (!lastChangeDate || !this.policies.expirationDays || !this.policies.warningDays) return false

    const daysSinceChange = moment().diff(moment(lastChangeDate), "days")
    const daysUntilExpiration = this.policies.expirationDays - daysSinceChange

    return daysUntilExpiration <= this.policies.warningDays && daysUntilExpiration > 0
  }

  // Génération d'un mot de passe sécurisé
  generateSecurePassword(length = 16) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const specials = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let password = ""
    const allChars = lowercase + uppercase + numbers + specials

    // Garantir au moins un caractère de chaque type
    password += lowercase[Math.floor(Math.random() * lowercase.length)]
    password += uppercase[Math.floor(Math.random() * uppercase.length)]
    password += numbers[Math.floor(Math.random() * numbers.length)]
    password += specials[Math.floor(Math.random() * specials.length)]

    // Compléter avec des caractères aléatoires
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)]
    }

    // Mélanger le mot de passe
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
  }
}

// Instance par défaut
export const passwordValidator = new PasswordValidator()

// Utilitaires d'export
export const validatePassword = (password, userInfo, passwordHistory) =>
  passwordValidator.validatePassword(password, userInfo, passwordHistory)

export const generateSecurePassword = (length) => passwordValidator.generateSecurePassword(length)

export const isPasswordExpired = (lastChangeDate) => passwordValidator.isPasswordExpired(lastChangeDate)

export const isPasswordExpiringSoon = (lastChangeDate) => passwordValidator.isPasswordExpiringSoon(lastChangeDate)
