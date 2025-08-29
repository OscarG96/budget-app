import { prisma } from "../prisma";
import type { Expenses, User } from "@prisma/client"; 

interface GetRequestQuery {
  limit?: number;
  totalAmount?: boolean;
  month?: number;
  year?: number
}

export class ExpensesRepository {
  static async getAllExpenses(user: User, queryParams: GetRequestQuery) {

    const filters: any = {}; 
    
    if (queryParams.month && queryParams.year) {
      const startOfMonth = new Date(queryParams.year, queryParams.month - 1, 1); // First day of the month
      const endOfMonth = new Date(queryParams.year, queryParams.month, 0); // Last day of the month
      filters.date = {
        gte: startOfMonth, // Greater than or equal to the first day of the month
        lt: endOfMonth, // Less than the first day of the next month
      }
    }

    return prisma.expenses.findMany({
      orderBy: {
        id: "desc", // Sort by highest ID first
      },
      where: { authorId: user.id, ...filters },
      take: Number(queryParams.limit) || 10,
      include: {
        category: true
      }
    });
  }

  static async createExpense(expense: Expenses, user: User) {
    await prisma.expenses.create({
      data: {
        amount: expense.amount,
        description: expense.description,
        categoryId: expense.categoryId,
        authorId: user.id
      }
    })
  }
}

