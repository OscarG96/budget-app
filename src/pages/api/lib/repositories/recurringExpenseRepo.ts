import { RecurringExpense } from "@/types/types";
import { prisma } from "../prisma";
import type { Expenses, User } from "@prisma/client";
import { Prisma } from "@prisma/client";

export class RecurringExpenseRepo {
  static async findRecurringExpenses() {
    return prisma.recurringExpense.findMany({
      where: {
        active: true,
        nextDate: {
          lte: new Date(),
        },
      },
    });
  }

  static async createRecurringExpense(recurringExpense: RecurringExpense) {
    const { authorId, categoryId, description, amount, frequency, nextDate, active } = recurringExpense;

    return prisma.recurringExpense.create({
      data: {
        authorId,
        categoryId,
        description,
        amount,
        frequency,
        nextDate,
        active,
        month: nextDate.getMonth() + 1,
        year: nextDate.getFullYear(),
      },
    });
  }

  static async getDueRecurringExpenses(date: Date) {
    return prisma.recurringExpense.findMany({
      where: {
        active: true,
        nextDate: {
          lte: date,
        },
      },
    });
  }

  static async update(
    id: number,
    data: Prisma.RecurringExpenseUpdateInput
  ) {
    return prisma.recurringExpense.update({
      where: { id },
      data,
    });
  }

}

