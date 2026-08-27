// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const authHeader = req.headers.get("authorization");
//   const cronSecret = process.env.CRON_SECRET;

//   if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
//     return new Response('Unauthorized', {
//       status: 401,
//     });
//   }

//   await generateRecurringExpenses();

//   res.status(200).json({
//     success: true,
//   });
// }

import type { NextRequest } from 'next/server';
 
export function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
 
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  await generateRecurringExpenses();
 
  return Response.json({ success: true });
}