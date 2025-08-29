import type { Budget, User } from "@prisma/client"
import { BudgetRepo } from "../repositories/budgetRepo"
import { CategoriesRepo } from "../repositories/categoriesRepo"
import { BudgetWithCategory } from "@/types/BudgetWithCategory"

export class BudgetService {
  static async getUserBudgets(user: User) {
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