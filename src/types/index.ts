// Types pour l'authentification
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  organizationId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UserRole {
  id: string
  name: "ADMIN" | "RRH" | "RF" | "MANAGER" | "EMPLOYEE" | "TRAINER"
  permissions: Permission[]
}

export interface Permission {
  id: string
  name: string
  resource: string
  action: "CREATE" | "READ" | "UPDATE" | "DELETE"
}

// Types pour l'organisation
export interface Organization {
  id: string
  name: string
  description?: string
  structure: OrganizationNode[]
  createdAt: string
  updatedAt: string
}

export interface OrganizationNode {
  id: string
  name: string
  parentId?: string
  managerId?: string
  employees: User[]
  children: OrganizationNode[]
}

// Types pour le budget
export interface Budget {
  id: string
  name: string
  organizationId: string
  totalAmount: number
  usedAmount: number
  remainingAmount: number
  period: BudgetPeriod
  startDate: string
  endDate: string
  status: "ACTIVE" | "EXPIRED" | "SUSPENDED"
  allocations: BudgetAllocation[]
  alerts: BudgetAlert[]
  createdAt: string
  updatedAt: string
}

export interface BudgetPeriod {
  type: "MONTHLY" | "QUARTERLY" | "YEARLY"
  frequency: number
}

export interface BudgetAllocation {
  id: string
  budgetId: string
  departmentId: string
  allocatedAmount: number
  usedAmount: number
  description?: string
}

export interface BudgetAlert {
  id: string
  budgetId: string
  threshold: number
  type: "WARNING" | "CRITICAL"
  isTriggered: boolean
  message: string
  createdAt: string
}

// Types pour le catalogue de formation
export interface TrainingCatalog {
  id: string
  title: string
  description: string
  category: TrainingCategory
  duration: number // en heures
  maxParticipants: number
  prerequisites?: string[]
  objectives: string[]
  content: string
  trainer?: Trainer
  price: number
  isActive: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface TrainingCategory {
  id: string
  name: string
  description?: string
  color: string
}

export interface Trainer {
  id: string
  firstName: string
  lastName: string
  email: string
  specialties: string[]
  bio?: string
  rating: number
  isExternal: boolean
}

// Types pour le calendrier et les sessions
export interface TrainingSession {
  id: string
  trainingId: string
  training: TrainingCatalog
  title: string
  startDate: string
  endDate: string
  location: string
  maxParticipants: number
  currentParticipants: number
  status: "PLANNED" | "ONGOING" | "COMPLETED" | "CANCELLED"
  trainer?: Trainer
  participants: Participant[]
  waitingList: Participant[]
  budget?: {
    budgetId: string
    cost: number
  }
  createdAt: string
  updatedAt: string
}

export interface Participant {
  id: string
  userId: string
  user: User
  sessionId: string
  status: "REGISTERED" | "CONFIRMED" | "ATTENDED" | "ABSENT" | "CANCELLED"
  registrationDate: string
  validationStatus: "PENDING" | "APPROVED" | "REJECTED"
  validatedBy?: {
    managerId?: string
    rfId?: string
    rrhId?: string
  }
  feedback?: ParticipantFeedback
}

export interface ParticipantFeedback {
  id: string
  participantId: string
  rating: number
  comment?: string
  recommendations?: string
  createdAt: string
}

// Types pour les demandes non planifiées
export interface TrainingRequest {
  id: string
  requesterId: string
  requester: User
  trainingTitle: string
  description: string
  justification: string
  urgency: "LOW" | "MEDIUM" | "HIGH"
  estimatedCost?: number
  preferredDates: string[]
  status: "PENDING" | "APPROVED" | "REJECTED" | "IN_PROGRESS" | "COMPLETED"
  validationWorkflow: ValidationStep[]
  createdAt: string
  updatedAt: string
}

export interface ValidationStep {
  id: string
  stepOrder: number
  validatorRole: "MANAGER" | "RF" | "RRH"
  validatorId?: string
  validator?: User
  status: "PENDING" | "APPROVED" | "REJECTED"
  comment?: string
  validatedAt?: string
}

// Types pour le reporting
export interface Report {
  id: string
  title: string
  type: "BUDGET" | "TRAINING" | "PARTICIPATION" | "PERFORMANCE"
  organizationId: string
  filters: ReportFilters
  data: any
  generatedAt: string
  generatedBy: string
}

export interface ReportFilters {
  dateRange: {
    startDate: string
    endDate: string
  }
  departments?: string[]
  trainingCategories?: string[]
  userRoles?: string[]
  budgetIds?: string[]
}

// Types pour les API responses
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Types pour les formulaires
export interface LoginForm {
  email: string
  password: string
  rememberMe?: boolean
}

export interface BudgetForm {
  name: string
  totalAmount: number
  period: BudgetPeriod
  startDate: string
  endDate: string
  allocations: Omit<BudgetAllocation, "id" | "budgetId" | "usedAmount">[]
}

export interface TrainingForm {
  title: string
  description: string
  categoryId: string
  duration: number
  maxParticipants: number
  prerequisites: string[]
  objectives: string[]
  content: string
  trainerId?: string
  price: number
  tags: string[]
}

export interface SessionForm {
  trainingId: string
  title: string
  startDate: string
  endDate: string
  location: string
  maxParticipants: number
  trainerId?: string
  budgetId?: string
}
