import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { Session } from "next-auth";
import { ExpensesService } from "./lib/services/expensesService";
import { UsersService } from "./lib/services/usersService";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Handler = (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>;

interface AuthenticatedRequest extends NextApiRequest {
  session: Session;
  user?: User;
}

const handlers: Record<HttpMethod, Handler> = {
  GET: async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.user) {
      const query = req.query;
      const expenses = await ExpensesService.getExpenses(req.user, query)
      res.status(200).json({ message: "GET request handled", expenses });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  },
  POST: async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const expense = req.body;
    if (req.user) {
      await ExpensesService.createExpense(expense, req.user);
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
  req.user = await UsersService.getUserSession(req, res);
  const method = req.method as HttpMethod;
  if (method && handlers[method]) {
    await handlers[method](req, res);
  } else {
    res.setHeader("Allow", Object.keys(handlers));
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
