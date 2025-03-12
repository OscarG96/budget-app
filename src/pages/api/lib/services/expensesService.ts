import { Expenses, User } from "@prisma/client";
import { ExpensesRepository } from "../repositories/expensesRepo";

interface GetRequestQuery {
  limit?: number;
}

export class ExpensesService {
  static async getExpenses(user: User, query: GetRequestQuery) {
    return ExpensesRepository.getAllExpenses(user, query)
  }

  static async createExpense(expense: Expenses, user: User) {
    return ExpensesRepository.createExpense(expense, user)
  }
}