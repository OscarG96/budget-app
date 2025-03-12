import { NextApiRequest, NextApiResponse } from "next";
type HttpMethod = 'POST';
type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const handlers: Record<HttpMethod, Handler> = {    
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
        const data = req.body;
        res.status(201).json({ message: "POST request handled", data });
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