export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "RRH" | "RF" | "MANAGER" | "EMPLOYEE"
  department: string
  position: string
  avatar?: string
  competencies?: Competency[]
}

export interface Competency {
  id: string
  name: string
  currentLevel: number
  targetLevel: number
  lastEvaluation: string
  evaluationType: "hot" | "cold" | "competency"
  trainingId?: string
}

export interface Budget {
  id: string
  name: string
  period: "ANNUAL" | "BIENNIAL" | "TRIENNIAL" | "QUADRENNIAL" | "QUINQUENNIAL"
  startDate: string
  endDate: string
  initialAmount: number
  currency: "DHS" | "EUR" | "USD"
  extensions: BudgetExtension[]
  cuts: BudgetCut[]
  consumed: number
  alertThresholds: number[]
  status: "ACTIVE" | "COMPLETED" | "SUSPENDED"
}

export interface BudgetExtension {
  id: string
  amount: number
  reason: string
  approvedBy: string
  approvedAt: string
}

export interface BudgetCut {
  id: string
  amount: number
  reason: string
  approvedBy: string
  approvedAt: string
}

export interface TrainingCatalogItem {
  id: string
  title: string
  description: string
  category: string
  type: "PLANNED" | "UNPLANNED"
  duration: number
  maxParticipants: number
  cost: number
  provider: string
  isExternal: boolean
  prerequisites: string[]
  objectives: string[]
  targetAudience: string[]
  skills: string[]
  status: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED"
  createdBy: string
  approvedBy?: string
}

export interface TrainingSession {
  id: string
  catalogItemId: string
  title: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  location: string
  trainer: string
  maxParticipants: number
  registeredParticipants: string[]
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "POSTPONED"
  description?: string
  materials?: string[]
}

export interface Evaluation {
  id: string
  trainingId: string
  participantId: string
  type: "PRELIMINARY" | "HOT" | "COLD" | "COMPETENCY"
  questions: EvaluationQuestion[]
  answers: Record<string, any>
  score?: number
  completedAt?: string
  isRequired: boolean
}

export interface EvaluationQuestion {
  id: string
  type: "RATING" | "MCQ" | "TEXT" | "PRACTICAL"
  question: string
  options?: string[]
  required: boolean
  correct?: number
}

export interface ParticipantRegistration {
  id: string
  trainingSessionId: string
  participantId: string
  status: "INVITED" | "REGISTERED" | "CONFIRMED" | "ATTENDED" | "ABSENT"
  registeredAt: string
  approvedBy?: string
  managerApproval?: boolean
  rfApproval?: boolean
  rrhApproval?: boolean
}
