import { NextApiRequest, NextApiResponse } from "next";
import { UsersService } from "./lib/services/usersService";
import { CategoriesService } from "./lib/services/categoriesService";
type HttpMethod = 'POST';
type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const handlers: Record<HttpMethod, Handler> = {    
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
        const { name, email, password } = req.body;
        const user = await UsersService.registerUser(name, email, password)
        await CategoriesService.setDefaultCategories(user.id)
        res.status(201).json({ message: "POST request handled", name, email });
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