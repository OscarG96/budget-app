import bcrypt from 'bcrypt'; // For password hashing
import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Something went wrong.', error: error.message });
    }
    return res.status(500).json({ message: 'An unknown error occurred.' });
  }
}
