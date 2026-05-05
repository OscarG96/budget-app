import type { NextApiRequest, NextApiResponse } from "next";
import { UsersService } from "./lib/services/usersService";
import { UserRegisterSchema } from "./schemas/schemas";
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const handlers: Record<HttpMethod, Handler> = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: "GET request handled" });
  },
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    //register user
    const parsed = UserRegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request body", issues: parsed.error.issues });
    }
    const body = parsed.data;
    const { email, name, password } = body;
    const user = await UsersService.registerUser(name, email, password);
    res.status(201).send(user);
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
  if (method && handlers[method]) {
    await handlers[method](req, res);
  } else {
    res.setHeader("Allow", Object.keys(handlers));
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
