import { z } from 'zod';

// Phone regex for Brazilian phone numbers (accepts formats like: 11999999999, (11)99999-9999, 11 99999-9999)
const phoneRegex = /^(?:\d{2}|\(\d{2}\))[-\s]?\d{4,5}[-\s]?\d{4}$/;

export const affiliateSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  phone: z.string()
    .min(1, 'Telefone é obrigatório')
    .regex(phoneRegex, 'Formato de telefone inválido')
});

export type AffiliateInput = z.infer<typeof affiliateSchema>; 