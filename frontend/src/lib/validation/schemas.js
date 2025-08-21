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