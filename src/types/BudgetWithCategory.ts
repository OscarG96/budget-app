import { Budget, Categories } from "@prisma/client";

export interface BudgetWithCategory extends Budget {
  category: Categories
}