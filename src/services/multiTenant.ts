interface TenantConfig {
  id: string
  name: string
  domain: string
  subdomain: string
  branding: {
    primaryColor: string
    secondaryColor: string
    logo: string
    favicon: string
  }
  features: {
    analytics: boolean
    multiLanguage: boolean
    customBranding: boolean
    apiAccess: boolean
    sso: boolean
    advancedReporting: boolean
  }
  subscription: {
    plan: "starter" | "professional" | "enterprise"
    status: "active" | "suspended" | "cancelled"
    expiresAt: string
    maxUsers: number
    maxFormations: number
  }
  settings: {
    timezone: string
    language: string
    currency: string
    dateFormat: string
  }
}

class MultiTenantService {
  private currentTenant: TenantConfig | null = null
  private tenants: Map<string, TenantConfig> = new Map()

  constructor() {
    this.initializeTenants()
    this.detectCurrentTenant()
  }

  private initializeTenants() {
    // Configuration des tenants de démonstration
    const demoTenants: TenantConfig[] = [
      {
        id: "acme-corp",
        name: "ACME Corporation",
        domain: "acme.ingenia.com",
        subdomain: "acme",
        branding: {
          primaryColor: "#1890ff",
          secondaryColor: "#f0f2f5",
          logo: "/logos/acme-logo.png",
          favicon: "/favicons/acme-favicon.ico",
        },
        features: {
          analytics: true,
          multiLanguage: true,
          customBranding: true,
          apiAccess: true,
          sso: true,
          advancedReporting: true,
        },
        subscription: {
          plan: "enterprise",
          status: "active",
          expiresAt: "2025-12-31T23:59:59Z",
          maxUsers: 1000,
          maxFormations: -1, // illimité
        },
        settings: {
          timezone: "Europe/Paris",
          language: "fr",
          currency: "EUR",
          dateFormat: "DD/MM/YYYY",
        },
      },
      {
        id: "techno-soft",
        name: "TechnoSoft Solutions",
        domain: "techno.ingenia.com",
        subdomain: "techno",
        branding: {
          primaryColor: "#52c41a",
          secondaryColor: "#f6ffed",
          logo: "/logos/techno-logo.png",
          favicon: "/favicons/techno-favicon.ico",
        },
        features: {
          analytics: true,
          multiLanguage: false,
          customBranding: true,
          apiAccess: true,
          sso: false,
          advancedReporting: true,
        },
        subscription: {
          plan: "professional",
          status: "active",
          expiresAt: "2025-06-30T23:59:59Z",
          maxUsers: 500,
          maxFormations: 200,
        },
        settings: {
          timezone: "Europe/Paris",
          language: "fr",
          currency: "EUR",
          dateFormat: "DD/MM/YYYY",
        },
      },
      {
        id: "global-industries",
        name: "Global Industries",
        domain: "global.ingenia.com",
        subdomain: "global",
        branding: {
          primaryColor: "#722ed1",
          secondaryColor: "#f9f0ff",
          logo: "/logos/global-logo.png",
          favicon: "/favicons/global-favicon.ico",
        },
        features: {
          analytics: false,
          multiLanguage: false,
          customBranding: false,
          apiAccess: false,
          sso: false,
          advancedReporting: false,
        },
        subscription: {
          plan: "starter",
          status: "active",
          expiresAt: "2025-03-31T23:59:59Z",
          maxUsers: 50,
          maxFormations: 25,
        },
        settings: {
          timezone: "Europe/Paris",
          language: "fr",
          currency: "EUR",
          dateFormat: "DD/MM/YYYY",
        },
      },
    ]

    demoTenants.forEach((tenant) => {
      this.tenants.set(tenant.id, tenant)
    })
  }

  private detectCurrentTenant() {
    // Détection basée sur le sous-domaine ou domaine personnalisé
    const hostname = window.location.hostname

    // Vérifier les domaines personnalisés
    for (const [id, tenant] of this.tenants) {
      if (hostname === tenant.domain || hostname.startsWith(`${tenant.subdomain}.`)) {
        this.currentTenant = tenant
        this.applyTenantBranding(tenant)
        return
      }
    }

    // Fallback: utiliser le tenant par défaut ou détecter via localStorage
    const savedTenantId = localStorage.getItem("currentTenantId")
    if (savedTenantId && this.tenants.has(savedTenantId)) {
      this.currentTenant = this.tenants.get(savedTenantId)!
      this.applyTenantBranding(this.currentTenant)
    }
  }

  private applyTenantBranding(tenant: TenantConfig) {
    // Appliquer les couleurs du thème
    const root = document.documentElement
    root.style.setProperty("--primary-color", tenant.branding.primaryColor)
    root.style.setProperty("--secondary-color", tenant.branding.secondaryColor)

    // Changer le favicon
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    if (favicon) {
      favicon.href = tenant.branding.favicon
    }

    // Changer le titre de la page
    document.title = `${tenant.name} - INGÉNIA`
  }

