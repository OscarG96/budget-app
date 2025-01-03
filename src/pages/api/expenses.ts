import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Expenses, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const handlers: Record<HttpMethod, Handler> = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
        const data = await getRequest();
        res.status(200).json({message: "GET request handled", data})
    }, 
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
        const data = req.body;
        res.status(201).json({ message: "POST request handled", data });
    },
    PUT: async (req, res) => {
        res.status(200).json({ message: "PUT request handled" });
      },
    DELETE: async (req, res) => {
    res.status(200).json({ message: "DELETE request handled" });
    },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

const postRequest = async (expense: Expenses) => {
  await prisma.expenses.create({
    data: {
      amount: expense.amount,
      description: expense.description,
      author: "Oscar" 
    }
  })
}
