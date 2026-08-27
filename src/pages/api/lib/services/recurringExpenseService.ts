import { RecurrenceFrequency } from "@/types/types";
import { ExpensesRepository } from "../repositories/expensesRepo";
import { RecurringExpenseRepo } from "../repositories/recurringExpenseRepo";

export class RecurringExpenseService {
  static async generateRecurringExpenses() {
    const now = new Date();

    const recurringExpenses =
      await RecurringExpenseRepo.getDueRecurringExpenses(now);

    for (const recurringExpense of recurringExpenses) {
      let nextDate = new Date(recurringExpense.nextDate).toDateString();

      // A recurring expense could be overdue by multiple occurrences.
      // Generate every missed occurrence.
      let user: User; 
      while (nextDate <= now) {
        await ExpensesRepository.createExpense({
          amount: recurringExpense.amount,
          description: recurringExpense.description,
          categoryId: recurringExpense.categoryId,
          authorId: recurringExpense.authorId,
          date: nextDate,
        }, user);

        nextDate = this.getNextOccurrence(
          recurringExpense.nextDate,
          recurringExpense.frequency as RecurrenceFrequency
        );
      }

      await RecurringExpenseRepo.update(recurringExpense.id, {
        nextDate,
      });
    }
  }
  private static getNextOccurrence(
    date: Date,
    frequency: RecurrenceFrequency
  ): Date {
    const next = new Date(date);

    switch (frequency) {
      case 'DAILY':
        next.setDate(next.getDate() + 1);
        break;

      case 'WEEKLY':
        next.setDate(next.getDate() + 7);
        break;

      case 'MONTHLY':
        return this.addMonths(next, 1);

      case 'YEARLY':
        next.setFullYear(next.getFullYear() + 1);
        break;
    }

    return next;
  }

  private static addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    const originalDay = result.getDate();

    result.setDate(1);
    result.setMonth(result.getMonth() + months);

    const lastDayOfMonth = new Date(
      result.getFullYear(),
      result.getMonth() + 1,
      0
    ).getDate();

    result.setDate(Math.min(originalDay, lastDayOfMonth));

    return result;
  }
}