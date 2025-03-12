import { NextApiRequest, NextApiResponse } from "next";
import { UsersRepo } from "../repositories/usersRepo";

export class UsersService {
  static async getUserSession(req: NextApiRequest, res: NextApiResponse) {
    return UsersRepo.getUserSession(req, res)
  }

  static async registerUser(req: NextApiRequest) {
    const { name, email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required")
    }
    return UsersRepo.createUser(name, email, password)
  }

  static async getUser(email: string) {
    try {
      const user = await UsersRepo.getUser(email)
      if (!user) {
        return null;
      }
      return { ...user, id: user.id.toString() };
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
}