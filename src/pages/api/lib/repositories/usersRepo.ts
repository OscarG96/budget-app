import { getServerSession } from "next-auth";
import { prisma } from "../prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import bcrypt from "bcryptjs";

export class UsersRepo {
  static async getUserSession(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email ?? undefined }
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  static async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  static async getUser(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }
}