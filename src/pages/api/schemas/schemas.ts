import { z } from 'zod';

export const BudgetQuerySchema = z.object({
  month: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => parseInt(val, 10))
    .refine((m) => m >= 1 && m <= 12, "Invalid month"),
  year: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => parseInt(val, 10))
    .refine((y) => y >= 2000 && y <= 2100, "Invalid year"),
  includeExpenses: z
    .enum(['true', 'false'])
    .optional()
    .transform(v => v === 'true'),
});