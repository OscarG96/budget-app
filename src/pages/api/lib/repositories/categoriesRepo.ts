import { User } from "@prisma/client";
import { prisma } from "../prisma";

export class CategoriesRepo {
  static async getCategories(user: User) {
    return prisma.user.findUnique({ 
      where: { email: user?.email ?? undefined }, 
      select: {categories: true}})
  }
}