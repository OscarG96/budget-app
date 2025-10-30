import { NextApiRequest, NextApiResponse } from "next";
import { UsersRepo } from "../repositories/usersRepo";
import { generateToken } from "../utils/auth";


export class UsersService {
  static async getUserSession(req: NextApiRequest, res: NextApiResponse) {
    return UsersRepo.getUserSession(req, res)
  }

  static async registerUser(name: string, email: string, password: string) {
    if (!email || !password || !name) {
      throw new Error("Email, password and name are required")
    }
    const user = await UsersRepo.createUser(name, email, password)
    const token = generateToken(user);
    return Object.assign({}, user, token)
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