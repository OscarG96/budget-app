import { Expenses, User } from "@prisma/client";
import { ExpensesRepository } from "../repositories/expensesRepo";
import { GetExpensesQuery } from "../../schemas/schemas";

export class ExpensesService {
  static async getExpenses(user: User, query: GetExpensesQuery) {
    if (query.totalAmount === false) {
      return ExpensesRepository.getAllExpenses(user, query)
    } else {
      return ExpensesRepository.getTotalExpensesForMonth(user, query)
    }
  }

  static async createExpense(expense: Expenses, user: User) {
    return ExpensesRepository.createExpense(expense, user)
  }
}