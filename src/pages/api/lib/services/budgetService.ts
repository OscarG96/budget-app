import type { User } from "@prisma/client"
import { BudgetRepo } from "../repositories/budgetRepo"
import { CategoriesRepo } from "../repositories/categoriesRepo"
import { BudgetWithCategory } from "@/types/types"
import { BudgetQuerySchema } from "../../schemas/schemas";
import { z } from "zod";

type GetBudgetsQuery = z.infer<typeof BudgetQuerySchema>;

export class BudgetService {
  static async getUserBudgets(user: User, query: GetBudgetsQuery) {
    const { month, year, includeExpenses } = query;
    const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    if (includeExpenses) {
      return BudgetRepo.getBudgetWithExpenses(user, startDate, endDate)  
    }
    return BudgetRepo.getBudgets(user)
  }

  static async createBudget(user: User,  budget: BudgetWithCategory) {
    let existingCategory = await CategoriesRepo.getCategory(budget.category.id)
    if (!existingCategory) {
      //create category if does not exist 
      existingCategory = await CategoriesRepo.createCategory(user, budget.category.name )
    }
    const { category, ...budgetWithoutCategory } = budget
    return BudgetRepo.createBudget(user, { ...budgetWithoutCategory, categoryId: existingCategory.id })
  }
}