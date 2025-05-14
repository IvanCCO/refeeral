import { z } from 'zod';

// Phone regex for Brazilian phone numbers (accepts formats like: 11999999999, (11)99999-9999, 11 99999-9999)
const phoneRegex = /^(?:\d{2}|\(\d{2}\))[-\s]?\d{4,5}[-\s]?\d{4}$/;

export const affiliateSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .regex(phoneRegex, 'Formato de telefone inválido'),
  from: z.string().min(1, 'Origem é obrigatório'),
});

export type AffiliateInput = z.infer<typeof affiliateSchema>;

// Referral form validation schema
export const referralFormSchema = z.object({
  referrerName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  userName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .regex(phoneRegex, 'Formato de telefone inválido'),
  knowledge: z.string().optional(),
  referralCode: z.string().optional(),
});

export type ReferralFormInput = z.infer<typeof referralFormSchema>;
