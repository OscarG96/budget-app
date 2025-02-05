import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Expenses, User } from "@prisma/client";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { getUserSession } from "../lib/session";

const prisma = new PrismaClient()

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Handler = (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>;

interface AuthenticatedRequest extends NextApiRequest {
  session: Session;
  user?: User;
}

const handlers: Record<HttpMethod, Handler> = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
        const data = await getRequest();
        res.status(200).json({message: "GET request handled", data})
    }, 
    POST: async (req: AuthenticatedRequest, res: NextApiResponse) => {
        const expense = req.body;
        if (req.user) {
          await postRequest(expense, req.user);
        } else {
            res.status(400).json({ message: "User not found" });
        }
        res.status(201).json({ message: "POST request handled" });
    },
    PUT: async (req, res) => {
        res.status(200).json({ message: "PUT request handled" });
      },
    DELETE: async (req, res) => {
    res.status(200).json({ message: "DELETE request handled" });
    },
}

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    req.user = await getUserSession(req, res);
    const method = req.method as HttpMethod;
    if (method && handlers[method] ) {
      await handlers[method](req, res);
    } else {
      res.setHeader("Allow", Object.keys(handlers));
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }

const getRequest = async () => {
    const expenses = prisma.expenses.findMany({
      where: { authorId: 1 }
    })
    return Promise.resolve(expenses)
}

const postRequest = async (expense: Expenses, user: User) => {
  await prisma.expenses.create({
    data: {
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      authorId: user.id 
    }
  })
}