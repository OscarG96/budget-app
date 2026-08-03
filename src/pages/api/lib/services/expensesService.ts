import { User } from "@prisma/client";
import { ExpensesRepository } from "../repositories/expensesRepo";
import { GetExpensesQuery } from "../../schemas/schemas";
import { Expense } from "@/types/types";

export class ExpensesService {
  static async getExpenses(user: User, query: GetExpensesQuery) {
    return ExpensesRepository.getAllExpenses(user, query);
  }

  static async getExpensesTotalAmount(user: User, query: GetExpensesQuery) {
    return ExpensesRepository.getTotalExpensesForMonth(user, query);
  }

  static async createExpense(expense: Expense, user: User) {
    return ExpensesRepository.createExpense(expense, user)
  }

  static async updateExpense(expense: Expense, user: User) {
    return ExpensesRepository.updateExpense(expense, user)
  }
}