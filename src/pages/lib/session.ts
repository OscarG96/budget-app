import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()



export async function getUserSession(req: NextApiRequest, res: NextApiResponse): Promise<User> {
  
  const session = await getServerSession(req, res, authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined }
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}