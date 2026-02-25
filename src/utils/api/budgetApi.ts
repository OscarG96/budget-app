import { BudgetWithCategory } from "@/types/types";
import { http } from "../http/http";
import { Budget } from "@prisma/client";


export const fetchBudgets = () =>
  http<BudgetWithCategory[]>('/api/budget');

export const createBudget = (budget: Partial<Budget>) => 
  http<Partial<Budget>>('/api/budget', {
    method: 'POST',
    body: budget
  });

export const fetchBudgetswithExpenses = () => 
  http<Budget>('/api/budget?includeExpenses=true')