import { prisma } from "../prisma";
import type { Expenses, User } from "@prisma/client"; 

interface GetRequestQuery {
  limit?: number;
}

export class ExpensesRepository {
  static async getAllExpenses(user: User, query: GetRequestQuery) {
    if (query.limit) {
      return prisma.expenses.findMany({
        orderBy: {
          id: "desc", // Sort by highest ID first
        },
        where: { authorId: user.id },
        take: Number(query.limit)
      });
    }
    return prisma.expenses.findMany({
      orderBy: {
        id: "desc", // Sort by highest ID first
      },
      where: { authorId: user.id }
    });
  }

  static async createExpense(expense: Expenses, user: User) {
    await prisma.expenses.create({
      data: {
        amount: expense.amount,
        description: expense.description,
        category: expense.category,
        authorId: user.id
      }
    })
  }
}

