import { Budget, User } from "@prisma/client";
import { prisma } from "../prisma";

export class BudgetRepo {
  static async getBudgets(user: User) {
    return prisma.budget.findMany({ 
      where: { authorId: user?.id ?? undefined }, 
      include: { category: true}
      })
  }

  static async createBudget(user: User, budget: Budget) {
    return prisma.budget.create({
      data: { ...budget, authorId: user.id}
    })
  }

  static async getBudgetWithExpenses(user: User, startDate: Date, endDate: Date) {
    return prisma.budget.findMany({
      where: {authorId: user?.id ?? undefined},
      include: { category: {
        include: { 
          expenses: {
            where: {
              date: {
                gte: startDate,
                lte: endDate
              }
            }
        }}
      } }
    })
  }
}