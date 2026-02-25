import { z } from 'zod';

export const BudgetQuerySchema = z.object({
  month: z.string().optional(),
  year: z.string().optional(),
  includeExpenses: z
    .enum(['true', 'false'])
    .optional()
    .transform(v => v === 'true'),
});