  getCurrentTenant(): TenantConfig | null {
    return this.currentTenant
  }

  getAllTenants(): TenantConfig[] {
    return Array.from(this.tenants.values())
  }

  getTenantById(id: string): TenantConfig | null {
    return this.tenants.get(id) || null
  }

  switchTenant(tenantId: string): boolean {
    const tenant = this.tenants.get(tenantId)
    if (tenant) {
      this.currentTenant = tenant
      localStorage.setItem("currentTenantId", tenantId)
      this.applyTenantBranding(tenant)

      // Recharger la page pour appliquer tous les changements
      window.location.reload()
      return true
    }
    return false
  }

  hasFeature(feature: keyof TenantConfig["features"]): boolean {
    return this.currentTenant?.features[feature] || false
  }

  isFeatureEnabled(feature: keyof TenantConfig["features"]): boolean {
    if (!this.currentTenant) return false

    // Vérifier si la fonctionnalité est activée ET si l'abonnement le permet
    const hasFeature = this.currentTenant.features[feature]
    const isSubscriptionActive = this.currentTenant.subscription.status === "active"
    const isNotExpired = new Date(this.currentTenant.subscription.expiresAt) > new Date()

    return hasFeature && isSubscriptionActive && isNotExpired
  }

  getSubscriptionLimits() {
    if (!this.currentTenant) return null

    return {
      maxUsers: this.currentTenant.subscription.maxUsers,
      maxFormations: this.currentTenant.subscription.maxFormations,
      plan: this.currentTenant.subscription.plan,
    }
  }

  canCreateUser(): boolean {
    if (!this.currentTenant) return false

    const limits = this.getSubscriptionLimits()
    if (!limits || limits.maxUsers === -1) return true

    // Ici, vous devriez vérifier le nombre actuel d'utilisateurs
    // Pour la démo, on retourne toujours true
    return true
  }

  canCreateFormation(): boolean {
    if (!this.currentTenant) return false

    const limits = this.getSubscriptionLimits()
    if (!limits || limits.maxFormations === -1) return true

    // Ici, vous devriez vérifier le nombre actuel de formations
    // Pour la démo, on retourne toujours true
    return true
  }

  getTenantSettings() {
    return (
      this.currentTenant?.settings || {
        timezone: "Europe/Paris",
        language: "fr",
        currency: "EUR",
        dateFormat: "DD/MM/YYYY",
      }
    )
  }

  updateTenantSettings(settings: Partial<TenantConfig["settings"]>) {
    if (this.currentTenant) {
      this.currentTenant.settings = {
        ...this.currentTenant.settings,
        ...settings,
      }

      // Sauvegarder les modifications (ici vous feriez un appel API)
      console.log("Paramètres du tenant mis à jour:", settings)
    }
  }

  // Méthodes pour la gestion des données isolées par tenant
  getApiEndpoint(path: string): string {
    const baseUrl = process.env.REACT_APP_API_URL || "https://api.ingenia.com"
    const tenantId = this.currentTenant?.id

    if (tenantId) {
      return `${baseUrl}/v1/tenants/${tenantId}${path}`
    }

    return `${baseUrl}/v1${path}`
  }

  getStorageKey(key: string): string {
    const tenantId = this.currentTenant?.id || "default"
    return `${tenantId}_${key}`
  }

  // Méthodes utilitaires pour les composants
  getBrandingColors() {
    return (
      this.currentTenant?.branding || {
        primaryColor: "#6C5CE7",
        secondaryColor: "#f5f5f5",
        logo: "/logo.png",
        favicon: "/favicon.ico",
      }
    )
  }

  formatCurrency(amount: number): string {
    const settings = this.getTenantSettings()
    return new Intl.NumberFormat(settings.language === "fr" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: settings.currency,
    }).format(amount)
  }

  formatDate(date: Date | string): string {
    const settings = this.getTenantSettings()
    const dateObj = typeof date === "string" ? new Date(date) : date

    const formatMap: Record<string, Intl.DateTimeFormatOptions> = {
      "DD/MM/YYYY": { day: "2-digit", month: "2-digit", year: "numeric" },
      "MM/DD/YYYY": { month: "2-digit", day: "2-digit", year: "numeric" },
      "YYYY-MM-DD": { year: "numeric", month: "2-digit", day: "2-digit" },
    }

    return dateObj.toLocaleDateString(
      settings.language === "fr" ? "fr-FR" : "en-US",
      formatMap[settings.dateFormat] || formatMap["DD/MM/YYYY"],
    )
  }
}

// Instance singleton
export const multiTenantService = new MultiTenantService()
export default multiTenantService
