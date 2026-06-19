import { Expense, ExpenseWithCategory } from "@/types/types";
import { http } from "../http/http";

export const fetchExpenses = (month?: number, year?: number) =>
  http<ExpenseWithCategory[]>(`/api/expenses?limit=8&month=${month}&year=${year}`)

export const createExpense = (expense: Partial<Expense>) =>
  http<Expense>(`/api/expenses`, {
    method: 'POST',
    body: expense
  })