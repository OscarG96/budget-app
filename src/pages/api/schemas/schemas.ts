import { z } from 'zod';

export const BudgetQuerySchema = z.object({
  month: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => parseInt(val, 10))
    .refine((m) => m >= 1 && m <= 12, "Invalid month")
    .optional(),
  year: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => parseInt(val, 10))
    .refine((y) => y >= 2000 && y <= 2100, "Invalid year")
    .optional(),
  includeExpenses: z
    .enum(['true', 'false'])
    .optional()
    .transform(v => v === 'true'),
});

export const UserRegisterSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

export const CreateBudgetSchema = z.object({
  categoryId: z.number(),
  monthlyLimit: z.number(),
})

export const GetExpensesSchema = z.object({
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
  totalAmount: z
    .enum(['true', 'false'])
    .optional()
    .transform(v => v === 'true'),
  limit: z.coerce
    .number()
    .int()
    .optional(),
})

export type GetBudgetsQuery = z.infer<typeof BudgetQuerySchema>;
export type CreateBudget = z.infer<typeof CreateBudgetSchema>;
export type GetExpensesQuery = z.infer<typeof GetExpensesSchema>;