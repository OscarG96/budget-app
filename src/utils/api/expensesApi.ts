import { Expense, ExpenseWithCategory } from "@/types/types";
import { http } from "../http/http";

export const fetchExpenses = (month?: number, year?: number, limit?: number, totalAmount?: boolean) =>
  http<ExpenseWithCategory[]>(`/api/expenses?limit=${limit}&month=${month}&year=${year}&totalAmount=${totalAmount}`)

export const fetchExpensesTotalAmount = (month?: number, year?: number, limit?: number, totalAmount?: boolean) =>
  http<number>(`/api/expenses?limit=${limit}&month=${month}&year=${year}&totalAmount=${totalAmount}`)

export const fetchExpensesTotal = (month?: number, year?: number, limit?: number, totalAmount?: boolean) =>
  http<Number>(`/api/expenses?limit=${limit}&month=${month}&year=${year}&totalAmount=${totalAmount}`)

export const createExpense = (expense: Partial<Expense>) =>
  http<Expense>(`/api/expenses`, {
    method: 'POST',
    body: expense
  })