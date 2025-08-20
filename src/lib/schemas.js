import { z } from 'zod';

// Base validation patterns
const emailSchema = z
  .string()
  .email('Adresse email invalide')
  .min(1, 'Email requis');

const passwordSchema = z
  .string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
  .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial');

const phoneSchema = z
  .string()
  .regex(/^(?:\+33|0)[1-9](?:[0-9]{8})$/, 'Numéro de téléphone français invalide')
  .optional();

// Authentication schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Mot de passe requis'),
  rememberMe: z.boolean().optional().default(false)
});

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom ne peut contenir que des lettres'),
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  phone: phoneSchema,
  company: z
    .string()
    .min(2, 'Le nom de l\'entreprise doit contenir au moins 2 caractères')
    .max(100, 'Le nom de l\'entreprise ne peut pas dépasser 100 caractères'),
  position: z
    .string()
    .min(2, 'Le poste doit contenir au moins 2 caractères')
    .max(100, 'Le poste ne peut pas dépasser 100 caractères'),
  termsAccepted: z
    .boolean()
    .refine(val => val === true, 'Vous devez accepter les conditions d\'utilisation'),
  marketingConsent: z.boolean().optional().default(false)
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
});

export const forgotPasswordSchema = z.object({
  email: emailSchema
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
  token: z.string().min(1, 'Token requis')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
});

// Profile schemas
export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  email: emailSchema,
  phone: phoneSchema,
  company: z.string().max(100, 'Le nom de l\'entreprise ne peut pas dépasser 100 caractères').optional(),
  position: z.string().max(100, 'Le poste ne peut pas dépasser 100 caractères').optional(),
  bio: z.string().max(500, 'La biographie ne peut pas dépasser 500 caractères').optional(),
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(true),
    marketing: z.boolean().default(false)
  }).optional()
});

// Training request schema
export const trainingRequestSchema = z.object({
  title: z
    .string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  description: z
    .string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(1000, 'La description ne peut pas dépasser 1000 caractères'),
  category: z
    .string()
    .min(1, 'Veuillez sélectionner une catégorie'),
  priority: z
    .enum(['low', 'medium', 'high'], {
      errorMap: () => ({ message: 'Veuillez sélectionner une priorité valide' })
    }),
  targetDate: z
    .date({
      errorMap: () => ({ message: 'Veuillez sélectionner une date valide' })
    })
    .min(new Date(), 'La date cible doit être dans le futur'),
  participants: z
    .number()
    .min(1, 'Le nombre de participants doit être au moins 1')
    .max(500, 'Le nombre de participants ne peut pas dépasser 500'),
  budget: z
    .number()
    .min(0, 'Le budget ne peut pas être négatif')
    .optional(),
  skills: z
    .array(z.string())
    .min(1, 'Veuillez sélectionner au moins une compétence')
    .max(10, 'Vous ne pouvez pas sélectionner plus de 10 compétences'),
  justification: z
    .string()
    .min(20, 'La justification doit contenir au moins 20 caractères')
    .max(500, 'La justification ne peut pas dépasser 500 caractères')
});

// Quote request schema
export const quoteRequestSchema = z.object({
  companyName: z
    .string()
    .min(2, 'Le nom de l\'entreprise doit contenir au moins 2 caractères')
    .max(100, 'Le nom de l\'entreprise ne peut pas dépasser 100 caractères'),
  contactFirstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  contactLastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  contactEmail: emailSchema,
  contactPhone: phoneSchema,
  position: z
    .string()
    .min(2, 'Le poste doit contenir au moins 2 caractères')
    .max(100, 'Le poste ne peut pas dépasser 100 caractères'),
  companySize: z
    .enum(['1-10', '11-50', '51-200', '201-500', '500+'], {
      errorMap: () => ({ message: 'Veuillez sélectionner une taille d\'entreprise' })
    }),
  industry: z
    .string()
    .min(1, 'Veuillez sélectionner un secteur d\'activité'),
  trainingNeeds: z
    .array(z.string())
    .min(1, 'Veuillez sélectionner au moins un besoin de formation'),
  expectedParticipants: z
    .number()
    .min(1, 'Le nombre de participants attendus doit être au moins 1')
    .max(10000, 'Le nombre de participants ne peut pas dépasser 10 000'),
  preferredStartDate: z
    .date({
      errorMap: () => ({ message: 'Veuillez sélectionner une date de début souhaitée' })
    })
    .min(new Date(), 'La date de début doit être dans le futur'),
  budget: z
    .enum(['<10k', '10k-50k', '50k-100k', '100k-500k', '500k+'], {
      errorMap: () => ({ message: 'Veuillez sélectionner une fourchette budgétaire' })
    }),
  additionalInfo: z
    .string()
    .max(1000, 'Les informations supplémentaires ne peuvent pas dépasser 1000 caractères')
    .optional(),
  urgency: z
    .enum(['low', 'medium', 'high', 'urgent'], {
      errorMap: () => ({ message: 'Veuillez sélectionner un niveau d\'urgence' })
    }),
  contactPreference: z
    .enum(['email', 'phone', 'meeting'], {
      errorMap: () => ({ message: 'Veuillez sélectionner une préférence de contact' })
    }),
  gdprConsent: z
    .boolean()
    .refine(val => val === true, 'Vous devez accepter le traitement des données personnelles')
});

// Export type inference helpers
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type TrainingRequestFormData = z.infer<typeof trainingRequestSchema>;
export type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>;
