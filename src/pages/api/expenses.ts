import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "@/utils/prismaClient";

import type { expenses as ExpenseType } from '@prisma/client'
type ExpenseTypeOmitId = Omit<ExpenseType, 'id'>

type Data = {
  text: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ExpenseType>,
) {
  let response: NextApiResponse;
  try {
    switch (req.method) {
      case 'GET':
        const expenseToRetrieve = await prismaClient.expenses.findFirst()
        res.status(200).json({text: JSON.stringify(expenseToRetrieve)})
        break;
      case 'POST':
        const { amount, category, notes } = req.body;
        const expenseToCreate: ExpenseTypeOmitId = {
          amount,
          category,
          notes
        }
        await prismaClient.expenses.create({
          data: expenseToCreate
        })
        res.status(200).json({ text: 'expense' })
        break;

      default:
        break;
    }
  } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = `Things exploded (${error.message})`;
      } else {
        message = "An unknown error occurred";  // Optional: Handle cases where `error` is not an instance of `Error`
      }
      res.status(500).json({text: message})
  }
}


