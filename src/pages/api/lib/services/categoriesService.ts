import { User } from "@prisma/client";
import { CategoriesRepo } from "../repositories/categoriesRepo";

export class CategoriesService {
  static async getUserCategories(user: User) {
    return CategoriesRepo.getCategories(user)
  }

  static async setDefaultCategories(userId: number) {
    return CategoriesRepo.setDefaultCategories(userId)
  }
}