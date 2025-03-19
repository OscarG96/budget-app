import { User } from "@prisma/client";
import { prisma } from "../prisma";

export class CategoriesRepo {
  static async getCategories(user: User) {
    return prisma.categories.findMany({ 
      where: { authorId: user?.id ?? undefined }, 
      })
  }

  static async setDefaultCategories(userId: number) {
    return prisma.categories.createMany({
      data: [
        { name: "Food", authorId: userId },
        { name: "Transport", authorId: userId },
        { name: "Entertainment", authorId: userId },
        { name: "Utilities", authorId: userId },
        { name: "Health", authorId: userId },
      ]
    })
  }
}